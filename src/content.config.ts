import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const artikelen = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/artikelen" }),
  schema: z.object({
    titel: z.string(),
    // YAML leest 2026-10-29 als datum; we bewaren het als ISO-tekst
    datum: z.union([z.string(), z.date().transform((d) => d.toISOString().slice(0, 10))]),
    auteur: z.string(),
    categorie: z.string(),
    samenvatting: z.string(),
    concept: z.boolean().default(false),
    volgorde: z.number(),
    afbeelding: z.string().optional(),
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/workshops" }),
  schema: z.object({
    titel: z.string(),
    ondertitel: z.string(),
    samenvatting: z.string(),
    programma: z.array(z.string()),
    doelgroep: z.string(),
    vereisten: z.array(z.string()),
    doelstellingen: z.array(z.string()),
    via: z.string(),
    link: z.string(),
    volgorde: z.number(),
  }),
});

const accenten = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/accenten" }),
  schema: z.object({
    titel: z.string(),
    zin: z.string(),
    verantwoordelijkheden: z.array(z.string()).length(3),
    volgorde: z.number(),
  }),
});

const engineers = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/engineers" }),
  schema: z.object({
    voornaam: z.string(),
    titel: z.string(),
    tekst: z.string(),
    bouwtHetLiefstAan: z.string(),
    chips: z.array(z.string()),
    certs: z.array(z.string()),
    buitenHetWerk: z.string().optional(),
    concept: z.boolean().default(true),
    volgorde: z.number(),
  }),
});

export const collections = {
  workshops, artikelen, accenten, engineers };
