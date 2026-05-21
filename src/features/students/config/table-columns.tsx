"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PencilIcon, Trash2Icon } from "lucide-react";

import { ActionDropdown } from "@/components/admin/action-dropdown";
import { Badge } from "@/components/ui/badge";
import type { StudentRead } from "@/types/student";
import { getUserDisplayName } from "@/types/user";

export function createStudentColumns(options: {
  onEdit: (student: StudentRead) => void;
  onDelete: (student: StudentRead) => void;
  groupLabel?: (groupId: number | null) => string;
}): ColumnDef<StudentRead>[] {
  const { onEdit, onDelete, groupLabel } = options;

  return [
    {
      accessorKey: "student_id",
      header: "Student ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.student_id}</span>
      ),
    },
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{getUserDisplayName(row.original)}</span>
      ),
    },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "group_id",
      header: "Group",
      cell: ({ row }) =>
        groupLabel
          ? groupLabel(row.original.group_id)
          : (row.original.group_id ?? "—"),
    },
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

/** @deprecated Use createStudentColumns */
export const studentColumns: ColumnDef<StudentRead>[] = createStudentColumns({
  onEdit: () => {},
  onDelete: () => {},
});
