/**
 * Shop settings that are safe to share with the browser.
 * Secrets (Zoho / Stripe keys) are NOT here - they are read from environment variables on the server only.
 * See .env.example and docs/SHOP_SETUP.md.
 */
export const shopConfig = {
  currency: "AED",
  /** UAE VAT. */
  vatRate: 0.05,
  /**
   * Are the prices stored in Zoho Books already VAT-inclusive?
   *  - true : customers pay exactly the Books price; the invoice is created as tax-inclusive.
   *  - false: 5% VAT is added on top at checkout.
   * CONFIRM WITH THE CLIENT / ACCOUNTANT before going live.
   */
  pricesIncludeVat: true,
  /** Flat delivery fee in AED. 0 = free delivery. CONFIRM WITH THE CLIENT. */
  deliveryFee: 0,
  /** Countries Stripe Checkout will accept delivery addresses for. */
  allowedCountries: ["AE"] as string[],
  /** Show "Only N left" when stock is at or below this level. */
  lowStockThreshold: 5,
  /** Max quantity of one product in a cart line (also capped by stock). */
  maxQtyPerLine: 99,
};

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-AE", { style: "currency", currency: shopConfig.currency }).format(amount);

/** Amount actually charged for a unit priced `price` in Zoho (adds VAT when prices are ex-VAT). */
export const chargedUnitPrice = (price: number) =>
  shopConfig.pricesIncludeVat ? price : price * (1 + shopConfig.vatRate);
