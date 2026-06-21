import type { APIRoute } from "astro";
import { getResolvedPricing } from "../../lib/pricing.server";

export const GET: APIRoute = ({ request }) => {
  return new Response(JSON.stringify(getResolvedPricing(request)), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-store",
    },
  });
};
