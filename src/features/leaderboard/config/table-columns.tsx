"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
  formatLeaderboardNumber,
  formatLeaderboardPercent,
  formatLeaderboardSigned,
  getRiskBadgeVariant,
} from "@/features/leaderboard/lib/format-leaderboard";
import type { LeaderboardRow } from "@/types/leaderboard";
import { cn } from "@/lib/utils";

function numCell(value: number, className?: string) {
  return (
    <span className={cn("tabular-nums text-sm", className)}>
      {formatLeaderboardNumber(value)}
    </span>
  );
}

export function createLeaderboardColumns(options?: {
  highlightStudentId?: number;
}): ColumnDef<LeaderboardRow>[] {
  const highlightId = options?.highlightStudentId;

  return [
    {
      id: "rank",
      header: "#",
      cell: ({ row }) => (
        <span
          className={cn(
            "font-mono text-sm",
            highlightId === row.original.student_id
              ? "font-semibold text-primary"
              : "text-muted-foreground"
          )}
        >
          {row.index + 1}
        </span>
      ),
      meta: { sticky: true },
    },
    {
      accessorKey: "student_id",
      header: "Student ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs tabular-nums">
          {row.original.student_id}
        </span>
      ),
    },
    {
      accessorKey: "student_name",
      header: "Student",
      cell: ({ row }) => (
        <span className="flex min-w-[140px] items-center gap-2">
          <span
            className={cn(
              "font-medium",
              highlightId === row.original.student_id && "text-primary"
            )}
          >
            {row.original.student_name}
          </span>
          {highlightId === row.original.student_id ? (
            <Badge variant="default" className="text-[10px]">
              You
            </Badge>
          ) : null}
        </span>
      ),
      meta: { sticky: true },
    },
    {
      accessorKey: "group_name",
      header: "Group",
      cell: ({ row }) => row.original.group_name ?? "—",
    },
    {
      accessorKey: "current_status",
      header: "Status",
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm">
          {row.original.current_status}
        </span>
      ),
    },
    {
      accessorKey: "academic_percent",
      header: "Academic %",
      cell: ({ row }) => formatLeaderboardPercent(row.original.academic_percent),
    },
    {
      accessorKey: "academic_ball",
      header: "Academic pts",
      cell: ({ row }) => numCell(row.original.academic_ball),
    },
    {
      accessorKey: "attendance_percent",
      header: "Attendance %",
      cell: ({ row }) =>
        formatLeaderboardPercent(row.original.attendance_percent),
    },
    {
      accessorKey: "attendance_ball",
      header: "Attendance pts",
      cell: ({ row }) => numCell(row.original.attendance_ball),
    },
    {
      accessorKey: "assignment_ball",
      header: "Assignment",
      cell: ({ row }) => numCell(row.original.assignment_ball),
    },
    {
      accessorKey: "activity_ball",
      header: "Activity",
      cell: ({ row }) => numCell(row.original.activity_ball),
    },
    {
      accessorKey: "tutor_ball",
      header: "Tutor",
      cell: ({ row }) => numCell(row.original.tutor_ball),
    },
    {
      accessorKey: "discipline_ball",
      header: "Discipline",
      cell: ({ row }) => numCell(row.original.discipline_ball),
    },
    {
      accessorKey: "total_kpi",
      header: "Total KPI",
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">
          {formatLeaderboardPercent(row.original.total_kpi)}
        </span>
      ),
    },
    {
      accessorKey: "penalty",
      header: "Penalty",
      cell: ({ row }) => (
        <span
          className={cn(
            "tabular-nums",
            row.original.penalty < 0 && "text-destructive"
          )}
        >
          {formatLeaderboardSigned(row.original.penalty)}
        </span>
      ),
    },
    {
      accessorKey: "recovery",
      header: "Recovery",
      cell: ({ row }) => numCell(row.original.recovery),
    },
    {
      accessorKey: "employment",
      header: "Employment",
      cell: ({ row }) => numCell(row.original.employment, "font-medium"),
    },
    {
      accessorKey: "final_score",
      header: "Final score",
      cell: ({ row }) => (
        <span className="font-semibold tabular-nums">
          {formatLeaderboardNumber(row.original.final_score)}
        </span>
      ),
    },
    {
      accessorKey: "next_status",
      header: "Next status",
      cell: ({ row }) => (
        <span className="max-w-[200px] text-sm leading-snug">
          {row.original.next_status}
        </span>
      ),
    },
    {
      accessorKey: "risk",
      header: "Risk",
      cell: ({ row }) => (
        <Badge
          variant={getRiskBadgeVariant(row.original.risk)}
          className="whitespace-nowrap"
        >
          {row.original.risk}
        </Badge>
      ),
    },
  ];
}

/** @deprecated Use createLeaderboardColumns */
export const leaderboardColumns: ColumnDef<LeaderboardRow>[] =
  createLeaderboardColumns();
