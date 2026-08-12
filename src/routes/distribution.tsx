import { createFileRoute } from "@tanstack/react-router";
import { Truck, Warehouse, BarChart3, Clock, ArrowUpRight, Crown, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

import logoAsset from "../assets/hero-motoconnect.png.asset.json";

export const Route = createFileRoute("/distribution")({
  head: () => ({
    title: "Distribution Network | Motoconnect UAE",
    meta: [
      { name: "description", content: "Explore Motoconnect's robust distribution network and logistics capabilities across the UAE and beyond." },
    ],
  }),
  component: DistributionPage,
});

function DistributionPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      {/* Dynamic Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 sm:px-10 lg:px-16 ${
        scrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10" : "py-7 bg-transparent"
      }`}>
        <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <a href="/" className="flex items-center">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-sm border border-white/10 shadow-lg">
              <img 
                src={(logoAsset as any)?.url || ""} 
                alt="Motoconnect" 
                className="h-10 w-auto sm:h-12 object-contain brightness-110"
              />
            </div>
          </a>

          <div className="hidden items-center gap-12 md:flex">
            {["Home", "About", "Brand Portfolio", "Contact"].map((name) => (
              <a
                key={name}
                href={name === "Home" ? "/" : name === "Brand Portfolio" ? "/products" : name === "Contact" ? "/contact" : `/#${name.toLowerCase()}`}
                className="font-raleway text-sm tracking-[0.2em] text-white/80 hover:text-white transition-colors uppercase"
              >
                {name}
              </a>
            ))}
          </div>

          <a
            href="/#contact"
            className="hidden md:flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000] uppercase"
          >
            GET A QUOTE
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0000]/10 via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <Crown className="h-5 w-5 text-[#ff0000]" />
            <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Regional Logistics</span>
          </div>
          
          <h1 className="font-podium text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-left-12 duration-1000">
            POWERING THE <br />
            <span className="text-[#ff0000]">SUPPLY CHAIN.</span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg text-white/60 leading-relaxed animate-in fade-in slide-in-from-left-16 duration-1000 delay-200">
            Motoconnect operates a sophisticated distribution network that ensures every component reaches its destination with speed and precision across the UAE and global markets.
          </p>
        </div>
      </section>

      {/* Logistics Cards */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <h2 className="font-podium text-4xl md:text-5xl italic uppercase text-white leading-none">
                INTEGRATED <span className="text-white/40 italic">WAREHOUSING</span> <br /> & LOGISTICS
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Warehouse, title: "Smart Storage", desc: "Temperature-controlled, high-capacity facilities with real-time inventory management." },
                  { icon: Truck, title: "Express Fleet", desc: "Dedicated logistics fleet covering the entire UAE with same-day or next-day fulfillment." },
                  { icon: BarChart3, title: "Supply Visibility", desc: "Full end-to-end tracking for our partners to monitor stock levels and delivery status." },
                  { icon: Clock, title: "Efficiency First", desc: "Optimized routing and automated sorting to minimize lead times." }
                ].map((item, i) => (
                  <div key={i} className="group p-8 bg-white/5 border border-white/10 hover:border-[#ff0000] transition-all duration-500">
                    <item.icon className="h-8 w-8 text-[#ff0000] mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="font-podium text-xl italic uppercase text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
                alt="Warehouse" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-[#ff0000] text-white">
                <div className="font-podium text-3xl italic uppercase leading-tight mb-2">Optimized For Speed</div>
                <div className="h-1 w-20 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Network */}
      <section className="py-32 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none grayscale invert" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80')" }}
        />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <h2 className="font-podium text-4xl md:text-6xl italic uppercase text-white mb-20">JOIN OUR <span className="text-[#ff0000]">NETWORK</span></h2>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden">
            {[
              { num: "01", title: "Verification", desc: "Authorized retailers undergo selection to maintain brand integrity." },
              { num: "02", title: "Onboarding", desc: "Direct access to our digital portal for simplified bulk ordering." },
              { num: "03", title: "Growth", desc: "Dedicated managers and technical training to ensure your success." }
            ].map((step, i) => (
              <div key={i} className="bg-black p-12 text-left group hover:bg-white/5 transition-all">
                <span className="font-podium text-5xl italic text-white/10 group-hover:text-[#ff0000]/30 transition-colors block mb-8">{step.num}</span>
                <h3 className="font-podium text-2xl italic uppercase text-white mb-4">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-4 bg-[#ff0000] text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group"
            >
              Partner With Us
              <ShieldCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
            © 2026 MOTOCONNECT. UAE LOGISTICS LEADERS.
          </p>
        </div>
      </footer>
    </div>
  );
}


