// @ts-check
import { defineConfig } from 'astro/config';
<<<<<<< HEAD

// https://astro.build/config
export default defineConfig({});
=======
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://avocats.horizon-conversion.fr",
  trailingSlash: "never",
  integrations: [sitemap()],
});
>>>>>>> origin/master
