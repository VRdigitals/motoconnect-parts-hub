import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Crown, ArrowRight, Zap, Target, Shield, Globe } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { ShinyButton } from "@/components/ui/shiny-button";

import logoAsset from "../assets/hero-motoconnect.png";
import heroLogo from "../assets/brands/hero.png";
import championLogo from "../assets/brands/champion.png";
import unoMindaLogo from "../assets/brands/uno-minda.png";
import ngkSparkLogo from "../assets/brands/ngk-spark.png";
import ushaLogo from "../assets/brands/usha.png";
import steelBirdLogo from "../assets/brands/steel-bird.png";
import mkLightsLogo from "../assets/brands/mk-lights.png";
import indiaNipponLogo from "../assets/brands/india-nippon.png";
import rockmanLogo from "../assets/brands/rockman.png";
import sparkMindaLogo from "../assets/brands/spark-minda.png";

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

  // Same brands as the "Automobile Brands We Represent" section on the home page.
  const categories: { title: string; brands: { name: string; logo: string | null }[] }[] = [
    {
      title: "GENUINE PARTS",
      brands: [{ name: "Hero", logo: heroLogo }],
    },
    {
      title: "AFTERMARKET PARTS",
      brands: [
        { name: "Champion", logo: championLogo },
        { name: "Uno Minda", logo: unoMindaLogo },
        { name: "NGK Spark Plugs", logo: ngkSparkLogo },
        { name: "USHA", logo: ushaLogo },
        { name: "Steel Bird", logo: steelBirdLogo },
        { name: "MK Lights", logo: mkLightsLogo },
        { name: "India Nippon", logo: indiaNipponLogo },
        { name: "Rockman", logo: rockmanLogo },
        { name: "Zeto", logo: null },
        { name: "Spark Minda", logo: sparkMindaLogo },
      ],
    },
  ];

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      {/* Dynamic Navbar */}
      <SiteNav active="Brand Portfolio" />

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

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
                {cat.brands.map((brand, i) => (
                  <div 
                    key={i} 
                    className="group relative aspect-square bg-white flex items-center justify-center p-8 transition-all hover:z-10"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 border border-[#ff0000] shadow-[0_0_30px_rgba(255,0,0,0.3),inset_0_0_20px_rgba(255,0,0,0.2)]" />
                    </div>

                    <div className="relative w-full h-full transition-all duration-500 group-hover:scale-110">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                          {brand.name}
                        </span>
                      )}
                    </div>

                    {/* Brand Name Tag */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] font-bold text-black/50 uppercase tracking-[0.2em]">
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


