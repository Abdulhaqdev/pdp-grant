"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { adminsService } from "@/services/admins.service";
import type { AdminCreate } from "@/types/admin";

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminCreate) => adminsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("Admin muvaffaqiyatli yaratildi");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
