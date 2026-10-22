import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Crown, Settings, Zap, Award, CheckCircle2, Target, History } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { motion } from "framer-motion";
import { founder } from "@/lib/people";
import logoAsset from "../assets/hero-motoconnect.png";
import aboutBgVideoAsset from "../assets/about-bg-video.mp4";
import aboutVisionAsset from "../assets/about-vision.png";
import aboutBgNewAsset from "../assets/about-bg-new.png";

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

  const stats = [
    { label: "Parts Stocked", value: "10K+", icon: Settings },
    { label: "Partner Brands", value: "30+", icon: Zap },
    { label: "Global Customers", value: "50K+", icon: Award },
    { label: "Years Excellence", value: "10+", icon: History },
  ];

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      {/* Navbar - Consistent with Home */}
      <SiteNav active="About" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:aspect-video w-full md:max-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src={aboutBgVideoAsset}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-center px-6 pt-32 pb-16 sm:px-10 md:py-0 lg:px-16">
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

      {/* Meet the Founder (content lives in src/lib/people.ts) */}
      <section className="relative border-t border-white/5 py-24 md:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#ff0000]/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-14 md:mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Crown className="h-5 w-5 text-[#ff0000]" />
              <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Leadership</span>
            </div>
            <h2 className="font-podium text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-white uppercase italic">
              MEET THE <span className="text-[#ff0000]">FOUNDER</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 bg-[#ff0000]" />
          </motion.div>

          <div className="grid items-center gap-12 md:grid-cols-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
              className="group relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-none"
            >
              <div className="absolute -bottom-4 -right-4 h-full w-full border border-[#ff0000]/40 transition-all duration-500 group-hover:-bottom-6 group-hover:-right-6" />
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-white/5">
                {founder.photo ? (
                  <img
                    src={founder.photo}
                    alt={founder.photoAlt}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div role="img" aria-label={founder.photoAlt} className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/10 to-white/0">
                    <span className="font-podium text-8xl italic tracking-tight text-white/30">{founder.initials}</span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="md:col-span-7"
            >
              <h3 className="font-podium text-4xl lg:text-5xl italic uppercase tracking-tight text-white">{founder.name}</h3>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.4em] text-[#ff0000]">{founder.role}</p>
              <div className="mt-8 border-l-4 border-[#ff0000] pl-6 md:pl-8">
                <p className="text-lg md:text-xl leading-relaxed text-white/70 italic">{founder.intro}</p>
              </div>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-white/60 md:text-lg">
                {founder.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Qualities she is remembered for">
                {founder.values.map((v) => (
                  <li key={v} className="border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                    {v}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* "Meet Our Team" is hidden for now: the data is still in src/lib/people.ts; restore the section from git history if needed. */}

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
            src={aboutVisionAsset} 
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
            src={logoAsset} 
            alt="Motoconnect" 
            className="h-12 w-auto mx-auto mb-12 object-contain"
          />
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12">
            {["Home", "About", "Brand Portfolio", "Shop", "Contact"].map((name) => (
              <a
                key={name}
                href={name === "Home" ? "/" : name === "Brand Portfolio" ? "/products" : name === "Shop" ? "/shop" : name === "About" ? "/about" : "/contact"}
                className="py-2 font-raleway text-xs tracking-[0.2em] text-white/40 hover:text-[#ff0000] transition-colors uppercase"
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
