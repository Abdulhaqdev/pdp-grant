"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { studentsService } from "@/services/students.service";

export function useStudents() {
  return useQuery({
    queryKey: queryKeys.students.list(),
    queryFn: () => studentsService.list({ limit: 500 }),
  });
}
