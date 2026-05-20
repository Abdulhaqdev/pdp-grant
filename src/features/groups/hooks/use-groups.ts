"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { groupsService } from "@/services/groups.service";

export function useGroups() {
  return useQuery({
    queryKey: queryKeys.groups.list,
    queryFn: () => groupsService.list(),
  });
}
