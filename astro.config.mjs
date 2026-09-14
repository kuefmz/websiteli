import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://websiteli.ch",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        const isRootRedirect = pathname === "/";
        const isTopLevelRedirect = /^\/(?:about|blog|portfolio|partners)\/?$/.test(pathname);
        const isTopLevelPartnerRedirect = /^\/partners\/event-organizers\/?$/.test(pathname);
        const isTopLevelWebsiteRedirect = /^\/websites\/[^/]+\/?$/.test(pathname);
        const isLegacyLocalizedServices = /^\/[a-z]{2}\/services\/?$/.test(pathname);
        const isLegacyPackages = /^\/(?:[a-z]{2}\/)?packages\/?$/.test(pathname);
        const isRedirectNamespace = /^\/(?:[a-z]{2}\/)?(?:demos|example-projects)(?:\/|$)/.test(pathname);
        // Service, industry and website-use-case detail copy is currently authored
        // in English only. Keep the generated compatibility routes out of the
        // sitemap so Google receives only the canonical English detail URLs.
        const isNonEnglishEnglishOnlyDetail =
          /^\/(?!en\/)[a-z]{2}\/(?:services|industries|websites)\/[^/]+\/?$/.test(pathname);

        return (
          !isRootRedirect &&
          !isTopLevelRedirect &&
          !isTopLevelPartnerRedirect &&
          !isTopLevelWebsiteRedirect &&
          !isLegacyLocalizedServices &&
          !isLegacyPackages &&
          !isRedirectNamespace &&
          !isNonEnglishEnglishOnlyDetail
        );
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
