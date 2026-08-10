import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, X, ChevronLeft, ChevronRight, Target, Eye, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

import logoAsset from "../assets/hero-motoconnect.png.asset.json";
import heroBgAsset from "../assets/hero-background.png.asset.json";
import heroBgAsset2 from "../assets/hero-background-2.png.asset.json";
import aboutVisionAsset from "../assets/about-vision.png.asset.json";

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
    <div className="bg-black font-inter selection:bg-white selection:text-black">
      <VanguardHero />
      <AboutSection />
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
                <span className="font-inter text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase sm:text-xs">
                  {slide.tagline}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-podium text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-white uppercase">
                {slide.title}
              </h1>

              {/* Subtext */}
              <div className="mt-4 max-w-lg lg:mt-6">
                <p className="font-inter text-sm leading-relaxed text-white/70 sm:text-base">
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
                  <div className="font-inter text-[10px] tracking-wider text-white/60 uppercase">
                    <div>Top Rated</div>
                    <div className="font-bold">100% Genuine Parts</div>
                  </div>
                </div>
              </div>

              {/* Stats Row (Only for first slide) */}
              {slide.hasStats && (
                <div className="mt-6 flex flex-wrap gap-8 sm:mt-8 lg:mt-10 lg:gap-16">
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
              className="font-inter text-sm tracking-[0.2em] text-white/80 transition-colors hover:text-white uppercase"
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
    </div>
  );
}

function AboutSection() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');
  
  return (
    <section id="about" className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#0A0A0A]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[#ff0000]" />
                <span className="text-[#ff0000] text-xs font-bold tracking-[0.4em] uppercase">About Us</span>
              </div>
              
              <h2 className="font-podium text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.9] uppercase tracking-tighter">
                OUR MISSION:<br />
                <span className="text-[#ff0000]">ENGINEERING</span><br />
                EXCELLENCE.
              </h2>
              
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                We are committed to delivering genuine products at competitive prices to automotive businesses across the UAE and other regions. Our dedication to quality and service ensures your fleet stays on the road.
              </p>
            </div>

            {/* Mission / Vision Interactive Area */}
            <div className="space-y-8">
              <div className="flex gap-10 border-b border-white/10">
                <button 
                  onClick={() => setActiveTab('mission')}
                  className={`pb-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all relative ${activeTab === 'mission' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  THE MISSION
                  {activeTab === 'mission' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff0000]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('vision')}
                  className={`pb-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all relative ${activeTab === 'vision' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  THE VISION
                  {activeTab === 'vision' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff0000]" />}
                </button>
              </div>

              <div className="min-h-[160px]">
                {activeTab === 'mission' ? (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                        <Target className="w-5 h-5 text-[#ff0000]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Precision Supply</h4>
                        <p className="text-white/50 text-sm leading-relaxed">
                          Ensuring every part we distribute meets the highest standards of engineering excellence and authentic certification.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                        <Zap className="w-5 h-5 text-[#ff0000]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Agile Distribution</h4>
                        <p className="text-white/50 text-sm leading-relaxed">
                          Building a lightning-fast supply chain that connects global manufacturers to local workshops without delay.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                        <Eye className="w-5 h-5 text-[#ff0000]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Industry Leadership</h4>
                        <p className="text-white/50 text-sm leading-relaxed">
                          To be the most trusted name in automotive spare parts across the Middle East, setting the benchmark for authenticity.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                        <ShieldCheck className="w-5 h-5 text-[#ff0000]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Connected Future</h4>
                        <p className="text-white/50 text-sm leading-relaxed">
                          Innovating the way spare parts are sourced and delivered through advanced digital tracking and logistics.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button className="group relative overflow-hidden bg-[#ff0000] px-10 py-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:pr-12">
              <span className="relative z-10 flex items-center gap-3">
                Read Our Story
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0" />
            </button>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2 relative group">
            {/* Main Image with masking/frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
              <img 
                src={(aboutVisionAsset as any)?.url || ""} 
                alt="Motoconnect Engineering" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              {/* Floating Badge */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 flex flex-col items-center justify-center animate-pulse">
                <div className="text-[10px] text-white/50 uppercase tracking-tighter">Est.</div>
                <div className="text-2xl font-podium text-white leading-none">2026</div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4">
                  <img src={(logoAsset as any)?.url} alt="Logo" className="h-6 w-auto opacity-50 grayscale invert" />
                  <div className="h-[1px] flex-1 bg-white/20" />
                </div>
              </div>
            </div>

            {/* Background decorative glow */}
            <div className="absolute -inset-4 bg-[#ff0000]/20 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
