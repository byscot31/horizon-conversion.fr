import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://animaux.horizon-conversion.fr",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/merci/") && !page.includes("/test/")
    })
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
