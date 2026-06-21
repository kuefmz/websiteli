import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://websiteli.ch",
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        ignored: ["**/.vercel/**", "**/dist/**", "**/.astro/**", "**/node_modules/**"],
      },
    },
  },
});
