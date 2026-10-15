/**
 * DEMO products, used only in development (or when SHOP_SAMPLE_DATA=true) while Zoho Books is not connected.
 * Photos are Pexels stock images, credited in /CREDITS.md.
 */
import { assignSlugs } from "./slug";
import type { Product } from "./types";
import brakeDisc from "../../assets/shop/brake-disc.jpg";
import chainSprocket from "../../assets/shop/chain-sprocket.jpg";
import tyre from "../../assets/shop/tyre.jpg";
import headlight from "../../assets/shop/headlight.jpg";
import sideMirror from "../../assets/shop/side-mirror.jpg";
import airFilter from "../../assets/shop/air-filter.jpg";
import engineOil from "../../assets/shop/engine-oil.jpg";
import rearWheel from "../../assets/shop/rear-wheel.jpg";

const raw: Omit<Product, "slug">[] = [
  { id: "demo-1", name: "Front Brake Disc & Caliper Kit", sku: "DEMO-BRK-001", price: 289, stock: 14, category: "Brakes", imageUrl: brakeDisc,
    description: "Demo product. Complete front brake disc and caliper kit.\nThis item is sample data and will be replaced by your Zoho Books products." },
  { id: "demo-2", name: "Heavy Duty Chain & Sprocket Kit", sku: "DEMO-TRN-002", price: 185, stock: 3, category: "Transmission", imageUrl: chainSprocket,
    description: "Demo product. Chain and sprocket set for everyday and heavy use." },
  { id: "demo-3", name: "Tubeless Motorcycle Tyre", sku: "DEMO-TYR-003", price: 210, stock: 22, category: "Tyres", imageUrl: tyre,
    description: "Demo product. Durable tubeless tyre." },
  { id: "demo-4", name: "Headlight Assembly", sku: "DEMO-LGT-004", price: 349, stock: 8, category: "Lighting", imageUrl: headlight,
    description: "Demo product. Complete headlight assembly." },
  { id: "demo-5", name: "Handlebar Side Mirror", sku: "DEMO-ACC-005", price: 45, stock: 40, category: "Accessories", imageUrl: sideMirror,
    description: "Demo product. Round handlebar side mirror." },
  { id: "demo-6", name: "Performance Air Filter", sku: "DEMO-FLT-006", price: 79, stock: 0, category: "Filters", imageUrl: airFilter,
    description: "Demo product (out of stock example). High-flow air filter element." },
  { id: "demo-7", name: "4T Engine Oil 1L", sku: "DEMO-OIL-007", price: 42, stock: 120, category: "Lubricants", imageUrl: engineOil,
    description: "Demo product. 4-stroke engine oil, 1 litre." },
  { id: "demo-8", name: "Rear Wheel Assembly", sku: "DEMO-WHL-008", price: 540, stock: 5, category: "Wheels", imageUrl: rearWheel,
    description: "Demo product. Rear wheel with disc brake assembly." },
];

export const sampleProducts: Product[] = assignSlugs(raw);
