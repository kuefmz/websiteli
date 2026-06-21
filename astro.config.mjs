import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://websiteli.ch",
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        ignored: ["**/.vercel/**", "**/dist/**", "**/.astro/**", "**/node_modules/**"],
      },
    },
  },
});
