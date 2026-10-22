/** Product catalog with a short in-memory cache so we don't call Zoho on every page view. */
import { env, sampleDataAllowed, zohoConfigured } from "./env.server";
import { getItem as zohoGetItem, listItems } from "./zoho.server";
import { sharedGet, sharedPut } from "./shared-cache.server";
import { sampleProducts } from "./sample-products";
import descriptions from "../../content/product-descriptions.json";
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
const sitePhotos = imageManifest as Record<string, string>;
const illustrativePhotos = illustrativeManifest as Record<string, string>;

function enrich(p: Product): Product {
  const books = (p.description ?? "").trim();
  const description = books.length > 25 && books.toLowerCase() !== p.name.toLowerCase() ? books : (siteDescriptions[p.id] ?? null);
  const real = sitePhotos[p.id] ?? p.imageUrl;
  if (real) return { ...p, description, imageUrl: real };
  const generic = illustrativePhotos[p.id];
  return generic ? { ...p, description, imageUrl: generic, imageIllustrative: true } : { ...p, description, imageUrl: null };
}

const TTL_MS = (Number(env("SHOP_CACHE_SECONDS")) || 300) * 1000;
/** The last good catalogue is kept this long, so a Zoho outage or rate limit does not empty the shop. */
const STALE_SECONDS = 7 * 24 * 3600;
const SNAPSHOT_KEY = "catalog-snapshot-v1";
let cache: { at: number; catalog: Catalog } | null = null;
let inFlight: Promise<Catalog> | null = null;

const toCatalog = (raw: Product[]): Catalog => ({ products: raw.map(enrich), source: "zoho", updatedAt: new Date().toISOString() });

async function loadSnapshot(): Promise<{ at: number; items: Product[] } | null> {
  try {
    const raw = await sharedGet(SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as { at: number; items: Product[] }) : null;
  } catch {
    return null;
  }
}

async function refreshCatalog(force: boolean): Promise<Catalog> {
  // Another server instance may have fetched a fresh copy already.
  const snap = await loadSnapshot();
  if (!force && snap && Date.now() - snap.at < TTL_MS) {
    const catalog = toCatalog(snap.items);
    cache = { at: snap.at, catalog };
    return catalog;
  }
  try {
    const items = await listItems();
    await sharedPut(SNAPSHOT_KEY, JSON.stringify({ at: Date.now(), items }), STALE_SECONDS);
    const catalog = toCatalog(items);
    cache = { at: Date.now(), catalog };
    return catalog;
  } catch (error) {
    console.error("[shop] Zoho catalog fetch failed", error);
    // Serve the last good copy (any age) rather than an error page if Zoho is briefly unavailable.
    if (cache) return cache.catalog;
    if (snap) {
      const catalog = toCatalog(snap.items);
      cache = { at: Date.now() - TTL_MS + 60_000, catalog }; // try Zoho again in a minute, not on every request
      return catalog;
    }
    throw error;
  }
}

export async function getCatalog(opts: { fresh?: boolean } = {}): Promise<Catalog> {
  if (!zohoConfigured()) {
    return sampleDataAllowed()
      ? { products: sampleProducts, source: "sample", updatedAt: new Date().toISOString() }
      : { products: [], source: "none", updatedAt: new Date().toISOString() };
  }

  if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.catalog;
  // One catalogue download at a time, however many visitors arrive together.
  inFlight ??= refreshCatalog(Boolean(opts.fresh)).finally(() => {
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

  const brandCounts = new Map<string, number>();
  for (const p of base) if (stockOk(p)) brandCounts.set(p.category, (brandCounts.get(p.category) ?? 0) + 1);
  for (const name of brandSet) if (!brandCounts.has(name)) brandCounts.set(name, 0);
  const brands = [...brandCounts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => (a.name === "Other" ? 1 : b.name === "Other" ? -1 : b.count - a.count || a.name.localeCompare(b.name)));

  const forStock = base.filter(brandOk);
  const stock = { in: forStock.filter(isInStock).length, out: forStock.filter((p) => !isInStock(p)).length };

  let list = base.filter((p) => brandOk(p) && stockOk(p));

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
