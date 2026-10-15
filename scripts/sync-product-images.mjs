/**
 * Downloads the product photos that exist in Zoho Books, shrinks them to web size, and saves them with the website
 * (public/product-images/<itemId>.jpg + src/content/product-images.json). Books itself is never modified.
 *
 *   node scripts/sync-product-images.mjs            # all items that have a Books photo
 *   node scripts/sync-product-images.mjs --force    # re-download even if already saved
 *
 * Needs the Zoho settings in .env.local and macOS (uses the built-in `sips` tool, no installs).
 * Run it again whenever the team uploads new photos in Books.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const force = process.argv.includes("--force");
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const env = { ...Object.fromEntries(fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])), ...process.env };
const region = env.ZOHO_REGION || "com";
const api = (p, q = "") => `https://www.zohoapis.${region}/books/v3${p}?organization_id=${env.ZOHO_BOOKS_ORG_ID}${q}`;

const tokenRes = await (await fetch(`https://accounts.zoho.${region}/oauth/v2/token`, {
  method: "POST",
  body: new URLSearchParams({ grant_type: "refresh_token", client_id: env.ZOHO_CLIENT_ID, client_secret: env.ZOHO_CLIENT_SECRET, refresh_token: env.ZOHO_REFRESH_TOKEN }),
})).json();
if (!tokenRes.access_token) throw new Error("Zoho token error: " + tokenRes.error);
const headers = { Authorization: `Zoho-oauthtoken ${tokenRes.access_token}` };

const items = [];
for (let page = 1; page <= 30; page++) {
  const d = await (await fetch(api("/items", `&status=active&per_page=200&page=${page}`), { headers })).json();
  items.push(...(d.items ?? []));
  if (!d.page_context?.has_more_page) break;
}
const withPhoto = items.filter((i) => i.image_document_id);
console.log(`${items.length} active items, ${withPhoto.length} have a photo in Books`);

const outDir = path.join(root, "public/product-images");
const manifestPath = path.join(root, "src/content/product-images.json");
fs.mkdirSync(outDir, { recursive: true });
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const tmp = fs.mkdtempSync("/tmp/books-img-");

let done = 0, skipped = 0, failed = 0, saved = 0;
async function work(item) {
  const file = `${item.item_id}.jpg`;
  const dest = path.join(outDir, file);
  if (!force && fs.existsSync(dest)) { manifest[item.item_id] = `/product-images/${file}`; skipped++; return; }
  try {
    const res = await fetch(api(`/items/${item.item_id}/image`), { headers });
    if (!res.ok || !(res.headers.get("content-type") ?? "").startsWith("image/")) throw new Error(`HTTP ${res.status}`);
    const raw = path.join(tmp, item.item_id);
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
    // max 900px on the long edge, JPEG quality ~78 => typically 40-120 KB
    execFileSync("sips", ["-Z", "900", "-s", "format", "jpeg", "-s", "formatOptions", "78", raw, "--out", dest], { stdio: "ignore" });
    manifest[item.item_id] = `/product-images/${file}`;
    saved++;
  } catch (e) {
    failed++;
    console.warn(`  skipped ${item.name}: ${e.message}`);
  }
}

const queue = [...withPhoto];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) { await work(queue.shift()); if (++done % 25 === 0) console.log(`  ${done}/${withPhoto.length}`); } }));

// keep the manifest sorted so git diffs stay small
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => (a < b ? -1 : 1)));
fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 1) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Done. saved ${saved}, already had ${skipped}, failed ${failed}. Manifest has ${Object.keys(sorted).length} photos.`);
