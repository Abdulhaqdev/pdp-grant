"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { monthlyScoresService } from "@/services/monthly-scores.service";

export interface UpdateTutorScoreInput {
  student_id: number;
  user_id: number;
  month: number;
  year: number;
  tutor_score: number;
}

export function useUpdateTutorScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTutorScoreInput) =>
      monthlyScoresService.updateTutorScore(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.monthlyScores.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyScores.performance(variables.user_id),
      });
      toast.success("Tutor score saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
