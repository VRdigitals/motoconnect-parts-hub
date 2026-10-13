import { env, zohoConfigured } from "./env.server";
import { verifyStripeSignature } from "./stripe.server";
import { syncPaidSessionToZoho } from "./orders.server";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * Stripe webhook entry point. Returns 200 only when the event was handled; any failure returns 5xx so Stripe
 * automatically retries (the sync is idempotent, so retries are safe).
 */
export async function handleStripeWebhook(request: Request): Promise<Response> {
  const secret = env("STRIPE_WEBHOOK_SECRET");
  if (!secret) return json({ error: "Webhook not configured" }, 503);

  const raw = await request.text();
  if (!(await verifyStripeSignature(raw, request.headers.get("stripe-signature"), secret))) {
    return json({ error: "Invalid signature" }, 400);
  }

  let event: { type: string; data: { object: { id: string } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid payload" }, 400);
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    if (!zohoConfigured()) {
      console.error("[shop] A payment arrived but Zoho Books is not configured; Stripe will retry.", event.data.object.id);
      return json({ error: "Zoho Books not configured" }, 503);
    }
    try {
      const result = await syncPaidSessionToZoho(event.data.object.id);
      console.log("[shop] order synced", event.data.object.id, result);
      return json({ received: true, result });
    } catch (error) {
      console.error("[shop] FAILED to sync paid order to Zoho Books", event.data.object.id, error);
      return json({ error: "Sync failed, will retry" }, 500);
    }
  }

  return json({ received: true, ignored: event.type });
}
