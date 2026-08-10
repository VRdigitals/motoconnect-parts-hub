import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import logoAsset from "@/assets/hero-motoconnect.png.asset.json";
import heroBgAsset2 from "@/assets/hero-background-2.png.asset.json";


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
  component: VanguardHero,
});

function VanguardHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bg: heroBgAsset.url,
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
      bg: heroBgAsset2.url,
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
    { name: "About", href: "/about" },
    { name: "Brand Portfolio", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];


  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-inter selection:bg-white selection:text-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${heroBgAsset.url})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-0" />



      {/* Navbar */}
      <nav className="relative z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <img 
            src={logoAsset.url} 
            alt="Motoconnect" 
            className="h-10 w-auto sm:h-12 lg:h-14 object-contain"
          />
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-inter text-sm tracking-[0.2em] text-white/80 transition-colors hover:text-white uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000] uppercase"
          >
            GET A QUOTE
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
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
            src={logoAsset.url} 
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
              className="font-podium text-3xl uppercase text-white sm:text-4xl transition-all duration-500"
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

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="animate-fade-up mb-6 flex items-center gap-3 lg:mb-8">
            <Crown className="h-4 w-4 text-[#ff0000]" />
            <span className="font-inter text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase sm:text-xs">
              Genuine Automobile Spare Parts Collection
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up-delay-1 font-podium text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-white uppercase">
            TOP
            <br />
            AUTOMOBILE.
            <br />
            DISTRIBUTOR.
            <br />
            IN UAE.
          </h1>

          {/* Subtext */}
          <div className="animate-fade-up-delay-2 mt-4 max-w-lg lg:mt-6">
            <p className="font-inter text-sm leading-relaxed text-white/70 sm:text-base">
              Delivering genuine products at competitive prices
              <br className="hidden sm:block" />
              to automotive businesses across the UAE and other regions.
            </p>
          </div>

          {/* CTA Row */}
          <div className="animate-fade-up-delay-3 mt-6 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-8">
            <button className="group flex items-center gap-2 bg-[#ff0000] px-6 py-3.5 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-[#cc0000] uppercase sm:px-7 sm:py-4 sm:text-xs">
              Product Portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <Award className="h-8 w-8 text-white/50" />
              <div className="font-inter text-[10px] tracking-wider text-white/60 uppercase">
                <div>Top Rated</div>
                <div className="font-bold">Brand Studio : 100% Genuine Parts</div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-up-delay-4 mt-6 flex flex-wrap gap-8 sm:mt-8 lg:mt-10 lg:gap-16">
            <div className="space-y-1">
              <div className="font-inter text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                10K+
              </div>
              <div className="font-inter text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                PARTS STOCKED
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-inter text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                30+
              </div>
              <div className="font-inter text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                BRANDS
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-inter text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                50K+
              </div>
              <div className="font-inter text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                CUSTOMERS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
