/**
 * LOCAL TEST HELPER - fake Zoho Books + Stripe servers on http://localhost:9099
 * Lets us test the full shop flow (catalog -> checkout -> webhook -> invoice -> payment -> email)
 * without real accounts. Never used in production.
 *
 *   node scripts/dev/mock-services.mjs
 *   GET http://localhost:9099/__state   -> everything the fake Zoho received
 */
import http from "node:http";

const PORT = 9099;
const state = { contacts: [], invoices: [], payments: [], emails: [], stripeSessions: {}, calls: [] };
let seq = 1;

// 1x1 transparent PNG
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");

const items = [
  { item_id: "1001", name: "Genuine Hero Brake Pad Set", sku: "BP-100", rate: 120, stock_on_hand: 10, available_stock: 10, status: "active", product_type: "goods", description: "Mock item one", category_name: "Brakes", image_document_id: "d1" },
  { item_id: "1002", name: "Spark Plug (Pack of 4)", sku: "SP-204", rate: 63, stock_on_hand: 2, available_stock: 2, status: "active", product_type: "goods", description: "Mock item two", category_name: "Ignition" },
  { item_id: "1003", name: "Out Of Stock Chain", sku: "CH-1", rate: 200, stock_on_hand: 0, available_stock: 0, status: "active", product_type: "goods", category_name: "Transmission" },
];

// Stripe sends nested bracket form data: a[b][0][c]=v  ->  { a: { b: [ { c: 'v' } ] } }
function parseNested(search) {
  const out = {};
  for (const [rawKey, value] of new URLSearchParams(search)) {
    const keys = rawKey.replace(/\]/g, "").split("[");
    let cur = out;
    keys.forEach((k, i) => {
      const last = i === keys.length - 1;
      if (last) cur[k] = value;
      else {
        cur[k] ??= /^\d+$/.test(keys[i + 1]) ? [] : {};
        cur = cur[k];
      }
    });
  }
  return out;
}

const json = (res, body, status = 200) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const readBody = (req) => new Promise((resolve) => { let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => resolve(b)); });

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const path = url.pathname;
    const raw = await readBody(req);
    state.calls.push(`${req.method} ${path}${url.search}`);

    if (path === "/__state") return json(res, state);

    /* ------------------------------ Zoho ------------------------------ */
    if (path === "/oauth/v2/token") return json(res, { access_token: "mock-access-token", expires_in: 3600 });

    if (path.startsWith("/books/v3")) {
      if (req.headers.authorization !== "Zoho-oauthtoken mock-access-token") return json(res, { code: 57, message: "bad token" }, 401);
      const p = path.replace("/books/v3", "");
      const body = raw ? JSON.parse(raw) : {};

      if (p === "/items" && req.method === "GET") return json(res, { code: 0, message: "success", items, page_context: { has_more_page: false } });
      let m;
      if ((m = p.match(/^\/items\/(\d+)\/image$/))) {
        if (m[1] !== "1001") return json(res, { code: 1, message: "no image" }, 404);
        res.writeHead(200, { "Content-Type": "image/png" });
        return res.end(PNG);
      }
      if ((m = p.match(/^\/items\/(\d+)$/))) {
        const item = items.find((i) => i.item_id === m[1]);
        return item ? json(res, { code: 0, item }) : json(res, { code: 1002, message: "not found" }, 404);
      }

      if (p === "/contacts" && req.method === "GET") {
        const email = url.searchParams.get("email");
        return json(res, { code: 0, contacts: state.contacts.filter((c) => c.email === email) });
      }
      if (p === "/contacts" && req.method === "POST") {
        const contact = { contact_id: `c${seq++}`, email: body.contact_persons?.[0]?.email, ...body };
        state.contacts.push(contact);
        return json(res, { code: 0, contact });
      }

      if (p === "/invoices" && req.method === "GET") {
        const ref = url.searchParams.get("reference_number");
        return json(res, { code: 0, invoices: state.invoices.filter((i) => i.reference_number === ref) });
      }
      if (p === "/invoices" && req.method === "POST") {
        const total = body.line_items.reduce((s, l) => s + l.rate * l.quantity, 0) + (body.shipping_charge ?? 0);
        const invoice = { invoice_id: `inv${seq++}`, invoice_number: `INV-${String(state.invoices.length + 1).padStart(5, "0")}`, status: "draft", total, balance: total, ...body };
        state.invoices.push(invoice);
        return json(res, { code: 0, invoice });
      }
      if ((m = p.match(/^\/invoices\/(\w+)\/status\/sent$/))) {
        state.invoices.find((i) => i.invoice_id === m[1]).status = "sent";
        return json(res, { code: 0, message: "sent" });
      }
      if ((m = p.match(/^\/invoices\/(\w+)\/email$/))) {
        state.emails.push({ invoice_id: m[1], ...body });
        return json(res, { code: 0, message: "emailed" });
      }
      if (p === "/customerpayments" && req.method === "POST") {
        const payment = { payment_id: `pay${seq++}`, ...body };
        state.payments.push(payment);
        for (const a of body.invoices ?? []) {
          const inv = state.invoices.find((i) => i.invoice_id === a.invoice_id);
          inv.balance = Math.max(0, +(inv.balance - a.amount_applied).toFixed(2));
          if (inv.balance === 0) inv.status = "paid";
        }
        return json(res, { code: 0, payment });
      }
      return json(res, { code: 5, message: `mock: unknown ${req.method} ${p}` }, 404);
    }

    /* ------------------------------ Stripe ------------------------------ */
    if (path === "/v1/checkout/sessions" && req.method === "POST") {
      const form = parseNested(raw);
      const id = `cs_test_mock${seq++}`;
      const lineItems = form.line_items.map((li) => ({
        quantity: Number(li.quantity),
        amount_total: Number(li.price_data.unit_amount) * Number(li.quantity),
        price: { unit_amount: Number(li.price_data.unit_amount), product: { name: li.price_data.product_data.name, metadata: li.price_data.product_data.metadata } },
      }));
      const amountTotal = lineItems.reduce((s, l) => s + l.amount_total, 0);
      state.stripeSessions[id] = {
        id, form, payment_status: "paid", amount_total: amountTotal, currency: "aed",
        customer_details: { email: "buyer@example.com", name: "Test Buyer", phone: "+971500000000", address: { line1: "Office 1", city: "Dubai", state: "Dubai", postal_code: "", country: "AE" } },
        shipping_details: { name: "Test Buyer", address: { line1: "Warehouse 5", city: "Sharjah", country: "AE" } },
        custom_fields: [{ key: "company_name", text: { value: "Test Garage LLC" } }, { key: "trn", text: { value: "100123456700003" } }],
        total_details: { amount_shipping: 0 },
        payment_intent: { id: `pi_mock${seq++}` },
        line_items: { data: lineItems },
      };
      return json(res, { id, url: `http://localhost:${PORT}/pay/${id}` });
    }
    let m2;
    if ((m2 = path.match(/^\/v1\/checkout\/sessions\/([\w]+)$/)) && req.method === "GET") {
      const s = state.stripeSessions[m2[1]];
      return s ? json(res, s) : json(res, { error: { message: "No such session" } }, 404);
    }
    if (path.startsWith("/pay/")) { res.writeHead(200, { "Content-Type": "text/html" }); return res.end("<h1>Mock Stripe payment page</h1>"); }

    json(res, { error: "unknown" }, 404);
  })
  .listen(PORT, () => console.log(`Mock Zoho + Stripe listening on http://localhost:${PORT}`));
