import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, X, ChevronLeft, ChevronRight, Target, Eye, ShieldCheck, Zap, Globe, Package, Users, Settings, Truck } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

import logoAsset from "../assets/hero-motoconnect.png.asset.json";
import heroBgAsset from "../assets/hero-background.png.asset.json";
import heroBgAsset2 from "../assets/hero-background-2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Motoconnect | Genuine Automobile Spare Parts Collection",
    meta: [
      {
        name: "description",
        content: "Motoconnect is committed to delivering genuine products at competitive prices to automotive businesses across the UAE and other regions.",
      },
    ],
  }),
  component: MainLayout,
});

function MainLayout() {
  return (
    <div className="bg-black font-inter selection:bg-[#ff0000] selection:text-white">
      <VanguardHero />
      <AboutSection />
      <BrandPortfolioGrid />
    </div>
  );
}

function VanguardHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bg: (heroBgAsset as any)?.url || "",
      tagline: "Genuine Automobile Spare Parts Collection",
      title: (
        <>
          TOP
          <br />
          AUTOMOBILE.
          <br />
          DISTRIBUTOR.
          <br />
          IN UAE.
        </>
      ),
      description: "Delivering genuine products at competitive prices to automotive businesses across the UAE and other regions.",
      cta: "Product Portfolio",
      hasStats: true,
    },
    {
      id: 2,
      bg: (heroBgAsset2 as any)?.url || "",
      tagline: "Trusted Partner for Global Brands",
      title: (
        <>
          WORLD-CLASS
          <br />
          AUTOMOTIVE
          <br />
          PARTNERSHIPS.
        </>
      ),
      description: "Collaborating with industry leaders to bring the best quality parts to your doorstep.",
      cta: "View Partners",
      hasStats: false,
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] ease-out scale-100"
            style={{ 
              backgroundImage: `url(${slide.bg})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

          {/* Slide Content */}
          <div className="relative z-20 flex h-full items-center px-6 sm:px-10 lg:px-24">
            <div className={`max-w-4xl transition-all duration-1000 delay-300 ${
              index === currentSlide ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}>
              {/* Tagline */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-[#ff0000]" />
                <span className="font-bold text-[10px] tracking-[0.4em] text-[#ff0000] uppercase sm:text-xs">
                  {slide.tagline}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-podium text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-white uppercase italic">
                {slide.title}
              </h1>

              {/* Subtext */}
              <div className="mt-6 max-w-xl">
                <p className="font-inter text-base leading-relaxed text-white/60 sm:text-lg">
                  {slide.description}
                </p>
              </div>

              {/* CTA Row */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button className="group relative overflow-hidden bg-[#ff0000] px-8 py-4 font-bold text-xs uppercase tracking-[0.3em] text-white transition-all hover:bg-white hover:text-black">
                  <span className="relative z-10 flex items-center gap-2">
                    {slide.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>

                {slide.hasStats && (
                  <div className="flex items-center gap-3 border-l border-white/20 pl-6">
                    <Award className="h-10 w-10 text-white/30" />
                    <div className="font-inter text-[10px] tracking-widest text-white/50 uppercase">
                      <div>Certified</div>
                      <div className="font-bold text-white">Genuine Parts Hub</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Stats Row (Overlayed at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hidden lg:block border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl justify-between px-10 py-8">
           <div className="flex items-center gap-4">
             <span className="font-podium text-4xl text-[#ff0000]">10K+</span>
             <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Parts<br/>Stocked</span>
           </div>
           <div className="flex items-center gap-4">
             <span className="font-podium text-4xl text-[#ff0000]">30+</span>
             <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Global<br/>Brands</span>
           </div>
           <div className="flex items-center gap-4">
             <span className="font-podium text-4xl text-[#ff0000]">50K+</span>
             <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Active<br/>Clients</span>
           </div>
           <div className="flex items-center gap-4">
             <span className="font-podium text-4xl text-[#ff0000]">24H</span>
             <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Expert<br/>Support</span>
           </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute top-1/2 right-10 z-30 -translate-y-1/2 flex flex-col gap-4">
        <button 
          onClick={prevSlide}
          className="group flex h-14 w-14 items-center justify-center border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#ff0000] hover:border-[#ff0000]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="group flex h-14 w-14 items-center justify-center border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#ff0000] hover:border-[#ff0000]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <div className="flex items-center">
          <img 
            src={(logoAsset as any)?.url || ""} 
            alt="Motoconnect" 
            className="h-10 w-auto lg:h-14 object-contain"
          />
        </div>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold tracking-[0.3em] text-white/60 transition-all hover:text-[#ff0000] uppercase"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="border-b-2 border-[#ff0000] pb-1 text-[11px] font-bold tracking-[0.3em] text-white uppercase hover:text-[#ff0000] transition-colors"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="flex flex-col space-y-1.5 md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <div className="h-[2px] w-8 bg-white" />
          <div className="h-[2px] w-8 bg-white" />
          <div className="h-[2px] w-6 bg-[#ff0000] self-end" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black transition-all duration-700 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <img src={(logoAsset as any)?.url || ""} className="h-10 w-auto" alt="Logo" />
          <button onClick={() => setMenuOpen(false)}>
            <X className="h-10 w-10 text-white" />
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="font-podium text-5xl text-white uppercase italic hover:text-[#ff0000]">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-32 px-6 lg:px-24">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 h-full w-1/3 bg-[#ff0000]/5 -skew-x-12 transform origin-top translate-x-20" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="h-full w-full bg-[#111] flex items-center justify-center">
                 <Settings className="w-40 h-40 text-white/5 animate-spin-slow" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-20">
                    <ShieldCheck className="w-20 h-20 text-[#ff0000] mb-8" />
                    <h3 className="font-podium text-4xl text-white uppercase italic mb-4">Precision Hub</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs uppercase tracking-widest">
                      Every part we distribute undergoes rigorous authentication to ensure road safety and performance.
                    </p>
                 </div>
              </div>
              
              {/* Floating Meta tags */}
              <div className="absolute top-10 left-10 z-20 flex flex-col gap-2">
                 <div className="bg-[#ff0000] px-4 py-1 text-[9px] font-bold text-white uppercase tracking-[0.3em]">Authentic</div>
                 <div className="bg-white/10 backdrop-blur-md px-4 py-1 text-[9px] font-bold text-white uppercase tracking-[0.3em]">OEM Standard</div>
              </div>
            </div>
            {/* Outline Box Offset */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#ff0000]/30 -z-10" />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-10 bg-[#ff0000]" />
                <span className="text-[10px] font-bold tracking-[0.5em] text-[#ff0000] uppercase">Strategic Distribution</span>
              </div>
              <h2 className="font-podium text-6xl lg:text-8xl text-white leading-[0.85] uppercase italic tracking-tighter">
                Fueling The <br/> <span className="text-[#ff0000]">Future</span> Of UAE Mobility.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                Motoconnect stands at the intersection of quality and logistics. We are the trusted link for businesses seeking genuine automotive solutions without compromise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 bg-white/5 border-l-2 border-[#ff0000] hover:bg-white/10 transition-colors">
                <Target className="w-6 h-6 text-[#ff0000]" />
                <h4 className="text-white font-bold text-xs uppercase tracking-widest">Our Mission</h4>
                <p className="text-white/40 text-xs leading-relaxed uppercase">
                  To eliminate the risk of counterfeit parts by establishing an unbreakable supply chain of 100% genuine components.
                </p>
              </div>
              <div className="space-y-4 p-8 bg-white/5 border-l-2 border-white/20 hover:bg-white/10 transition-colors hover:border-[#ff0000]">
                <Eye className="w-6 h-6 text-[#ff0000]" />
                <h4 className="text-white font-bold text-xs uppercase tracking-widest">Our Vision</h4>
                <p className="text-white/40 text-xs leading-relaxed uppercase">
                  Pioneering a digital-first distribution model that connects global manufacturers to the local workshop floor.
                </p>
              </div>
            </div>

            <button className="group flex items-center gap-6 text-[10px] font-bold tracking-[0.5em] text-white uppercase">
              <span className="h-[2px] w-12 bg-[#ff0000] transition-all group-hover:w-20" />
              Discover Our Network
              <ArrowUpRight className="w-4 h-4 text-[#ff0000]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandPortfolioGrid() {
  const brands = [
    { name: "Hero Genuine", category: "Distribution" },
    { name: "UNO Minda", category: "Electrical" },
    { name: "Steelbird", category: "Safety" },
    { name: "MK Lide", category: "Braking" },
    { name: "Bosch", category: "Performance" },
    { name: "SKF", category: "Bearings" },
  ];

  return (
    <section id="portfolio" className="bg-[#050505] py-32 px-6 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.5em] text-[#ff0000] uppercase">Portfolio</span>
            <h2 className="font-podium text-5xl lg:text-7xl text-white uppercase italic tracking-tighter">Authorized Partners</h2>
          </div>
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] max-w-xs">
            We distribute for the world's most trusted automotive engineering giants.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-white/10 border border-white/10">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-black p-12 flex flex-col items-center justify-center group hover:bg-[#ff0000] transition-all duration-500 cursor-pointer">
              <span className="text-white text-lg font-bold uppercase tracking-widest mb-2 group-hover:scale-110 transition-transform">{brand.name}</span>
              <span className="text-white/30 text-[8px] uppercase tracking-widest group-hover:text-white/70">{brand.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
