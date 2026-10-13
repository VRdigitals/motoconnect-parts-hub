import { createFileRoute } from "@tanstack/react-router";

/** Serves a product photo from Zoho Books through our own domain (Zoho's image URLs need a login). */
export const Route = createFileRoute("/api/shop/image/$itemId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { zohoConfigured } = await import("@/lib/shop/env.server");
        if (!zohoConfigured()) return new Response("Not found", { status: 404 });

        const { getItemImage } = await import("@/lib/shop/zoho.server");
        const upstream = await getItemImage(params.itemId).catch(() => null);
        if (!upstream) return new Response("Not found", { status: 404 });

        return new Response(upstream.body, {
          headers: {
            "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
