import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, BatteryCharging, CheckCircle2, Crown, Disc3, Gauge, MapPin, MessageCircle, Phone, Settings, Wrench } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { branches } from "@/lib/branches";
import logoAsset from "../assets/hero-motoconnect.png";
import heroImage from "../assets/workshop/workshop-hero.jpg";
import engineImage from "../assets/workshop/workshop-engine.jpg";
import liftImage from "../assets/workshop/workshop-lift.jpg";

export const Route = createFileRoute("/workshop")({
  head: () => ({
    title: "Workshop | Motoconnect UAE",
    meta: [
      {
        name: "description",
        content: "Motoconnect Workshop in Dubai: motorcycle servicing, repairs and genuine parts fitting by trained technicians at our authorised service centre.",
      },
    ],
  }),
  component: WorkshopPage,
});

const services = [
  { icon: Wrench, title: "Periodic Servicing", text: "Scheduled maintenance, oil and filter changes and a full health check to keep your motorcycle reliable." },
  { icon: Settings, title: "Engine & Clutch Repair", text: "Diagnosis and repair of engines, clutches and transmissions, using genuine parts." },
  { icon: Disc3, title: "Brakes & Suspension", text: "Brake pads, discs and shoes, fork and shock servicing, and wheel and chain care for safe, confident riding." },
  { icon: BatteryCharging, title: "Electrical & Battery", text: "Starter, charging system, ignition, lights and battery checks, and fault finding on electrical problems." },
  { icon: Gauge, title: "Diagnostics & Tuning", text: "Careful inspection and set-up so your bike starts easily, runs smoothly and performs as it should." },
  { icon: CheckCircle2, title: "Genuine Parts Fitting", text: "Parts supplied from our own stock are fitted by our technicians, so you get the right part first time." },
];

const steps = [
  { n: "01", title: "Book", text: "Call us or send a WhatsApp message with your bike model and what it needs." },
  { n: "02", title: "Inspect", text: "Our technicians inspect the motorcycle and tell you what is needed before any work starts." },
  { n: "03", title: "Repair", text: "The work is done with genuine parts from our own warehouse stock." },
  { n: "04", title: "Ride", text: "We test and hand back your motorcycle, ready for the road." },
];

const PHONE_TEL = "+971563299940";
const PHONE_DISPLAY = "+971 56 329 9940";
const WHATSAPP = "https://wa.me/971563299940?text=" + encodeURIComponent("Hello Motoconnect, I would like to book a service at the workshop.");

function WorkshopPage() {
  // The workshop is the authorised service centre, listed with the other locations in src/lib/branches.ts.
  const centre = branches.find((b) => b.id === "spare-parts-warehouse") ?? branches[0]!;

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      <SiteNav active="Workshop" />

      {/* Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-white/5">
        <img src={heroImage} alt="Motorcycles being serviced in a workshop" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <Crown className="h-5 w-5 text-[#ff0000]" />
            <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Service Centre</span>
          </div>
          <h1 className="font-podium text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-left-12 duration-1000">
            EXPERT CARE <br />
            <span className="text-[#ff0000]">FOR YOUR BIKE.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/60 leading-relaxed animate-in fade-in slide-in-from-left-16 duration-1000 delay-200 mx-auto md:mx-0">
            Our workshop brings together trained technicians and Motoconnect's stock of genuine spare parts, so your motorcycle is serviced and repaired properly, with the right parts, in one place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-[#ff0000] px-8 py-4 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black uppercase">
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 border border-white/20 px-8 py-4 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:border-[#ff0000] hover:text-[#ff0000] uppercase">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="mb-14 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="h-5 w-5 text-[#ff0000]" />
              <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">What We Do</span>
            </div>
            <h2 className="font-podium text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-white uppercase italic">
              WORKSHOP <span className="text-[#ff0000]">SERVICES</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 bg-[#ff0000]" />
          </motion.div>

          <div className="grid gap-px bg-white/5 border border-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group bg-black p-8 md:p-10 transition-colors hover:bg-white/[0.03]"
              >
                <s.icon className="h-8 w-8 text-[#ff0000]" />
                <h3 className="mt-6 font-podium text-2xl italic uppercase tracking-tight text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos + promise */}
      <section className="border-t border-white/5 py-24 md:py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="grid grid-cols-2 gap-4">
            <img src={engineImage} alt="Technician repairing a motorcycle engine" loading="lazy" className="aspect-[3/4] w-full object-cover border border-white/10" />
            <img src={liftImage} alt="Motorcycle raised on a workshop lift" loading="lazy" className="mt-10 aspect-[3/4] w-full object-cover border border-white/10" />
          </div>
          <div>
            <h2 className="font-podium text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-white uppercase italic">
              GENUINE PARTS. <span className="text-[#ff0000]">PROPER WORK.</span>
            </h2>
            <ul className="mt-8 space-y-5 text-white/60">
              {[
                "Genuine spare parts from Motoconnect's own stock",
                "Trained technicians who inspect first and explain the work",
                "Servicing and repairs for everyday riders and fleets",
                "Parts and service under one roof, with no waiting for the right part",
              ].map((t) => (
                <li key={t} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff0000]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/5 py-24 md:py-32 px-6 sm:px-10 lg:px-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-podium text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-white uppercase italic mb-14">
            HOW IT <span className="text-[#ff0000]">WORKS</span>
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t-2 border-[#ff0000] pt-6">
                <span className="font-podium text-5xl italic text-white/20">{s.n}</span>
                <h3 className="mt-4 font-podium text-2xl italic uppercase tracking-tight text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-white/5">
        <div className="grid lg:grid-cols-2">
          <div className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-5 w-5 text-[#ff0000]" />
              <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Visit Us</span>
            </div>
            <h2 className="font-podium text-4xl italic uppercase tracking-tight text-white md:text-5xl">{centre.name ?? centre.city}</h2>
            <p className="mt-4 text-lg text-white/60">{centre.address}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={centre.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 bg-[#ff0000] px-7 py-4 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black uppercase">
                Get Directions <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 border border-white/20 px-7 py-4 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:border-[#ff0000] hover:text-[#ff0000] uppercase">
                <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="relative h-[360px] lg:h-auto lg:min-h-[480px]">
            <iframe
              title="Workshop location map"
              src={centre.embedUrl}
              className="absolute inset-0 h-full w-full grayscale invert opacity-70 contrast-125"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      <footer className="bg-[#050505] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="mx-auto mb-6 inline-block rounded-sm bg-white p-2"><img src={logoAsset} alt="Motoconnect" className="h-10 w-auto object-contain" /></span>
          <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">© 2026 MOTOCONNECT. UAE AUTOMOTIVE LEADERS.</p>
        </div>
      </footer>
    </div>
  );
}
