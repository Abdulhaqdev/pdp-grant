"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PencilIcon, Trash2Icon } from "lucide-react";

import { ActionDropdown } from "@/components/admin/action-dropdown";
import type { GroupRead } from "@/types/group";

export function createGroupColumns(options: {
  onEdit: (group: GroupRead) => void;
  onDelete: (group: GroupRead) => void;
  mentorLabel?: (mentorUserId: number | null) => string;
}): ColumnDef<GroupRead>[] {
  const { onEdit, onDelete, mentorLabel } = options;

  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "group_number", header: "Group" },
    {
      accessorKey: "mentor_id",
      header: "Mentor",
      cell: ({ row }) =>
        mentorLabel
          ? mentorLabel(row.original.mentor_id)
          : (row.original.mentor_id ?? "—"),
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

/** @deprecated Use createGroupColumns */
export const groupColumns: ColumnDef<GroupRead>[] = createGroupColumns({
  onEdit: () => {},
  onDelete: () => {},
});
