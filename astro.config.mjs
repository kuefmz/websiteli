import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://websiteli.ch",
  output: "server",
  adapter: vercel(),
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        ignored: ["**/.vercel/**", "**/dist/**", "**/.astro/**", "**/node_modules/**"],
      },
    },
  },
});
