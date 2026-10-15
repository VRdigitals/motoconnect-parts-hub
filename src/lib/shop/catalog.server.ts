/** Product catalog with a short in-memory cache so we don't call Zoho on every page view. */
import { env, sampleDataAllowed, zohoConfigured } from "./env.server";
import { getItem as zohoGetItem, listItems } from "./zoho.server";
import { sampleProducts } from "./sample-products";
import type { Catalog, Product, ShopPage, ShopQuery } from "./types";

const TTL_MS = (Number(env("SHOP_CACHE_SECONDS")) || 300) * 1000;
let cache: { at: number; catalog: Catalog } | null = null;

export async function getCatalog(opts: { fresh?: boolean } = {}): Promise<Catalog> {
  if (!zohoConfigured()) {
    return sampleDataAllowed()
      ? { products: sampleProducts, source: "sample", updatedAt: new Date().toISOString() }
      : { products: [], source: "none", updatedAt: new Date().toISOString() };
  }

  if (!opts.fresh && cache && Date.now() - cache.at < TTL_MS) return cache.catalog;

  try {
    const products = await listItems();
    const catalog: Catalog = { products, source: "zoho", updatedAt: new Date().toISOString() };
    cache = { at: Date.now(), catalog };
    return catalog;
  } catch (error) {
    console.error("[shop] Zoho catalog fetch failed", error);
    // Serve the last good copy rather than an empty shop if Zoho is briefly unavailable.
    if (cache) return cache.catalog;
    throw error;
  }
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
      // "Featured": things you can actually buy first, then Zoho's own order.
      list = [...list].sort((a, b) => Number(isInStock(b)) - Number(isInStock(a)));
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
