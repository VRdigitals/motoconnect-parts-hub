import { createFileRoute } from "@tanstack/react-router";

/**
 * Pulls the product catalogue from Zoho Books right now (instead of waiting for the daily 06:00 job).
 * Open https://YOUR-SITE/api/shop/refresh?key=SHOP_REFRESH_SECRET after adding or changing products in Books.
 * Allowed at most once every 5 minutes.
 */
export const Route = createFileRoute("/api/shop/refresh")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { env } = await import("@/lib/shop/env.server");
        const secret = env("SHOP_REFRESH_SECRET");
        const key = new URL(request.url).searchParams.get("key");
        const json = (body: unknown, status = 200) =>
          new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

        if (!secret || key !== secret) return json({ ok: false, message: "Not allowed" }, 403);
        const { sharedGet, sharedPut } = await import("@/lib/shop/shared-cache.server");
        if (await sharedGet("refresh-lock")) return json({ ok: false, message: "Refreshed a moment ago. Please wait a few minutes." }, 429);
        await sharedPut("refresh-lock", "1", 300);
        try {
          const { syncCatalog } = await import("@/lib/shop/catalog.server");
          return json({ ok: true, ...(await syncCatalog()) });
        } catch (error) {
          console.error("[shop] manual refresh failed", error);
          return json({ ok: false, message: "Zoho did not answer. Try again in a few minutes." }, 502);
        }
      },
    },
  },
});
