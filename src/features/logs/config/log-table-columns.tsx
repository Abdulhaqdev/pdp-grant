"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { AuditLog } from "@/types/logs";
import { getActionBadgeVariant, getStatusBadgeVariant } from "@/features/logs/lib/log-badges";

export const logTableColumns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        #{row.original.id}
      </span>
    ),
  },
  {
    id: "user",
    header: "User",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.user_name}</p>
        <p className="text-xs text-muted-foreground">{row.original.user_email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.role}
      </Badge>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <Badge variant={getActionBadgeVariant(row.original.action)}>
        {row.original.action_label}
      </Badge>
    ),
  },
  {
    id: "entity",
    header: "Target entity",
    cell: ({ row }) => (
      <div>
        <p className="text-sm">{row.original.entity_label}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {row.original.entity_type}
          {row.original.entity_id ? ` · ${row.original.entity_id}` : ""}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.original.status)} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.ip_address}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.created_at), "MMM d, yyyy HH:mm")}
      </span>
    ),
  },
];
