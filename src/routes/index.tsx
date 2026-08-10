import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "VANGUARD | World-Class Digital Collective",
    meta: [
      {
        name: "description",
        content: "We build fierce brand identities that don't just turn heads -- they lead.",
      },
    ],
  }),
  component: VanguardHero,
});

function VanguardHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Projects", "Studio", "Offerings", "Inquire"];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-inter selection:bg-white selection:text-black">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar */}
      <nav className="relative z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        {/* Left: Brand */}
        <div className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
          VANGUARD
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-inter text-sm tracking-[0.2em] text-white/80 transition-colors hover:text-white uppercase"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group flex items-center gap-2 border border-white/30 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white/10 hover:border-white/60 uppercase"
          >
            Get in Touch
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
          <div className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
            VANGUARD
          </div>
          <button onClick={() => setMenuOpen(false)}>
            <X className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center space-y-8 px-6 text-center">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-podium text-4xl uppercase text-white sm:text-5xl transition-all duration-500"
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 flex items-center gap-2 border border-white/30 px-8 py-4 text-xs font-medium tracking-[0.2em] text-white transition-all hover:bg-white/10"
            style={{
              transitionDelay: `${navLinks.length * 80 + 100}ms`,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            GET IN TOUCH
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="animate-fade-up mb-6 flex items-center gap-3 lg:mb-8">
            <Crown className="h-4 w-4 text-white/70" />
            <span className="font-inter text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase sm:text-xs">
              World-Class Digital Collective
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up-delay-1 font-podium text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.92] tracking-tight text-white uppercase">
            Design.
            <br />
            Disrupt.
            <br />
            Conquer.
          </h1>

          {/* Subtext */}
          <div className="animate-fade-up-delay-2 mt-6 max-w-md lg:mt-8">
            <p className="font-inter text-sm leading-relaxed text-white/70 sm:text-base">
              We build fierce brand identities
              <br className="hidden sm:block" />
              that don't just turn heads --{" "}
              <span className="font-bold text-white">they lead.</span>
            </p>
          </div>

          {/* CTA Row */}
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10">
            <button className="group flex items-center gap-2 bg-black px-6 py-3.5 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-neutral-900 uppercase sm:px-7 sm:py-4 sm:text-xs">
              See Our Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <Award className="h-8 w-8 text-white/50" />
              <div className="font-inter text-[10px] tracking-wider text-white/60 uppercase">
                <div>Top-Rated</div>
                <div className="font-bold">Brand Studio</div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap gap-8 sm:mt-10 lg:mt-12 lg:gap-16">
            <div className="space-y-1">
              <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                250+
              </div>
              <div className="font-inter text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                Brands Transformed
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                95%
              </div>
              <div className="font-inter text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                Client Retention
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                10+
              </div>
              <div className="font-inter text-[9px] font-medium tracking-widest text-white/50 uppercase sm:text-xs">
                Years in the Game
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator or bottom accent could go here if needed, but the prompt asked for a single viewport section */}
    </div>
  );
}
