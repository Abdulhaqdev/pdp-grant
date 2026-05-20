"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import type { LeaderboardRow } from "@/types/leaderboard";

export const leaderboardColumns: ColumnDef<LeaderboardRow>[] = [
  {
    id: "rank",
    header: "#",
    cell: ({ row }) => (
      <span className="font-mono text-muted-foreground">{row.index + 1}</span>
    ),
  },
  { accessorKey: "student_name", header: "Student" },
  {
    accessorKey: "group_name",
    header: "Group",
    cell: ({ row }) => row.original.group_name ?? "—",
  },
  {
    accessorKey: "total_kpi",
    header: "KPI",
    cell: ({ row }) => `${row.original.total_kpi.toFixed(1)}%`,
  },
  {
    accessorKey: "final_score",
    header: "Final Score",
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums">
        {row.original.final_score.toFixed(1)}
      </span>
    ),
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.risk?.toLowerCase().includes("high")
            ? "destructive"
            : "secondary"
        }
      >
        {row.original.risk}
      </Badge>
    ),
  },
  {
    accessorKey: "next_status",
    header: "Next Status",
  },
];
