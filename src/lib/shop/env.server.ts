/** Server-only helpers for reading configuration. Never import this from browser code. */

export const env = (name: string): string | undefined => {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
};

export const zohoConfigured = () =>
  Boolean(
    env("ZOHO_CLIENT_ID") && env("ZOHO_CLIENT_SECRET") && env("ZOHO_REFRESH_TOKEN") && env("ZOHO_BOOKS_ORG_ID"),
  );

export const stripeConfigured = () => Boolean(env("STRIPE_SECRET_KEY"));

/** Demo products are only used while developing (or when explicitly allowed), never silently in production. */
export const sampleDataAllowed = () =>
  process.env["NODE_ENV"] !== "production" || env("SHOP_SAMPLE_DATA") === "true";

/** Parse an optional JSON env var into an object (used for accountant-specific Zoho fields). */
export const envJson = (name: string): Record<string, unknown> => {
  const raw = env(name);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    console.error(`[shop] ${name} is not valid JSON and was ignored`);
    return {};
  }
};
