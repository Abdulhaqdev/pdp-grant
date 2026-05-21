"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { mentorService } from "@/services/mentor.service";
import { useAuthStore } from "@/store/auth.store";

export function useMyMentorGroups() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: queryKeys.mentors.myGroups,
    queryFn: () => mentorService.getMyGroups(),
    enabled: !!user && user.role === "mentor",
  });
}
