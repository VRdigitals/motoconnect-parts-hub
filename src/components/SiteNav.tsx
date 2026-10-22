import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import logoAsset from "../assets/hero-motoconnect.png";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Brand Portfolio", href: "/products" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
];

/** Top bar shared by the marketing pages: desktop links, plus a full-screen menu on phones and tablets. */
export function SiteNav({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page behind the menu from scrolling while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 sm:px-10 lg:px-16 ${
          scrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10" : "py-7 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <a href="/" className="flex items-center">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-sm border border-white/10 shadow-lg">
              <img src={logoAsset} alt="Motoconnect" className="h-10 w-auto sm:h-12 object-contain brightness-110" />
            </div>
          </a>

          <div className="hidden items-center gap-12 md:flex">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className={`font-raleway text-sm tracking-[0.2em] transition-colors uppercase ${
                  l.name === active ? "text-[#ff0000]" : "text-white/80 hover:text-white"
                }`}
              >
                {l.name}
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

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="flex flex-col space-y-1.5">
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-4 self-end bg-white" />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <img src={logoAsset} alt="Motoconnect" className="h-10 w-auto" />
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center">
            <X className="h-8 w-8 text-white" />
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center space-y-8 px-6 text-center">
          {links.map((l, i) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-podium text-3xl uppercase italic tracking-tight transition-all duration-500 sm:text-5xl ${l.name === active ? "text-[#ff0000]" : "text-white"}`}
              style={{ transitionDelay: `${i * 80 + 100}ms`, transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0 }}
            >
              {l.name}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-8 py-4 text-xs font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000]"
            style={{ transitionDelay: `${links.length * 80 + 100}ms`, transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0 }}
          >
            GET A QUOTE
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
