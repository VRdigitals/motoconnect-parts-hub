export interface Product {
  id: string;
  /** URL-friendly name, unique per product, e.g. "clutch-lifter-kit-ug-4-150". */
  slug: string;
  name: string;
  sku: string | null;
  description: string | null;
  /** Selling price from Zoho Books (see shopConfig.pricesIncludeVat). */
  price: number;
  /** Units available to sell. null = stock is not tracked for this item. */
  stock: number | null;
  /** Brand shown in the shop filter (from the Books "brand" field). */
  category: string;
  /** Books custom field "Item category" (e.g. Spare Parts / Bike). */
  itemType?: string | null;
  /** Image URL served by our own /api/shop/image route, or a bundled sample image. null = placeholder. */
  imageUrl: string | null;
}

export interface Catalog {
  products: Product[];
  /** "zoho" = live Books items, "sample" = demo data (development only), "none" = shop not connected. */
  source: "zoho" | "sample" | "none";
  updatedAt: string;
}

export interface CartLineInput {
  id: string;
  qty: number;
}

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; code: "not_configured" | "empty" | "stock" | "invalid" | "error"; message: string };

export type ShopSort = "featured" | "price-asc" | "price-desc" | "name";
export type ShopStock = "in" | "out";

export interface ShopQuery {
  q?: string | undefined;
  /** Comma-separated brand names (multi-select). */
  brand?: string | undefined;
  min?: number | undefined;
  max?: number | undefined;
  stock?: ShopStock | undefined;
  sort?: ShopSort | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

export interface ShopPage {
  /** Only the products for the requested page (descriptions are left out to keep the page light). */
  products: Product[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  /** 1-based position of the first / last product on this page, for "Showing 1-24 of 1,866". */
  from: number;
  to: number;
  /** Brand filter options. Counts respect every other active filter. */
  brands: { name: string; count: number }[];
  /** Availability counts (respect every other active filter). */
  stock: { in: number; out: number };
  priceBounds: { min: number; max: number };
  source: Catalog["source"];
}
