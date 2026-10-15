import { useState } from "react";
import { Package } from "lucide-react";
import { brandLogo } from "@/lib/shop/brand-logos";

/**
 * Product photo. When the item has no photo yet (or it fails to load) a neutral placeholder is shown:
 * the brand's logo or name where known, so a page of un-photographed parts still looks intentional.
 */
export function ProductImage({
  src,
  alt,
  fit = "contain",
  brand,
  caption = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  fit?: "contain" | "cover";
  brand?: string | undefined;
  /** Show the "Photo coming soon" line (only where there is room for it). */
  caption?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const logo = brand ? brandLogo(brand) : null;
    const named = brand && brand !== "Other" ? brand : null;
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-50 px-4 text-gray-300 ${className}`} role="img" aria-label={alt}>
        {logo ? (
          <img src={logo} alt="" loading="lazy" className="max-h-[45%] w-3/4 object-contain opacity-80 mix-blend-multiply" />
        ) : named ? (
          <span className="text-center text-sm font-bold uppercase tracking-[0.15em] text-gray-300">{named}</span>
        ) : (
          <Package className="h-10 w-10" strokeWidth={1.25} />
        )}
        {caption && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">Photo coming soon</span>}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
    />
  );
}
