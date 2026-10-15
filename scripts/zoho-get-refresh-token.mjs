/**
 * One-time helper: exchanges the Zoho "Self Client" grant code for a permanent REFRESH TOKEN.
 *
 *   node scripts/zoho-get-refresh-token.mjs
 *
 * Run it in your own terminal. It asks for the values, prints the refresh token, and stores nothing.
 * Put the printed token into .env.local / the host's environment variables as ZOHO_REFRESH_TOKEN.
 */
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = createInterface({ input, output });
const regions = ["com", "eu", "in", "com.au", "jp", "sa", "ca"];
// Be forgiving: ".com", "zoho.com", " COM " all mean "com".
const region =
  (await rl.question("Zoho region (com, eu, in, com.au, jp, sa, ca) [com]: "))
    .trim()
    .toLowerCase()
    .replace(/^(https?:\/\/)?(accounts\.)?(zoho)?\.?/, "") || "com";
if (!regions.includes(region)) {
  console.error(`\n"${region}" is not a valid Zoho region. Use one of: ${regions.join(", ")}`);
  process.exit(1);
}
const clientId = (await rl.question("Client ID: ")).trim();
const clientSecret = (await rl.question("Client Secret: ")).trim();
const code = (await rl.question("Grant code (valid ~10 minutes): ")).trim();
rl.close();

const res = await fetch(`https://accounts.zoho.${region}/oauth/v2/token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "authorization_code", client_id: clientId, client_secret: clientSecret, code }),
});
const data = await res.json();

if (!data.refresh_token) {
  console.error("\nZoho did not return a refresh token:", data);
  console.error("Common causes: the grant code expired (create a new one), wrong region, or wrong client id/secret.");
  process.exit(1);
}
console.log("\nSuccess. Add this to your environment:\n");
console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token}\n`);
