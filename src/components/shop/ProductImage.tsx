import { useState } from "react";
import { Package } from "lucide-react";

export function ProductImage({ src, alt, className = "" }: { src: string | null; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-white/5 text-white/20 ${className}`} aria-label={alt}>
        <Package className="h-12 w-12" strokeWidth={1.25} />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`h-full w-full object-cover ${className}`} />;
}
