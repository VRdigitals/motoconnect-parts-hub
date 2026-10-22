import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, ArrowUpRight, Crown, Clock } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { branches } from "@/lib/branches";

import logoAsset from "../assets/hero-motoconnect.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    title: "Contact Us | Motoconnect UAE",
    meta: [
      { name: "description", content: "Get in touch with Motoconnect for inquiries about distribution, spare parts, and partnerships in the UAE." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      {/* Dynamic Navbar */}
      <SiteNav active="Contact" />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/10 via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <Crown className="h-5 w-5 text-[#ff0000]" />
            <span className="text-[#ff0000] text-xs font-bold uppercase tracking-[0.4em]">Get In Touch</span>
          </div>
          
          <h1 className="font-podium text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-left-12 duration-1000">
            START A <br />
            <span className="text-[#ff0000]">CONNECTION.</span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg text-white/60 leading-relaxed animate-in fade-in slide-in-from-left-16 duration-1000 delay-200 mx-auto md:mx-0">
            Whether you're looking for genuine spare parts or interested in joining our distribution network, our team is ready to assist you.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0000]/5 blur-3xl -translate-y-16 translate-x-16 group-hover:bg-[#ff0000]/10 transition-all duration-700" />
            
            <h2 className="font-podium text-4xl italic uppercase mb-10 tracking-tight text-white">Send a Message</h2>
            
            <form className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-[#ff0000] outline-none py-3 text-sm text-white transition-colors" placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 focus:border-[#ff0000] outline-none py-3 text-sm text-white transition-colors" placeholder="e.g. sales@company.ae" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Subject</label>
                <select className="w-full bg-transparent border-b border-white/20 focus:border-[#ff0000] outline-none py-3 text-sm text-white/60 cursor-pointer appearance-none">
                  <option className="bg-black text-white">Distribution Partnership</option>
                  <option className="bg-black text-white">Spare Parts Inquiry</option>
                  <option className="bg-black text-white">Technical Support</option>
                  <option className="bg-black text-white">General Query</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Message</label>
                <textarea rows={5} className="w-full bg-transparent border-b border-white/20 focus:border-[#ff0000] outline-none py-3 text-sm text-white transition-colors" placeholder="How can we help your business?" />
              </div>
              
              <button className="w-full md:w-auto bg-[#ff0000] text-white px-12 py-5 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group">
                Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#ff0000] p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-black/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-black/20 transition-all duration-700" />
              
              <h2 className="font-podium text-2xl italic uppercase mb-12 tracking-tight">Direct Info</h2>
              
              <div className="space-y-10 relative z-10">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white/10 flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div className="space-y-6">
                    {branches.map((branch) => (
                      <div key={branch.id}>
                        <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">{branch.city} Branch</h3>
                        {branch.name && (
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80 mb-1">{branch.name}</p>
                        )}
                        <p className="font-podium text-lg leading-tight uppercase italic">{branch.address}</p>
                        <a
                          href={branch.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white/10 flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Email Queries</h3>
                    <a href="mailto:sales@motoconnect.ae" className="font-podium text-lg leading-tight uppercase italic hover:underline decoration-white/30">sales@motoconnect.ae</a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white/10 flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Call Us</h3>
                    <a href="tel:+971566561083" className="font-podium text-lg leading-tight uppercase italic hover:underline decoration-white/30">+971 56 656 1083</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="h-5 w-5 text-[#ff0000]" />
                <h3 className="font-podium text-xl italic uppercase tracking-tight text-white">Business Hours</h3>
              </div>
              <div className="space-y-4 text-[12px] font-medium text-white/40 uppercase tracking-[0.2em]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>Mon - Fri</span>
                  <span className="text-white font-bold italic">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>Saturday</span>
                  <span className="text-white font-bold italic">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunday</span>
                  <span className="text-[#ff0000] font-black italic">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="grid w-full grid-cols-1 md:grid-cols-2 border-t border-white/5">
        {branches.map((branch) => (
          <div key={branch.id} className="relative h-[360px] md:h-[500px] w-full border-b md:border-b-0 md:border-r last:border-r-0 border-white/5">
            <iframe
              title={`${branch.city} branch map`}
              src={branch.embedUrl}
              className="w-full h-full grayscale invert opacity-70 contrast-125"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="pointer-events-none absolute left-4 top-4 bg-black/80 px-4 py-2 border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">{branch.city}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Simplified Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
            © 2026 MOTOCONNECT. UAE AUTOMOTIVE LEADERS.
          </p>
        </div>
      </footer>
    </div>
  );
}


