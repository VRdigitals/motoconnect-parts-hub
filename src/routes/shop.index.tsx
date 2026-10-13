import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Search } from "lucide-react";
import { getCatalogFn } from "@/lib/shop/shop.functions";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFooter, ShopHeader } from "@/components/shop/ShopHeader";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop | Motoconnect UAE" },
      { name: "description", content: "Shop genuine and aftermarket motorcycle spare parts online from Motoconnect, with secure card payment and delivery across the UAE." },
    ],
  }),
  loader: () => getCatalogFn(),
  component: ShopPage,
});

type Sort = "featured" | "price-asc" | "price-desc" | "name";

function ShopPage() {
  const catalog = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<Sort>("featured");

  const categories = useMemo(() => ["All", ...Array.from(new Set(catalog.products.map((p) => p.category))).sort()], [catalog.products]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = catalog.products.filter(
      (p) => (category === "All" || p.category === category) && (!q || p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)),
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [catalog.products, query, category, sort]);

  return (
    <div className="min-h-screen bg-black font-raleway text-white selection:bg-white selection:text-black">
      <ShopHeader />

      <section className="relative overflow-hidden border-b border-white/5 pb-14 pt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/10 via-transparent to-black" />
        <div className="relative mx-auto max-w-7xl px-6 text-center sm:px-10 md:text-left lg:px-16">
          <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
            <Crown className="h-5 w-5 text-[#ff0000]" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#ff0000]">Online Shop</span>
          </div>
          <h1 className="font-podium text-[clamp(2.5rem,7vw,5.5rem)] italic uppercase leading-[0.9] tracking-tighter">
            SHOP SPARE <span className="text-[#ff0000]">PARTS.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60 md:mx-0">
            Order online with secure card payment. An invoice is emailed to you automatically.
          </p>
        </div>
      </section>

      {catalog.source === "sample" && (
        <div className="border-b border-[#ff0000]/30 bg-[#ff0000]/10 px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/90">
          Demo products. Your real catalogue appears here once Zoho Books is connected.
        </div>
      )}

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        {catalog.products.length === 0 ? (
          <div className="mx-auto max-w-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="font-podium text-3xl italic uppercase">Shop opening soon</h2>
            <p className="mt-4 text-white/60">Our online shop is being set up. In the meantime, get in touch and we'll be happy to help with your order.</p>
            <Link to="/contact" className="mt-8 inline-block border border-[#ff0000] bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-transparent">
              Contact us
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search parts or SKU"
                  aria-label="Search products"
                  className="w-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff0000]"
                />
              </div>
              <label className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="border border-white/15 bg-black px-4 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#ff0000]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Categories">
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                    category === c ? "border-[#ff0000] bg-[#ff0000] text-white" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/40">
              {visible.length} {visible.length === 1 ? "product" : "products"}
            </p>

            {visible.length === 0 ? (
              <p className="mt-10 text-center text-white/50">No products match your search.</p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <ShopFooter />
    </div>
  );
}
