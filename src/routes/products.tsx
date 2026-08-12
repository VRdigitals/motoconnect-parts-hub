import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Crown, ArrowRight, Zap, Target, Shield, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";

import logoAsset from "../assets/hero-motoconnect.png";
import bajajLogo from "../assets/bajaj.png";
import heroLogo from "../assets/hero.png";
import hondaLogo from "../assets/honda.png";
import ktmLogo from "../assets/ktm.png";
import suzukiLogo from "../assets/suzuki.png";
import tvsLogo from "../assets/tvs.png";
import gabrielLogo from "../assets/gabriel.png";
import ngkLogo from "../assets/ngk.png";
import skfLogo from "../assets/skf.png";
import unomindaLogo from "../assets/unominda.png";
import championLogo from "../assets/champion.png";
import goetzeLogo from "../assets/goetze.png";
import ifbLogo from "../assets/ifb.png";
import osramLogo from "../assets/osram.png";
import askLogo from "../assets/ask.png";
import astraeaLogo from "../assets/astraea.png";
import boschLogo from "../assets/bosch.png";
import enduranceLogo from "../assets/endurance.png";
import fccLogo from "../assets/fcc.png";
import rolonLogo from "../assets/rolon.png";
import spacoLogo from "../assets/spaco.png";
import studdsLogo from "../assets/studds.png";
import tvstyresLogo from "../assets/tvstyres.png";
import ushaLogo from "../assets/usha.png";
import varrocLogo from "../assets/varroc.png";
import yamahaLogo from "../assets/yamaha.png";

export const Route = createFileRoute("/products")({
  head: () => ({
    title: "Brand Portfolio | Motoconnect UAE",
    meta: [
      { name: "description", content: "Explore the global automotive brands we represent. Motoconnect is the premier distributor of genuine spare parts in the UAE." },
    ],
  }),
  component: BrandPortfolioPage,
});

function BrandPortfolioPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      title: "2 WHEELER BRANDS",
      brands: [
        { name: "Hero", logo: heroLogo },
        { name: "Honda", logo: hondaLogo },
        { name: "Yamaha", logo: yamahaLogo },
        { name: "Suzuki", logo: suzukiLogo },
        { name: "Bajaj", logo: bajajLogo },
        { name: "TVS", logo: tvsLogo },
        { name: "KTM", logo: ktmLogo },
      ]
    },
    {
      title: "SPARE PARTS & COMPONENTS",
      brands: [
        { name: "UNO Minda", logo: unomindaLogo },
        { name: "Gabriel", logo: gabrielLogo },
        { name: "NGK", logo: ngkLogo },
        { name: "SKF", logo: skfLogo },
        { name: "Bosch", logo: boschLogo },
        { name: "Champion", logo: championLogo },
        { name: "Endurance", logo: enduranceLogo },
        { name: "FCC", logo: fccLogo },
        { name: "Goetze", logo: goetzeLogo },
        { name: "IFB", logo: ifbLogo },
        { name: "Osram", logo: osramLogo },
        { name: "ASK", logo: askLogo },
        { name: "Astraea", logo: astraeaLogo },
        { name: "Rolon", logo: rolonLogo },
        { name: "Spaco", logo: spacoLogo },
        { name: "Studds", logo: studdsLogo },
        { name: "TVS Tyres", logo: tvstyresLogo },
        { name: "Usha", logo: ushaLogo },
        { name: "Varroc", logo: varrocLogo },
      ]
    }
  ];

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
                src={logoAsset} 
                alt="Motoconnect" 
                className="h-10 w-auto sm:h-12 object-contain brightness-110"
              />
            </div>
          </a>

          <div className="hidden items-center gap-12 md:flex">
            {["Home", "About", "Brand Portfolio", "Contact"].map((name) => (
              <a
                key={name}
                href={name === "Home" ? "/" : name === "Brand Portfolio" ? "/products" : `/#${name.toLowerCase()}`}
                className={`font-raleway text-sm tracking-[0.2em] transition-colors uppercase ${
                  name === "Brand Portfolio" ? "text-[#ff0000]" : "text-white/80 hover:text-white"
                }`}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff0000]/10 via-transparent to-black" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff0000]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <Crown className="h-5 w-5 text-[#ff0000]" />
            <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Our Legacy</span>
          </div>
          
          <h1 className="font-podium text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-left-12 duration-1000">
            BRAND <br />
            <span className="text-[#ff0000]">PORTFOLIO.</span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg text-white/60 leading-relaxed animate-in fade-in slide-in-from-left-16 duration-1000 delay-200">
            We bridge the gap between world-class manufacturers and the UAE market. 
            Motoconnect distributes 100% genuine parts from the most trusted global brands in the industry.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {[
              { icon: Zap, label: "Fast Distribution", val: "24/7" },
              { icon: Shield, label: "Genuine Parts", val: "100%" },
              { icon: Globe, label: "Global Brands", val: "30+" },
              { icon: Target, label: "Service Points", val: "500+" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-sm">
                <stat.icon className="h-6 w-6 text-[#ff0000] mb-4" />
                <div className="text-2xl font-black text-white italic">{stat.val}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="mb-32 last:mb-0">
              <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
                <div>
                  <h2 className="font-podium text-4xl italic text-white tracking-tight uppercase">
                    {cat.title}
                  </h2>
                  <div className="mt-4 h-1 w-20 bg-[#ff0000]" />
                </div>
                <div className="hidden md:block text-white/30 text-xs tracking-widest uppercase">
                  {cat.brands.length} PREMIER PARTNERS
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-white/5 border border-white/5">
                {cat.brands.map((brand, i) => (
                  <div 
                    key={i} 
                    className="group relative aspect-square bg-black flex items-center justify-center p-8 transition-all hover:z-10"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 border border-[#ff0000] shadow-[0_0_30px_rgba(255,0,0,0.3),inset_0_0_20px_rgba(255,0,0,0.2)]" />
                    </div>

                    <div className="relative w-full h-full transition-all duration-500 group-hover:scale-110">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=ff0000&color=fff&bold=true`;
                        }}
                      />
                    </div>

                    {/* Brand Name Tag */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">
                        {brand.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#ff0000] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="font-podium text-4xl md:text-6xl italic text-white leading-none uppercase tracking-tighter">
              READY TO SCALE <br /> YOUR BUSINESS?
            </h2>
            <p className="mt-6 text-white/80 max-w-xl text-lg">
              Join our distribution network and get access to the UAE's most comprehensive genuine parts inventory.
            </p>
          </div>
          <a 
            href="/#contact" 
            className="flex items-center gap-4 bg-white text-black px-12 py-5 font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all group"
          >
            Partner With Us
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
            © 2026 MOTOCONNECT. EXCELLENCE IN AUTOMOTIVE DISTRIBUTION.
          </p>
        </div>
      </footer>
    </div>
  );
}


