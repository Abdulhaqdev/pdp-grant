"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { leaderboardService } from "@/services/leaderboard.service";

const DEFAULT_LEADERBOARD_PARAMS = { limit: 100, page: 1 } as const;

export function useLeaderboard(
  params: { limit?: number; page?: number } = DEFAULT_LEADERBOARD_PARAMS
) {
  return useQuery({
    queryKey: queryKeys.leaderboard.list(params),
    queryFn: () => leaderboardService.getLeaderboard(params),
  });
}
