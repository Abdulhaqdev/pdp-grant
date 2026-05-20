"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { queryKeys } from "@/constants/query-keys";
import { logsService } from "@/services/logs.service";
import type { LogsFilterParams, LogCategory, LogActionType } from "@/types/logs";
import type { ApiUserRole } from "@/types/user";

export function useLogs() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<ApiUserRole | "all">("all");
  const [action, setAction] = useState<LogActionType | "all">("all");
  const [category, setCategory] = useState<LogCategory | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filters: LogsFilterParams = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      role,
      action,
      category,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
    }),
    [page, limit, search, role, action, category, dateFrom, dateTo]
  );

  const query = useQuery({
    queryKey: queryKeys.logs.list(filters),
    queryFn: () => logsService.list(filters),
    placeholderData: (prev) => prev,
  });

  return {
    logs: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    page,
    setPage,
    search,
    setSearch,
    role,
    setRole,
    action,
    setAction,
    category,
    setCategory,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
  };
}
