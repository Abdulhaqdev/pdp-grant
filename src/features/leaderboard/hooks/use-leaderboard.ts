"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { leaderboardService } from "@/services/leaderboard.service";

export function useLeaderboard() {
  return useQuery({
    queryKey: queryKeys.leaderboard.all,
    queryFn: () => leaderboardService.getLeaderboard(),
  });
}
