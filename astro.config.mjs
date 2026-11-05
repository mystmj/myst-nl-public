import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "./src/lib/site.mjs";
import { voegNoindexToe } from "./scripts/noindex.mjs";

// Bij NOINDEX=1 krijgt elke respons X-Robots-Tag: noindex (testomgeving).
const noindex = {
  name: "noindex-header",
  hooks: {
    "astro:build:done": ({ dir }) => {
      if (process.env.NOINDEX !== "1") return;
      voegNoindexToe(fileURLToPath(new URL("_headers", dir)));
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  output: "static",
  build: { inlineStylesheets: "never" },
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [noindex],
});
