# myst.nl

De website van Myst: detachering van senior cloud engineers op Azure, AWS en Google Cloud. Het is een statische site, zonder cookies en zonder analytics.

## Hoe de site is gebouwd

- [Astro](https://astro.build) met statische output, gewone CSS en geen UI framework.
- Teksten staan in `src/content` (artikelen, engineers, workshops, accenten) en in de pagina's onder `src/pages`.
- De lettertypen Manrope en JetBrains Mono worden zelf geserveerd vanuit `public/fonts`.
- De security headers en de CSP staan in `public/_headers`, de redirects in `public/_redirects`.
- Hosting op Cloudflare Workers, zie `wrangler.jsonc`.

## Zelf draaien

Je hebt Node.js 22.23.4 of nieuwer nodig.

```sh
npm install
npm run dev       # lokale ontwikkelserver
npm run build     # bouwt de site naar dist/
npm run preview   # bekijkt de gebouwde site lokaal
npm run og        # maakt de OG afbeeldingen in public/og opnieuw
```

`npm run og` is geen onderdeel van de build. Het script maakt `public/og/default.png` en een afbeelding per gepubliceerd artikel; de PNG's staan in de repository.

## Build variabelen

- `SITE_URL`: de basis-URL voor canonical links, OG metadata, de RSS feed, de sitemap en de tekst op de OG afbeeldingen. Standaard `https://myst.nl`. Zie `src/lib/site.mjs`.
- `NOINDEX`: bij `1` voegt de build `X-Robots-Tag: noindex` toe aan `dist/_headers`. Bedoeld voor testomgevingen. `robots.txt` blijft overal gelijk.

## Deploy

Elke push naar `main` start een build via Cloudflare Workers Builds. Die draait `npm run build` en publiceert de map `dist` als assets van de Worker, zoals vastgelegd in `wrangler.jsonc`. De commit waarmee de site is gebouwd staat onderaan elke pagina.

## Licentie

- **Code** (`src/` behalve de inhoud hieronder, `scripts/` en de configuratie): MIT, zie [LICENSE](LICENSE).
- **Inhoud** (alle teksten in `src/content/` en in de pagina's, de artikelen en de bio's van de engineers): © Myst B.V., alle rechten voorbehouden. Citeren met bronvermelding mag.
- **Merk** (naam, logo, huisstijl, ASCII logo en `public/og/`): © Myst B.V., niet vrij te gebruiken. De logo's van Microsoft Azure, Amazon Web Services en Google Cloud zijn merken van die partijen.
- **Fonts** (Manrope en JetBrains Mono): SIL Open Font License 1.1, zie [OFL-Manrope.txt](public/fonts/OFL-Manrope.txt) en [OFL-JetBrainsMono.txt](public/fonts/OFL-JetBrainsMono.txt) in `public/fonts`.
