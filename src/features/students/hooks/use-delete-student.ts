"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { studentsService } from "@/services/students.service";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => studentsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.all });
      toast.success("Student deleted successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
