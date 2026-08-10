import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Filter } from "lucide-react";

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
    { 
      name: "Engine Assembly", 
      brand: "Hero Genuine", 
      category: "Engine",
      image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "LED Lighting Systems", 
      brand: "UNO Minda", 
      category: "Electrical",
      image: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Professional Helmet Series", 
      brand: "Steelbird", 
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1591737475741-26c84529b010?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "High-Performance Brakes", 
      brand: "MK Lide", 
      category: "Braking",
      image: "https://images.unsplash.com/photo-1486006396193-471a415a769c?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Oil Filtration Unit", 
      brand: "Hero Genuine", 
      category: "Maintenance",
      image: "https://images.unsplash.com/photo-1635732168923-d8c7c9195973?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Advanced Battery Tech", 
      brand: "Xeto", 
      category: "Electrical",
      image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-black pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff0000]/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <span className="text-[#ff0000] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Product Catalog</span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-none mb-8">
            Premium Automotive <br/> <span className="text-[#ff0000]">Components</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Distributing the world's most trusted automotive brands. High-performance, genuine, and reliable spare parts for every journey.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-gray-100 py-4">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {["All Products", "Hero Genuine", "UNO Minda", "Steelbird", "MK Lide", "Xeto"].map((filter, i) => (
              <button key={i} className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#ff0000] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border-b border-gray-200 focus-within:border-[#ff0000] transition-colors py-1">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search components..." className="bg-transparent outline-none text-sm font-medium w-48" />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {parts.map((part, i) => (
            <div key={i} className="group border border-gray-100 bg-white hover:border-[#ff0000]/20 transition-all duration-500 overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img src={part.image} alt={part.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ff0000] border border-gray-100">
                  {part.category}
                </div>
              </div>
              <div className="p-8">
                <div className="text-[#ff0000] text-xs font-black uppercase tracking-[0.2em] mb-3">{part.brand}</div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6 group-hover:text-[#ff0000] transition-colors">{part.name}</h3>
                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] group/btn">
                  Specifications <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Distribution Link */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl font-black italic uppercase mb-8">Need Bulk Supply?</h2>
          <p className="text-gray-500 max-w-xl mb-12">
            We offer wholesale distribution and logistics solutions for retailers and service networks across the UAE.
          </p>
          <Link to="/distribution" className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-[#ff0000] transition-all">
            Explore Distribution Network <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

