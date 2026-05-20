import type { LeaderboardRow } from "@/types/leaderboard";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const leaderboardService = {
  async getLeaderboard(): Promise<LeaderboardRow[]> {
    const { data } = await apiClient.get<LeaderboardRow[]>(
      ENDPOINTS.leaderboard
    );
    return data;
  },
};
