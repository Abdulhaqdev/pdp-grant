"use client";

import type { ReactNode } from "react";
import {
  CrownIcon,
  MedalIcon,
  TrophyIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatLeaderboardNumber,
  formatLeaderboardPercent,
  formatLeaderboardSigned,
  getRiskBadgeVariant,
} from "@/features/leaderboard/lib/format-leaderboard";
import type { LeaderboardRow } from "@/types/leaderboard";
import { cn } from "@/lib/utils";

const STICKY_SHADOW =
  "shadow-[6px_0_14px_-4px_rgba(32,45,76,0.14)] after:pointer-events-none after:absolute after:inset-y-0 after:-right-px after:w-px after:bg-border";

interface LeaderboardRankingsTableProps {
  rows: LeaderboardRow[];
  highlightStudentId?: number;
  loading?: boolean;
  startRank?: number;
}

function rowBackground(
  index: number,
  isYou: boolean,
  isTopThree: boolean
): string {
  if (isYou) return "bg-[#e8f5f4]";
  if (isTopThree) return index % 2 === 0 ? "bg-[#fffdf5]" : "bg-[#faf6e8]";
  return index % 2 === 0 ? "bg-card" : "bg-[#eef6f5]";
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ffcc19] to-[#e6b800] shadow-sm ring-2 ring-[#ffcc19]/50">
        <CrownIcon className="size-4 text-[var(--pdp-navy)]" />
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-slate-300/60">
        <MedalIcon className="size-4 text-slate-600" />
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-300 ring-2 ring-amber-400/50">
        <TrophyIcon className="size-4 text-amber-800" />
      </span>
    );
  }
  return (
    <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#eef6f5] font-mono text-sm font-medium text-muted-foreground">
      {rank}
    </span>
  );
}

function Th({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
        className
      )}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("whitespace-nowrap px-3 py-3 text-sm", className)}>
      {children}
    </td>
  );
}

export function LeaderboardRankingsTable({
  rows,
  highlightStudentId,
  loading,
  startRank = 1,
}: LeaderboardRankingsTableProps) {
  const maxScore = Math.max(...rows.map((r) => r.final_score), 1);

  if (loading) {
    return (
      <div className="space-y-2 rounded-2xl border bg-card p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/20 px-6 py-16 text-center text-sm text-muted-foreground">
        No rankings to display
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[1200px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="border-b bg-[#eef6f5]">
              <Th
                className={cn(
                  "sticky left-0 z-50 min-w-[220px] max-w-[280px] bg-[#eef6f5] pl-4",
                  STICKY_SHADOW
                )}
              >
                Student
              </Th>
              <Th className="pl-2">Rank</Th>
              <Th>Group</Th>
              <Th>Status</Th>
              <Th>Acad. %</Th>
              <Th>Acad. pts</Th>
              <Th>Att. %</Th>
              <Th>Att. pts</Th>
              <Th>Assign.</Th>
              <Th>Activity</Th>
              <Th>Tutor</Th>
              <Th>Disc.</Th>
              <Th className="font-bold text-[#229b91]">KPI</Th>
              <Th>Penalty</Th>
              <Th>Recovery</Th>
              <Th>Employ.</Th>
              <Th className="pr-4 font-bold text-[var(--pdp-navy)]">
                Final score
              </Th>
              <Th>Next status</Th>
              <Th className="pr-4">Risk</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const rank = startRank + index;
              const isYou = row.student_id === highlightStudentId;
              const isTopThree = rank <= 3;
              const rowBg = rowBackground(index, isYou, isTopThree);
              const scoreWidth = Math.min(
                100,
                Math.round((row.final_score / maxScore) * 100)
              );

              return (
                <tr
                  key={row.student_id}
                  className={cn(
                    "group border-b border-border/60 transition-colors last:border-0",
                    rowBg,
                    "hover:bg-[#e8f5f4]"
                  )}
                >
                  <Td
                    className={cn(
                      "sticky left-0 z-40 min-w-[220px] max-w-[280px] pl-4",
                      STICKY_SHADOW,
                      rowBg,
                      "group-hover:bg-[#e8f5f4]"
                    )}
                  >
                    <div className="flex items-center gap-2 pr-2">
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "truncate font-medium text-[var(--pdp-navy)]",
                            isYou && "text-[#229b91]"
                          )}
                        >
                          {row.student_name}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          ID {row.student_id}
                        </p>
                      </div>
                      {isYou ? (
                        <Badge className="shrink-0 bg-[#229b91] text-[10px]">
                          You
                        </Badge>
                      ) : null}
                    </div>
                  </Td>
                  <Td className="pl-2">
                    <RankBadge rank={rank} />
                  </Td>
                  <Td>
                    <span className="rounded-md bg-[#eef6f5] px-2 py-0.5 text-xs font-medium">
                      {row.group_name ?? "—"}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs">{row.current_status}</span>
                  </Td>
                  <Td className="tabular-nums text-muted-foreground">
                    {formatLeaderboardPercent(row.academic_percent)}
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.academic_ball)}
                  </Td>
                  <Td className="tabular-nums text-muted-foreground">
                    {formatLeaderboardPercent(row.attendance_percent)}
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.attendance_ball)}
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.assignment_ball)}
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.activity_ball)}
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.tutor_ball)}
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.discipline_ball)}
                  </Td>
                  <Td>
                    <span className="font-semibold tabular-nums text-[#229b91]">
                      {formatLeaderboardPercent(row.total_kpi)}
                    </span>
                  </Td>
                  <Td>
                    <span
                      className={cn(
                        "tabular-nums",
                        row.penalty < 0 && "font-medium text-destructive"
                      )}
                    >
                      {formatLeaderboardSigned(row.penalty)}
                    </span>
                  </Td>
                  <Td className="tabular-nums">
                    {formatLeaderboardNumber(row.recovery)}
                  </Td>
                  <Td className="tabular-nums font-medium">
                    {formatLeaderboardNumber(row.employment)}
                  </Td>
                  <Td className="pr-4">
                    <div className="flex min-w-[100px] flex-col gap-1">
                      <span className="text-base font-bold tabular-nums text-[var(--pdp-navy)]">
                        {formatLeaderboardNumber(row.final_score)}
                      </span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#eef6f5]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#229b91] to-[#26a49d]"
                          style={{ width: `${scoreWidth}%` }}
                        />
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="max-w-[160px] truncate text-xs text-muted-foreground">
                      {row.next_status}
                    </span>
                  </Td>
                  <Td className="pr-4">
                    <Badge variant={getRiskBadgeVariant(row.risk)}>
                      {row.risk}
                    </Badge>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
