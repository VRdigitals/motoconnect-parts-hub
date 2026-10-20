/** Builds the WhatsApp order message and link. Runs in the browser; no data leaves the page until the customer taps send. */
import { formatMoney, shopConfig } from "./config";

export interface OrderLine {
  name: string;
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  qty: number;
  price: number;
}

export function buildOrderMessage(lines: OrderLine[], origin = ""): string {
  const parts: string[] = ["Hello Motoconnect, I would like to order the following:", ""];
  lines.forEach((l, i) => {
    parts.push(`${i + 1}. ${l.name}`);
    if (l.sku) parts.push(`   Part no: ${l.sku}`);
    parts.push(`   Qty: ${l.qty} x ${formatMoney(l.price)} = ${formatMoney(l.price * l.qty)}`);
    if (origin && l.slug) parts.push(`   ${origin}/shop/${l.slug}`);
    parts.push("");
  });
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const items = lines.reduce((n, l) => n + l.qty, 0);
  parts.push(`Total: ${formatMoney(total)} (${items} ${items === 1 ? "item" : "items"})`);
  parts.push("");
  parts.push("Name:");
  parts.push("Delivery location:");
  parts.push("");
  parts.push("Please confirm availability, final price and delivery. Thank you!");
  return parts.join("\n");
}

export function whatsappOrderUrl(lines: OrderLine[]): string {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(buildOrderMessage(lines, origin))}`;
}
