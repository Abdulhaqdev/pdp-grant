import type { PdpMarketResponse } from "@/types/pdp-market";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export async function fetchPdpMarketPoints(): Promise<
  Pick<PdpMarketResponse, "student_balance" | "potential_points">
> {
  const { data } = await apiClient.get<
    Pick<PdpMarketResponse, "student_balance" | "potential_points">
  >(ENDPOINTS.leaderboard.pdpMarket);
  return {
    student_balance: data.student_balance ?? 0,
    potential_points: data.potential_points ?? 0,
  };
}

export const pdpMarketService = {
  getPoints: fetchPdpMarketPoints,
};
