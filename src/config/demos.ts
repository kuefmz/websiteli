export const demos = {
  restaurant: {
    liveUrl: "https://yourusername.github.io/demo-restaurant",
  },
  consultant: {
    liveUrl: "https://yourusername.github.io/demo-consultant",
  },
  localService: {
    liveUrl: "https://yourusername.github.io/demo-local-service",
  },
  aiAssistant: {
    liveUrl: "https://yourusername.github.io/demo-ai-assistant",
  },
  analyticsDashboard: {
    liveUrl: "https://yourusername.github.io/demo-dashboard",
  },
} as const;

export type DemoKey = keyof typeof demos;
