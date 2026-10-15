import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import { formatMoney, shopConfig } from "@/lib/shop/config";
import type { Product } from "@/lib/shop/types";
import { ProductImage, photoFit } from "./ProductImage";

export function StockBadge({ stock }: { stock: number | null }) {
  if (stock === null) return null;
  if (stock === 0) return <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">Out of stock</span>;
  if (stock <= shopConfig.lowStockThreshold) return <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff0000]">Only {stock} left</span>;
  return <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600">In stock</span>;
}

const fitFor = (p: Product) => photoFit(p.imageUrl);

function AddButton({ product, className = "" }: { product: Product; className?: string }) {
  const { add } = useCart();
  const soldOut = product.stock === 0;
  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => add(product)}
      className={`flex items-center justify-center gap-2 bg-[#ff0000] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {soldOut ? "Out of stock" : "Add to cart"}
    </button>
  );
}

export function ProductCard({ product, layout = "grid" }: { product: Product; layout?: "grid" | "list" }) {
  const soldOut = product.stock === 0;
  const image = (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="block h-full w-full" aria-label={product.name}>
      <ProductImage src={product.imageUrl} alt={product.name} fit={fitFor(product)} brand={product.category} caption={layout !== "list"} className={`${fitFor(product) === "contain" ? "p-3" : ""} transition-transform duration-500 group-hover:scale-105 ${soldOut ? "opacity-40 grayscale" : ""}`} />
    </Link>
  );
  const title = (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="line-clamp-2 font-semibold leading-snug text-black hover:text-[#ff0000]">
      {product.name}
    </Link>
  );

  if (layout === "list") {
    return (
      <article className="group flex flex-col gap-4 border border-gray-200 bg-white p-4 transition-colors hover:border-[#ff0000] sm:flex-row sm:items-center">
        <div className="aspect-square w-full shrink-0 overflow-hidden border border-gray-100 sm:w-36">{image}</div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">{product.category}</p>
          <div className="mt-1 text-base">{title}</div>
          {product.sku && <p className="mt-1 text-xs text-gray-400">SKU {product.sku}</p>}
          <div className="mt-2"><StockBadge stock={product.stock} /></div>
        </div>
        <div className="flex shrink-0 items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-3">
          <span className="font-podium text-2xl italic tracking-tight">{formatMoney(product.price)}</span>
          <AddButton product={product} />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ff0000] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2)]">
      <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100">{image}</div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">{product.category}</p>
        <div className="mt-1.5 min-h-[2.75rem] text-sm">{title}</div>
        {product.sku && <p className="mt-1 truncate text-[11px] text-gray-400">SKU {product.sku}</p>}
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="font-podium text-2xl italic tracking-tight">{formatMoney(product.price)}</span>
          <StockBadge stock={product.stock} />
        </div>
        <AddButton product={product} className="mt-4" />
      </div>
    </article>
  );
}
