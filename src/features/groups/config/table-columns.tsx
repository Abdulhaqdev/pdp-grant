"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { GroupRead } from "@/types/group";

export const groupColumns: ColumnDef<GroupRead>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "group_number", header: "Group" },
  {
    accessorKey: "mentor_id",
    header: "Mentor ID",
    cell: ({ row }) => row.original.mentor_id ?? "—",
  },
  {
    id: "students",
    header: "Students",
    cell: ({ row }) => row.original.students?.length ?? 0,
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "MMM d, yyyy"),
  },
];
