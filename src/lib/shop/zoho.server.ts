/**
 * Minimal Zoho Books API client (server-only).
 * Auth: OAuth refresh token -> short-lived access token, cached in memory and in the shared cache.
 * Docs: https://www.zoho.com/books/api/v3/
 */
import { env, envJson } from "./env.server";
import { shopConfig } from "./config";
import { assignSlugs } from "./slug";
import { sharedGet, sharedPut } from "./shared-cache.server";
import type { Product } from "./types";

// Zoho / Stripe responses are untyped JSON.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = any;

export class ZohoError extends Error {
  constructor(
    message: string,
    public status?: number,
    public zohoCode?: number,
  ) {
    super(message);
    this.name = "ZohoError";
  }
}

const region = () => env("ZOHO_REGION") ?? "com";
const accountsBase = () => env("ZOHO_ACCOUNTS_BASE") ?? `https://accounts.zoho.${region()}`;
const apiBase = () => env("ZOHO_API_BASE") ?? `https://www.zohoapis.${region()}/books/v3`;

let tokenCache: { token: string; expiresAt: number } | null = null;
let tokenInFlight: Promise<string> | null = null;

/** Zoho allows only a handful of access-token requests per refresh token (about 10 per 10 minutes). */
const BLOCK_KEY = "zoho-token-blocked";
const TOKEN_KEY = "zoho-access-token";

async function getAccessToken(force = false): Promise<string> {
  if (!force && tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.token;
  // One refresh at a time per server instance, however many requests are waiting.
  tokenInFlight ??= refreshAccessToken(force).finally(() => {
    tokenInFlight = null;
  });
  return tokenInFlight;
}

async function refreshAccessToken(force: boolean): Promise<string> {
  // A token another server instance (or an earlier run) already fetched is still valid: reuse it.
  if (!force) {
    const saved = await sharedGet(TOKEN_KEY);
    if (saved) {
      try {
        const t = JSON.parse(saved) as { token: string; expiresAt: number };
        if (t.expiresAt > Date.now() + 60_000) {
          tokenCache = t;
          return t.token;
        }
      } catch {
        /* ignore */
      }
    }
  }
  // Zoho said "too many requests" recently: do not ask again (every extra ask extends the lock-out).
  if (await sharedGet(BLOCK_KEY)) throw new ZohoError("Zoho token refresh failed: Access Denied (backing off)", 429);

  const res = await fetch(`${accountsBase()}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: env("ZOHO_CLIENT_ID") ?? "",
      client_secret: env("ZOHO_CLIENT_SECRET") ?? "",
      refresh_token: env("ZOHO_REFRESH_TOKEN") ?? "",
    }),
  });
  const data = (await res.json().catch(() => ({}))) as Json;
  if (!res.ok || !data.access_token) {
    await sharedPut(BLOCK_KEY, "1", 600);
    throw new ZohoError(`Zoho token refresh failed: ${data.error ?? res.status}`, res.status);
  }
  tokenCache = { token: data.access_token, expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000 };
  await sharedPut(TOKEN_KEY, JSON.stringify(tokenCache), Math.max(60, (Number(data.expires_in) || 3600) - 120));
  return tokenCache.token;
}

async function zohoRequest(
  path: string,
  opts: { method?: string; query?: Record<string, string | number | undefined>; body?: unknown } = {},
  retry = true,
): Promise<Response> {
  const url = new URL(`${apiBase()}${path}`);
  url.searchParams.set("organization_id", env("ZOHO_BOOKS_ORG_ID") ?? "");
  for (const [k, v] of Object.entries(opts.query ?? {})) if (v !== undefined) url.searchParams.set(k, String(v));

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${await getAccessToken()}`,
      ...(opts.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : null,
  });

  if (res.status === 401 && retry) {
    await getAccessToken(true);
    return zohoRequest(path, opts, false);
  }
  return res;
}

async function zoho(path: string, opts: Parameters<typeof zohoRequest>[1] = {}): Promise<Json> {
  const res = await zohoRequest(path, opts);
  const data = (await res.json().catch(() => ({}))) as Json;
  if (!res.ok || (typeof data.code === "number" && data.code !== 0)) {
    throw new ZohoError(`Zoho Books ${opts.method ?? "GET"} ${path} failed: ${data.message ?? res.status}`, res.status, data.code);
  }
  return data;
}

/* ------------------------------ Items (shop catalog) ------------------------------ */

const imageUrlFor = (raw: Json): string | null =>
  raw.image_document_id || raw.image_name ? `/api/shop/image/${encodeURIComponent(raw.item_id)}` : null;

/** Brand label for the shop filter. Books uses "Local Purchase" internally; customers should see "Other". */
function brandLabel(raw: Json): string {
  const b = String(raw.brand ?? "").trim();
  if (!b || /^local purchase$/i.test(b)) return "Other";
  const shouting = /^[A-Z0-9 &.\-]+$/.test(b) && (b.length > 4 || b.includes(" "));
  return shouting ? b.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase()) : b;
}

