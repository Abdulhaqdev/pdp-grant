"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { UserRead } from "@/types/user";
import { getUserDisplayName } from "@/types/user";

export const userColumns: ColumnDef<UserRead>[] = [
  { accessorKey: "id", header: "ID" },
  {
    id: "name",
    header: "Foydalanuvchi",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{getUserDisplayName(row.original)}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  { accessorKey: "phone", header: "Telefon" },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Yaratilgan",
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "MMM d, yyyy"),
  },
];
