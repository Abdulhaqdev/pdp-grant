"use client";

import { MedalIcon, UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { SearchInput } from "@/components/admin/search-input";
import { PageHeader } from "@/components/shared/page-header";
import { LeaderboardRankingsTable } from "@/features/leaderboard/components/leaderboard-rankings-table";
import {
  formatLeaderboardNumber,
  formatLeaderboardPercent,
} from "@/features/leaderboard/lib/format-leaderboard";
import { useLeaderboard } from "@/features/leaderboard/hooks/use-leaderboard";
import type { LeaderboardRow } from "@/types/leaderboard";
import { cn } from "@/lib/utils";

interface LeaderboardViewProps {
  highlightStudentId?: number;
  title?: string;
  description?: string;
  showPersonalBanner?: boolean;
}

function filterRows(rows: LeaderboardRow[], search: string) {
  if (!search) return rows;
  const q = search.toLowerCase();
  return rows.filter(
    (r) =>
      r.student_name.toLowerCase().includes(q) ||
      (r.group_name?.toLowerCase().includes(q) ?? false) ||
      String(r.student_id).includes(q) ||
      r.current_status.toLowerCase().includes(q) ||
      r.next_status.toLowerCase().includes(q) ||
      r.risk.toLowerCase().includes(q)
  );
}

export function LeaderboardView({
  highlightStudentId,
  title = "Leaderboard",
  description = "Grant program rankings by KPI and final score.",
  showPersonalBanner = false,
}: LeaderboardViewProps) {
  const { data = [], isLoading, isError, error } = useLeaderboard();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => filterRows(data, search), [data, search]);

  const myStanding = useMemo(() => {
    if (highlightStudentId == null) return null;
    const index = data.findIndex((r) => r.student_id === highlightStudentId);
    if (index === -1) return null;
    const row = data[index];
    if (!row) return null;
    return { rank: index + 1, row, total: data.length };
  }, [data, highlightStudentId]);

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      {showPersonalBanner && myStanding ? (
        <div
          className={cn(
            "flex flex-col gap-4 rounded-2xl border-2 border-[#229b91]/30 bg-gradient-to-r from-[#229b91]/12 via-card to-[#ffcc19]/10 p-5 sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#229b91] text-white shadow-md">
              <MedalIcon className="size-7" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your position</p>
              <p className="font-heading text-3xl font-bold text-[#229b91]">
                #{myStanding.rank}
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  of {myStanding.total}
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center sm:text-right">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">
                Final score
              </p>
              <p className="text-lg font-bold tabular-nums">
                {formatLeaderboardNumber(myStanding.row.final_score)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">KPI</p>
              <p className="text-lg font-bold tabular-nums text-[#229b91]">
                {formatLeaderboardPercent(myStanding.row.total_kpi)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">
                Status
              </p>
              <p className="text-sm font-medium leading-tight">
                {myStanding.row.current_status}
              </p>
            </div>
          </div>
        </div>
      ) : showPersonalBanner && !isLoading ? (
        <p className="rounded-xl border border-dashed bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          You are not on the leaderboard yet. Your row will appear once KPI data
          is updated.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="size-4 text-[#229b91]" />
          <span>
            {isLoading
              ? "Loading rankings…"
              : `Showing ${filtered.length} of ${data.length} students`}
          </span>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search name, group, ID…"
          className="w-full sm:w-80"
        />
      </div>

      <LeaderboardRankingsTable
        rows={filtered}
        highlightStudentId={highlightStudentId}
        loading={isLoading}
        startRank={1}
      />

      <p className="text-center text-xs text-muted-foreground">
        Scroll horizontally to view all KPI metrics
      </p>
    </div>
  );
}
