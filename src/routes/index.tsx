import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Globe, Award, Settings, CheckCircle2 } from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Motoconnect | Authorized Hero Motocorp Distributor UAE",
    meta: [
      { name: "description", content: "Motoconnect Group: Premier distribution for Hero Motocorp, UNO Minda, Steelbird, and MK Lide. Quality automotive parts across the UAE." },
      { property: "og:title", content: "Motoconnect | Authorized Hero Motocorp Distributor" },
      { property: "og:description", content: "Leading automotive parts distribution and supply chain solutions in the UAE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MotoconnectHome,
});

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
}

function MotoconnectHome() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1611002214172-792c1f90b59a?auto=format&fit=crop&q=80&w=2074",
      title: "The Future of Mobility",
      subtitle: "Authorized Hero Motocorp Distributor",
      description: "Driving innovation and excellence in motorcycle distribution across the region."
    },
    {
      image: "https://images.unsplash.com/photo-1558981403-c5f91cbcf523?auto=format&fit=crop&q=80&w=2070",
      title: "Precision Engineering",
      subtitle: "Premium Spare Parts",
      description: "Distribution of UNO Minda, Steelbird, MK Lide, and Genuine Hero Parts."
    },
    {
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070",
      title: "Seamless Supply Chain",
      subtitle: "Regional Distribution Network",
      description: "Ensuring timely delivery and reliable support for all our partners."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar - Modern sticky with glass effect */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img 
                src="/hero-motoconnect.png" 
                alt="Motoconnect Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const span = (e.target as HTMLImageElement).nextElementSibling;
                  if (span) span.classList.remove('hidden');
                }}
              />
              <span className="hidden font-bold text-xl tracking-tighter text-[#ff0000]">MOTOCONNECT</span>
            </div>
          </Link>
          <div className="hidden md:flex gap-10 font-medium text-[15px] items-center">
            <Link to="/" className="text-gray-600 hover:text-[#ff0000] transition-colors [&.active]:text-[#ff0000]">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-[#ff0000] transition-colors [&.active]:text-[#ff0000]">Products</Link>
            <Link to="/distribution" className="text-gray-600 hover:text-[#ff0000] transition-colors [&.active]:text-[#ff0000]">Distribution</Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#ff0000] transition-colors [&.active]:text-[#ff0000]">Contact</Link>
            <Link to="/contact" className="bg-[#ff0000] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition-all">
              Inquire Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {slides.map((slide, i) => (
              <div key={i} className="embla__slide relative flex-[0_0_100%] h-full">
                <div className="absolute inset-0 z-0">
                  <img src={slide.image} className="w-full h-full object-cover opacity-60" alt={slide.title} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="relative z-10 h-full flex items-center max-w-[1400px] mx-auto px-6">
                  <div className="max-w-2xl text-white">
                    <span className="inline-block bg-[#ff0000] text-white px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] mb-6 animate-in slide-in-from-left duration-700">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.9] mb-8 animate-in slide-in-from-left duration-700 delay-100">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 animate-in slide-in-from-left duration-700 delay-200">
                      {slide.description}
                    </p>
                    <div className="flex gap-4 animate-in slide-in-from-left duration-700 delay-300">
                      <Link to="/products" className="bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-[#ff0000] hover:text-white transition-all">
                        View Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 z-20">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 transition-all duration-300 ${selectedIndex === i ? 'w-12 bg-[#ff0000]' : 'w-4 bg-white/30'}`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands & Partners - Clean modern grid */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#ff0000] font-bold text-sm uppercase tracking-widest block mb-4">Our Partners</span>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase">Trusted by Industry <span className="text-gray-400">Leaders</span></h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#ff0000] transition-colors">
              Explore All Brands <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Hero Genuine", "UNO Minda", "Steelbird", "MK Lide", "Xeto", "MK Parts"].map((brand, i) => (
              <div key={i} className="aspect-[4/3] bg-white border border-gray-100 flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all group">
                <div className="text-center">
                  <span className="block font-black text-lg text-gray-800 group-hover:text-[#ff0000] transition-colors">{brand}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Authorized Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Modern iconography */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: "Genuine Quality", desc: "Every part distributed is 100% authentic and original." },
              { icon: Globe, title: "Wide Network", desc: "Serving a vast network of retailers and service centers." },
              { icon: Award, title: "Certified Partner", desc: "Official regional distributor for Hero Motocorp." },
              { icon: Settings, title: "Technical Support", desc: "Full logistical and technical support for all brands." }
            ].map((feature, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-[#ff0000]/5 flex items-center justify-center rounded-2xl mb-8 group-hover:bg-[#ff0000] transition-all duration-500">
                  <feature.icon size={32} className="text-[#ff0000] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase italic tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#ff0000]/10 skew-x-[-20deg] translate-x-20" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-6 leading-tight">
              Ready to upgrade your <span className="text-[#ff0000]">Supply Chain?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Join our growing network of successful partners and retailers across the region.
            </p>
          </div>
          <Link to="/contact" className="bg-[#ff0000] text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Become a Partner
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <img src="/hero-motoconnect.png" alt="Motoconnect Logo" className="h-12 mb-8" />
              <p className="text-gray-500 max-w-sm leading-relaxed">
                Motoconnect is a premier group of companies specializing in the distribution of high-quality automotive parts and mobility solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-8">Navigation</h4>
              <ul className="space-y-4 text-[15px] text-gray-500 font-medium">
                <li><Link to="/" className="hover:text-[#ff0000]">Home</Link></li>
                <li><Link to="/products" className="hover:text-[#ff0000]">Products</Link></li>
                <li><Link to="/distribution" className="hover:text-[#ff0000]">Distribution</Link></li>
                <li><Link to="/contact" className="hover:text-[#ff0000]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-8">Contact Info</h4>
              <ul className="space-y-4 text-[15px] text-gray-500 leading-relaxed">
                <li>Authorized Hero Distributor, UAE</li>
                <li>contact@motoconnect.ae</li>
                <li>+971 (0) 4 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400 font-medium tracking-tight">© 2026 Motoconnect Group. All rights reserved.</p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-[#ff0000]">Privacy Policy</a>
              <a href="#" className="hover:text-[#ff0000]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

