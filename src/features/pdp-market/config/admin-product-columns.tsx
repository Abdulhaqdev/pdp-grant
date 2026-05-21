"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";

import { ActionDropdown } from "@/components/admin/action-dropdown";
import { Badge } from "@/components/ui/badge";
import { ProductImageThumb } from "@/features/pdp-market/components/product-image-thumb";
import type { MarketProduct } from "@/types/pdp-market";

export function createAdminProductColumns(options: {
  onEdit: (product: MarketProduct) => void;
  onDelete: (product: MarketProduct) => void;
}): ColumnDef<MarketProduct>[] {
  const { onEdit, onDelete } = options;

  return [
    {
      id: "thumb",
      header: "",
      cell: ({ row }) => (
        <ProductImageThumb src={row.original.image} alt={row.original.name} />
      ),
    },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Product" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-mono tabular-nums">{row.original.price} pts</span>
      ),
    },
    {
      accessorKey: "image",
      header: "Image path",
      cell: ({ row }) => (
        <span className="max-w-[140px] truncate font-mono text-xs text-muted-foreground">
          {row.original.image}
        </span>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.active !== false ? "default" : "secondary"}>
          {row.original.active !== false ? "Active" : "Hidden"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ActionDropdown
          items={[
            {
              label: "Edit",
              icon: <PencilIcon className="size-4" />,
              onClick: () => onEdit(row.original),
            },
            {
              label: "Delete",
              icon: <Trash2Icon className="size-4" />,
              variant: "destructive",
              separator: true,
              onClick: () => onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}
