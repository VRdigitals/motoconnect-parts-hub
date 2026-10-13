import { createFileRoute } from "@tanstack/react-router";

/** Stripe calls this URL after a payment: POST /api/stripe/webhook */
export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleStripeWebhook } = await import("@/lib/shop/webhook.server");
        return handleStripeWebhook(request);
      },
    },
  },
});
