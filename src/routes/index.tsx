import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MotoconnectHome,
});

function MotoconnectHome() {
  const heroImage = "https://images.unsplash.com/photo-1611002214172-792c1f90b59a?auto=format&fit=crop&q=80&w=2074";
  
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/hero-motoconnect.png" alt="Motoconnect Logo" className="h-12" />
          <div className="flex gap-8 font-semibold text-sm tracking-wide">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/distribution">Distribution</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Slider Prototype */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-white">
          <h1 className="text-7xl font-bold italic leading-tight mb-6">
            Authorized Hero <br/> <span className="text-[#ff0000]">Motocorp</span> Distributor
          </h1>
          <p className="text-xl max-w-lg mb-8 text-gray-200">
            Premium spare parts and distribution solutions for your automotive needs.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#ff0000] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors">
              Explore Catalog
            </button>
            <button className="bg-transparent border border-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
              Our Network
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories - Inspired by Ashva Trading */}
      <section className="py-20 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Genuine Spares", desc: "Hero Motocorp Original" },
            { title: "Partner Brands", desc: "UNO Minda, Steelbird & More" },
            { title: "Supply Chain", desc: "Reliable Distribution" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="w-12 h-1 bg-[#ff0000] mb-6" />
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 text-sm text-gray-500">
        <div className="max-w-[1400px] mx-auto text-center">
          <p>© 2026 Motoconnect Group. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
