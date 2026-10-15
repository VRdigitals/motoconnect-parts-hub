import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { getOrderSummaryFn } from "@/lib/shop/shop.functions";
import { useCart } from "@/lib/shop/cart";
import { formatMoney } from "@/lib/shop/config";
import { StoreLayout } from "@/components/shop/StoreLayout";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => {
    const id = search["session_id"];
    return typeof id === "string" ? { session_id: id } : {};
  },
  head: () => ({ meta: [{ title: "Order confirmed | Motoconnect" }, { name: "robots", content: "noindex" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { session_id } = Route.useSearch();
  const { clear } = useCart();
  const [summary, setSummary] = useState<{ paid: boolean; email: string | null; total: number | null } | null>(null);

  useEffect(() => {
    if (!session_id) return;
    getOrderSummaryFn({ data: { sessionId: session_id } })
      .then((s) => {
        setSummary(s);
        if (s?.paid) clear();
      })
      .catch(() => setSummary(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  return (
    <StoreLayout>
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-[#ff0000]" strokeWidth={1.25} />
        <h1 className="mt-8 font-podium text-5xl italic uppercase leading-[0.95] tracking-tight">
          Thank <span className="text-[#ff0000]">you.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          {summary?.paid === false ? "Your payment is still being confirmed. You will receive an email once it completes." : "Your payment was received and your order is confirmed."}
          {summary?.email && (<> Your invoice will be emailed to <span className="font-semibold text-black">{summary.email}</span>.</>)}
        </p>
        {summary?.total != null && <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-500">Total paid: {formatMoney(summary.total)}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/shop" className="bg-[#ff0000] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:bg-black">Continue shopping</Link>
          <Link to="/contact" className="border border-black px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black hover:text-white">Contact us</Link>
        </div>
      </main>
    </StoreLayout>
  );
}
