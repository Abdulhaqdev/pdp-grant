"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { mentorService } from "@/services/mentor.service";
import { useAuthStore } from "@/store/auth.store";

export function useMyMentorStudents(groupId?: number | null) {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: queryKeys.mentors.myStudents(groupId),
    queryFn: () => mentorService.getMyStudents(groupId ?? undefined),
    enabled: !!user && user.role === "mentor",
  });
}
