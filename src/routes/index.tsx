import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, X, ChevronLeft, ChevronRight, Settings, Zap, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import { branches } from "@/lib/branches";

import logoAsset from "../assets/hero-motoconnect.png";
import heroBgAsset from "../assets/hero-background.png";
import heroBgAsset2 from "../assets/hero-background-2.png";
import aboutBgAsset from "../assets/about-bg.png";
import aboutBgVideoAsset from "../assets/about-bg-video.mp4";
import heroVideo1Asset from "../assets/hero-video-1.mp4";
import heroVideo2Asset from "../assets/hero-video-2.mp4";
import aboutReferenceAsset from "../assets/about-reference.png";
import aboutVisionAsset from "../assets/about-vision.png";
import aboutBgNewAsset from "../assets/about-bg-new.png";
import brandsBgAsset from "../assets/brands-we-represent.png";
import heroLogo from "../assets/brands/hero.png";
import championLogo from "../assets/brands/champion.png";
import unoMindaLogo from "../assets/brands/uno-minda.png";
import ngkSparkLogo from "../assets/brands/ngk-spark.png";
import ushaLogo from "../assets/brands/usha.png";
import steelBirdLogo from "../assets/brands/steel-bird.png";
import rockmanLogo from "../assets/brands/rockman.png";
import mkLightsLogo from "../assets/brands/mk-lights.png";
import indiaNipponLogo from "../assets/brands/india-nippon.png";
import sparkMindaLogo from "../assets/brands/spark-minda.png";

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
      <section className="bg-black py-24 border-t border-white/5">
        <TestimonialCarousel />
      </section>
      <Footer />
    </div>
  );
}

