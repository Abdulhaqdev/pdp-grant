"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { monthlyScoresService } from "@/services/monthly-scores.service";
import type { MonthlyScoreUpdate } from "@/types/monthly-score";

export function useUpdateMonthlyScore(studentId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scoreId,
      payload,
    }: {
      scoreId: number;
      payload: MonthlyScoreUpdate;
    }) => monthlyScoresService.update(scoreId, payload),
    onSuccess: () => {
      if (studentId != null) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.monthlyScores.performance(studentId),
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.all });
      toast.success("Monthly score updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
