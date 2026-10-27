/** Product catalogue: read from a saved copy that is refreshed from Zoho Books once a day (see below). */
import { env, sampleDataAllowed, zohoConfigured } from "./env.server";
import { getItem as zohoGetItem, listItems } from "./zoho.server";
import { sharedGet, sharedPut } from "./shared-cache.server";
import { sampleProducts } from "./sample-products";
import descriptions from "../../content/product-descriptions.json";
import featuredIds from "../../content/featured-products.json";
import imageManifest from "../../content/product-images.json";
import illustrativeManifest from "../../content/product-images-illustrative.json";
import type { Catalog, Product, ShopPage, ShopQuery } from "./types";

/**
 * Content held in the website (not in Zoho Books):
 *  - src/content/product-descriptions.json : item id -> description
 *  - src/content/product-images.json       : item id -> optimised photo in /public/product-images
 *  - src/content/product-images-illustrative.json : item id -> generic photo for the part type (only when there is no real photo)
 * A description written in Books wins over ours; an optimised local photo wins over the (often huge) Books original.
 */
const siteDescriptions = descriptions as Record<string, string>;
const featuredSet = new Set(featuredIds as string[]);
const sitePhotos = imageManifest as Record<string, string>;
const illustrativePhotos = illustrativeManifest as Record<string, string>;

function enrich(p: Product): Product {
  return markFeatured(enrichBase(p));
}

const markFeatured = (p: Product): Product => (featuredSet.has(p.id) ? { ...p, featured: true } : p);

function enrichBase(p: Product): Product {
  const books = (p.description ?? "").trim();
  const description = books.length > 25 && books.toLowerCase() !== p.name.toLowerCase() ? books : (siteDescriptions[p.id] ?? null);
  const real = sitePhotos[p.id] ?? p.imageUrl;
  if (real) return { ...p, description, imageUrl: real };
  const generic = illustrativePhotos[p.id];
  return generic ? { ...p, description, imageUrl: generic, imageIllustrative: true } : { ...p, description, imageUrl: null };
}

/**
 * How products reach the shop:
 *  - A scheduled job (see vite.config.ts, 06:00 Dubai time) downloads the catalogue from Zoho Books once a day
 *    and saves it ("snapshot": Cloudflare KV in production, a file in .cache/ locally).
 *  - Every page reads that saved copy. Visitors never make Zoho wait or count against its rate limit.
 *  - Only if there is no saved copy yet, or it is older than SHOP_MAX_AGE_HOURS (default 36, i.e. the daily job
 *    failed), does a page load fall back to asking Zoho directly.
 *  - A fresh copy can be pulled any time with /api/shop/refresh (see docs/SHOP_SETUP.md).
 */
const RECHECK_MS = (Number(env("SHOP_CACHE_SECONDS")) || 300) * 1000; // how often a server instance re-reads the saved copy
const MAX_AGE_MS = (Number(env("SHOP_MAX_AGE_HOURS")) || 36) * 3600 * 1000;
const KEEP_SECONDS = 14 * 24 * 3600; // keep the saved copy for 2 weeks even if syncing breaks, so the shop never empties
const SNAPSHOT_KEY = "catalog-snapshot-v1";

interface Snapshot {
  at: number;
  items: Product[];
}
let mem: { at: number; checkedAt: number; catalog: Catalog } | null = null;
let inFlight: Promise<Catalog> | null = null;

const toCatalog = (raw: Product[], at: number): Catalog => ({ products: raw.map(enrich), source: "zoho", updatedAt: new Date(at).toISOString() });

async function readSnapshot(): Promise<Snapshot | null> {
  try {
    const raw = await sharedGet(SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as Snapshot) : null;
  } catch {
    return null;
  }
}

/** Download the whole catalogue from Zoho Books and save it. Used by the daily job, /api/shop/refresh and as a fallback. */
export async function syncCatalog(): Promise<{ count: number; at: string }> {
  const items = await listItems();
  const at = Date.now();
  await sharedPut(SNAPSHOT_KEY, JSON.stringify({ at, items } satisfies Snapshot), KEEP_SECONDS);
  mem = { at, checkedAt: Date.now(), catalog: toCatalog(items, at) };
  return { count: items.length, at: new Date(at).toISOString() };
}

async function loadCatalog(): Promise<Catalog> {
  const snap = await readSnapshot();
  if (snap && Date.now() - snap.at < MAX_AGE_MS) {
    if (!mem || mem.at !== snap.at) mem = { at: snap.at, checkedAt: Date.now(), catalog: toCatalog(snap.items, snap.at) };
    mem.checkedAt = Date.now();
    return mem.catalog;
  }
  // No saved copy yet, or the daily job has not run for too long: ask Zoho directly.
  try {
    await syncCatalog();
    return mem!.catalog;
  } catch (error) {
    console.error("[shop] Zoho catalog fetch failed", error);
    // Serve whatever copy we have (any age) rather than an error page.
    if (snap) {
      mem = { at: snap.at, checkedAt: Date.now() - RECHECK_MS + 60_000, catalog: toCatalog(snap.items, snap.at) }; // retry in a minute
      return mem.catalog;
    }
    if (mem) return mem.catalog;
    throw error;
  }
}

