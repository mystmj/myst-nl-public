// Eenmalig draaien: node scripts/og.mjs
// Maakt public/og/default.png en een afbeelding per gepubliceerd artikel (1200 x 630).
// Niet onderdeel van de build; commit alleen de PNG's.
// De domeinnaam op de afbeelding komt uit SITE_URL (standaard myst.nl).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SITE_URL } from "../src/lib/site.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = (pkg, bestand) => readFileSync(join(root, "node_modules/@fontsource", pkg, "files", bestand));

const fonts = [
  { name: "Manrope", data: font("manrope", "manrope-latin-800-normal.woff"), weight: 800, style: "normal" },
  { name: "JetBrains Mono", data: font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"), weight: 500, style: "normal" },
];

// logo uit Logo.astro
const logoBron = readFileSync(join(root, "src/components/Logo.astro"), "utf8");
const logoSvg = logoBron.slice(logoBron.indexOf("<svg")).replace(/ role="img" aria-label="Myst"/, ' xmlns="http://www.w3.org/2000/svg"').replace(' class="logo"', "");
const logo = "data:image/svg+xml;base64," + Buffer.from(logoSvg).toString("base64");

const h = (type, style, children) => ({ type, props: { style, children } });

function kaart(titel) {
  const grootte = titel.length > 70 ? 56 : titel.length > 45 ? 66 : 76;
  return h("div", { display: "flex", flexDirection: "column", justifyContent: "space-between", width: 1200, height: 630, background: "#0B1026" }, [
    h("div", { display: "flex", flexDirection: "column", padding: "64px 72px 0" }, [
      { type: "img", props: { src: logo, width: 202, height: 56, style: { width: 202, height: 56 } } },
      h("div", { display: "flex", fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: 28, letterSpacing: 3, color: "#FF4DB0", marginTop: 56 }, "// blog"),
      h("div", { display: "flex", fontFamily: "Manrope", fontWeight: 800, fontSize: grootte, lineHeight: 1.12, color: "#FFFFFF", marginTop: 24, lineClamp: 3, maxWidth: 1000 }, titel),
    ]),
    h("div", { display: "flex", flexDirection: "column" }, [
      h("div", { display: "flex", justifyContent: "flex-end", padding: "0 72px 28px", fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: 24, color: "#A3ACC7" }, new URL(SITE_URL).host),
      h("div", { display: "flex", width: 1200, height: 8, backgroundImage: "linear-gradient(90deg, #E8008A, #136FEF 60%, rgba(19,111,239,0))", boxShadow: "0 0 28px 4px rgba(232,0,138,0.45)" }, ""),
    ]),
  ]);
}

async function maak(bestand, titel) {
  const svg = await satori(kaart(titel), { width: 1200, height: 630, fonts });
  writeFileSync(join(root, "public/og", bestand), new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng());
  console.log("public/og/" + bestand);
}

await maak("default.png", "Over wat we tegenkomen in ons werk.");

const map = join(root, "src/content/artikelen");
for (const f of readdirSync(map).filter((f) => f.endsWith(".md"))) {
  const kop = readFileSync(join(map, f), "utf8").split("---")[1];
  if (/^concept:\s*true/m.test(kop)) continue;
  const titel = kop.match(/^titel:\s*(.+)$/m)[1].trim().replace(/^["']|["']$/g, "");
  await maak(f.replace(/\.md$/, ".png"), titel);
}
