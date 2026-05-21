import { getActiveMockProducts } from "@/features/pdp-market/data/mock-catalog";
import type { PdpMarketResponse } from "@/types/pdp-market";
import { pdpMarketService } from "@/services/pdp-market.service";

/** Products from shared mock catalog; points from API when available. */
export async function fetchPdpMarket(): Promise<PdpMarketResponse> {
  const products = getActiveMockProducts();

  try {
    const points = await pdpMarketService.getPoints();
    return { products, ...points };
  } catch {
    return {
      products,
      student_balance: 0,
      potential_points: 0,
    };
  }
}
