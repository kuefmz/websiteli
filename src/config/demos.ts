export const demos = {
  shopifyConsultantPortfolio: {
    liveUrl: "https://kuefmz.github.io/websiteli-portfolio-demo/",
  },
  jeniferCiuciuKiss: {
    liveUrl: "https://jeniferciuciukiss.com",
  },
} as const;

export type DemoKey = keyof typeof demos;
