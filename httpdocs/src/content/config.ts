// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(), // accepte "2026-01-17"
        draft: z.boolean().optional().default(false),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional().default([]),
    }),
});

export const collections = { blog };