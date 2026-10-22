/**
 * Small key/value cache that survives restarts and is shared between server instances, so the shop does not
 * log in to Zoho and re-download the whole catalogue every time a server instance starts.
 *
 *  - Cloudflare: a KV namespace bound as SHOP_CACHE (see wrangler config in vite.config.ts).
 *  - Local development: files in .cache/ (git-ignored).
 *  - Anything else: in memory only.
 * Every call is best-effort: a cache problem never breaks a page.
 */

interface KvLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

let kvPromise: Promise<KvLike | null> | undefined;

function getKv(): Promise<KvLike | null> {
  kvPromise ??= (async () => {
    try {
      const specifier = "cloudflare:workers"; // only exists inside Cloudflare Workers
      const mod = (await import(/* @vite-ignore */ specifier)) as { env?: Record<string, unknown> };
      const kv = mod.env?.["SHOP_CACHE"] as KvLike | undefined;
      return kv && typeof kv.get === "function" ? kv : null;
    } catch {
      return null;
    }
  })();
  return kvPromise;
}

const memory = new Map<string, { value: string; expiresAt: number }>();

const fileFor = async (key: string) => {
  const path = await import(/* @vite-ignore */ "node:path");
  return path.join(process.cwd(), ".cache", `${key.replace(/[^a-z0-9._-]/gi, "_")}.json`);
};

export async function sharedGet(key: string): Promise<string | null> {
  const m = memory.get(key);
  if (m && m.expiresAt > Date.now()) return m.value;
  try {
    const kv = await getKv();
    if (kv) return await kv.get(key);
    if (process.env["NODE_ENV"] !== "production") {
      const fs = await import(/* @vite-ignore */ "node:fs/promises");
      const raw = JSON.parse(await fs.readFile(await fileFor(key), "utf8")) as { value: string; expiresAt: number };
      return raw.expiresAt > Date.now() ? raw.value : null;
    }
  } catch {
    /* miss */
  }
  return null;
}

export async function sharedPut(key: string, value: string, ttlSeconds: number): Promise<void> {
  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  try {
    const kv = await getKv();
    if (kv) {
      await kv.put(key, value, { expirationTtl: Math.max(60, Math.floor(ttlSeconds)) });
    } else if (process.env["NODE_ENV"] !== "production") {
      const fs = await import(/* @vite-ignore */ "node:fs/promises");
      const file = await fileFor(key);
      await fs.mkdir((await import(/* @vite-ignore */ "node:path")).dirname(file), { recursive: true });
      await fs.writeFile(file, JSON.stringify({ value, expiresAt: Date.now() + ttlSeconds * 1000 }));
    }
  } catch {
    /* best effort */
  }
}
