import { defineTask } from "nitro/task";

/** Scheduled by vite.config.ts (nitro.scheduledTasks): refresh the saved product catalogue from Zoho Books. */
export default defineTask({
  meta: { name: "shop:sync", description: "Download the product catalogue from Zoho Books and save it" },
  async run() {
    const { syncCatalog } = await import("../lib/shop/catalog.server");
    const result = await syncCatalog();
    console.log(`[shop] daily sync done: ${result.count} products`);
    return { result };
  },
});
