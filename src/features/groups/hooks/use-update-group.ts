"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { groupsService } from "@/services/groups.service";
import type { GroupUpdate } from "@/types/group";

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: GroupUpdate }) =>
      groupsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Group updated successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
