/**
 * Bulk-adds product photos to the WEBSITE (Zoho Books is not changed).
 *
 * 1. Put photos in one folder. Name each file after the product's SKU (part number), e.g.
 *      DH102277.jpg   45510KSPB51.png   "PK-PUL 150-.50-USHA.jpeg"
 *    (upper/lower case and spaces/slashes don't matter; scripts/export-photo-list.mjs lists the exact names)
 * 2. Run:  node scripts/import-product-photos.mjs ~/Desktop/photos
 * 3. Photos are shrunk to web size (900 px, JPEG) into public/product-images and registered in
 *    src/content/product-images.json. Then commit + deploy.
 *
 * Uses the built-in macOS `sips` tool. A photo for an item replaces any earlier one for that item.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fetchItems, isShopItem, root, slugify } from "./lib/books.mjs";

const dir = process.argv[2];
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: node scripts/import-product-photos.mjs <folder with photos named by SKU>");
  process.exit(1);
}

const items = (await fetchItems()).filter(isShopItem);
const bySku = new Map();
for (const i of items) {
  const key = slugify(i.sku || "", 100);
  if (i.sku) bySku.set(key, [...(bySku.get(key) ?? []), i]);
}

const outDir = path.join(root, "public/product-images");
const manifestPath = path.join(root, "src/content/product-images.json");
fs.mkdirSync(outDir, { recursive: true });
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

let added = 0;
const unmatched = [];
for (const file of fs.readdirSync(dir)) {
  if (!/\.(jpe?g|png|webp|heic|tiff?|gif)$/i.test(file)) continue;
  const key = slugify(path.parse(file).name, 100);
  const matches = bySku.get(key);
  if (!matches) { unmatched.push(file); continue; }
  if (matches.length > 1) console.warn(`  note: SKU "${matches[0].sku}" belongs to ${matches.length} products; photo applied to all of them`);
  for (const item of matches) {
    const dest = path.join(outDir, `${item.item_id}.jpg`);
    execFileSync("sips", ["-Z", "900", "-s", "format", "jpeg", "-s", "formatOptions", "78", path.join(dir, file), "--out", dest], { stdio: "ignore" });
    manifest[item.item_id] = `/product-images/${item.item_id}.jpg`;
    added++;
  }
}
fs.writeFileSync(manifestPath, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => (a < b ? -1 : 1))), null, 1) + "\n");
console.log(`Added/updated ${added} product photos.`);
if (unmatched.length) console.log(`No matching SKU for ${unmatched.length} file(s):\n  ` + unmatched.slice(0, 20).join("\n  ") + (unmatched.length > 20 ? "\n  ..." : ""));
