"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PencilIcon, Trash2Icon, UsersRoundIcon } from "lucide-react";

import { ActionDropdown } from "@/components/admin/action-dropdown";
import type { MentorRead } from "@/types/mentor";
import { getUserDisplayName } from "@/types/user";

export function createMentorColumns(options: {
  onEdit: (mentor: MentorRead) => void;
  onAssignGroups: (mentor: MentorRead) => void;
  onDelete: (mentor: MentorRead) => void;
}): ColumnDef<MentorRead>[] {
  const { onEdit, onAssignGroups, onDelete } = options;

  return [
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
      cell: ({ row }) =>
        row.original.groups?.map((g) => g.group_number).join(", ") || "—",
    },
    {
      accessorKey: "created_at",
      header: "Joined",
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
              label: "Assign groups",
              icon: <UsersRoundIcon className="size-4" />,
              onClick: () => onAssignGroups(row.original),
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

/** @deprecated Use createMentorColumns */
export const mentorColumns: ColumnDef<MentorRead>[] = createMentorColumns({
  onEdit: () => {},
  onAssignGroups: () => {},
  onDelete: () => {},
});
