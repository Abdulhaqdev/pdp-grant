"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { groupsService } from "@/services/groups.service";
import type { GroupCreate } from "@/types/group";

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GroupCreate) => groupsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Group created successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
