// src/content/config.ts
import { defineCollection, z } from "astro:content";

const intentions = defineCollection({
  type: "data",
  schema: z.any(),
});

const personas = defineCollection({
  type: "data",
  schema: z.any(),
});

export const collections = {
  intentions,
  personas,
};
