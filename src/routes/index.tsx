import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MotoconnectHome,
});

function MotoconnectHome() {
  // Using high-quality placeholder images for automotive/spare parts context
  const heroImage = "https://images.unsplash.com/photo-1611002214172-792c1f90b59a?auto=format&fit=crop&q=80&w=2074"; // Motorcycle engine detail
  const partsImage1 = "https://images.unsplash.com/photo-1486006396113-ad73019e3001?auto=format&fit=crop&q=80&w=2000"; // Gear system
  const partsImage2 = "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=2000"; // Brake disc
  const partsImage3 = "https://images.unsplash.com/photo-1594739297341-ac43482b893e?auto=format&fit=crop&q=80&w=2000"; // Helmet/Steelbird vibe
  const distributionImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070"; // Modern Warehouse

  return (
    <div className="min-h-screen bg-white text-[#000000] font-sans selection:bg-[#ff0000] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/hero-motoconnect.png" 
            alt="Motoconnect Logo" 
            className="h-10 md:h-12 object-contain"
            onError={(e) => {
              // Fallback if logo still fails to render
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-logo')) {
                const text = document.createElement('span');
                text.className = 'fallback-logo text-xl font-black italic tracking-tighter text-[#ff0000]';
                text.innerText = 'MOTOCONNECT';
                parent.appendChild(text);
              }
            }}
          />
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-xs font-black tracking-[0.2em] uppercase">
          <a href="#distribution" className="hover:text-[#ff0000] transition-colors">Hero Distribution</a>
          <a href="#brands" className="hover:text-[#ff0000] transition-colors">Partner Brands</a>
          <a href="#parts" className="hover:text-[#ff0000] transition-colors">Spare Parts</a>
          <a href="#contact" className="bg-[#000000] text-white px-6 py-2.5 hover:bg-[#ff0000] transition-all flex items-center gap-2">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        
        <button className="lg:hidden text-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden bg-[#f8f8f8]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#000000] hidden lg:block transform skew-x-[-12deg] translate-x-32" />
          
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#ff0000] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 mb-8">
                Authorized Distribution Group
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8 leading-[0.85] uppercase">
                Leading the <br />
                <span className="text-[#ff0000]">Future of</span> <br />
                Mobility
              </h1>
              <p className="text-lg text-gray-600 max-w-md mb-12 leading-relaxed">
                Motoconnect is the premier distribution partner for <span className="text-black font-bold">Hero Motocorp</span>, delivering genuine parts and excellence across the region.
              </p>
              <div className="flex flex-wrap gap-5">
                <a href="#parts" className="bg-[#ff0000] text-white px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none">
                  Shop Spares
                </a>
                <a href="#distribution" className="border-4 border-[#000000] text-[#000000] px-10 py-[1.125rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                  Our Network
                </a>
              </div>
            </div>
            
            <div className="relative group lg:pl-12">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-[#ff0000] transform rotate-3 scale-95 opacity-20 blur-2xl rounded-3xl" />
                <div className="relative h-full bg-white shadow-[20px_40px_80px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden transform group-hover:-translate-y-4 transition-transform duration-700 border border-gray-100">
                  <img 
                    src={heroImage} 
                    alt="Hero Engine Part" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <div className="w-16 h-2 bg-[#ff0000] mb-6" />
                    <h3 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase">Genuine Performance</h3>
                    <p className="text-gray-300 text-sm font-bold uppercase tracking-widest">Powered by Hero Motocorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Showcase */}
        <section id="brands" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-[#ff0000] text-sm font-black uppercase tracking-[0.5em] mb-4">Our Portfolio</h2>
                <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase">Authorized <br/> Partnerships</h3>
              </div>
              <p className="text-gray-500 font-medium text-lg max-w-sm border-l-4 border-[#ff0000] pl-6 italic">
                Leading the industry with world-class automotive manufacturers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Hero Motocorp", category: "Full Range Distribution", color: "bg-[#ff0000]" },
                { name: "UNO Minda", category: "Electrical & Lighting", color: "bg-[#000000]" },
                { name: "Steelbird", category: "Safety & Gear", color: "bg-[#ff0000]" },
                { name: "MK Lide", category: "Braking Systems", color: "bg-[#000000]" },
                { name: "Xeto", category: "Precision Engineering", color: "bg-[#ff0000]" },
                { name: "Hero Genuine", category: "Certified Spare Parts", color: "bg-[#000000]" }
              ].map((brand, i) => (
                <div key={i} className="group relative bg-[#fcfcfc] border border-gray-100 p-12 overflow-hidden hover:border-[#ff0000] transition-all cursor-pointer">
                  <div className={`absolute top-0 right-0 w-2 h-0 group-hover:h-full transition-all duration-500 ${brand.color}`} />
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">{brand.category}</div>
                  <h4 className="text-3xl font-black italic tracking-tighter group-hover:text-[#ff0000] transition-colors">{brand.name}</h4>
                  <div className="mt-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1">View Products</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Spare Parts */}
        <section id="parts" className="py-24 px-6 bg-[#000000] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase">Premium <br/><span className="text-[#ff0000]">Warehouse</span></h2>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">Direct factory supply chain solutions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Engine Components", brand: "Hero Genuine", img: heroImage },
                { title: "Lighting Systems", brand: "UNO Minda", img: partsImage1 },
                { title: "Braking Solutions", brand: "MK Lide", img: partsImage2 },
                { title: "Safety Gear", brand: "Steelbird", img: partsImage3 }
              ].map((product, i) => (
                <div key={i} className="bg-[#111] p-2 rounded-none hover:bg-[#ff0000] transition-colors group cursor-pointer">
                  <div className="aspect-square mb-6 overflow-hidden relative">
                    <img src={product.img} alt={product.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#ff0000] group-hover:text-white mb-2">{product.brand}</div>
                    <h5 className="text-xl font-black italic tracking-tighter mb-4">{product.title}</h5>
                    <button className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Distribution Section */}
        <section id="distribution" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <img src={distributionImage} alt="Modern Distribution Warehouse" className="w-full h-[500px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-12">
                     <div className="max-w-xs">
                        <div className="w-12 h-1 bg-[#ff0000] mb-6" />
                        <h4 className="text-white text-3xl font-black italic tracking-tighter uppercase mb-4">Regional Supply Chain</h4>
                        <p className="text-gray-300 text-sm font-medium italic uppercase tracking-wider">Strategic hubs across the UAE for rapid delivery.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-[#ff0000] text-sm font-black uppercase tracking-[0.5em] mb-4">Distribution Network</h2>
              <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase mb-8">Powering <br/> the region</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With centralized logistics in Dubai, Motoconnect ensures a seamless supply chain of Hero Genuine parts and premium automotive accessories to retailers and workshops.
              </p>
              <ul className="space-y-4">
                {["100% Genuine Certified Parts", "Express Regional Logistics", "Bulk Inventory Management", "Technical Training Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
                    <span className="w-6 h-6 bg-[#ff0000] flex items-center justify-center text-white text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <img src="/hero-motoconnect.png" alt="Motoconnect" className="h-10 mb-8" />
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Excellence in distribution. Authenticity in every part.
            </p>
          </div>
          
          <div>
            <h6 className="font-black italic text-xs uppercase tracking-[0.3em] mb-8 text-[#ff0000]">Contact</h6>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <li className="text-black">sales@motoconnect.ae</li>
              <li>Dubai, UAE (Headquarters)</li>
              <li className="text-black pt-4">+971 4 000 0000</li>
            </ul>
          </div>

          <div>
            <h6 className="font-black italic text-xs uppercase tracking-[0.3em] mb-8 text-[#ff0000]">Quick Links</h6>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <li><a href="#" className="hover:text-black transition-colors">Distribution</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
             <h6 className="font-black italic text-xs uppercase tracking-[0.3em] mb-8 text-[#ff0000]">Follow Us</h6>
             <div className="flex gap-4">
                {['FB', 'IG', 'LI'].map((s) => (
                  <div key={s} className="w-10 h-10 border-2 border-gray-100 flex items-center justify-center text-[10px] font-black hover:border-[#ff0000] hover:text-[#ff0000] cursor-pointer transition-colors">{s}</div>
                ))}
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">
          © 2026 Motoconnect Group.
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-image: radial-gradient(#efefef 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />
    </div>
  );
}