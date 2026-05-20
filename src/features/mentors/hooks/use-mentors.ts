"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { mentorsService } from "@/services/mentors.service";

export function useMentors() {
  return useQuery({
    queryKey: queryKeys.mentors.list(),
    queryFn: () => mentorsService.list({ limit: 500 }),
  });
}
