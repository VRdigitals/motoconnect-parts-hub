import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    title: "Contact Us | Motoconnect Group",
    meta: [
      { name: "description", content: "Get in touch with Motoconnect for inquiries about distribution, spare parts, and partnerships." },
      { property: "og:title", content: "Contact Us | Motoconnect Group" },
      { property: "og:description", content: "Reach out to the Motoconnect team for any queries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-black pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <span className="text-[#ff0000] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-none mb-8">
            Start a <br/> <span className="text-[#ff0000]">Connection</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Whether you're looking for genuine spare parts or interested in joining our distribution network, our team is ready to assist you.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-gray-100 shadow-sm relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 flex items-center justify-center -translate-y-6 translate-x-6 border border-gray-100 hidden md:flex">
              <MessageSquare size={32} className="text-[#ff0000]" />
            </div>
            
            <h2 className="text-3xl font-black italic uppercase mb-10 tracking-tight">Send a Message</h2>
            
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                  <input type="text" className="w-full border-b-2 border-gray-100 focus:border-[#ff0000] outline-none py-3 text-sm font-bold placeholder:font-normal placeholder:text-gray-300 transition-colors" placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                  <input type="email" className="w-full border-b-2 border-gray-100 focus:border-[#ff0000] outline-none py-3 text-sm font-bold placeholder:font-normal placeholder:text-gray-300 transition-colors" placeholder="e.g. john@company.ae" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Subject</label>
                <select className="w-full border-b-2 border-gray-100 focus:border-[#ff0000] outline-none py-3 text-sm font-bold bg-transparent cursor-pointer">
                  <option>Distribution Partnership</option>
                  <option>Spare Parts Inquiry</option>
                  <option>Technical Support</option>
                  <option>General Query</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Message</label>
                <textarea rows={5} className="w-full border-b-2 border-gray-100 focus:border-[#ff0000] outline-none py-3 text-sm font-bold placeholder:font-normal placeholder:text-gray-300 transition-colors" placeholder="How can we help your business?" />
              </div>
              
              <button className="w-full md:w-auto bg-[#ff0000] text-white px-12 py-5 font-black uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-3">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-black p-12 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0000] opacity-10 blur-3xl -translate-y-16 translate-x-16 group-hover:opacity-20 transition-opacity" />
              
              <h2 className="text-2xl font-black italic uppercase mb-12 tracking-tight">Direct Info</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white/5 flex items-center justify-center text-[#ff0000]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff0000] mb-2">Office Location</h3>
                    <p className="font-bold text-lg leading-tight uppercase italic">Warehouse 4, Logistics Park,<br/> Dubai, UAE</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white/5 flex items-center justify-center text-[#ff0000]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff0000] mb-2">Email Queries</h3>
                    <p className="font-bold text-lg leading-tight uppercase italic underline decoration-[#ff0000] underline-offset-8">contact@motoconnect.ae</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white/5 flex items-center justify-center text-[#ff0000]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff0000] mb-2">Call Center</h3>
                    <p className="font-bold text-lg leading-tight uppercase italic">+971 (0) 4 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 border border-gray-100 bg-gray-50">
              <h3 className="text-xl font-black italic uppercase mb-6 tracking-tight">Business Hours</h3>
              <div className="space-y-3 text-[13px] font-medium text-gray-500 uppercase tracking-widest">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span className="text-black font-bold">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-black font-bold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#ff0000] font-black italic">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

