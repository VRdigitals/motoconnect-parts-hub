import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MotoconnectHome,
});

function MotoconnectHome() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#ff0000] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/hero-motoconnect.png" 
            alt="Motoconnect Logo" 
            className="h-10 object-contain"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <a href="#" className="hover:text-[#ff0000] transition-colors">Hero Distribution</a>
          <a href="#" className="hover:text-[#ff0000] transition-colors">Spare Parts</a>
          <a href="#" className="hover:text-[#ff0000] transition-colors">About Motoconnect</a>
          <a href="#" className="bg-black text-white px-5 py-2 hover:bg-[#ff0000] transition-all">Contact Us</a>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                <span className="w-2 h-2 bg-[#ff0000] rounded-full animate-pulse" />
                Authorized Hero Distributor
              </div>
              <h1 className="text-6xl lg:text-8xl font-black italic tracking-tighter mb-8 leading-[0.9]">
                DRIVEN BY <br />
                <span className="text-[#ff0000]">EXCELLENCE</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mb-10 leading-relaxed">
                Motoconnect is a leading group distribution company for <span className="font-bold text-black">Hero Motocorp</span> and premium auto spare parts including UNO Minda, Steelbird, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#ff0000] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-red-200">
                  Explore Catalog
                </button>
                <button className="border-2 border-black text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                  Our Partners
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* 3D-feel visual placeholder */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl relative flex items-center justify-center overflow-hidden border border-gray-100 shadow-2xl group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10 transform group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700">
                   <div className="w-64 h-64 bg-white shadow-[-20px_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl p-8 flex flex-col justify-between border border-gray-50">
                      <div className="w-12 h-1 bg-[#ff0000]" />
                      <div className="text-4xl font-black italic text-black/10">3D ASSET</div>
                      <div className="text-right text-xs font-bold text-gray-400">HERO GENUINE PARTS</div>
                   </div>
                </div>
                {/* Accent elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-[#ff0000]/5 blur-3xl rounded-full" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-black/5 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="bg-black text-white py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#ff0000] mb-4">Our Group Distribution</h2>
                <h3 className="text-4xl lg:text-5xl font-black italic tracking-tighter">PREMIUM PARTNERSHIPS</h3>
              </div>
              <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                We partner with the world's most trusted brands to ensure your vehicle performs at its peak with 100% genuine components.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
              {[
                { name: "Hero Motocorp", desc: "Flagship Distribution" },
                { name: "UNO Minda", desc: "Electrical & Lighting" },
                { name: "Steelbird", desc: "Safety & Protection" },
                { name: "MK Lide", desc: "Performance Parts" },
                { name: "Xeto", desc: "Advanced Engineering" },
                { name: "Hero Genuine", desc: "Factory Certified" }
              ].map((brand, i) => (
                <div key={i} className="bg-black p-10 hover:bg-white hover:text-black transition-all group relative cursor-pointer">
                  <div className="text-xs font-bold text-[#ff0000] mb-4 uppercase tracking-widest">{brand.desc}</div>
                  <div className="text-2xl font-black italic tracking-tighter group-hover:translate-x-2 transition-transform">{brand.name}</div>
                  <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Spare Parts */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black italic tracking-tighter mb-4">GENUINE SPARES</h2>
              <div className="w-20 h-1.5 bg-[#ff0000] mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow group">
                  <div className="aspect-square bg-gray-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    <div className="text-black/5 font-black text-6xl rotate-12 group-hover:scale-110 transition-transform">PART</div>
                  </div>
                  <h4 className="font-bold text-lg mb-2">High Performance Part #{id}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">UNO Minda</span>
                    <button className="text-[#ff0000] font-bold text-sm hover:underline italic">Details +</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <img 
              src="/hero-motoconnect.png" 
              alt="Motoconnect Logo" 
              className="h-8 object-contain mb-8 grayscale hover:grayscale-0 transition-all"
            />
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              Motoconnect is committed to excellence in distribution and service, ensuring the highest quality standards for the automotive industry.
            </p>
          </div>
          <div>
            <h5 className="font-black italic text-sm uppercase tracking-widest mb-6">Quick Links</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-[#ff0000]">Hero Distribution</a></li>
              <li><a href="#" className="hover:text-[#ff0000]">Spare Parts Catalog</a></li>
              <li><a href="#" className="hover:text-[#ff0000]">Corporate Profile</a></li>
              <li><a href="#" className="hover:text-[#ff0000]">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black italic text-sm uppercase tracking-widest mb-6">Contact</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li>info@motoconnect.ae</li>
              <li>Dubai, United Arab Emirates</li>
              <li className="text-black font-bold">+971 00 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">© 2026 Motoconnect Group. All Rights Reserved.</p>
          <div className="flex gap-6">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#ff0000] hover:text-white transition-colors cursor-pointer">
                <span className="font-bold text-xs italic">In</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#ff0000] hover:text-white transition-colors cursor-pointer">
                <span className="font-bold text-xs italic">Tw</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}