import { getCollection } from "astro:content";
import { SITE_URL } from "../lib/site.mjs";

// Alle vaste pagina's volgen uit de bestanden in src/pages; artikelen komen uit de collectie.
const bestanden = import.meta.glob("./**/*.astro");
const vast = Object.keys(bestanden)
  .map((b) => b.slice(1).replace(/\.astro$/, "").replace(/\/index$/, "") || "/")
  .filter((p) => !p.includes("[") && p !== "/404");

export async function GET() {
  const artikelen = (await getCollection("artikelen", (a) => !a.data.concept)).map((a) => `/blog/${a.id}`);
  const paden = [...new Set([...vast, ...artikelen])].sort();
  const url = (p) => new URL(p === "/" ? "/" : p + "/", SITE_URL).href;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paden.map((p) => `  <url><loc>${url(p)}</loc></url>`).join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
