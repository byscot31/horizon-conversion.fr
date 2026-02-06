import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://horizon-conversion.fr",
    integrations: [sitemap()]
});