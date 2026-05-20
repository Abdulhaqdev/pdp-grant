"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import type { ApiUserRole } from "@/types/user";
import { usersService } from "@/services/users.service";

export function useUsers(role?: ApiUserRole) {
  return useQuery({
    queryKey: queryKeys.users.list({ role }),
    queryFn: () => usersService.list({ limit: 500, role }),
  });
}
