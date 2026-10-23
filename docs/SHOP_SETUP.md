# Online shop: setup guide

The shop reads products from **Zoho Books**, takes card payment with **Stripe Checkout**, and then creates the
**invoice and payment in Zoho Books** automatically (Books reduces stock and emails the invoice).

```
Zoho Books items --> /shop (cached) --> cart --> Stripe Checkout --> payment
                                                                        |
          invoice emailed  <-- Books invoice + payment  <-- /api/stripe/webhook
```

Until Zoho is connected the shop shows **demo products** in development, and "Shop opening soon" in production.
Until Stripe is connected, checkout shows "Online checkout is not switched on yet".

## 1. Zoho Books

1. In Zoho, sign in as (or create) a dedicated user for the website, e.g. `website@motoconnect.ae`, with permission to
   view items and create contacts, invoices and customer payments.
2. Open the API Console for your region (`https://api-console.zoho.<region>`), choose **Self Client** and note the
   **Client ID** and **Client Secret**.
3. In the Self Client, generate a **grant code** (10 minutes) with these scopes, then run
   `node scripts/zoho-get-refresh-token.mjs` to turn it into a permanent refresh token:
   ```
   ZohoBooks.items.READ,ZohoBooks.contacts.CREATE,ZohoBooks.contacts.READ,ZohoBooks.contacts.UPDATE,
   ZohoBooks.invoices.CREATE,ZohoBooks.invoices.READ,ZohoBooks.invoices.UPDATE,
   ZohoBooks.customerpayments.CREATE,ZohoBooks.customerpayments.READ,ZohoBooks.settings.READ
   ```
4. Find the **Organization ID** in Books: Settings > Organization Profile.
5. Put the values in `.env.local` (see `.env.example`) and on the host.

In Books, each item shown in the shop needs: a name, a **selling price above zero**, a photo, a **Brand** (the shop's
filter buttons are built from the Books *Brand* field; items with no brand or "Local Purchase" appear under "Other"),
and **inventory tracking on** (so stock reduces when the invoice is created).

What the shop shows: only items whose custom field **Item category** is `Spare Parts` (see `soldItemTypes` in
`src/lib/shop/config.ts`), with a price above 0, that can be sold and are active. Complete bikes, service/RTA/insurance
charges and any item with no Item category are therefore hidden. To show a part, set its Item category in Books.

**Photos:** upload web-sized images (about 100-300 KB, e.g. 1000 px wide). Photos are shown straight from Books, so
multi-megabyte originals make the shop slow.

## 2. Stripe

1. Verified Stripe account for the UAE business.
2. Put the **test** secret key in `STRIPE_SECRET_KEY` first.
3. Webhook: Stripe > Developers > Webhooks > add endpoint `https://YOUR-SITE/api/stripe/webhook` for
   `checkout.session.completed` and `checkout.session.async_payment_succeeded`; copy the signing secret into
   `STRIPE_WEBHOOK_SECRET`. For local testing: `stripe listen --forward-to localhost:8080/api/stripe/webhook`.
4. Test with card `4242 4242 4242 4242`, then switch to the live key.

## 3. Decisions to confirm (edit `src/lib/shop/config.ts`)

| Setting | Default | Meaning |
|---|---|---|
| `pricesIncludeVat` | `true` | Are Books prices VAT-inclusive? If `false`, 5% is added at checkout. |
| `deliveryFee` | `0` | Flat delivery fee in AED. |
| `allowedCountries` | `["AE"]` | Delivery countries accepted by Stripe. |

UAE VAT organisations in Books may require extra invoice/customer fields (e.g. place of supply, tax treatment). Set them
without code changes via `ZOHO_BOOKS_INVOICE_EXTRA` / `ZOHO_BOOKS_CONTACT_EXTRA` (JSON). Ask the accountant which apply.

## 3b. Product pages, descriptions and photos (kept in the website, Zoho Books is never changed)

