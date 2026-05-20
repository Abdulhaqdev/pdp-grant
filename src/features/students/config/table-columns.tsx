"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { StudentRead } from "@/types/student";
import { getUserDisplayName } from "@/types/user";

export const studentColumns: ColumnDef<StudentRead>[] = [
  {
    accessorKey: "student_id",
    header: "Student ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.student_id}</span>
    ),
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{getUserDisplayName(row.original)}</span>
    ),
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "group_id",
    header: "Group",
    cell: ({ row }) => row.original.group_id ?? "—",
  },
  {
    accessorKey: "is_grant",
    header: "Grant",
    cell: ({ row }) => (
      <Badge variant={row.original.is_grant ? "default" : "secondary"}>
        {row.original.is_grant ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "course_number",
    header: "Course",
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "MMM d, yyyy"),
  },
];
