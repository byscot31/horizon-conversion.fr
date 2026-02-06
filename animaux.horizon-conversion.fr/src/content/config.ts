import { defineCollection, z } from "astro:content";

const services = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    pageType: z.literal("prestation").default("prestation"),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const metiers = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    pageType: z.literal("metier").default("metier"),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const zones = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    dept: z.string(),
    pageType: z.literal("ville").default("ville"),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    around: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { services, metiers, zones };