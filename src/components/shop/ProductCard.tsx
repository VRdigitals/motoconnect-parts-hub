import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import { formatMoney, shopConfig } from "@/lib/shop/config";
import type { Product } from "@/lib/shop/types";
import { ProductImage } from "./ProductImage";

export function StockBadge({ stock }: { stock: number | null }) {
  if (stock === null) return null;
  if (stock === 0) return <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Out of stock</span>;
  if (stock <= shopConfig.lowStockThreshold)
    return <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff0000]">Only {stock} left</span>;
  return <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">In stock</span>;
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const soldOut = product.stock === 0;

  return (
    <article className="group flex flex-col border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff0000]">
      <Link to="/shop/$itemId" params={{ itemId: product.id }} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-white/5">
          <ProductImage src={product.imageUrl} alt={product.name} className={`transition-transform duration-700 group-hover:scale-105 ${soldOut ? "opacity-40 grayscale" : ""}`} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">{product.category}</p>
        <Link to="/shop/$itemId" params={{ itemId: product.id }} className="mt-2 line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug text-white hover:text-[#ff0000]">
          {product.name}
        </Link>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <span className="font-podium text-2xl italic tracking-tight text-white">{formatMoney(product.price)}</span>
          <StockBadge stock={product.stock} />
        </div>

        <button
          type="button"
          disabled={soldOut}
          onClick={() => add(product)}
          className="mt-5 flex items-center justify-center gap-2 border border-[#ff0000] bg-[#ff0000] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-white/30"
        >
          <ShoppingBag className="h-4 w-4" />
          {soldOut ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
