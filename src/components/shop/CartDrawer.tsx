import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/shop/cart";
import { formatMoney, shopConfig } from "@/lib/shop/config";
import { createCheckoutFn } from "@/lib/shop/shop.functions";
import { ProductImage } from "./ProductImage";

export function CartDrawer() {
  const { lines, count, subtotal, open, setOpen, setQty, remove } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const result = await createCheckoutFn({ data: { lines: lines.map((l) => ({ id: l.id, qty: l.qty })) } });
      if (result.ok) {
        window.location.href = result.url;
        return;
      }
      setError(result.message);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setBusy(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col border-l border-gray-200 bg-white p-0 text-black sm:max-w-md">
        <SheetHeader className="border-b border-gray-200 p-6 text-left">
          <SheetTitle className="font-podium text-2xl italic uppercase tracking-tight text-black">
            Your <span className="text-[#ff0000]">Cart</span> ({count})
          </SheetTitle>
          <SheetDescription className="text-gray-500">Review your items before paying securely online.</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center text-gray-500">
            <ShoppingBag className="h-12 w-12 text-gray-300" strokeWidth={1.25} />
            <p>Your cart is empty.</p>
            <button onClick={() => setOpen(false)} className="border border-black px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <div className="h-20 w-20 shrink-0 overflow-hidden border border-gray-200">
                    <ProductImage src={line.imageUrl} alt={line.name} fit={line.imageUrl?.startsWith("/api/") ? "contain" : "cover"} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug">{line.name}</p>
                    <p className="mt-1 text-sm text-gray-500">{formatMoney(line.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-gray-300">
                        <button aria-label="Decrease quantity" onClick={() => (line.qty > 1 ? setQty(line.id, line.qty - 1) : remove(line.id))} className="flex h-8 w-8 items-center justify-center hover:bg-gray-100">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{line.qty}</span>
                        <button aria-label="Increase quantity" disabled={line.stock !== null && line.qty >= line.stock} onClick={() => setQty(line.id, line.qty + 1)} className="flex h-8 w-8 items-center justify-center hover:bg-gray-100 disabled:opacity-30">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button aria-label={`Remove ${line.name}`} onClick={() => remove(line.id)} className="text-gray-400 hover:text-[#ff0000]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">Subtotal</span>
                <span className="font-podium text-3xl italic tracking-tight">{formatMoney(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {shopConfig.pricesIncludeVat ? `Prices include ${shopConfig.vatRate * 100}% VAT.` : `${shopConfig.vatRate * 100}% VAT is added at payment.`}
                {shopConfig.deliveryFee > 0 ? ` Delivery: ${formatMoney(shopConfig.deliveryFee)}.` : ""}
              </p>
              {error && (
                <p role="alert" className="mt-4 border border-[#ff0000]/40 bg-[#ff0000]/5 p-3 text-sm text-black">
                  {error}
                </p>
              )}
              <button onClick={checkout} disabled={busy} className="mt-5 w-full bg-[#ff0000] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-colors hover:bg-black disabled:opacity-60">
                {busy ? "Please wait..." : "Checkout securely"}
              </button>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-gray-400">Secure card payment by Stripe</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
