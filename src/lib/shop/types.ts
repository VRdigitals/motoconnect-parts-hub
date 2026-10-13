export interface Product {
  id: string;
  name: string;
  sku: string | null;
  description: string | null;
  /** Selling price from Zoho Books (see shopConfig.pricesIncludeVat). */
  price: number;
  /** Units available to sell. null = stock is not tracked for this item. */
  stock: number | null;
  category: string;
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
