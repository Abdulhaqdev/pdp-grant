"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { mentorsService } from "@/services/mentors.service";
import { useAuthStore } from "@/store/auth.store";

export function useMyMentor() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: queryKeys.mentors.me,
    queryFn: () => mentorsService.getById(user!.id),
    enabled: !!user && user.role === "mentor",
  });
}
