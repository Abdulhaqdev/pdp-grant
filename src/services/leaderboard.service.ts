import type { LeaderboardRow } from "@/types/leaderboard";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export interface LeaderboardQueryParams {
  limit?: number;
  page?: number;
}

export const leaderboardService = {
  async getLeaderboard(
    params: LeaderboardQueryParams = { limit: 100, page: 1 }
  ): Promise<LeaderboardRow[]> {
    const { data } = await apiClient.get<LeaderboardRow[]>(
      ENDPOINTS.leaderboard.list,
      {
        params: {
          limit: params.limit ?? 100,
          page: params.page ?? 1,
        },
      }
    );
    return data;
  },
};
