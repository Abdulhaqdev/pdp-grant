"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { computeAdminStats } from "@/features/admin/lib/compute-stats";
import { certificatesService } from "@/services/certificates.service";
import { groupsService } from "@/services/groups.service";
import { leaderboardService } from "@/services/leaderboard.service";
import { mentorsService } from "@/services/mentors.service";
import { studentsService } from "@/services/students.service";

export function useAdminStats() {
  const query = useQuery({
    queryKey: queryKeys.admin.stats,
    queryFn: async () => {
      const [students, mentors, groups, certificates, leaderboard] =
        await Promise.all([
          studentsService.list({ limit: 500 }),
          mentorsService.list({ limit: 500 }),
          groupsService.list(),
          certificatesService.getPending(),
          leaderboardService.getLeaderboard(),
        ]);
      return computeAdminStats(
        students,
        mentors,
        groups,
        certificates,
        leaderboard
      );
    },
    staleTime: 2 * 60 * 1000,
  });

  return { stats: query.data, isLoading: query.isLoading, error: query.error, refetch: query.refetch };
}
