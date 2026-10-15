/** Shared helpers for the product-photo scripts. Read-only against Zoho Books. Needs .env.local. */
import fs from "node:fs";
import path from "node:path";

export const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

export function loadEnv() {
  const file = path.join(root, ".env.local");
  const fromFile = fs.existsSync(file)
    ? Object.fromEntries(fs.readFileSync(file, "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]))
    : {};
  return { ...fromFile, ...process.env };
}

/** Same rule as the website: only Spare Parts that can be sold, priced above 0 (complete bikes/services are hidden). */
const hiddenNames = [/^(hero|honda|bajaj|tvs)\s[\w\s.\-']*\b\d{2,3}\s?cc\s*$/i, /service package/i];
export const isShopItem = (i) =>
  i.rate > 0 && i.status !== "inactive" && i.can_be_sold !== false && i.product_type !== "service" && i.cf_item_category === "Spare Parts" && !hiddenNames.some((re) => re.test(i.name.trim()));

export const brandOf = (i) => {
  const b = String(i.brand ?? "").trim();
  return !b || /^local purchase$/i.test(b) ? "Other" : b;
};

/** Same as src/lib/shop/slug.ts */
export const slugify = (s, max = 80) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, max).replace(/-+$/, "") || "product";

export async function fetchItems() {
  const env = loadEnv();
  const region = env.ZOHO_REGION || "com";
  const tok = await (await fetch(`https://accounts.zoho.${region}/oauth/v2/token`, {
    method: "POST",
    body: new URLSearchParams({ grant_type: "refresh_token", client_id: env.ZOHO_CLIENT_ID, client_secret: env.ZOHO_CLIENT_SECRET, refresh_token: env.ZOHO_REFRESH_TOKEN }),
  })).json();
  if (!tok.access_token) throw new Error("Zoho token error: " + tok.error);
  const items = [];
  for (let page = 1; page <= 30; page++) {
    const d = await (await fetch(`https://www.zohoapis.${region}/books/v3/items?organization_id=${env.ZOHO_BOOKS_ORG_ID}&status=active&per_page=200&page=${page}`, { headers: { Authorization: `Zoho-oauthtoken ${tok.access_token}` } })).json();
    items.push(...(d.items ?? []));
    if (!d.page_context?.has_more_page) break;
  }
  return items;
}
