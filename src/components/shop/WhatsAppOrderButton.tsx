import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/shop/types";
import { whatsappOrderUrl } from "@/lib/shop/whatsapp";

/** Orders a single product straight away on WhatsApp (the cart does the same for many products). */
export function WhatsAppOrderButton({
  product,
  qty = 1,
  compact = false,
  className = "",
}: {
  product: Product;
  qty?: number;
  /** Icon-only, for tight spaces such as product cards. */
  compact?: boolean;
  className?: string;
}) {
  const soldOut = product.stock === 0;
  if (soldOut) return null;
  const open = () => {
    const url = whatsappOrderUrl([{ name: product.name, sku: product.sku, slug: product.slug, qty, price: product.price }]);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Order ${product.name} on WhatsApp`}
      title="Order on WhatsApp"
      className={`flex items-center justify-center gap-2 bg-[#25D366] text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#1da851] ${compact ? "w-11 shrink-0" : "px-4 py-3"} ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {!compact && "Order on WhatsApp"}
    </button>
  );
}