- **Product URLs** use the product name: `/shop/adjuster-chain-bm-150`. Names that collide get the SKU appended. Old
  id-based links redirect (301) to the name URL. `/sitemap.xml` lists every product, and each page carries a canonical
  link, social-share tags and schema.org `Product` data (price, availability, brand, SKU).
- **Descriptions** live in `src/content/product-descriptions.json` (item id -> text). They were written for each part
  from its name, brand and part number only (what the part does, the bike model named in the item, genuine/brand line,
  part number); no specifications were invented. **Please have someone who knows the parts review them**, and edit the
  JSON directly. A description written in Books overrides ours for that item.
- **Photos:** `public/product-images/<itemId>.jpg`, listed in `src/content/product-images.json`. A local photo beats the
  Books photo. Items without a photo show their brand logo with "Photo coming soon".
  - `node scripts/sync-product-images.mjs` pulls every photo that exists in Books, shrinks it to ~900 px and saves it
    here (re-run after the team uploads photos in Books).
  - `node scripts/export-photo-list.mjs` writes a CSV of products still without photos (in stock first) with the exact
    file name to use.
  - `node scripts/import-product-photos.mjs <folder>` adds photos named by SKU (e.g. `DJ151036.jpg`) to the site.
  After any of these, commit and deploy.

## 4. How it protects you

- Prices and stock are re-read from Zoho at checkout; the browser cannot change a price.
- The webhook verifies Stripe's signature; forged requests get HTTP 400.
- The Stripe session id is stored as the invoice **reference number**, so a retried webhook never creates a second
  invoice or payment.
- If Zoho is unreachable, the webhook returns an error and **Stripe retries automatically** for days. The customer's
  payment is safe in Stripe meanwhile. Check the server logs for `[shop] FAILED to sync`.
- Secrets are only ever read on the server and are never sent to the browser.

## 5. Local testing without real accounts

```
node scripts/dev/mock-services.mjs      # fake Zoho Books + Stripe on :9099
# .env.local: ZOHO_API_BASE=http://localhost:9099/books/v3  ZOHO_ACCOUNTS_BASE=http://localhost:9099
#             STRIPE_API_BASE=http://localhost:9099  STRIPE_SECRET_KEY=sk_test_x  STRIPE_WEBHOOK_SECRET=whsec_mock
#             ZOHO_CLIENT_ID=x ZOHO_CLIENT_SECRET=x ZOHO_REFRESH_TOKEN=x ZOHO_BOOKS_ORG_ID=1
node scripts/dev/simulate-webhook.mjs cs_test_mock1   # sends a signed "payment completed" webhook
```

## 6. Not yet verified against a live account

Everything above was tested against local stand-ins that follow the Zoho Books and Stripe API documentation. The first
real test must check, in a Zoho **test/sandbox** organisation: item photos load, the invoice totals match Stripe
(`[shop] Amount mismatch` is logged if not), VAT/tax fields are accepted, and the invoice email arrives.


## How the product list stays up to date

- **Once a day, 06:00 Dubai time (02:00 UTC),** a scheduled job downloads all products from Zoho Books and saves them
  (Cloudflare KV store `SHOP_CACHE`). Every page of the shop reads that saved copy, so visitors never wait for Zoho and
  never use up Zoho's request limit (Zoho blocks too many token requests).
- **Refresh right now** (after adding products or changing prices/stock in Books): open the private link in
  `refresh-link.local` (git-ignored, in the project folder). It works at most once every 5 minutes.
- **Safety nets:** if the saved copy is missing or older than 36 hours the shop asks Zoho directly; if Zoho is
  unavailable it keeps showing the last saved copy (kept for 2 weeks) instead of an error.
- Change the time in `vite.config.ts` (`scheduledTasks`) and redeploy. Cron times are in UTC.
- Settings: `SHOP_REFRESH_SECRET` (the key in the refresh link), `SHOP_MAX_AGE_HOURS` (default 36), `SHOP_CACHE_SECONDS`
  (how often a server re-reads the saved copy, default 300).
