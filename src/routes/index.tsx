import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MotoconnectHome,
});

function MotoconnectHome() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="flex items-center justify-between p-6 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold">M</div>
          <span className="text-xl font-bold tracking-tight">Motoconnect</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-neutral-400">
          <a href="#" className="hover:text-white">Distribution</a>
          <a href="#" className="hover:text-white">Spare Parts</a>
          <a href="#" className="hover:text-white">About Us</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center py-20">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tighter">
            Powering Your Ride with <span className="text-red-600">Precision</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Leading distributors of Hero Motocorp and premium spare parts brands.
          </p>
          <button className="bg-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition">
            Explore Catalog
          </button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-12">
          {["UNO Minda", "Hero Genuine", "Steelbird"].map((brand) => (
            <div key={brand} className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 hover:border-red-600 transition shadow-xl">
              <div className="h-40 bg-neutral-800 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-neutral-500 font-bold">{brand} 3D Placeholder</span>
              </div>
              <h3 className="text-xl font-bold">{brand}</h3>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
