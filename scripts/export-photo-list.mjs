/**
 * Creates a spreadsheet (CSV) of the shop products that still have NO photo, in-stock items first, so the team can
 * photograph them or request images from the brand. Each row shows the exact file name to use.
 *
 *   node scripts/export-photo-list.mjs [output.csv]
 */
import fs from "node:fs";
import path from "node:path";
import { brandOf, fetchItems, isShopItem, root, slugify } from "./lib/books.mjs";

const out = process.argv[2] ?? path.join(process.env.HOME ?? ".", "Downloads", "motoconnect-products-needing-photos.csv");
const have = JSON.parse(fs.readFileSync(path.join(root, "src/content/product-images.json"), "utf8"));
const items = (await fetchItems()).filter(isShopItem).filter((i) => !have[i.item_id]);

const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const rows = items
  .sort((a, b) => Number(b.stock_on_hand > 0) - Number(a.stock_on_hand > 0) || brandOf(a).localeCompare(brandOf(b)) || a.name.localeCompare(b.name))
  .map((i) => [i.sku || "", i.sku ? `${slugify(i.sku)}.jpg` : `${slugify(i.name)}.jpg`, i.name.replace(/\s+/g, " ").trim(), brandOf(i), i.stock_on_hand > 0 ? "In stock" : "Out of stock", i.rate].map(q).join(","));
fs.writeFileSync(out, ["SKU,Photo file name to use,Product name,Brand,Stock,Price (AED)", ...rows].join("\n") + "\n");
console.log(`${items.length} products without a photo -> ${out}`);
console.log(`  in stock: ${items.filter((i) => i.stock_on_hand > 0).length}`);
