"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { studentsService } from "@/services/students.service";
import type { StudentCreate } from "@/types/student";

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StudentCreate) => studentsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Talaba muvaffaqiyatli yaratildi");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
