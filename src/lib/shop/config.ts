/**
 * Shop settings that are safe to share with the browser.
 * Secrets (Zoho / Stripe keys) are NOT here - they are read from environment variables on the server only.
 * See .env.example and docs/SHOP_SETUP.md.
 */
export const shopConfig = {
  /**
   * How customers order.
   *  - "whatsapp": add to cart, then send the whole cart to the shop as a WhatsApp message (no online payment).
   *  - "online"  : pay by card through Stripe Checkout (needs the Stripe keys; see docs/SHOP_SETUP.md).
   */
  checkoutMode: "whatsapp" as "whatsapp" | "online",
  /** WhatsApp number orders are sent to, international format without "+". CONFIRM WITH THE CLIENT. */
  whatsappNumber: "971566561083",
  currency: "AED",
  /** UAE VAT. */
  vatRate: 0.05,
  /**
   * Are the prices stored in Zoho Books already VAT-inclusive?
   *  - true : customers pay exactly the Books price; the invoice is created as tax-inclusive.
   *  - false: 5% VAT is added on top at checkout.
   * Client confirmed Books prices are EXCLUSIVE of VAT. The website never mentions VAT and shows the price as it is;
   * this only matters if online card checkout is switched on (checkoutMode "online").
   */
  pricesIncludeVat: false,
  /** Flat delivery fee in AED. 0 = free delivery. CONFIRM WITH THE CLIENT. */
  deliveryFee: 0,
  /** Countries Stripe Checkout will accept delivery addresses for. */
  allowedCountries: ["AE"] as string[],
  /**
   * Only items whose Books custom field "Item category" is one of these are sold online. This keeps complete
   * motorcycles, service/RTA/insurance charges and other accounting items out of the shop. Parts with no
   * Item category set in Books are not shown until the team sets it.
   */
  soldItemTypes: ["Spare Parts"] as string[],
  /** Extra safety net: names matching these are never shown (complete bikes listed as parts, service packages). */
  hiddenNamePatterns: [/^(hero|honda|bajaj|tvs)\s[\w\s.\-']*\b\d{2,3}\s?cc\s*$/i, /service package/i] as RegExp[],
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
