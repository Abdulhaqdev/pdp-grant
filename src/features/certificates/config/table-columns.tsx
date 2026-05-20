"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { CertificateRead } from "@/types/certificate";

export const certificateColumns: ColumnDef<CertificateRead>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "student_id", header: "Student" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "cert_type", header: "Type" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "pending"
            ? "secondary"
            : row.original.status === "approved"
              ? "default"
              : "destructive"
        }
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  },
  { accessorKey: "points", header: "Points" },
  {
    accessorKey: "created_at",
    header: "Submitted",
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "MMM d, yyyy"),
  },
];
