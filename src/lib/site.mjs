// Basis-URL voor alle absolute links (canonicals, OG, RSS, sitemap).
// Komt uit de build variabele SITE_URL; zonder die variabele geldt het productiedomein.
const ruw = (process.env.SITE_URL || "").trim() || "https://myst.nl";
let url;
try {
  url = new URL(ruw);
} catch {
  throw new Error(`SITE_URL is geen geldige URL: ${ruw}`);
}
export const SITE_URL = url.origin;
