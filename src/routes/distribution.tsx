import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/distribution")({
  head: () => ({
    title: "Distribution | Motoconnect UAE Network",
    meta: [
      { name: "description", content: "Explore Motoconnect's robust distribution network and supply chain capabilities across the UAE." },
      { property: "og:title", content: "Distribution | Motoconnect UAE Network" },
      { property: "og:description", content: "Efficient logistics and regional supply chain solutions by Motoconnect." },
    ],
  }),
  component: DistributionPage,
});


function DistributionPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 italic tracking-tighter uppercase">Distribution Network</h1>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Regional Supply Chain</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Motoconnect ensures seamless delivery of Hero Genuine parts across our entire network. 
              Our strategically located warehouses in Dubai allow us to reach partners rapidly and reliably.
            </p>
            <ul className="space-y-4 font-bold text-sm uppercase">
              <li className="flex gap-4 items-center">
                <span className="w-6 h-6 bg-[#ff0000] text-white flex items-center justify-center">✓</span>
                Real-time Inventory Tracking
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-6 h-6 bg-[#ff0000] text-white flex items-center justify-center">✓</span>
                Express UAE Logistics
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-6 h-6 bg-[#ff0000] text-white flex items-center justify-center">✓</span>
                Bulk Ordering Portal
              </li>
            </ul>
          </div>
          <div className="aspect-[4/3] bg-gray-200 shadow-inner" />
        </div>
      </div>
    </div>
  );
}
