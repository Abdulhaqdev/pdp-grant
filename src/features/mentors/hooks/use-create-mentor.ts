"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { mentorsService } from "@/services/mentors.service";
import type { MentorCreate } from "@/types/mentor";

export function useCreateMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MentorCreate) => mentorsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Mentor muvaffaqiyatli yaratildi");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
