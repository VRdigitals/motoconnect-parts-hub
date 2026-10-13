import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import logoAsset from "../../assets/hero-motoconnect.png";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Brand Portfolio", href: "/products" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
];

export function ShopHeader() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 sm:px-10 lg:px-16 ${
        scrolled || menu ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10" : "py-7 bg-transparent"
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
                l.name === "Shop" ? "text-[#ff0000]" : "text-white/80 hover:text-white"
              }`}
            >
              {l.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-all hover:border-[#ff0000] hover:bg-[#ff0000]/10"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff0000] px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-label="Menu"
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-white md:hidden"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="mx-auto mt-4 flex max-w-[1400px] flex-col gap-1 border-t border-white/10 pt-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className={`py-3 font-raleway text-sm uppercase tracking-[0.2em] ${l.name === "Shop" ? "text-[#ff0000]" : "text-white/80"}`}
            >
              {l.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export function ShopFooter() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          © 2026 MOTOCONNECT. ALL RIGHTS RESERVED. <Link to="/contact" className="ml-2 text-white/40 hover:text-[#ff0000]">Contact us</Link>
        </p>
      </div>
    </footer>
  );
}
