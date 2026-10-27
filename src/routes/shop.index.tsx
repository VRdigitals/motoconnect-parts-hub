import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Columns3, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { getShopPageFn } from "@/lib/shop/shop.functions";
import type { ShopSort, ShopStock } from "@/lib/shop/types";
import { formatMoney } from "@/lib/shop/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StoreLayout } from "@/components/shop/StoreLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { BrandTiles } from "@/components/shop/BrandTiles";

type View = "g4" | "g3" | "list";

interface ShopSearch {
  q?: string | undefined;
  brand?: string | undefined;
  min?: number | undefined;
  max?: number | undefined;
  stock?: ShopStock | undefined;
  top?: boolean | undefined;
  sort?: ShopSort | undefined;
  page?: number | undefined;
  size?: number | undefined;
  view?: View | undefined;
}

const SORTS: ShopSort[] = ["featured", "price-asc", "price-desc", "name"];
const SIZES = [24, 48, 96];
const VIEWS: View[] = ["g4", "g3", "list"];

const positive = (v: unknown) => (v !== undefined && v !== "" && Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : undefined);

export const Route = createFileRoute("/shop/")({
  // Filters live in the URL so a filtered view can be shared or bookmarked.
  validateSearch: (s: Record<string, unknown>): ShopSearch => {
    const q = typeof s["q"] === "string" && s["q"].trim() ? s["q"].trim().slice(0, 100) : undefined;
    const brand = typeof s["brand"] === "string" && s["brand"] ? s["brand"].slice(0, 400) : undefined;
    const min = positive(s["min"]);
    const max = positive(s["max"]);
    const stock = s["stock"] === "in" || s["stock"] === "out" ? (s["stock"] as ShopStock) : undefined;
    const top = s["top"] === true || s["top"] === "true" || s["top"] === 1 || s["top"] === "1" ? true : undefined;
    const sort = SORTS.includes(s["sort"] as ShopSort) && s["sort"] !== "featured" ? (s["sort"] as ShopSort) : undefined;
    const page = Number(s["page"]) > 1 ? Math.floor(Number(s["page"])) : undefined;
    const size = SIZES.includes(Number(s["size"])) && Number(s["size"]) !== 24 ? Number(s["size"]) : undefined;
    const view = VIEWS.includes(s["view"] as View) && s["view"] !== "g4" ? (s["view"] as View) : undefined;
    return {
      ...(q && { q }),
      ...(brand && { brand }),
      ...(min !== undefined && { min }),
      ...(max !== undefined && { max }),
      ...(stock && { stock }),
      ...(top && { top }),
      ...(sort && { sort }),
      ...(page && { page }),
      ...(size && { size }),
      ...(view && { view }),
    };
  },
  // The grid layout is purely visual, so changing it must not re-fetch products.
  loaderDeps: ({ search }) => {
    const { view: _view, ...rest } = search;
    return rest;
  },
  loader: ({ deps }) => getShopPageFn({ data: deps }),
  head: () => ({
    meta: [
      { title: "Shop | Motoconnect UAE" },
      { name: "description", content: "Shop motorcycle spare parts online from Motoconnect: search by part, bike model or brand, add to your cart and send your order on WhatsApp." },
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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const view: View = search.view ?? "g4";
  const activeBrands = (search.brand ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const filtered = Boolean(search.q || activeBrands.length || search.min !== undefined || search.max !== undefined || search.stock || search.top);

  const update = (next: Partial<ShopSearch>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, page: undefined, ...next }), resetScroll: false });
  const setBrands = (brands: string[]) => update({ brand: brands.length ? brands.join(",") : undefined });
  const clearAll = () => navigate({ search: (prev: ShopSearch) => ({ ...(prev.view ? { view: prev.view } : {}) }), resetScroll: false });

  const goToPage = (page: number) => {
    navigate({ search: (prev: ShopSearch) => ({ ...prev, page: page > 1 ? page : undefined }), resetScroll: false });
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Close the mobile filter drawer when results change (e.g. after tapping a filter).
  useEffect(() => setFiltersOpen(false), [data.total, data.page]);

  const gridClass =
    view === "list"
      ? "grid grid-cols-1 gap-3"
      : view === "g3"
        ? "grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3"
        : "grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 xl:grid-cols-4";

  const filterPanel = (
    <FilterPanel
      data={data}
      active={{ brands: activeBrands, min: search.min, max: search.max, stock: search.stock, top: search.top }}
      onBrands={setBrands}
      onPrice={(min, max) => update({ min, max })}
      onStock={(stock) => update({ stock })}
      onTop={(top) => update({ top: top ? true : undefined })}
      onClear={clearAll}
    />
  );

  const chips: { label: string; remove: () => void }[] = [
    ...(search.q ? [{ label: `Search: ${search.q}`, remove: () => update({ q: undefined }) }] : []),
    ...activeBrands.map((b) => ({ label: b, remove: () => setBrands(activeBrands.filter((x) => x !== b)) })),
    ...(search.min !== undefined || search.max !== undefined
      ? [{ label: `${search.min !== undefined ? formatMoney(search.min) : "AED 0"} to ${search.max !== undefined ? formatMoney(search.max) : "any"}`, remove: () => update({ min: undefined, max: undefined }) }]
      : []),
    ...(search.top ? [{ label: "Top 25 products", remove: () => update({ top: undefined }) }] : []),
    ...(search.stock ? [{ label: search.stock === "in" ? "In stock" : "Out of stock", remove: () => update({ stock: undefined }) }] : []),
  ];

  const empty = data.source === "none" || (data.total === 0 && !filtered);

  return (
    <StoreLayout initialSearch={search.q ?? ""}>
      {/* Breadcrumb + title */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/15 via-transparent to-black" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/50">
            <a href="/" className="hover:text-white">Home</a> <span className="mx-2">/</span> <span className="text-white">Shop</span>
          </nav>
          <h1 className="font-podium text-[clamp(2.25rem,6vw,4.5rem)] italic uppercase leading-[0.9] tracking-tighter">
            SHOP SPARE <span className="text-[#ff0000]">PARTS.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">Search by part, bike model or brand. Add what you need to your cart and send the order to us on WhatsApp.</p>
        </div>
      </section>

      {data.source === "sample" && (
        <div className="border-b border-[#ff0000]/30 bg-[#ff0000]/10 px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-black">
          Demo products. Your real catalogue appears here once Zoho Books is connected.
        </div>
      )}

      {empty ? (
        <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 lg:px-10">
          <div className="mx-auto max-w-xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="font-podium text-3xl italic uppercase">Shop opening soon</h2>
            <p className="mt-4 text-gray-500">Our online shop is being set up. In the meantime, get in touch and we'll be happy to help with your order.</p>
            <Link to="/contact" className="mt-8 inline-block bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:bg-black">
              Contact us
            </Link>
          </div>
        </section>
      ) : (
        <>
          <BrandTiles
            brands={data.brands}
            active={activeBrands}
            onToggle={(name) => setBrands(activeBrands.includes(name) ? activeBrands.filter((b) => b !== name) : [...activeBrands, name])}
          />

          <div ref={topRef} className="mx-auto grid max-w-[1400px] scroll-mt-32 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-10">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto border border-gray-200 bg-white p-6">{filterPanel}</div>
            </aside>

            <div className="min-w-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center gap-4">
                  <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 border border-black px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </button>
                  <p className="text-sm text-gray-500">
                    {data.total === 0 ? "No products" : (<>Showing <b className="text-black">{data.from.toLocaleString("en-AE")}-{data.to.toLocaleString("en-AE")}</b> of <b className="text-black">{data.total.toLocaleString("en-AE")}</b></>)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="hidden items-center sm:flex" role="group" aria-label="Layout">
                    {([["g4", LayoutGrid, "4 columns"], ["g3", Columns3, "3 columns"], ["list", List, "List"]] as const).map(([v, Icon, label]) => (
                      <button
                        key={v}
                        onClick={() => navigate({ search: (prev: ShopSearch) => ({ ...prev, view: v === "g4" ? undefined : v }), resetScroll: false })}
                        aria-label={label}
                        aria-pressed={view === v}
                        className={`flex h-9 w-9 items-center justify-center border ${view === v ? "border-[#ff0000] bg-[#ff0000] text-white" : "border-gray-200 text-gray-500 hover:border-black"}`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 text-xs text-gray-500">
                    Show
                    <select value={data.pageSize} onChange={(e) => update({ size: Number(e.target.value) === 24 ? undefined : Number(e.target.value) })} className="h-9 border border-gray-200 bg-white px-2 text-sm text-black outline-none focus:border-[#ff0000]">
                      {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-gray-500">
                    Sort
                    <select value={search.sort ?? "featured"} onChange={(e) => update({ sort: e.target.value === "featured" ? undefined : (e.target.value as ShopSort) })} className="h-9 border border-gray-200 bg-white px-2 text-sm text-black outline-none focus:border-[#ff0000]">
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: low to high</option>
                      <option value="price-desc">Price: high to low</option>
                      <option value="name">Name</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Active filters */}
              {chips.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {chips.map((c) => (
                    <button key={c.label} onClick={c.remove} className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-1.5 text-xs hover:border-[#ff0000]">
                      {c.label} <X className="h-3 w-3" />
                    </button>
                  ))}
                  <button onClick={clearAll} className="px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff0000] hover:text-black">Clear all</button>
                </div>
              )}

              {/* Products */}
              {data.products.length === 0 ? (
                <div className="mt-6 border border-gray-200 bg-white p-12 text-center">
                  <p className="font-podium text-2xl italic uppercase">No products found</p>
                  <p className="mt-2 text-sm text-gray-500">Try a different search or remove some filters.</p>
                  <button onClick={clearAll} className="mt-6 bg-black px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#ff0000]">Clear all filters</button>
                </div>
              ) : (
                <div className={`mt-4 ${gridClass}`}>
                  {data.products.map((p) => (
                    <ProductCard key={p.id} product={p} layout={view === "list" ? "list" : "grid"} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {data.pageCount > 1 && (
                <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  <button disabled={data.page <= 1} onClick={() => goToPage(data.page - 1)} aria-label="Previous page" className="flex h-10 w-10 items-center justify-center border border-gray-300 bg-white hover:border-[#ff0000] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-300">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {pageNumbers(data.page, data.pageCount).map((n, i) =>
                    n === "…" ? (
                      <span key={`gap-${i}`} className="px-1 text-gray-400">…</span>
                    ) : (
                      <button key={n} onClick={() => goToPage(n)} aria-current={n === data.page ? "page" : undefined} className={`h-10 min-w-10 border px-3 text-sm font-bold ${n === data.page ? "border-[#ff0000] bg-[#ff0000] text-white" : "border-gray-300 bg-white hover:border-[#ff0000]"}`}>
                        {n}
                      </button>
                    ),
                  )}
                  <button disabled={data.page >= data.pageCount} onClick={() => goToPage(data.page + 1)} aria-label="Next page" className="flex h-10 w-10 items-center justify-center border border-gray-300 bg-white hover:border-[#ff0000] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-300">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </div>
          </div>

          {/* Filters (mobile drawer) */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto border-r border-gray-200 bg-white p-0 text-black">
              <SheetHeader className="border-b border-gray-200 p-5 text-left">
                <SheetTitle className="font-podium text-2xl italic uppercase tracking-tight text-black">
                  Filter <span className="text-[#ff0000]">products</span>
                </SheetTitle>
              </SheetHeader>
              <div className="p-5">{filterPanel}</div>
              <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4">
                <button onClick={() => setFiltersOpen(false)} className="w-full bg-[#ff0000] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-black">
                  Show {data.total.toLocaleString("en-AE")} products
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </StoreLayout>
  );
}
