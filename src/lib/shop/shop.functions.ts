import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { z } from "zod";
import { shopConfig } from "./config";
import type { Catalog, CheckoutResult, Product, ShopPage } from "./types";

/**
 * Server functions called by the shop pages. Server-only modules are imported dynamically inside the handlers so
 * they (and the secrets they read) can never end up in the browser bundle.
 */

const shopQuery = z.object({
  q: z.string().max(100).optional(),
  brand: z.string().max(400).optional(),
  min: z.number().min(0).max(1_000_000).optional(),
  max: z.number().min(0).max(1_000_000).optional(),
  stock: z.enum(["in", "out"]).optional(),
  top: z.boolean().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "name"]).optional(),
  page: z.number().int().min(1).max(10000).optional(),
  size: z.number().int().min(1).max(500).optional(),
});

export const getShopPageFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => shopQuery.parse(data))
  .handler(async ({ data }): Promise<ShopPage> => {
    const { queryCatalog } = await import("./catalog.server");
    return queryCatalog(data);
  });

export const getProductFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ key: z.string().min(1).max(200) }).parse(data))
  .handler(
    async ({ data }): Promise<{ product: Product | null; redirectToSlug?: string; origin: string; source: Catalog["source"] }> => {
      const { findProduct } = await import("./catalog.server");
      const { env } = await import("./env.server");
      const found = await findProduct(data.key);
      return { ...found, origin: env("SITE_URL")?.replace(/\/$/, "") ?? getRequestUrl().origin };
    },
  );

const checkoutInput = z.object({
  lines: z
    .array(z.object({ id: z.string().min(1).max(120), qty: z.number().int().min(1).max(shopConfig.maxQtyPerLine) }))
    .min(1)
    .max(50),
});

export const createCheckoutFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => checkoutInput.parse(data))
  .handler(async ({ data }): Promise<CheckoutResult> => {
    const { env, stripeConfigured, zohoConfigured } = await import("./env.server");
    const { getFreshProduct } = await import("./catalog.server");
    const { createCheckoutSession } = await import("./stripe.server");

    // Demo products may only be bought with Stripe TEST keys, never with a live key.
    const testKey = (env("STRIPE_SECRET_KEY") ?? "").startsWith("sk_test_");
    if (!stripeConfigured() || (!zohoConfigured() && !testKey)) {
      return { ok: false, code: "not_configured", message: "Online checkout is not switched on yet. Please contact us to place your order." };
    }

    // Merge duplicate lines, then re-read price + stock from the source of truth (never trust the browser).
    const wanted = new Map<string, number>();
    for (const l of data.lines) wanted.set(l.id, Math.min((wanted.get(l.id) ?? 0) + l.qty, shopConfig.maxQtyPerLine));

    const lines: { product: Product; qty: number }[] = [];
    for (const [id, qty] of wanted) {
      const product = await getFreshProduct(id);
      if (!product) return { ok: false, code: "invalid", message: "One of the items in your cart is no longer available." };
      if (product.stock !== null && qty > product.stock) {
        return {
          ok: false,
          code: "stock",
          message: product.stock === 0 ? `${product.name} is out of stock.` : `Only ${product.stock} of ${product.name} left in stock.`,
        };
      }
      lines.push({ product, qty });
    }

    try {
      const origin = env("SITE_URL")?.replace(/\/$/, "") ?? getRequestUrl().origin;
      const session = await createCheckoutSession({ lines, origin });
      return { ok: true, url: session.url };
    } catch (error) {
      console.error("[shop] could not create Stripe checkout session", error);
      return { ok: false, code: "error", message: "We couldn't start the payment. Please try again in a moment." };
    }
  });

export const getOrderSummaryFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ sessionId: z.string().min(5).max(200) }).parse(data))
  .handler(async ({ data }): Promise<{ paid: boolean; email: string | null; total: number | null } | null> => {
    const { stripeConfigured } = await import("./env.server");
    if (!stripeConfigured()) return null;
    try {
      const { retrieveCheckoutSession } = await import("./stripe.server");
      const s = await retrieveCheckoutSession(data.sessionId);
      return { paid: s.payment_status === "paid", email: s.customer_details?.email ?? null, total: typeof s.amount_total === "number" ? s.amount_total / 100 : null };
    } catch {
      return null;
    }
  });