export async function getCatalog(): Promise<Catalog> {
  if (!zohoConfigured()) {
    return sampleDataAllowed()
      ? { products: sampleProducts.map(markFeatured), source: "sample", updatedAt: new Date().toISOString() }
      : { products: [], source: "none", updatedAt: new Date().toISOString() };
  }
  if (mem && Date.now() - mem.checkedAt < RECHECK_MS) return mem.catalog;
  // One load at a time, however many visitors arrive together.
  inFlight ??= loadCatalog().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

/** Live (uncached) lookup used at checkout so price and stock are always current. */
export async function getFreshProduct(id: string): Promise<Product | null> {
  if (!zohoConfigured()) return sampleDataAllowed() ? (sampleProducts.find((p) => p.id === id) ?? null) : null;
  return zohoGetItem(id);
}

export const PAGE_SIZES = [24, 48, 96] as const;

/** Search, filter, sort and page the catalog on the server so the browser only ever receives one page. */
export async function queryCatalog(query: ShopQuery): Promise<ShopPage> {
  const catalog = await getCatalog();
  const all = catalog.products;

  const terms = (query.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const brandSet = new Set((query.brand ?? "").split(",").map((s) => s.trim()).filter(Boolean));
  const isInStock = (p: Product) => p.stock === null || p.stock > 0;

  // Facet counts ignore the facet's own filter so users can still see (and switch to) the other options.
  const base = all.filter(
    (p) =>
      (query.min === undefined || p.price >= query.min) &&
      (query.max === undefined || p.price <= query.max) &&
      terms.every((t) => p.name.toLowerCase().includes(t) || (p.sku ?? "").toLowerCase().includes(t) || p.category.toLowerCase().includes(t)),
  );
  const stockOk = (p: Product) => !query.stock || (query.stock === "in") === isInStock(p);
  const brandOk = (p: Product) => brandSet.size === 0 || brandSet.has(p.category);
  const topOk = (p: Product) => !query.top || p.featured === true;

  const brandCounts = new Map<string, number>();
  for (const p of base) if (stockOk(p) && topOk(p)) brandCounts.set(p.category, (brandCounts.get(p.category) ?? 0) + 1);
  for (const name of brandSet) if (!brandCounts.has(name)) brandCounts.set(name, 0);
  const brands = [...brandCounts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => (a.name === "Other" ? 1 : b.name === "Other" ? -1 : b.count - a.count || a.name.localeCompare(b.name)));

  const forStock = base.filter((p) => brandOk(p) && topOk(p));
  const stock = { in: forStock.filter(isInStock).length, out: forStock.filter((p) => !isInStock(p)).length };

  const featuredCount = base.filter((p) => p.featured && brandOk(p) && stockOk(p)).length;
  let list = base.filter((p) => brandOk(p) && stockOk(p) && topOk(p));

  switch (query.sort) {
    case "price-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case "name":
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // "Featured": products with a real photo first, then ones with a generic (illustrative) photo, then ones with
      // no image ("image on request"). Within each group, things you can buy now come first, then Zoho's own order.
      const imageRank = (p: Product) => (!p.imageUrl ? 2 : p.imageIllustrative ? 1 : 0);
      list = [...list].sort((a, b) => imageRank(a) - imageRank(b) || Number(isInStock(b)) - Number(isInStock(a)));
  }

  const pageSize = (PAGE_SIZES as readonly number[]).includes(query.size ?? 0) ? (query.size as number) : PAGE_SIZES[0];
  const pageCount = Math.max(1, Math.ceil(list.length / pageSize));
  const page = Math.min(Math.max(1, Math.floor(query.page ?? 1)), pageCount);
  const products = list.slice((page - 1) * pageSize, page * pageSize).map((p) => ({ ...p, description: null }));

  const prices = all.map((p) => p.price);
  return {
    products,
    total: list.length,
    page,
    pageCount,
    pageSize,
    from: list.length === 0 ? 0 : (page - 1) * pageSize + 1,
    to: Math.min(page * pageSize, list.length),
    brands,
    stock,
    featuredCount,
    priceBounds: { min: prices.length ? Math.floor(Math.min(...prices)) : 0, max: prices.length ? Math.ceil(Math.max(...prices)) : 0 },
    source: catalog.source,
  };
}

let indexCache: { updatedAt: string; bySlug: Map<string, Product>; byId: Map<string, Product> } | null = null;

/** Find a product by its URL slug, or (for old links) by its Zoho item id. */
export async function findProduct(key: string): Promise<{ product: Product | null; redirectToSlug?: string; source: Catalog["source"] }> {
  const catalog = await getCatalog();
  if (!indexCache || indexCache.updatedAt !== catalog.updatedAt) {
    indexCache = {
      updatedAt: catalog.updatedAt,
      bySlug: new Map(catalog.products.map((p) => [p.slug, p])),
      byId: new Map(catalog.products.map((p) => [p.id, p])),
    };
  }
  const bySlug = indexCache.bySlug.get(key);
  if (bySlug) return { product: bySlug, source: catalog.source };
  const byId = indexCache.byId.get(key);
  // An old id-based link: send visitors (and search engines) to the canonical name-based URL.
  if (byId) return { product: byId, redirectToSlug: byId.slug, source: catalog.source };
  return { product: null, source: catalog.source };
}
