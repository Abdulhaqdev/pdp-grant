"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { mentorsService } from "@/services/mentors.service";
import type { MentorUpdate } from "@/types/mentor";

export function useUpdateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: MentorUpdate }) =>
      mentorsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Mentor groups updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
