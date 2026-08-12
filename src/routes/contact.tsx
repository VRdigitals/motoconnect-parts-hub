import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, ArrowUpRight, Crown, Clock } from "lucide-react";
import { useState, useEffect } from "react";

import logoAsset from "../assets/hero-motoconnect.png.asset.json";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black font-raleway selection:bg-white selection:text-black min-h-screen">
      {/* Dynamic Navbar */}
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
                  name === "Contact" ? "text-[#ff0000]" : "text-white/80 hover:text-white"
                }`}
              >
                {name}
              </a>
            ))}
          </div>

          <a
            href="/#contact"
            className="hidden md:flex items-center gap-2 border border-[#ff0000] bg-[#ff0000]/10 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:bg-[#ff0000] uppercase"
          >
            GET A QUOTE
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

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
                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Office Location</h3>
                    <p className="font-podium text-lg leading-tight uppercase italic">Al Ghazal Mall, Showroom SG-15, Dubai, UAE</p>
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
      <section className="h-[500px] w-full border-t border-white/5">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.246913367469!2d55.2724718!3d25.237912599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436dbed49315%3A0x3110109b76ee9e78!2sMoto%20Connect%20-%20Hero%20Motorcycles-UAE!5e1!3m2!1sen!2sae!4v1786392199349!5m2!1sen!2sae" 
          className="w-full h-full grayscale invert opacity-70 contrast-125"
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="strict-origin-when-cross-origin"
        />
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


