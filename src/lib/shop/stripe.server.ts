/**
 * Minimal Stripe client (server-only). Uses Stripe's REST API directly via fetch so it runs the same on
 * Cloudflare Workers and Node, with no extra dependency.
 */
import { env } from "./env.server";
import { chargedUnitPrice, shopConfig } from "./config";
import type { Product } from "./types";

// Zoho / Stripe responses are untyped JSON.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = any;

const base = () => env("STRIPE_API_BASE") ?? "https://api.stripe.com";

/** Stripe expects nested form encoding: a[b][0][c]=value. */
function encodeForm(value: unknown, prefix = "", out: [string, string][] = []): [string, string][] {
  if (value === undefined || value === null) return out;
  if (Array.isArray(value)) value.forEach((v, i) => encodeForm(v, `${prefix}[${i}]`, out));
  else if (typeof value === "object") for (const [k, v] of Object.entries(value)) encodeForm(v, prefix ? `${prefix}[${k}]` : k, out);
  else out.push([prefix, String(value)]);
  return out;
}

async function stripe(path: string, opts: { method?: string; form?: unknown; query?: [string, string][]; idempotencyKey?: string } = {}): Promise<Json> {
  const url = new URL(`${base()}${path}`);
  for (const [k, v] of opts.query ?? []) url.searchParams.append(k, v);
  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      Authorization: `Bearer ${env("STRIPE_SECRET_KEY")}`,
      ...(opts.form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(opts.idempotencyKey ? { "Idempotency-Key": opts.idempotencyKey } : {}),
    },
    body: opts.form ? new URLSearchParams(encodeForm(opts.form)).toString() : null,
  });
  const data = (await res.json().catch(() => ({}))) as Json;
  if (!res.ok) throw new Error(`Stripe ${opts.method ?? "GET"} ${path} failed: ${data.error?.message ?? res.status}`);
  return data;
}

const toFils = (aed: number) => Math.round(aed * 100);

export async function createCheckoutSession(input: {
  lines: { product: Product; qty: number }[];
  origin: string;
}): Promise<{ id: string; url: string }> {
  const isPublicHttps = input.origin.startsWith("https://") && !input.origin.includes("localhost");

  const form: Json = {
    mode: "payment",
    success_url: `${input.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/shop`,
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    shipping_address_collection: { allowed_countries: shopConfig.allowedCountries },
    custom_fields: [
      { key: "company_name", label: { type: "custom", custom: "Company name (optional)" }, type: "text", optional: true },
      { key: "trn", label: { type: "custom", custom: "Tax registration number - TRN (optional)" }, type: "text", optional: true },
    ],
    line_items: input.lines.map(({ product, qty }) => ({
      quantity: qty,
      price_data: {
        currency: shopConfig.currency.toLowerCase(),
        unit_amount: toFils(chargedUnitPrice(product.price)),
        product_data: {
          name: product.name,
          ...(product.sku ? { description: `SKU ${product.sku}` } : {}),
          ...(isPublicHttps && product.imageUrl?.startsWith("/") ? { images: [`${input.origin}${product.imageUrl}`] } : {}),
          // Used by the webhook to build the Zoho Books invoice.
          metadata: { zoho_item_id: product.id, zoho_rate: String(product.price) },
        },
      },
    })),
    metadata: { source: "motoconnect-web" },
    payment_intent_data: { description: "Motoconnect online order" },
  };

  if (shopConfig.deliveryFee > 0) {
    form.shipping_options = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: "Delivery",
          fixed_amount: { amount: toFils(shopConfig.deliveryFee), currency: shopConfig.currency.toLowerCase() },
        },
      },
    ];
  }

  const session = await stripe("/v1/checkout/sessions", { method: "POST", form });
  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return { id: session.id, url: session.url };
}

export async function retrieveCheckoutSession(id: string): Promise<Json> {
  return stripe(`/v1/checkout/sessions/${encodeURIComponent(id)}`, {
    query: [
      ["expand[]", "line_items.data.price.product"],
      ["expand[]", "payment_intent"],
    ],
  });
}

/** Verifies the `Stripe-Signature` header (HMAC-SHA256 over `${timestamp}.${rawBody}`). */
export async function verifyStripeSignature(rawBody: string, header: string | null, secret: string, toleranceSeconds = 300): Promise<boolean> {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()];
    }),
  );
  const timestamp = Number(parts["t"]);
  // A header can carry several v1 signatures (secret rotation); collect them all.
  const signatures = header
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds) return false;

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");

  return signatures.some((sig) => sig.length === expected.length && timingSafeEqual(sig, expected));
}

function timingSafeEqual(a: string, b: string): boolean {
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
