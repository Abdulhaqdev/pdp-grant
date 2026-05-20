"use client";

import { MedalIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { leaderboardColumns } from "@/features/leaderboard/config/table-columns";
import { useLeaderboard } from "@/features/leaderboard/hooks/use-leaderboard";

export function LeaderboardPageView() {
  const { data = [], isLoading, isError, error } = useLeaderboard();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (r) =>
        r.student_name.toLowerCase().includes(q) ||
        (r.group_name?.toLowerCase().includes(q) ?? false)
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
          <p className="text-sm text-muted-foreground">
            Student rankings by KPI and final grant score
          </p>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search rankings..."
          className="w-full sm:w-72"
        />
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={leaderboardColumns}
        data={filtered}
        loading={isLoading}
        emptyIcon={MedalIcon}
        emptyTitle="No leaderboard data"
      />
    </div>
  );
}
