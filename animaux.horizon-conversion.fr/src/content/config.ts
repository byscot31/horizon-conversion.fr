import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const base = z.object({
  title: z.string(),
  h1: z.string(),
  metaDescription: z.string(),
  slug: z.string(),
  zone: z.string().optional(),
  cities: z.array(z.string()).optional(),
  metiers: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional()
});

export const collections = {
  services: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/services" }),
    schema: base.extend({ type: z.literal("service") })
  }),
  metiers: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/metiers" }),
    schema: base.extend({ type: z.literal("metier") })
  }),
  zones: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/zones" }),
    schema: base.extend({ type: z.literal("zone") })
  }),
  villes: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/villes" }),
    schema: base.extend({ type: z.literal("ville") })
  })
};
