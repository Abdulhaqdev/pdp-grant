"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { monthlyScoresService } from "@/services/monthly-scores.service";
import type { MonthlyScoreCreate } from "@/types/monthly-score";

export function useCreateMonthlyScore(studentId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MonthlyScoreCreate) =>
      monthlyScoresService.create(payload),
    onSuccess: () => {
      if (studentId != null) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.monthlyScores.performance(studentId),
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.all });
      toast.success("Monthly score created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
