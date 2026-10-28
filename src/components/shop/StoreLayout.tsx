import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowUp, House, Mail, MapPin, Menu, MessageCircle, Phone, Search, ShieldCheck, ShoppingBag, Store, Truck, X } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import { formatMoney } from "@/lib/shop/config";
import { branches } from "@/lib/branches";
import logoAsset from "../../assets/hero-motoconnect.png";

const PHONE_DISPLAY = "+971 56 329 9940";
const PHONE_TEL = "+971563299940";
const EMAIL = "sales@motoconnect.ae";
const WHATSAPP = "https://wa.me/971563299940?text=Hello%20Motoconnect%2C%20I%20have%20a%20question%20about%20a%20product.";

const nav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Brand Portfolio", href: "/products" },
  { name: "Workshop", href: "/workshop" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
];

/** Shortcuts under the search bar (plain searches, they only match item text). */
const QUICK_SEARCHES = ["Hero", "Honda", "Bajaj", "Uno Minda", "Xeto", "Rockman"];

export function StoreLayout({ children, initialSearch = "" }: { children: ReactNode; initialSearch?: string }) {
  const { count, subtotal, setOpen } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState(initialSearch);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => setQ(initialSearch), [initialSearch]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setMenu(false);
    navigate({ to: "/shop", search: q.trim() ? { q: q.trim() } : {} });
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] pb-16 font-raleway text-black selection:bg-black selection:text-white md:pb-0">
      {/* Utility bar */}
      <div className="hidden bg-[#050505] text-[11px] text-white/60 md:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 lg:px-10">
          <div className="flex items-center gap-6">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-[#ff0000]" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-[#ff0000]" /> {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-2 uppercase tracking-[0.2em]">
            <MapPin className="h-3.5 w-3.5 text-[#ff0000]" /> Dubai &amp; Abu Dhabi
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-[100] bg-black text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 md:px-6 lg:px-10">
          <a href="/" className="shrink-0">
            <div className="rounded-sm border border-white/10 bg-white/10 p-1.5">
              <img src={logoAsset} alt="Motoconnect" className="h-9 w-auto object-contain brightness-110 md:h-11" />
            </div>
          </a>

          <form onSubmit={submit} role="search" className="order-3 w-full md:order-none md:max-w-2xl md:flex-1">
            <div className="flex">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by part name, bike model or SKU"
                aria-label="Search products"
                className="h-11 w-full min-w-0 border border-white/15 bg-white px-4 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#ff0000]"
              />
              <button type="submit" aria-label="Search" className="flex h-11 w-12 shrink-0 items-center justify-center bg-[#ff0000] text-white transition-colors hover:bg-white hover:text-black">
                <Search className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-1.5 hidden flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/50 md:flex">
              {QUICK_SEARCHES.map((s) => (
                <Link key={s} to="/shop" search={{ q: s }} className="hover:text-[#ff0000]">
                  {s}
                </Link>
              ))}
            </div>
          </form>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="flex items-center gap-3 border border-white/15 px-3 py-2 transition-all hover:border-[#ff0000] hover:bg-[#ff0000]/10"
            >
              <span className="relative">
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff0000] px-1 text-[10px] font-bold">{count}</span>
              </span>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">My cart</span>
                <span className="text-sm font-bold">{formatMoney(subtotal)}</span>
              </span>
            </button>
            <button type="button" onClick={() => setMenu((m) => !m)} aria-label="Menu" className="flex h-11 w-11 items-center justify-center border border-white/15 md:hidden">
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation row */}
        <nav className="hidden border-t border-white/10 bg-[#0b0b0b] md:block" aria-label="Main">
          <div className="mx-auto flex max-w-[1400px] items-center gap-10 px-6 lg:px-10">
            {nav.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className={`border-b-2 py-3 text-xs uppercase tracking-[0.2em] transition-colors ${
                  l.name === "Shop" ? "border-[#ff0000] text-white" : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                {l.name}
              </a>
            ))}
          </div>
        </nav>

        {menu && (
          <nav className="border-t border-white/10 bg-[#0b0b0b] px-4 py-2 md:hidden" aria-label="Main">
            {nav.map((l) => (
              <a key={l.name} href={l.href} className={`block py-3 text-sm uppercase tracking-[0.2em] ${l.name === "Shop" ? "text-[#ff0000]" : "text-white/80"}`}>
                {l.name}
              </a>
            ))}
          </nav>
        )}
      </header>

      {children}

      {/* Trust strip */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {[
            { icon: MessageCircle, title: "Order on WhatsApp", text: "Fill your cart and send the order in one tap." },
            { icon: ShieldCheck, title: "Genuine spare parts", text: "Matched by part number for your bike." },
            { icon: Truck, title: "Delivery in the UAE", text: "We confirm delivery with you on WhatsApp." },
            { icon: Store, title: "Dubai & Abu Dhabi", text: "Visit or call our branches for help." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gray-200 text-[#ff0000]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div>
            <span className="inline-block rounded-sm bg-white p-2"><img src={logoAsset} alt="Motoconnect" className="h-12 w-auto object-contain" /></span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">Dubai and Abu Dhabi's destination for motorcycle spare parts. Add parts to your cart and send your order on WhatsApp.</p>
          </div>
          <div>
            <h4 className="font-podium text-lg italic uppercase tracking-wider">Shop</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/50">
              <li><Link to="/shop" className="inline-block py-1.5 hover:text-[#ff0000]">All products</Link></li>
              {["Hero", "Honda", "Bajaj", "Uno Minda"].map((b) => (
                <li key={b}><Link to="/shop" search={{ brand: b }} className="inline-block py-1.5 hover:text-[#ff0000]">{b} parts</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-podium text-lg italic uppercase tracking-wider">Company</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/50">
              {nav.filter((l) => l.name !== "Shop").map((l) => (
                <li key={l.name}><a href={l.href} className="inline-block py-1.5 hover:text-[#ff0000]">{l.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-podium text-lg italic uppercase tracking-wider">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/50">
              {branches.map((b) => (
                <li key={b.id}>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">{b.city}</span>
                  {b.address}
                </li>
              ))}
              <li><a href={`tel:${PHONE_TEL}`} className="inline-block py-1.5 hover:text-white">{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="inline-block py-1.5 hover:text-white">{EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">© 2026 MOTOCONNECT. ALL RIGHTS RESERVED.</div>
      </footer>

      {/* Floating buttons */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-20 left-4 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-6 md:left-6"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-20 right-4 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-lg hover:bg-black hover:text-white md:bottom-6 md:right-6"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Mobile bottom bar */}
      <nav aria-label="Quick" className="fixed inset-x-0 bottom-0 z-[95] grid grid-cols-3 border-t border-black/10 bg-white md:hidden">
        <Link to="/shop" className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-[#ff0000]">
          <Store className="h-5 w-5" /> Shop
        </Link>
        <a href="/" className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-black/70">
          <House className="h-5 w-5" /> Home
        </a>
        <button type="button" onClick={() => setOpen(true)} className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-black/70">
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff0000] px-1 text-[9px] font-bold text-white">{count}</span>}
          </span>
          Cart
        </button>
      </nav>
    </div>
  );
}
