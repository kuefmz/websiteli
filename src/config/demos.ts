export const demos = {
  shopifyConsultantPortfolio: {
    liveUrl: "https://kuefmz.github.io/websiteli-portfolio-demo/",
  },
  jeniferCiuciuKiss: {
    liveUrl: "https://jeniferciuciukiss.com/?utm_source=websiteli&utm_medium=portfolio&utm_campaign=demo_project",
  },
} as const;

export type DemoKey = keyof typeof demos;
