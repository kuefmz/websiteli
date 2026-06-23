import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://websiteli.ch",
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
        ignored: ["**/.vercel/**", "**/dist/**", "**/.astro/**", "**/node_modules/**", "**/.git/**"],
      },
    },
  },
});
