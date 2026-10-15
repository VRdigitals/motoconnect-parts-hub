import { createFileRoute } from "@tanstack/react-router";

/** /sitemap.xml: the main pages plus every product page, so search engines can find them all. */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { env } = await import("@/lib/shop/env.server");
        const { getCatalog } = await import("@/lib/shop/catalog.server");
        const origin = env("SITE_URL")?.replace(/\/$/, "") ?? new URL(request.url).origin;
        const catalog = await getCatalog().catch(() => null);

        const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const pages = ["/", "/about", "/products", "/shop", "/contact", "/distribution"].map((p) => `<url><loc>${esc(origin + p)}</loc></url>`);
        const products = (catalog?.source === "zoho" ? catalog.products : []).map((p) => `<url><loc>${esc(`${origin}/shop/${p.slug}`)}</loc></url>`);

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages, ...products].join("\n")}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
