/** Product catalog with a short in-memory cache so we don't call Zoho on every page view. */
import { env, sampleDataAllowed, zohoConfigured } from "./env.server";
import { getItem as zohoGetItem, listItems } from "./zoho.server";
import { sampleProducts } from "./sample-products";
import type { Catalog, Product } from "./types";

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
