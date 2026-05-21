"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { studentsService } from "@/services/students.service";
import { useAuthStore } from "@/store/auth.store";

export function useMyStudent() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: queryKeys.students.me,
    queryFn: () => studentsService.getById(user!.id),
    enabled: !!user && user.role === "student",
  });
}