function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Brand Portfolio", href: "/products" },
    { name: "Workshop", href: "/workshop" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <span className="inline-block rounded-sm bg-white p-2"><img src={logoAsset} alt="Motoconnect" className="h-12 w-auto object-contain" /></span>
            <p className="font-raleway text-sm leading-relaxed text-white/50 max-w-xs">
              Dubai and Abu Dhabi's premier destination for genuine automobile spare parts. Delivering engineering excellence and authentic products across the UAE.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-podium text-xl uppercase italic mb-8 tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-raleway text-sm text-white/50 hover:text-[#ff0000] transition-colors uppercase tracking-widest">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-podium text-xl uppercase italic mb-8 tracking-wider">Contact Us</h4>
            <ul className="space-y-6">
              {branches.map((branch) => (
                <li key={branch.id} className="flex items-start gap-4 group">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000]" />
                  <div className="font-raleway text-sm text-white/50 leading-relaxed">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 mb-1">
                      {branch.city}
                    </span>
                    {branch.name && <span className="block text-white/70">{branch.name}</span>}
                    {branch.address}
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff0000] hover:text-white transition-colors"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-4 group">
                <div className="h-2 w-2 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000]" />
                <a href="mailto:sales@motoconnect.ae" className="font-raleway text-sm text-white/50 hover:text-white transition-colors">
                  sales@motoconnect.ae
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-2 w-2 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000]" />
                <a href="tel:+971563299940" className="font-raleway text-sm text-white/50 hover:text-white transition-colors">
                  +971 56 329 9940
                </a>
              </li>
            </ul>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-1">
            <h4 className="font-podium text-xl uppercase italic mb-8 tracking-wider">Our Location</h4>
            <div className="space-y-4">
              {branches.map((branch) => (
                <div key={branch.id}>
                  <p className="mb-2 font-raleway text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                    {branch.city}
                  </p>
                  <div className="relative h-40 w-full rounded-sm overflow-hidden border border-white/10 group">
                    <iframe
                      title={`${branch.city} branch map`}
                      src={branch.embedUrl}
                      className="absolute inset-0 w-full h-full grayscale-[0.8] contrast-[1.2] invert-[0.9] hover:grayscale-0 transition-all duration-700"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-raleway text-[10px] tracking-widest text-white/30 uppercase">
            © 2026 MOTOCONNECT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="font-raleway text-[10px] tracking-widest text-white/30 hover:text-white uppercase transition-colors">Privacy Policy</a>
            <a href="#" className="font-raleway text-[10px] tracking-widest text-white/30 hover:text-white uppercase transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function VanguardHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      video: heroVideo1Asset,
      bg: "",
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
      href: "/products",
      hasStats: true,
    },
    {
      id: 2,
      video: heroVideo2Asset,
      bg: "",
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
      cta: "Shop",
      href: "/shop",
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
    { name: "Workshop", href: "/workshop" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="relative min-h-[70vh] md:aspect-video w-full overflow-hidden md:max-h-screen mx-auto">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Video or Image */}
          {slide.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              src={slide.video}
            />
          ) : (
            <div 
              className="absolute inset-0 h-full w-full bg-contain bg-center bg-no-repeat opacity-80 bg-black"
              style={{ 
                backgroundImage: (slide as any).bg ? `url(${(slide as any).bg})` : 'none',
              }}
            />
          )}
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
                className="font-podium text-[clamp(2rem,6vw,5rem)] leading-[0.95] tracking-tight text-white uppercase italic animate-in fade-in slide-in-from-left-8 duration-1000 fill-mode-both"
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
                <a href={slide.href} className="group flex items-center gap-2 bg-[#ff0000] px-6 py-3.5 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-[#cc0000] uppercase sm:px-7 sm:py-4 sm:text-xs">
                  {slide.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

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
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4">
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
      <div className="absolute bottom-6 left-6 z-30 flex gap-2">
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
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-sm border border-white/10 shadow-lg">
            <img 
              src={logoAsset} 
              alt="Motoconnect" 
              className="h-10 w-auto sm:h-12 lg:h-14 object-contain brightness-110 contrast-125"
            />
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.name === "About" ? "/about" : link.href}
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
          <span className="inline-block rounded-sm bg-white p-1.5"><img src={logoAsset} alt="Motoconnect" className="h-10 w-auto" /></span>
          <button onClick={() => setMenuOpen(false)}>
            <X className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center space-y-8 px-6 text-center">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.name === "About" ? "/about" : link.href}
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
    <section id="about" className="relative w-full min-h-[85vh] md:min-h-0 md:aspect-video mx-auto flex items-center overflow-hidden md:max-h-screen">
      {/* Background with the uploaded video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover md:object-contain bg-black"
      >
        <source src={aboutBgVideoAsset} type="video/mp4" />
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
      <div className="absolute bottom-6 left-6 sm:left-10 lg:left-24 z-30 flex items-center gap-2">
        <div className="h-1 w-6 bg-[#ff0000]" />
        <div className="h-1 w-2 bg-white/20" />
      </div>

      {/* Bottom Center Logo */}
      <a href="#brands" aria-label="Scroll down to the next section" onClick={(e) => { e.preventDefault(); document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" }); }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-80 transition-opacity hover:opacity-100">
        <div className="flex items-center justify-center mb-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ff0000]">
            <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="currentColor" />
            <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <span className="font-raleway text-[10px] font-bold tracking-[0.4em] text-white uppercase">MOTO CONNECT</span>
      </a>

      {/* Bottom Right Navigation Arrows */}
      <div className="absolute bottom-6 right-6 sm:right-10 lg:right-24 z-30 flex items-center gap-3">
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

type BrandItem = {
  name: string;
  /** Local logo file. null = no verified logo yet; a plain name card is shown instead. */
  logo: string | null;
};

const genuineBrands: BrandItem[] = [
  { name: "Hero", logo: heroLogo },
];

const aftermarketBrands: BrandItem[] = [
  { name: "Champion", logo: championLogo },
  { name: "Uno Minda", logo: unoMindaLogo },
  { name: "NGK Spark", logo: ngkSparkLogo },
  { name: "USHA", logo: ushaLogo },
  { name: "Steel Bird", logo: steelBirdLogo },
  { name: "MK Lights", logo: mkLightsLogo },
  { name: "India Nippon", logo: indiaNipponLogo },
  // No verified logo available yet for Zeto.
  { name: "Rockman", logo: rockmanLogo },
  { name: "Zeto", logo: null },
  { name: "Spark Minda", logo: sparkMindaLogo },
];

function BrandTile({ brand }: { brand: BrandItem }) {
  return (
    <div className="group flex aspect-[3/2] items-center justify-center rounded-md border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ff0000] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="px-3 text-center font-raleway text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors duration-300 group-hover:text-black sm:text-xs">
          {brand.name}
        </span>
      )}
    </div>
  );
}

function BrandPanel({
  title,
  brands,
  gridClassName,
  centered = false,
}: {
  title: string;
  brands: BrandItem[];
  gridClassName?: string;
  centered?: boolean;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-10">
      <div className="mb-8">
        <div className="mb-3 h-0.5 w-8 bg-[#ff0000]" />
        <h3 className="font-raleway text-sm font-bold uppercase tracking-[0.25em] text-black md:text-base">{title}</h3>
      </div>

      {centered ? (
        // Centered wrap: 6 per row on desktop (6 + 5 centered), 3 on tablet, 2 on mobile, identical tile sizes
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="w-[calc(50%-0.375rem)] md:w-[calc(33.3333%-0.6667rem)] lg:w-[calc(16.6667%-0.8334rem)]"
            >
              <BrandTile brand={brand} />
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid gap-3 md:gap-4 ${gridClassName ?? ""}`}>
          {brands.map((brand) => (
            <BrandTile key={brand.name} brand={brand} />
          ))}
        </div>
      )}
    </div>
  );
}

function BrandsSection() {
  return (
    <section id="brands" className="w-full bg-[#f4f4f5] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="mb-10 md:mb-12 text-center md:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h2 className="font-podium text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[0.95] tracking-tight text-black uppercase italic">
            AUTOMOBILE <br className="md:hidden" />
            <span className="text-[#ff0000]">BRANDS</span> WE REPRESENT
          </h2>
          <div className="mt-4 mx-auto md:mx-0 h-1 w-20 bg-[#ff0000]" />
        </div>

        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
          <BrandPanel title="Genuine Parts" brands={genuineBrands} gridClassName="grid-cols-2 sm:grid-cols-4" />
          <BrandPanel title="Aftermarket Parts" brands={aftermarketBrands} centered />
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <ShinyButton onClick={() => window.location.href = '/products'}>
            VIEW FULL PORTFOLIO
          </ShinyButton>
        </div>
      </div>
    </section>
  );
}
