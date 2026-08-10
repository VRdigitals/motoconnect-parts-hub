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
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff0000]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff0000]/5 rounded-full blur-[120px] -ml-64 -mb-64" />
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Interactive 3D Card Area */}
        <div className="relative group perspective-1000">
          <div className="relative w-full aspect-square max-w-md mx-auto transform-style-3d transition-transform duration-700 hover:rotate-y-12">
            {/* Main Image Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff0000] to-black p-[2px] rounded-3xl overflow-hidden">
              <div className="w-full h-full bg-black rounded-3xl relative overflow-hidden">
                {/* Abstract industrial mesh pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                {/* Content inside the "3D" card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-[#ff0000]/10 flex items-center justify-center border border-[#ff0000]/30 shadow-[0_0_50px_rgba(255,0,0,0.2)]">
                    <ShieldCheck className="w-12 h-12 text-[#ff0000]" />
                  </div>
                  <h3 className="font-podium text-4xl text-white uppercase mb-4 tracking-tighter">Engineered for Excellence</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We don't just supply parts; we fuel the automotive industry with reliability and precision.
                  </p>
                </div>

                {/* Floating "Parts" indicators */}
                <div className="absolute top-10 left-10 animate-bounce delay-75">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white uppercase tracking-widest">
                    Precision
                  </div>
                </div>
                <div className="absolute bottom-20 right-10 animate-pulse">
                  <div className="px-3 py-1 bg-[#ff0000]/20 backdrop-blur-md border border-[#ff0000]/40 rounded-full text-[10px] text-[#ff0000] uppercase tracking-widest">
                    Authentic
                  </div>
                </div>
              </div>
            </div>

            {/* Back glow */}
            <div className="absolute -inset-4 bg-[#ff0000]/20 blur-2xl rounded-3xl -z-10 group-hover:bg-[#ff0000]/30 transition-colors" />
          </div>
        </div>

        {/* Right Side: Content & Tabs */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#ff0000]" />
              <span className="text-[#ff0000] text-xs font-bold tracking-[0.4em] uppercase">Who We Are</span>
            </div>
            <h2 className="font-podium text-5xl sm:text-7xl text-white leading-tight uppercase tracking-tighter">
              Redefining <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Automotive</span> Distribution.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Motoconnect is not just a distributor; we are a strategic bridge between world-class manufacturers and the businesses that keep the world moving.
            </p>
          </div>

          {/* Mission & Vision Tabs */}
          <div className="space-y-6">
            <div className="flex gap-8 border-b border-white/10">
              <button 
                onClick={() => setActiveTab('mission')}
                className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all relative ${activeTab === 'mission' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                Our Mission
                {activeTab === 'mission' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff0000]" />}
              </button>
              <button 
                onClick={() => setActiveTab('vision')}
                className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all relative ${activeTab === 'vision' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                Our Vision
                {activeTab === 'vision' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff0000]" />}
              </button>
            </div>

            <div className="min-h-[150px] transition-all duration-500">
              {activeTab === 'mission' ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                      <Target className="w-4 h-4 text-[#ff0000]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Uncompromising Quality</h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        To provide automotive businesses with 100% genuine spare parts that ensure vehicle longevity and safety, fostering trust at every mile.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                      <Zap className="w-4 h-4 text-[#ff0000]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Operational Agility</h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Streamlining distribution networks to ensure rapid availability and competitive pricing for partners across the UAE.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                      <Eye className="w-4 h-4 text-[#ff0000]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Global Leadership</h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        To become the undisputed leader in automobile parts distribution, recognized for innovation, ethics, and unparalleled service scale.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-[#ff0000]/10 flex items-center justify-center shrink-0 border border-[#ff0000]/20">
                      <Crown className="w-4 h-4 text-[#ff0000]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Future Connectivity</h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Building a digitally-integrated supply chain that anticipates market needs and connects the future of mobility today.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="group relative overflow-hidden bg-white px-10 py-5 text-black font-bold text-xs uppercase tracking-[0.3em] transition-all hover:pr-14 hover:bg-white/90">
            <span className="relative z-10">Explore Our Story</span>
            <ArrowUpRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </button>
        </div>
      </div>
    </section>
  );
}