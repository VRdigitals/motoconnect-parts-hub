import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, X, ChevronLeft, ChevronRight, Settings, Zap, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";

import logoAsset from "../assets/hero-motoconnect.png.asset.json";
import heroBgAsset from "../assets/hero-background.png.asset.json";
import heroBgAsset2 from "../assets/hero-background-2.png.asset.json";
import aboutBgAsset from "../assets/about-bg.png.asset.json";
import aboutBgVideoAsset from "../assets/about-bg-video.mp4.asset.json";
import aboutReferenceAsset from "../assets/about-reference.png.asset.json";
import aboutVisionAsset from "../assets/about-vision.png.asset.json";
import aboutBgNewAsset from "../assets/about-bg-new.png.asset.json";
import brandsBgAsset from "../assets/brands-we-represent.png.asset.json";
import bajajLogo from "../assets/bajaj.png.asset.json";
import heroLogo from "../assets/hero.png.asset.json";
import hondaLogo from "../assets/honda.png.asset.json";
import ktmLogo from "../assets/ktm.png.asset.json";
import suzukiLogo from "../assets/suzuki.png.asset.json";
import tvsLogo from "../assets/tvs.png.asset.json";
import gabrielLogo from "../assets/gabriel.png.asset.json";
import ngkLogo from "../assets/ngk.png.asset.json";
import skfLogo from "../assets/skf.png.asset.json";
import unomindaLogo from "../assets/unominda.png.asset.json";
import championLogo from "../assets/champion.png.asset.json";
import goetzeLogo from "../assets/goetze.png.asset.json";
import ifbLogo from "../assets/ifb.png.asset.json";
import osramLogo from "../assets/osram.png.asset.json";
import askLogo from "../assets/ask.png.asset.json";
import astraeaLogo from "../assets/astraea.png.asset.json";
import boschLogo from "../assets/bosch.png.asset.json";
import enduranceLogo from "../assets/endurance.png.asset.json";
import fccLogo from "../assets/fcc.png.asset.json";
import rolonLogo from "../assets/rolon.png.asset.json";
import spacoLogo from "../assets/spaco.png.asset.json";
import studdsLogo from "../assets/studds.png.asset.json";
import tvstyresLogo from "../assets/tvstyres.png.asset.json";
import ushaLogo from "../assets/usha.png.asset.json";
import varrocLogo from "../assets/varroc.png.asset.json";
import yamahaLogo from "../assets/yamaha.png.asset.json";

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
    <div className="bg-black font-raleway selection:bg-white selection:text-black">
      <VanguardHero />
      <AboutSection />
      <BrandsSection />
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
          WORLD CLASS
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
    { name: "Brand Portfolio", href: "/products" },
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
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

          {/* Slide Content */}
          <div className="relative z-20 flex h-full items-center px-6 sm:px-10 lg:px-16">
            <div className={`max-w-4xl transition-all duration-1000 delay-300 ${
              index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              {/* Tagline */}
              <div className="mb-6 flex items-center gap-3 lg:mb-8">
                <Crown className="h-4 w-4 text-[#ff0000]" />
                <span className="font-raleway text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase sm:text-xs">
                  {slide.tagline}
                </span>
              </div>

              {/* Main Heading */}
              <h1 
                key={`${slide.id}-${currentSlide}`}
                className="font-podium text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-white uppercase italic animate-in fade-in slide-in-from-left-8 duration-1000 fill-mode-both"
              >
                {slide.title}
              </h1>

              {/* Subtext */}
              <div className="mt-4 max-w-lg lg:mt-6">
                <p className="font-raleway text-sm leading-relaxed text-white/70 sm:text-base">
                  {slide.description}
                </p>
              </div>

              {/* CTA Row */}
              <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-8">
                <button className="group flex items-center gap-2 bg-[#ff0000] px-6 py-3.5 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-[#cc0000] uppercase sm:px-7 sm:py-4 sm:text-xs">
                  {slide.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="hidden items-center gap-3 sm:flex">
                  <Award className="h-8 w-8 text-white/50" />
                  <div className="font-raleway text-[10px] tracking-wider text-white/60 uppercase">
                    <div>Top Rated</div>
                    <div className="font-bold">100% Genuine Parts</div>
                  </div>
                </div>
              </div>

              {/* Stats Row (Only for first slide) */}
              {slide.hasStats && (
                <div className="mt-6 flex flex-wrap gap-8 sm:mt-8 lg:mt-10 lg:gap-16">
                  <div className="space-y-1">
                    <div className="font-raleway text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      10K+
                    </div>
                    <div className="font-raleway text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                      PARTS STOCKED
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-raleway text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      30+
                    </div>
                    <div className="font-raleway text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                      BRANDS
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-raleway text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      50K+
                    </div>
                    <div className="font-raleway text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                      CUSTOMERS
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Slider Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
        <button 
          onClick={prevSlide}
          className="group flex h-12 w-12 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-[#ff0000] hover:bg-[#ff0000]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="group flex h-12 w-12 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-[#ff0000] hover:bg-[#ff0000]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-10 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-[#ff0000]" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        <div className="flex items-center">
          <img 
            src={(logoAsset as any)?.url || ""} 
            alt="Motoconnect" 
            className="h-10 w-auto sm:h-12 lg:h-14 object-contain"
          />
        </div>

        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-raleway text-sm tracking-[0.2em] text-white/80 transition-colors hover:text-white uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="group flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000] uppercase"
          >
            GET A QUOTE
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          className="flex flex-col space-y-1.5 md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <div className="h-0.5 w-6 bg-white" />
          <div className="h-0.5 w-6 bg-white" />
          <div className="h-0.5 w-4 bg-white self-end" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <img 
            src={(logoAsset as any)?.url || ""} 
            alt="Motoconnect" 
            className="h-10 w-auto"
          />
          <button onClick={() => setMenuOpen(false)}>
            <X className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center space-y-8 px-6 text-center">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-podium text-3xl uppercase italic tracking-tight text-white sm:text-5xl transition-all duration-500"
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-8 py-4 text-xs font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000]"
            style={{
              transitionDelay: `${navLinks.length * 80 + 100}ms`,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            GET A QUOTE
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background with the uploaded video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={(aboutBgVideoAsset as any)?.url} type="video/mp4" />
      </video>
      
      {/* Gradient for smooth transition from Hero and for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-transparent h-48" />
      <div className="absolute inset-y-0 left-0 w-full md:w-[60%] z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Main Container */}
      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-24 py-24">
        <div className="max-w-full md:max-w-[50%] flex flex-col gap-8 md:gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
          
          {/* Kicker */}
          <div className="flex items-center gap-4">
            <span className="font-raleway text-xs font-bold tracking-[0.3em] text-white/90 uppercase">
              ABOUT US
            </span>
            <div className="h-0.5 w-10 bg-[#ff0000]" />
          </div>

          {/* Main Title */}
          <h2 className="font-podium text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-white uppercase italic">
            OUR <span className="text-[#ff0000]">MISSION</span>:<br />
            ENGINEERING<br />
            EXCELLENCE<span className="text-[#ff0000]">..</span>
          </h2>

          {/* Body Text */}
          <p className="font-raleway text-base md:text-lg leading-relaxed text-white/80 max-w-lg">
            Motoconnect is an authorised distributor of genuine automobile spare parts,
            committed to delivering authentic products at competitive prices to automotive
            businesses across the UAE and beyond.
          </p>

          {/* Button */}
          <div className="mt-4">
            <button className="group flex items-center gap-3 bg-[#ff0000] px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-white transition-all hover:bg-[#cc0000] uppercase rounded-sm">
              READ OUR STORY
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating UI Accents */}
      
      {/* Bottom Left Progress Indicator */}
      <div className="absolute bottom-10 left-6 sm:left-10 lg:left-24 z-30 flex items-center gap-2">
        <div className="h-1 w-6 bg-[#ff0000]" />
        <div className="h-1 w-2 bg-white/20" />
      </div>

      {/* Bottom Center Logo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-80">
        <div className="flex items-center justify-center mb-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ff0000]">
            <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="currentColor" />
            <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <span className="font-raleway text-[10px] font-bold tracking-[0.4em] text-white uppercase">MOTO CONNECT</span>
      </div>

      {/* Bottom Right Navigation Arrows */}
      <div className="absolute bottom-10 right-6 sm:right-10 lg:right-24 z-30 flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-[#ff0000] hover:border-[#ff0000]">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-[#ff0000] hover:border-[#ff0000]">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function BrandsSection() {
  const brands = [
    { name: "Hero", logo: (heroLogo as any).url },
    { name: "Honda", logo: (hondaLogo as any).url },
    { name: "Yamaha", logo: (yamahaLogo as any).url },
    { name: "Suzuki", logo: (suzukiLogo as any).url },
    { name: "Bajaj", logo: (bajajLogo as any).url },
    { name: "TVS", logo: (tvsLogo as any).url },
    { name: "KTM", logo: (ktmLogo as any).url },
    { name: "UNO Minda", logo: (unomindaLogo as any).url },
    { name: "Gabriel", logo: (gabrielLogo as any).url },
    { name: "NGK", logo: (ngkLogo as any).url },
    { name: "SKF", logo: (skfLogo as any).url },
    { name: "Bosch", logo: (boschLogo as any).url },
    { name: "Champion", logo: (championLogo as any).url },
    { name: "Endurance", logo: (enduranceLogo as any).url },
    { name: "FCC", logo: (fccLogo as any).url },
    { name: "Goetze", logo: (goetzeLogo as any).url },
    { name: "IFB", logo: (ifbLogo as any).url },
    { name: "Osram", logo: (osramLogo as any).url },
    { name: "ASK", logo: (askLogo as any).url },
    { name: "Astraea", logo: (astraeaLogo as any).url },
    { name: "Rolon", logo: (rolonLogo as any).url },
    { name: "Spaco", logo: (spacoLogo as any).url },
    { name: "Studds", logo: (studdsLogo as any).url },
    { name: "TVS Tyres", logo: (tvstyresLogo as any).url },
    { name: "Usha", logo: (ushaLogo as any).url },
    { name: "Varroc", logo: (varrocLogo as any).url },
  ];

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      {/* Background Tire Tracks - Larger and more prominent */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none grayscale select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80')`,
          backgroundSize: '1200px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'multiply',
          transform: 'rotate(-5deg) scale(1.1)'
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Heading with scroll animation */}
        <div className="mb-16 text-center md:text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
          <h2 className="font-podium text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-black uppercase italic">
            AUTOMOBILE <br className="md:hidden" />
            <span className="text-[#ff0000]">BRANDS</span> WE REPRESENT
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-[#ff0000]" />
        </div>
 
        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-gray-100">
          {brands.map((brand, index) => (
            <div 
              key={brand.name} 
              className="group relative flex items-center justify-center p-8 transition-all hover:bg-gray-50 border-r border-b border-gray-100 overflow-hidden animate-in fade-in duration-700 fill-mode-both"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Red Neon Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border-2 border-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.5),inset_0_0_20px_rgba(255,0,0,0.3)]" />
              </div>
              
              <div className="relative h-28 w-full transition-transform duration-500 group-hover:scale-110 z-10">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-full object-contain opacity-90 transition-all group-hover:opacity-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=ff0000&color=fff&bold=true`;
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 flex justify-center">
          <ShinyButton onClick={() => window.location.href = '/products'}>
            VIEW FULL PORTFOLIO
          </ShinyButton>
        </div>
      </div>
    </section>
  );
}

