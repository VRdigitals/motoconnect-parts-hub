import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Crown, Search } from "lucide-react";
import { getShopPageFn } from "@/lib/shop/shop.functions";
import type { ShopSort } from "@/lib/shop/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFooter, ShopHeader } from "@/components/shop/ShopHeader";

interface ShopSearch {
  q?: string | undefined;
  category?: string | undefined;
  sort?: ShopSort | undefined;
  page?: number | undefined;
  inStock?: boolean | undefined;
}

const SORTS: ShopSort[] = ["featured", "price-asc", "price-desc", "name"];

export const Route = createFileRoute("/shop/")({
  // Filters live in the URL so a filtered view can be shared or bookmarked.
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const q = typeof search["q"] === "string" && search["q"].trim() ? search["q"].trim().slice(0, 100) : undefined;
    const category = typeof search["category"] === "string" && search["category"] ? search["category"] : undefined;
    const sort = SORTS.includes(search["sort"] as ShopSort) && search["sort"] !== "featured" ? (search["sort"] as ShopSort) : undefined;
    const page = Number(search["page"]) > 1 ? Math.floor(Number(search["page"])) : undefined;
    const inStock = search["inStock"] === true || search["inStock"] === "true" ? true : undefined;
    return { ...(q && { q }), ...(category && { category }), ...(sort && { sort }), ...(page && { page }), ...(inStock && { inStock }) };
  },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getShopPageFn({ data: deps }),
  head: () => ({
    meta: [
      { title: "Shop | Motoconnect UAE" },
      { name: "description", content: "Shop genuine and aftermarket motorcycle spare parts online from Motoconnect, with secure card payment and delivery across the UAE." },
    ],
  }),
  component: ShopPage,
});

/** Compact page list like: 1 … 4 5 [6] 7 8 … 40 */
function pageNumbers(current: number, last: number): (number | "…")[] {
  const set = new Set([1, last, current - 1, current, current + 1].filter((n) => n >= 1 && n <= last));
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1]! > 1) out.push("…");
    out.push(n);
  });
  return out;
}

function ShopPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop/" });
  const [query, setQuery] = useState(search.q ?? "");
  const firstRender = useRef(true);

  const update = (next: Partial<ShopSearch>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, page: undefined, ...next }), replace: true, resetScroll: false });

  // Search as you type, after a short pause.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      if ((search.q ?? "") !== query.trim()) update({ q: query.trim() || undefined });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const goToPage = (page: number) => {
    navigate({ search: (prev: ShopSearch) => ({ ...prev, page: page > 1 ? page : undefined }), resetScroll: false });
    document.getElementById("shop-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = Boolean(search.q || search.category || search.inStock);

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

      {data.source === "sample" && (
        <div className="border-b border-[#ff0000]/30 bg-[#ff0000]/10 px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/90">
          Demo products. Your real catalogue appears here once Zoho Books is connected.
        </div>
      )}

      <section id="shop-results" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-12 sm:px-10 lg:px-16">
        {data.source === "none" || (data.total === 0 && !filtered) ? (
          <div className="mx-auto max-w-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="font-podium text-3xl italic uppercase">Shop opening soon</h2>
            <p className="mt-4 text-white/60">Our online shop is being set up. In the meantime, get in touch and we'll be happy to help with your order.</p>
            <Link to="/contact" className="mt-8 inline-block border border-[#ff0000] bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-transparent">
              Contact us
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  update({ q: query.trim() || undefined });
                }}
                className="relative w-full lg:max-w-md"
              >
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search parts, bike model or SKU"
                  aria-label="Search products"
                  className="w-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff0000]"
                />
              </form>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                  <input type="checkbox" checked={Boolean(search.inStock)} onChange={(e) => update({ inStock: e.target.checked || undefined })} className="h-4 w-4 accent-[#ff0000]" />
                  In stock only
                </label>
                <label className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Sort
                  <select
                    value={search.sort ?? "featured"}
                    onChange={(e) => update({ sort: e.target.value === "featured" ? undefined : (e.target.value as ShopSort) })}
                    className="border border-white/15 bg-black px-4 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#ff0000]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Name</option>
                  </select>
                </label>
              </div>
            </div>

            {data.categories.length > 1 && (
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Categories">
                <button
                  role="tab"
                  aria-selected={!search.category}
                  onClick={() => update({ category: undefined })}
                  className={`shrink-0 border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                    !search.category ? "border-[#ff0000] bg-[#ff0000] text-white" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  All
                </button>
                {data.categories.map((c) => (
                  <button
                    key={c.name}
                    role="tab"
                    aria-selected={search.category === c.name}
                    onClick={() => update({ category: c.name })}
                    className={`shrink-0 border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                      search.category === c.name ? "border-[#ff0000] bg-[#ff0000] text-white" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {c.name} <span className="ml-1 opacity-60">{c.count}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
              <span>
                {data.total.toLocaleString("en-AE")} {data.total === 1 ? "product" : "products"}
              </span>
              {filtered && (
                <button
                  onClick={() => {
                    setQuery("");
                    navigate({ search: {}, replace: true, resetScroll: false });
                  }}
                  className="text-[#ff0000] hover:text-white"
                >
                  Clear filters
                </button>
              )}
            </div>

            {data.products.length === 0 ? (
              <p className="mt-12 text-center text-white/50">No products match your search.</p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {data.pageCount > 1 && (
              <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
                <button
                  disabled={data.page <= 1}
                  onClick={() => goToPage(data.page - 1)}
                  aria-label="Previous page"
                  className="flex h-11 w-11 items-center justify-center border border-white/15 hover:border-[#ff0000] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {pageNumbers(data.page, data.pageCount).map((n, i) =>
                  n === "…" ? (
                    <span key={`gap-${i}`} className="px-1 text-white/30">…</span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => goToPage(n)}
                      aria-current={n === data.page ? "page" : undefined}
                      className={`h-11 min-w-11 border px-3 text-sm font-bold transition-all ${
                        n === data.page ? "border-[#ff0000] bg-[#ff0000]" : "border-white/15 text-white/70 hover:border-[#ff0000]"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  disabled={data.page >= data.pageCount}
                  onClick={() => goToPage(data.page + 1)}
                  aria-label="Next page"
                  className="flex h-11 w-11 items-center justify-center border border-white/15 hover:border-[#ff0000] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </section>

      <ShopFooter />
    </div>
  );
}
