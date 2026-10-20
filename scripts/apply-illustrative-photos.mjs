/**
 * Gives items that have no photo a generic, clearly-labelled "Illustrative image" for part types that look
 * alike across bike models (brake pads, bearings, oil seals, ...). Never used where an item has a real photo.
 *
 *   node scripts/apply-illustrative-photos.mjs          # writes src/content/product-images-illustrative.json
 *   node scripts/apply-illustrative-photos.mjs --list   # also prints every matched item, for review
 *
 * Generic photos live in public/product-images/illustrative/<type>.jpg
 */
import fs from "node:fs";
import path from "node:path";
import { fetchItems, isShopItem, root } from "./lib/books.mjs";

const rules = [
  { type: "disc_pad", re: /\b(BRAKE|DISC|DISK)\s+PAD\b/, not: /SHOE|\bKIT\b|PIN/ },
  { type: "cam_chain", re: /\bCAM\s+CHAIN\b|\bCHAIN\s+CAM\b/, not: /TENSION|GUIDE|SPROCKET|ADJUST|LIFTER/ },
  { type: "bearing", re: /\b(BALL\s+)?(BEARING|BRG)\b/, not: /\bKIT\b|NEEDLE|CLUTCH|HEAD|TAPER|CUP|CONROD|STRUT|\bNS\b|SET\b.*\bRACE/ },
  { type: "oil_seal", re: /\bOIL\s+SEAL\b/, not: /^$/ },
  { type: "air_filter", re: /\bAIR\s+FILTER\b|\bELEMENT\s+(COMP\s+)?AIR\b|\bFILTER\s+AIR\b/, not: /\bKIT\b|HOUSING|CASE|BOX|DUCT/ },
  { type: "lever", re: /\b(CLUTCH|BRAKE)\s+LEVER\b|\bLEVER\s+(CLUTCH|BRAKE)\b/, not: /HOLDER|KIT|SHAFT|ARM|GUARD/ },
  { type: "clutch_assy", re: /\bCLUTCH\s+ASS(Y|EMBLY|EMBLIES)\b/, not: /INNER\s+NUT|COVER|CABLE/ },
];
const skipBrands = /nissan|ceat|mrf/i;

const real = JSON.parse(fs.readFileSync(path.join(root, "src/content/product-images.json"), "utf8"));
const items = (await fetchItems()).filter(isShopItem);
const out = {};
const list = [];
for (const i of items) {
  if (real[i.item_id] || i.image_document_id || i.image_name) continue;
  if (skipBrands.test(String(i.brand ?? ""))) continue;
  const name = i.name.toUpperCase();
  const r = rules.find((x) => x.re.test(name) && !x.not.test(name));
  if (!r) continue;
  out[i.item_id] = `/product-images/illustrative/${r.type}.jpg`;
  list.push(`${r.type.padEnd(12)} ${String(i.sku ?? "").padEnd(18)} ${i.name}`);
}
fs.writeFileSync(path.join(root, "src/content/product-images-illustrative.json"), JSON.stringify(out, null, 1) + "\n");
console.log(`${Object.keys(out).length} items get an illustrative image`);
if (process.argv.includes("--list")) console.log(list.sort().join("\n"));
