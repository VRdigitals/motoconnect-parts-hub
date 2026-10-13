import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { getProductFn } from "@/lib/shop/shop.functions";
import { useCart } from "@/lib/shop/cart";
import { formatMoney, shopConfig } from "@/lib/shop/config";
import { ProductImage } from "@/components/shop/ProductImage";
import { StockBadge } from "@/components/shop/ProductCard";
import { ShopFooter, ShopHeader } from "@/components/shop/ShopHeader";

export const Route = createFileRoute("/shop/$itemId")({
  loader: async ({ params }) => {
    const { product } = await getProductFn({ data: { id: params.itemId } });
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} | Motoconnect Shop` },
      { name: "description", content: (loaderData?.description ?? "Shop motorcycle spare parts online from Motoconnect.").slice(0, 160) },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center font-raleway text-white">
      <h1 className="font-podium text-5xl italic uppercase">Product not found</h1>
      <Link to="/shop" className="mt-8 border border-[#ff0000] bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-transparent">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const soldOut = product.stock === 0;
  const max = Math.min(product.stock ?? shopConfig.maxQtyPerLine, shopConfig.maxQtyPerLine);

  return (
    <div className="min-h-screen bg-black font-raleway text-white selection:bg-white selection:text-black">
      <ShopHeader />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:px-10 lg:px-16">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-[#ff0000]">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-16">
          <div className="aspect-square w-full overflow-hidden border border-white/10 bg-white/5">
            <ProductImage src={product.imageUrl} alt={product.name} className={soldOut ? "opacity-40 grayscale" : ""} />
          </div>

          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff0000]">{product.category}</p>
            <h1 className="mt-3 font-podium text-4xl italic uppercase leading-[0.95] tracking-tight md:text-5xl">{product.name}</h1>
            {product.sku && <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">SKU {product.sku}</p>}

            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-podium text-4xl italic tracking-tight">{formatMoney(product.price)}</span>
              <StockBadge stock={product.stock} />
            </div>
            <p className="mt-1 text-xs text-white/40">
              {shopConfig.pricesIncludeVat ? `Includes ${shopConfig.vatRate * 100}% VAT` : `${shopConfig.vatRate * 100}% VAT added at payment`}
            </p>

            {product.description && <p className="mt-8 whitespace-pre-line leading-relaxed text-white/60">{product.description}</p>}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {!soldOut && (
                <div className="flex items-center border border-white/15">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center hover:bg-white/10">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(max, q + 1))} className="flex h-12 w-12 items-center justify-center hover:bg-white/10">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              <button
                disabled={soldOut}
                onClick={() => add(product, qty)}
                className="flex flex-1 items-center justify-center gap-2 border border-[#ff0000] bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-all hover:bg-transparent disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-white/30 sm:flex-none"
              >
                <ShoppingBag className="h-4 w-4" />
                {soldOut ? "Out of stock" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <ShopFooter />
    </div>
  );
}
