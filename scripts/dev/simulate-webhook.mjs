/**
 * LOCAL TEST HELPER - sends a correctly signed Stripe "checkout.session.completed" webhook to the local site.
 *   STRIPE_WEBHOOK_SECRET=whsec_xxx node scripts/dev/simulate-webhook.mjs cs_test_abc [http://localhost:8080]
 * Add --bad-signature to test that forged requests are rejected.
 */
import { createHmac } from "node:crypto";

const [sessionId, siteArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const site = siteArg ?? "http://localhost:8080";
const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_mock";
if (!sessionId) throw new Error("Usage: node simulate-webhook.mjs <checkout_session_id> [siteUrl]");

const payload = JSON.stringify({ id: "evt_test", type: "checkout.session.completed", data: { object: { id: sessionId } } });
const t = Math.floor(Date.now() / 1000);
const sig = process.argv.includes("--bad-signature") ? "0".repeat(64) : createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");

const res = await fetch(`${site}/api/stripe/webhook`, { method: "POST", headers: { "Content-Type": "application/json", "Stripe-Signature": `t=${t},v1=${sig}` }, body: payload });
console.log(res.status, await res.text());
