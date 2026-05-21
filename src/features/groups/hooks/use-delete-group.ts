"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { groupsService } from "@/services/groups.service";

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => groupsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Group deleted successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
