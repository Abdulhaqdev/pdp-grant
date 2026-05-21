"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { mentorsService } from "@/services/mentors.service";

export function useDeleteMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mentorsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Mentor deleted successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
