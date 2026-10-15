import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, ShoppingBag, FileText } from "lucide-react";
import { getProductFn, getShopPageFn } from "@/lib/shop/shop.functions";
import { useCart } from "@/lib/shop/cart";
import { formatMoney, shopConfig } from "@/lib/shop/config";
import { StoreLayout } from "@/components/shop/StoreLayout";
import { ProductImage } from "@/components/shop/ProductImage";
import { ProductCard, StockBadge } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/shop/$itemId")({
  loader: async ({ params }) => {
    const { product } = await getProductFn({ data: { id: params.itemId } });
    if (!product) throw notFound();
    // A few more items from the same brand, for the "More from" row.
    const more = await getShopPageFn({ data: { brand: product.category, stock: "in" } }).catch(() => null);
    return { product, related: (more?.products ?? []).filter((p) => p.id !== product.id).slice(0, 4) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} | Motoconnect Shop` },
      { name: "description", content: (loaderData?.product.description ?? `Buy ${loaderData?.product.name ?? "motorcycle spare parts"} online from Motoconnect.`).slice(0, 160) },
    ],
  }),
  notFoundComponent: () => (
    <StoreLayout>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-podium text-5xl italic uppercase">Product not found</h1>
        <p className="mt-4 text-gray-500">This product may no longer be available.</p>
        <Link to="/shop" className="mt-8 inline-block bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:bg-black">
          Back to shop
        </Link>
      </div>
    </StoreLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const soldOut = product.stock === 0;
  const max = Math.min(product.stock ?? shopConfig.maxQtyPerLine, shopConfig.maxQtyPerLine);
  const fit = product.imageUrl?.startsWith("/api/") ? "contain" : "cover";

  return (
    <StoreLayout>
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <a href="/" className="hover:text-black">Home</a> <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-black">Shop</Link> <span className="mx-2">/</span>
          <Link to="/shop" search={{ brand: product.category }} className="hover:text-black">{product.category}</Link>
        </nav>

        <div className="grid gap-8 border border-gray-200 bg-white p-4 md:grid-cols-2 md:p-8 lg:gap-14">
          <div className="aspect-square w-full overflow-hidden border border-gray-100 bg-white">
            <ProductImage src={product.imageUrl} alt={product.name} fit={fit} brand={product.category} caption className={`${fit === "contain" ? "p-6" : ""} ${soldOut ? "opacity-40 grayscale" : ""}`} />
          </div>

          <div className="flex flex-col">
            <Link to="/shop" search={{ brand: product.category }} className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff0000] hover:text-black">
              {product.category}
            </Link>
            <h1 className="mt-3 font-podium text-3xl italic uppercase leading-[1] tracking-tight md:text-4xl">{product.name}</h1>
            {product.sku && <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gray-400">SKU {product.sku}</p>}

            <div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-gray-100 py-5">
              <span className="font-podium text-4xl italic tracking-tight">{formatMoney(product.price)}</span>
              <StockBadge stock={product.stock} />
              <span className="w-full text-xs text-gray-500">{shopConfig.pricesIncludeVat ? `Includes ${shopConfig.vatRate * 100}% VAT` : `${shopConfig.vatRate * 100}% VAT added at payment`}</span>
            </div>

            {product.description && <p className="mt-6 whitespace-pre-line leading-relaxed text-gray-600">{product.description}</p>}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {!soldOut && (
                <div className="flex items-center border border-gray-300">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(max, q + 1))} className="flex h-12 w-12 items-center justify-center hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
                </div>
              )}
              <button
                disabled={soldOut}
                onClick={() => add(product, qty)}
                className="flex h-12 flex-1 items-center justify-center gap-2 bg-[#ff0000] px-8 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:flex-none"
              >
                <ShoppingBag className="h-4 w-4" />
                {soldOut ? "Out of stock" : "Add to cart"}
              </button>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#ff0000]" /> Secure card payment by Stripe</li>
              <li className="flex items-center gap-3"><FileText className="h-5 w-5 text-[#ff0000]" /> Tax invoice emailed automatically</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.25em]">
              More from <span className="text-[#ff0000]">{product.category}</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </StoreLayout>
  );
}
