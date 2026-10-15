import { useState } from "react";
import { Check, Search } from "lucide-react";
import type { ShopPage, ShopStock } from "@/lib/shop/types";

export interface ActiveFilters {
  brands: string[];
  min?: number | undefined;
  max?: number | undefined;
  stock?: ShopStock | undefined;
}

interface Props {
  data: ShopPage;
  active: ActiveFilters;
  onBrands: (brands: string[]) => void;
  onPrice: (min?: number, max?: number) => void;
  onStock: (stock?: ShopStock) => void;
  onClear: () => void;
}

const PRESETS: { label: string; min?: number; max?: number }[] = [
  { label: "Under AED 50", max: 50 },
  { label: "AED 50 to 100", min: 50, max: 100 },
  { label: "AED 100 to 250", min: 100, max: 250 },
  { label: "AED 250 to 500", min: 250, max: 500 },
  { label: "AED 500 and over", min: 500 },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-gray-200 pb-6 pt-6 first:pt-0 last:border-b-0">
      <h3 className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]">
        <span className="h-0.5 w-5 bg-[#ff0000]" /> {title}
      </h3>
      {children}
    </section>
  );
}

function Box({ checked }: { checked: boolean }) {
  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center border ${checked ? "border-[#ff0000] bg-[#ff0000]" : "border-gray-300 bg-white"}`}>
      {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </span>
  );
}

export function FilterPanel({ data, active, onBrands, onPrice, onStock, onClear }: Props) {
  const [brandQuery, setBrandQuery] = useState("");
  const [min, setMin] = useState(active.min?.toString() ?? "");
  const [max, setMax] = useState(active.max?.toString() ?? "");

  const visibleBrands = data.brands.filter((b) => b.name.toLowerCase().includes(brandQuery.trim().toLowerCase()));
  const toggleBrand = (name: string) => onBrands(active.brands.includes(name) ? active.brands.filter((b) => b !== name) : [...active.brands, name]);
  const anyActive = active.brands.length > 0 || active.min !== undefined || active.max !== undefined || active.stock !== undefined;
  const num = (v: string) => (v.trim() === "" || Number.isNaN(Number(v)) ? undefined : Math.max(0, Number(v)));

  return (
    <div>
      {anyActive && (
        <button onClick={onClear} className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff0000] hover:text-black">
          Clear all filters
        </button>
      )}

      <Section title="Brands">
        {data.brands.length > 8 && (
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              placeholder="Find a brand"
              aria-label="Find a brand"
              className="h-9 w-full border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#ff0000]"
            />
          </div>
        )}
        <ul className="max-h-72 space-y-1 overflow-y-auto pr-1">
          {visibleBrands.map((b) => {
            const checked = active.brands.includes(b.name);
            return (
              <li key={b.name}>
                <button onClick={() => toggleBrand(b.name)} aria-pressed={checked} className="flex w-full items-center gap-3 py-1.5 text-left text-sm hover:text-[#ff0000]">
                  <Box checked={checked} />
                  <span className="flex-1 truncate">{b.name}</span>
                  <span className="text-xs text-gray-400">{b.count.toLocaleString("en-AE")}</span>
                </button>
              </li>
            );
          })}
          {visibleBrands.length === 0 && <li className="py-2 text-sm text-gray-400">No brands found.</li>}
        </ul>
      </Section>

      <Section title="Price (AED)">
        <ul className="space-y-1">
          {PRESETS.map((p) => {
            const checked = active.min === p.min && active.max === p.max;
            return (
              <li key={p.label}>
                <button
                  onClick={() => {
                    setMin(p.min?.toString() ?? "");
                    setMax(p.max?.toString() ?? "");
                    onPrice(checked ? undefined : p.min, checked ? undefined : p.max);
                  }}
                  aria-pressed={checked}
                  className="flex w-full items-center gap-3 py-1.5 text-left text-sm hover:text-[#ff0000]"
                >
                  <Box checked={checked} /> {p.label}
                </button>
              </li>
            );
          })}
        </ul>
        <form
          className="mt-4 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onPrice(num(min), num(max));
          }}
        >
          <input value={min} onChange={(e) => setMin(e.target.value)} inputMode="decimal" placeholder="Min" aria-label="Minimum price" className="h-9 w-full min-w-0 border border-gray-200 bg-white px-2 text-sm outline-none focus:border-[#ff0000]" />
          <span className="text-gray-400">-</span>
          <input value={max} onChange={(e) => setMax(e.target.value)} inputMode="decimal" placeholder="Max" aria-label="Maximum price" className="h-9 w-full min-w-0 border border-gray-200 bg-white px-2 text-sm outline-none focus:border-[#ff0000]" />
          <button type="submit" className="h-9 shrink-0 bg-black px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-[#ff0000]">Apply</button>
        </form>
      </Section>

      <Section title="Availability">
        <ul className="space-y-1">
          {([
            ["in", "In stock", data.stock.in],
            ["out", "Out of stock", data.stock.out],
          ] as const).map(([key, label, count]) => (
            <li key={key}>
              <button onClick={() => onStock(active.stock === key ? undefined : key)} aria-pressed={active.stock === key} className="flex w-full items-center gap-3 py-1.5 text-left text-sm hover:text-[#ff0000]">
                <Box checked={active.stock === key} />
                <span className="flex-1">{label}</span>
                <span className="text-xs text-gray-400">{count.toLocaleString("en-AE")}</span>
              </button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