/** Can this Books item be sold in the web shop? */
export function isSellable(raw: Json): boolean {
  return (
    raw.status !== "inactive" &&
    raw.can_be_sold !== false &&
    raw.product_type !== "service" &&
    shopConfig.soldItemTypes.includes(String(raw.cf_item_category ?? "")) &&
    !shopConfig.hiddenNamePatterns.some((re) => re.test(String(raw.name ?? "").trim()))
  );
}

export function mapItem(raw: Json): Product {
  const tracked = raw.product_type !== "service" && raw.track_inventory !== false;
  const stockRaw = raw.available_stock ?? raw.actual_available_stock ?? raw.stock_on_hand;
  return {
    id: String(raw.item_id),
    slug: "",
    name: String(raw.name ?? "Unnamed item"),
    sku: raw.sku ? String(raw.sku) : null,
    description: raw.description ? String(raw.description) : null,
    price: Number(raw.rate ?? 0),
    stock: tracked && stockRaw !== undefined && stockRaw !== null ? Math.max(0, Number(stockRaw)) : null,
    category: brandLabel(raw),
    itemType: raw.cf_item_category ? String(raw.cf_item_category) : null,
    imageUrl: imageUrlFor(raw),
  };
}

export async function listItems(): Promise<Product[]> {
  const all: Json[] = [];
  for (let page = 1; page <= 20; page++) {
    const data = await zoho("/items", { query: { status: "active", per_page: 200, page } });
    all.push(...((data.items as Json[]) ?? []));
    if (!data.page_context?.has_more_page) break;
  }

  const filter = (env("SHOP_CATEGORY_FILTER") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const products = all
    .filter(isSellable)
    .map(mapItem)
    .filter((p) => p.price > 0)
    .filter((p) => filter.length === 0 || filter.includes(p.category.toLowerCase()));
  return assignSlugs(products);
}

export async function getItem(id: string): Promise<Product | null> {
  try {
    const data = await zoho(`/items/${encodeURIComponent(id)}`);
    return data.item && isSellable(data.item) ? mapItem(data.item) : null;
  } catch (e) {
    if (e instanceof ZohoError && (e.status === 404 || e.zohoCode === 1002)) return null;
    throw e;
  }
}

/** Streams an item's photo from Books. Returns null when the item has no image. */
export async function getItemImage(id: string): Promise<Response | null> {
  const res = await zohoRequest(`/items/${encodeURIComponent(id)}/image`);
  if (!res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) return null;
  return res;
}

/* ------------------------------ Orders (contacts / invoices / payments) ------------------------------ */

export async function findContactByEmail(email: string): Promise<Json | null> {
  const data = await zoho("/contacts", { query: { email } });
  return (data.contacts as Json[] | undefined)?.[0] ?? null;
}

export async function createContact(body: Json): Promise<Json> {
  const data = await zoho("/contacts", { method: "POST", body: { ...body, ...envJson("ZOHO_BOOKS_CONTACT_EXTRA") } });
  return data.contact;
}

export async function findInvoiceByReference(reference: string): Promise<Json | null> {
  const data = await zoho("/invoices", { query: { reference_number: reference } });
  return (data.invoices as Json[] | undefined)?.find((i) => i.reference_number === reference) ?? null;
}

export async function createInvoice(body: Json): Promise<Json> {
  const data = await zoho("/invoices", {
    method: "POST",
    body: { ...body, ...envJson("ZOHO_BOOKS_INVOICE_EXTRA") },
  });
  return data.invoice;
}

export async function markInvoiceSent(invoiceId: string): Promise<void> {
  await zoho(`/invoices/${invoiceId}/status/sent`, { method: "POST" });
}

export async function recordPayment(body: Json): Promise<Json> {
  const data = await zoho("/customerpayments", { method: "POST", body });
  return data.payment;
}

export async function emailInvoice(invoiceId: string, toEmails: string[]): Promise<void> {
  await zoho(`/invoices/${invoiceId}/email`, { method: "POST", body: { to_mail_ids: toEmails, send_from_org_email_id: true } });
}
