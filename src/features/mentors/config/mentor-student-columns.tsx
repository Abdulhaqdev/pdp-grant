"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import type { MentorStudentRow } from "@/features/mentors/lib/mentor-data";

export const mentorStudentColumns: ColumnDef<MentorStudentRow>[] = [
  {
    accessorKey: "student_id",
    header: "Student ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">{row.original.student_id}</span>
    ),
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.user_id}
      </span>
    ),
  },
  { accessorKey: "group_number", header: "Group" },
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
    accessorKey: "attendance",
    header: "Attendance",
  },
  {
    accessorKey: "academic",
    header: "Academic",
  },
  {
    accessorKey: "assignment",
    header: "Assignment",
  },
];
