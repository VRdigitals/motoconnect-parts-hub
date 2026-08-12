import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Crown, Settings, Zap, Award, CheckCircle2, Target, History } from "lucide-react";
import { useState, useEffect } from "react";
import logoAsset from "../assets/hero-motoconnect.png.asset.json";
import aboutBgVideoAsset from "../assets/about-bg-video.mp4.asset.json";
import aboutVisionAsset from "../assets/about-vision.png.asset.json";
import aboutBgNewAsset from "../assets/about-bg-new.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    title: "About Us | Motoconnect UAE",
    meta: [
      { name: "description", content: "Learn about Motoconnect, the premier distributor of genuine automobile spare parts in the UAE. Our mission, vision, and heritage." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { label: "Parts Stocked", value: "10K+", icon: Settings },
    { label: "Partner Brands", value: "30+", icon: Zap },
    { label: "Global Customers", value: "50K+", icon: Award },
    { label: "Years Excellence", value: "10+", icon: History },
  ];

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      {/* Navbar - Consistent with Home */}
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
                href={name === "Home" ? "/" : name === "Brand Portfolio" ? "/products" : name === "About" ? "/about" : "/contact"}
                className={`font-raleway text-sm tracking-[0.2em] transition-colors uppercase ${
                  name === "About" ? "text-[#ff0000]" : "text-white/80 hover:text-white"
                }`}
              >
                {name}
              </a>
            ))}
          </div>

          <a
            href="/contact"
            className="hidden md:flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000] uppercase"
          >
            GET A QUOTE
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative aspect-video w-full max-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src={(aboutBgVideoAsset as any)?.url || ""}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-8 duration-700">
              <Crown className="h-5 w-5 text-[#ff0000]" />
              <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Our Legacy</span>
            </div>
            <h1 className="font-podium text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-left-12 duration-1000">
              ENGINEERING <br />
              <span className="text-[#ff0000]">TRUST.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-white/60 leading-relaxed animate-in fade-in slide-in-from-left-16 duration-1000 delay-200">
              Motoconnect is a premier automotive group specializing in the distribution of high-quality genuine spare parts across the UAE and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0000]/5 blur-3xl -translate-y-16 translate-x-16 group-hover:bg-[#ff0000]/10 transition-all duration-700" />
            <Target className="h-12 w-12 text-[#ff0000] mb-8" />
            <h2 className="font-podium text-4xl italic uppercase mb-6 tracking-tight text-white">Our Mission</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              To empower the automotive industry by providing seamless access to genuine spare parts, ensuring safety, reliability, and peak performance for every vehicle on the road.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0000]/5 blur-3xl -translate-y-16 translate-x-16 group-hover:bg-[#ff0000]/10 transition-all duration-700" />
            <CheckCircle2 className="h-12 w-12 text-[#ff0000] mb-8" />
            <h2 className="font-podium text-4xl italic uppercase mb-6 tracking-tight text-white">Our Vision</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              To be the most trusted name in automotive distribution in the Middle East, recognized for our commitment to authenticity, innovation, and customer excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="flex justify-center mb-4">
                <stat.icon className="h-8 w-8 text-[#ff0000] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="font-podium text-5xl lg:text-6xl text-black italic mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
          <img 
            src={(aboutVisionAsset as any)?.url || ""} 
            alt="Vision" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <h2 className="font-podium text-5xl lg:text-6xl italic uppercase mb-10 tracking-tight text-white">
              AUTHENTICITY IS OUR <span className="text-[#ff0000]">DNA.</span>
            </h2>
            <p className="text-white/60 text-xl leading-relaxed mb-12">
              At Motoconnect, we don't just sell parts; we provide peace of mind. Every product in our catalog undergoes rigorous quality checks to ensure it meets the highest manufacturer standards.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                "100% Genuine Certified Parts",
                "Advanced Logistics Network",
                "Dedicated Customer Support",
                "Transparent Pricing Model"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#ff0000]" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 text-center">
          <img 
            src={(logoAsset as any)?.url || ""} 
            alt="Motoconnect" 
            className="h-12 w-auto mx-auto mb-12 object-contain"
          />
          <div className="flex justify-center gap-8 mb-12">
            {["Home", "About", "Brand Portfolio", "Contact"].map((name) => (
              <a
                key={name}
                href={name === "Home" ? "/" : name === "Brand Portfolio" ? "/products" : name === "About" ? "/about" : "/contact"}
                className="font-raleway text-xs tracking-[0.2em] text-white/40 hover:text-[#ff0000] transition-colors uppercase"
              >
                {name}
              </a>
            ))}
          </div>
          <p className="font-raleway text-[10px] tracking-widest text-white/20 uppercase">
            © 2026 MOTOCONNECT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
