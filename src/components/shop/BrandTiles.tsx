import { brandLogo } from "@/lib/shop/brand-logos";

/** "Shop by brand" strip: logo tiles for brands we have a logo for, name tiles for the rest. */
export function BrandTiles({ brands, active, onToggle }: { brands: { name: string; count: number }[]; active: string[]; onToggle: (name: string) => void }) {
  const tiles = brands.filter((b) => b.name !== "Other" && (b.count > 0 || active.includes(b.name))).slice(0, 10);
  if (tiles.length === 0) return null;
  return (
    <section aria-label="Shop by brand" className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 lg:px-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em]">
          Shop by <span className="text-[#ff0000]">brand</span>
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {tiles.map((b) => {
            const logo = brandLogo(b.name);
            const on = active.includes(b.name);
            return (
              <button
                key={b.name}
                onClick={() => onToggle(b.name)}
                aria-pressed={on}
                className={`group flex h-24 w-36 shrink-0 flex-col items-center justify-center gap-1 border bg-white px-3 transition-all hover:-translate-y-0.5 hover:border-[#ff0000] md:w-40 ${on ? "border-[#ff0000] shadow-[inset_0_0_0_1px_#ff0000]" : "border-gray-200"}`}
              >
                {logo ? (
                  <img src={logo} alt={b.name} loading="lazy" className="h-14 w-full object-contain" />
                ) : (
                  <span className="text-center text-sm font-bold uppercase tracking-[0.12em] text-gray-600 group-hover:text-black">{b.name}</span>
                )}
                <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">{b.count.toLocaleString("en-AE")} items</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
