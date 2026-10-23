// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";
import { resolve } from "node:path";

// Make non-VITE_ variables from .env / .env.local (Zoho + Stripe keys) available to server code while developing.
// In production the hosting provider's environment variables are used instead.
for (const [key, value] of Object.entries(loadEnv("development", process.cwd(), ""))) {
  if (!(key in process.env)) process.env[key] = value;
}

export default defineConfig({
  // Cloudflare only: the KV store the shop uses to remember the Zoho login and the last good catalogue.
  // (Nitro accepts this at build time; the wrapper's type for `nitro` just does not list it.)
  nitro: {
    // Daily catalogue sync from Zoho Books: 02:00 UTC = 06:00 in Dubai (src/tasks/shop-sync.ts).
    experimental: { tasks: true },
    tasks: { "shop:sync": { handler: resolve(process.cwd(), "src/tasks/shop-sync.ts") } },
    scheduledTasks: { "0 2 * * *": ["shop:sync"] },
    cloudflare: {
      wrangler: {
        kv_namespaces: [{ binding: "SHOP_CACHE", id: "a537a3a2db8a468583b2db93b60a1df3" }],
      },
    },
  } as never,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
