// src/content/config.ts
import { defineCollection, z } from "astro:content";

const site = defineCollection({
  type: "data",
  schema: z.any(),
});

const prestations = defineCollection({
  type: "data",
  schema: z.any(),
});

const metiers = defineCollection({
  type: "data",
  schema: z.any(),
});

const zones = defineCollection({
  type: "data",
  schema: z.any(),
});

const villes = defineCollection({
  type: "data",
  schema: z.any(),
});

const ressources = defineCollection({
  type: "data",
  schema: z.any(),
});

const personas = defineCollection({
  type: "data",
  schema: z.any(),
});

const intentions = defineCollection({
  type: "data",
  schema: z.any(),
});

export const collections = {
  site,
  prestations,
  metiers,
  zones,
  villes,
  ressources,
  personas,
  intentions,
};
