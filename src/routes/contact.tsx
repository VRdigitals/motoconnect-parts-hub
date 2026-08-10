import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 italic tracking-tighter uppercase">Get In Touch</h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-12 shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Name</label>
                <input type="text" className="w-full border-b-2 border-gray-200 focus:border-[#ff0000] outline-none py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                <input type="email" className="w-full border-b-2 border-gray-200 focus:border-[#ff0000] outline-none py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea rows={4} className="w-full border-b-2 border-gray-200 focus:border-[#ff0000] outline-none py-2" />
              </div>
              <button className="bg-[#ff0000] text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-8 p-12">
            <div>
              <h3 className="text-[#ff0000] font-bold text-xs uppercase tracking-widest mb-4">Headquarters</h3>
              <p className="font-bold text-xl uppercase italic">Dubai, United Arab Emirates</p>
            </div>
            <div>
              <h3 className="text-[#ff0000] font-bold text-xs uppercase tracking-widest mb-4">Email</h3>
              <p className="font-bold text-xl uppercase italic">sales@motoconnect.ae</p>
            </div>
            <div>
              <h3 className="text-[#ff0000] font-bold text-xs uppercase tracking-widest mb-4">Phone</h3>
              <p className="font-bold text-xl uppercase italic">+971 4 000 0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
