export interface Product {
  id: string;
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

export interface ShopQuery {
  q?: string | undefined;
  category?: string | undefined;
  sort?: ShopSort | undefined;
  page?: number | undefined;
  inStock?: boolean | undefined;
}

export interface ShopPage {
  /** Only the products for the requested page (descriptions are left out to keep the page light). */
  products: Product[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  categories: { name: string; count: number }[];
  source: Catalog["source"];
}
