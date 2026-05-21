"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { CertificateFileCell } from "@/features/certificates/components/certificate-file-cell";
import {
  formatCertificateStatus,
  getCertificateStatusBadgeVariant,
} from "@/features/certificates/lib/certificate-status";
import type { CertificateRead } from "@/types/certificate";

export const studentCertificateColumns: ColumnDef<CertificateRead>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "cert_type",
    header: "Type",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.cert_type.replace(/_/g, " ")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getCertificateStatusBadgeVariant(row.original.status)}>
        {formatCertificateStatus(row.original.status)}
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
  {
    id: "file",
    header: "File",
    cell: ({ row }) => (
      <CertificateFileCell
        filePath={row.original.file_path}
        title={row.original.title}
      />
    ),
  },
];
