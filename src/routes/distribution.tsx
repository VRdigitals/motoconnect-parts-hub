import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Warehouse, BarChart3, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/distribution")({
  head: () => ({
    title: "Distribution | Motoconnect UAE Network",
    meta: [
      { name: "description", content: "Explore Motoconnect's robust distribution network and supply chain capabilities across the UAE." },
      { property: "og:title", content: "Distribution | Motoconnect UAE Network" },
      { property: "og:description", content: "Efficient logistics and regional supply chain solutions by Motoconnect." },
    ],
  }),
  component: DistributionPage,
});

function DistributionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-black pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff0000]/5 -skew-x-12 translate-x-32" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <span className="text-[#ff0000] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Regional Logistics</span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-[0.9] mb-8">
            Powering the <br/> <span className="text-[#ff0000]">Supply Chain</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Motoconnect operates a sophisticated distribution network that ensures every component reaches its destination with speed and precision.
          </p>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-20 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "500+", label: "Retail Partners" },
              { val: "24H", label: "UAE Delivery" },
              { val: "10K+", label: "SKUs Managed" },
              { val: "7", label: "Regional Hubs" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-6xl font-black italic text-[#ff0000] mb-2">{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none">
                Integrated <span className="text-gray-400">Warehousing</span> & Logistics
              </h2>
              
              <div className="space-y-10">
                {[
                  { icon: Warehouse, title: "Smart Warehousing", desc: "Temperature-controlled, high-capacity facilities with real-time inventory management." },
                  { icon: Truck, title: "Express Fleet", desc: "Dedicated logistics fleet covering the entire UAE with same-day or next-day fulfillment." },
                  { icon: BarChart3, title: "Supply Visibility", desc: "Full end-to-end tracking for our partners to monitor stock levels and delivery status." },
                  { icon: Clock, title: "Efficiency First", desc: "Optimized routing and automated sorting to minimize lead times and maximize reliability." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 bg-gray-50 flex items-center justify-center text-[#ff0000] border border-gray-100">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase italic mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Warehouse" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#ff0000] p-12 text-white hidden xl:block">
                <p className="text-3xl font-black italic uppercase leading-tight mb-4">Optimized <br/> For Speed</p>
                <div className="w-12 h-1 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-black italic uppercase mb-16">Join Our Distribution Network</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left mb-16">
            <div className="border border-white/10 p-10 hover:border-[#ff0000] transition-colors group">
              <span className="text-4xl font-black italic text-white/10 group-hover:text-[#ff0000]/30 block mb-6 transition-colors">01.</span>
              <h3 className="text-xl font-bold uppercase mb-4 italic">Verification</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Rigorous selection of authorized retailers to maintain the integrity of the Hero brand.</p>
            </div>
            <div className="border border-white/10 p-10 hover:border-[#ff0000] transition-colors group">
              <span className="text-4xl font-black italic text-white/10 group-hover:text-[#ff0000]/30 block mb-6 transition-colors">02.</span>
              <h3 className="text-xl font-bold uppercase mb-4 italic">Onboarding</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Direct access to our digital portal for simplified bulk ordering and catalog management.</p>
            </div>
            <div className="border border-white/10 p-10 hover:border-[#ff0000] transition-colors group">
              <span className="text-4xl font-black italic text-white/10 group-hover:text-[#ff0000]/30 block mb-6 transition-colors">03.</span>
              <h3 className="text-xl font-bold uppercase mb-4 italic">Growth</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Dedicated account managers and technical training to ensure your business thrives.</p>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-4 bg-[#ff0000] text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Inquire About Partnership <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

