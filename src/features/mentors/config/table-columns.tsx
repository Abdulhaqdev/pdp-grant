"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { MentorRead } from "@/types/mentor";
import { getUserDisplayName } from "@/types/user";

export const mentorColumns: ColumnDef<MentorRead>[] = [
  { accessorKey: "id", header: "ID" },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => getUserDisplayName(row.original),
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  {
    id: "groups",
    header: "Groups",
    cell: ({ row }) => row.original.groups?.length ?? 0,
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "MMM d, yyyy"),
  },
];
