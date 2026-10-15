/**
 * LOCAL HELPER: exports the products shown in the shop (same rules as the site) to a tab-separated file, so
 * descriptions / photo research can be prepared in batches.
 *   node scripts/dev/export-products.mjs out.tsv
 */
import fs from "node:fs";
const out = process.argv[2] ?? "products.tsv";
const env = { ...Object.fromEntries(fs.readFileSync(".env.local", "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])), ...process.env };
const region = env.ZOHO_REGION || "com";
const tok = await (await fetch(`https://accounts.zoho.${region}/oauth/v2/token`, { method: "POST", body: new URLSearchParams({ grant_type: "refresh_token", client_id: env.ZOHO_CLIENT_ID, client_secret: env.ZOHO_CLIENT_SECRET, refresh_token: env.ZOHO_REFRESH_TOKEN }) })).json();
const items = [];
for (let p = 1; p <= 30; p++) {
  const d = await (await fetch(`https://www.zohoapis.${region}/books/v3/items?organization_id=${env.ZOHO_BOOKS_ORG_ID}&status=active&per_page=200&page=${p}`, { headers: { Authorization: `Zoho-oauthtoken ${tok.access_token}` } })).json();
  items.push(...(d.items ?? []));
  if (!d.page_context?.has_more_page) break;
}
const hidden = [/^(hero|honda|bajaj|tvs)\s[\w\s.\-']*\b\d{2,3}\s?cc\s*$/i, /service package/i];
const brandOf = (i) => { const b = String(i.brand ?? "").trim(); return !b || /^local purchase$/i.test(b) ? "Other" : b; };
const shown = items
  .filter((i) => i.rate > 0 && i.can_be_sold !== false && i.product_type !== "service" && i.cf_item_category === "Spare Parts" && !hidden.some((re) => re.test(i.name.trim())))
  .sort((a, b) => brandOf(a).localeCompare(brandOf(b)) || a.name.localeCompare(b.name));
fs.writeFileSync(out, shown.map((i, n) => [n + 1, i.item_id, brandOf(i), i.sku ?? "", i.name.replace(/\s+/g, " ").trim(), i.stock_on_hand > 0 ? "S" : "-", i.image_document_id ? "P" : "-"].join("\t")).join("\n") + "\n");
console.log(shown.length, "products ->", out);
const byBrand = {}; shown.forEach((i) => (byBrand[brandOf(i)] = (byBrand[brandOf(i)] ?? 0) + 1)); console.log(byBrand);
