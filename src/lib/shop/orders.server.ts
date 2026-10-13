/**
 * Turns a PAID Stripe Checkout session into a Zoho Books invoice + payment, then emails the invoice.
 *
 * Safe to run more than once for the same session (Stripe retries webhooks): the Stripe session id is stored as the
 * invoice's reference number, so an existing invoice is reused instead of creating a duplicate.
 */
import { env } from "./env.server";
import { shopConfig } from "./config";
import { retrieveCheckoutSession } from "./stripe.server";
import {
  createContact,
  createInvoice,
  emailInvoice,
  findContactByEmail,
  findInvoiceByReference,
  markInvoiceSent,
  recordPayment,
} from "./zoho.server";

// Zoho / Stripe responses are untyped JSON.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = any;

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dubai" }); // YYYY-MM-DD

const toAddress = (a?: Json) =>
  a
    ? {
        address: a.line1 ?? "",
        street2: a.line2 ?? "",
        city: a.city ?? "",
        state: a.state ?? "",
        zip: a.postal_code ?? "",
        country: a.country ?? "",
      }
    : undefined;

function customFieldValue(session: Json, key: string): string | undefined {
  const field = (session.custom_fields as Json[] | undefined)?.find((f) => f.key === key);
  const value = field?.text?.value;
  return value && String(value).trim() ? String(value).trim() : undefined;
}

export type SyncResult =
  | { status: "skipped"; reason: string }
  | { status: "ok"; invoiceId: string; invoiceNumber?: string; created: boolean; paymentRecorded: boolean };

export async function syncPaidSessionToZoho(sessionId: string): Promise<SyncResult> {
  const session = await retrieveCheckoutSession(sessionId);
  if (session.payment_status !== "paid") return { status: "skipped", reason: `payment_status is ${session.payment_status}` };

  const details: Json = session.customer_details ?? {};
  const email: string | undefined = details.email;
  if (!email) throw new Error(`Session ${session.id} has no customer email`);

  const shipping: Json | undefined = session.shipping_details ?? session.collected_information?.shipping_details;
  const company = customFieldValue(session, "company_name");
  const trn = customFieldValue(session, "trn");
  const paymentIntentId: string = typeof session.payment_intent === "string" ? session.payment_intent : (session.payment_intent?.id ?? session.id);

  // ---- invoice lines (from the product metadata we attached at checkout) ----
  const lines = ((session.line_items?.data as Json[]) ?? []).map((li) => {
    const meta: Json = li.price?.product?.metadata ?? {};
    if (!meta.zoho_item_id) throw new Error(`Session ${session.id} has a line without a Zoho item id`);
    const rate = Number(meta.zoho_rate);
    if (!Number.isFinite(rate)) throw new Error(`Session ${session.id} line ${meta.zoho_item_id} has no valid rate`);
    return { item_id: meta.zoho_item_id, quantity: li.quantity ?? 1, rate };
  });
  if (lines.length === 0) throw new Error(`Session ${session.id} has no line items`);

  // ---- reuse an existing invoice for this session (idempotency) ----
  let invoice = await findInvoiceByReference(session.id);
  let created = false;

  if (!invoice) {
    const existing = await findContactByEmail(email);
    const contact =
      existing ??
      (await createContact({
        contact_name: company ?? details.name ?? email,
        company_name: company,
        contact_type: "customer",
        customer_sub_type: company ? "business" : "individual",
        contact_persons: [
          {
            first_name: (details.name ?? "").split(" ")[0] || undefined,
            last_name: (details.name ?? "").split(" ").slice(1).join(" ") || undefined,
            email,
            phone: details.phone,
            is_primary_contact: true,
          },
        ],
        billing_address: toAddress(details.address),
        shipping_address: toAddress(shipping?.address),
        // Only when the customer supplied a TRN. Confirm field names against the live Books organisation.
        ...(trn ? { tax_treatment: "vat_registered", tax_reg_no: trn } : {}),
      }));

    const deliveryFee = (session.total_details?.amount_shipping ?? 0) / 100;
    invoice = await createInvoice({
      customer_id: contact.contact_id,
      reference_number: session.id,
      date: today(),
      is_inclusive_tax: shopConfig.pricesIncludeVat,
      line_items: lines,
      ...(deliveryFee > 0 ? { shipping_charge: deliveryFee } : {}),
      notes: `Online order, paid by card via Stripe. Payment reference: ${paymentIntentId}`,
    });
    created = true;
  }

  const invoiceId: string = invoice.invoice_id;
  if (created || invoice.status === "draft") await markInvoiceSent(invoiceId);

  // ---- record the payment (skip if a previous attempt already did) ----
  const balance = created ? Number(invoice.total) : Number(invoice.balance ?? invoice.total);
  let paymentRecorded = false;
  if (balance > 0) {
    const paid = (session.amount_total ?? 0) / 100;
    if (Math.abs(paid - Number(invoice.total)) > 0.01) {
      console.warn(`[shop] Amount mismatch on ${session.id}: Stripe ${paid} vs Books invoice ${invoice.total}. Check VAT/price settings.`);
    }
    await recordPayment({
      customer_id: invoice.customer_id,
      payment_mode: env("ZOHO_BOOKS_PAYMENT_MODE") ?? "creditcard",
      amount: Math.min(paid, balance),
      date: today(),
      reference_number: paymentIntentId,
      description: "Stripe online payment",
      invoices: [{ invoice_id: invoiceId, amount_applied: Math.min(paid, balance) }],
      ...(env("ZOHO_BOOKS_DEPOSIT_ACCOUNT_ID") ? { account_id: env("ZOHO_BOOKS_DEPOSIT_ACCOUNT_ID") } : {}),
    });
    paymentRecorded = true;

    // Email the (now paid) invoice. A failure here must not undo the sync, so it is only logged.
    try {
      await emailInvoice(invoiceId, [email]);
    } catch (error) {
      console.error(`[shop] Invoice ${invoiceId} was created and paid but could not be emailed`, error);
    }
  }

  return { status: "ok", invoiceId, invoiceNumber: invoice.invoice_number, created, paymentRecorded };
}
