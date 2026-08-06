import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MotoconnectHome,
});

function MotoconnectHome() {
  return (
    <div className="min-h-screen bg-white text-[#000000] font-sans selection:bg-[#ff0000] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/hero-motoconnect.png" 
            alt="Motoconnect Logo" 
            className="h-10 md:h-12 object-contain"
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
        {/* Hero Section with 3D Feel */}
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
              {/* Abstract 3D Industrial Shape */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-[#ff0000] transform rotate-3 scale-95 opacity-10 blur-2xl rounded-3xl" />
                <div className="relative bg-white shadow-[20px_40px_80px_rgba(0,0,0,0.15)] rounded-3xl p-4 border border-gray-100 overflow-hidden transform group-hover:-translate-y-4 transition-transform duration-700">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="text-[120px] font-black italic text-gray-50 leading-none select-none">HERO</div>
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-8">
                    <div className="w-16 h-2 bg-[#ff0000] mb-6" />
                    <h3 className="text-3xl font-black italic tracking-tighter mb-2">GENUINE COMPONENTS</h3>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Distributed by Motoconnect</p>
                  </div>
                </div>
                {/* Floating 3D Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-black rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12 animate-bounce-slow">
                   <div className="text-white font-black italic text-xl">100%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Partner Brands Section */}
        <section id="brands" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-[#ff0000] text-sm font-black uppercase tracking-[0.5em] mb-4">Our Portfolio</h2>
                <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase">A Group of <br/> World-Class Brands</h3>
              </div>
              <p className="text-gray-500 font-medium text-lg max-w-sm border-l-4 border-[#ff0000] pl-6 italic">
                Authorized distribution for the industry's most trusted manufacturers.
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

        {/* Product Catalog Preview */}
        <section id="parts" className="py-24 px-6 bg-[#000000] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase">The Spare Parts <br/><span className="text-[#ff0000]">Warehouse</span></h2>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">Direct from the factory to your doorstep</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Engine Components", brand: "Hero Genuine" },
                { title: "Lighting Systems", brand: "UNO Minda" },
                { title: "Braking Solutions", brand: "MK Lide" },
                { title: "Safety Helmets", brand: "Steelbird" }
              ].map((product, i) => (
                <div key={i} className="bg-[#111] p-2 rounded-none hover:bg-[#ff0000] transition-colors group cursor-pointer">
                  <div className="aspect-square bg-[#1a1a1a] mb-6 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="text-gray-800 font-black text-4xl italic group-hover:text-white/20 transition-colors">3D ASSET</span>
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#ff0000] group-hover:text-white mb-2">{product.brand}</div>
                    <h5 className="text-xl font-black italic tracking-tighter mb-4">{product.title}</h5>
                    <button className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <button className="border-b-2 border-[#ff0000] pb-2 text-sm font-black uppercase tracking-widest hover:text-[#ff0000] transition-colors">
                 Browse Full Ecommerce Store
               </button>
            </div>
          </div>
        </section>

        {/* Contact/CTA */}
        <section id="contact" className="py-24 px-6 bg-[#ff0000]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 uppercase leading-none">Ready to <br />Connect?</h2>
            <p className="text-xl font-bold italic mb-12 text-white/90">For distribution inquiries or bulk spare parts orders.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="bg-white text-black px-8 py-5 text-sm font-black tracking-widest outline-none flex-grow max-w-md"
              />
              <button className="bg-black text-white px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                Submit
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <img src="/hero-motoconnect.png" alt="Motoconnect" className="h-10 mb-8" />
            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
              Leading the regional distribution of Hero Motocorp and premium automotive brands with 100% authenticity guaranteed.
            </p>
          </div>
          
          <div>
            <h6 className="font-black italic text-xs uppercase tracking-[0.3em] mb-8 text-[#ff0000]">Services</h6>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <li><a href="#" className="hover:text-black transition-colors">Hero Distribution</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Parts Wholesale</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Logistics</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Technical Support</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-black italic text-xs uppercase tracking-[0.3em] mb-8 text-[#ff0000]">Brands</h6>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <li><a href="#" className="hover:text-black transition-colors">UNO Minda</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Steelbird</a></li>
              <li><a href="#" className="hover:text-black transition-colors">MK Lide</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Xeto</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-black italic text-xs uppercase tracking-[0.3em] mb-8 text-[#ff0000]">Locations</h6>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <li>Dubai, UAE (HQ)</li>
              <li>Abu Dhabi Branch</li>
              <li>Sharjah Logistics Center</li>
              <li className="text-black pt-4 font-black">sales@motoconnect.ae</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">© 2026 Motoconnect Group. Excellence in Motion.</p>
          <div className="flex gap-8">
            {['FB', 'IG', 'LI', 'X'].map((social) => (
              <a key={social} href="#" className="text-[10px] font-black text-gray-300 hover:text-[#ff0000] tracking-widest transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Hero Style Background Grid Pattern */}
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-image: radial-gradient(#efefef 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-20px) rotate(-12deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}