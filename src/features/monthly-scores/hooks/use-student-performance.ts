"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { studentsService } from "@/services/students.service";

export function useStudentPerformance(studentId: number | null) {
  return useQuery({
    queryKey: queryKeys.monthlyScores.performance(studentId ?? 0),
    queryFn: () => studentsService.getPerformance(studentId!),
    enabled: studentId != null,
  });
}
