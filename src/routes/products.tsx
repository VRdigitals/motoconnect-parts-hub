import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    title: "Products | Motoconnect Spare Parts Catalog",
    meta: [
      { name: "description", content: "Browse our extensive catalog of genuine spare parts for Hero Motocorp, UNO Minda, Steelbird, and more." },
      { property: "og:title", content: "Products | Motoconnect Spare Parts Catalog" },
      { property: "og:description", content: "Genuine automotive parts for major brands available at Motoconnect." },
    ],
  }),
  component: ProductsPage,
});


function ProductsPage() {
  const parts = [
    { name: "Engine Assembly", brand: "Hero Genuine" },
    { name: "LED Lighting", brand: "UNO Minda" },
    { name: "Safety Helmet", brand: "Steelbird" },
    { name: "Disc Brakes", brand: "MK Lide" },
    { name: "Oil Filter", brand: "Hero Genuine" },
    { name: "Battery", brand: "Xeto" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12">Product Catalog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {parts.map((part, i) => (
            <div key={i} className="bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 mb-4" />
              <div className="text-[#ff0000] text-xs font-bold uppercase tracking-widest mb-2">{part.brand}</div>
              <h3 className="text-xl font-bold mb-4">{part.name}</h3>
              <button className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#ff0000] transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
