import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://websiteli.ch",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        const isLegacyLocalizedServices = /^\/[a-z]{2}\/services\/?$/.test(pathname);
        const isLegacyPackages = /^\/(?:[a-z]{2}\/)?packages\/?$/.test(pathname);
        const isRedirectNamespace = /^\/(?:[a-z]{2}\/)?(?:demos|example-projects)(?:\/|$)/.test(pathname);

        return !isLegacyLocalizedServices && !isLegacyPackages && !isRedirectNamespace;
      },
    }),
  ],
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
