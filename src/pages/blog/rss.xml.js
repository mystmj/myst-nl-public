import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_URL } from "../../lib/site.mjs";

export async function GET() {
  const artikelen = (await getCollection("artikelen", (a) => !a.data.concept))
    .sort((a, b) => Date.parse(b.data.datum) - Date.parse(a.data.datum));
  return rss({
    title: "Blog · Myst",
    description: "Over wat we tegenkomen in ons werk.",
    site: SITE_URL,
    items: artikelen.map((a) => ({
      title: a.data.titel,
      description: a.data.samenvatting,
      pubDate: new Date(a.data.datum),
      link: `/blog/${a.id}/`,
      author: a.data.auteur,
      categories: [a.data.categorie],
    })),
    customData: "<language>nl-nl</language>",
  });
}
