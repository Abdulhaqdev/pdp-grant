"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { studentsService } from "@/services/students.service";
import type { StudentUpdate } from "@/types/student";

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: StudentUpdate }) =>
      studentsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.all });
      toast.success("Student updated successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
