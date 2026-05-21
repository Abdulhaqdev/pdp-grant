"use client";

import { GraduationCapIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { CreateStudentDialog } from "@/features/students/components/create-student-dialog";
import { EditStudentDialog } from "@/features/students/components/edit-student-dialog";
import { createStudentColumns } from "@/features/students/config/table-columns";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useDeleteStudent } from "@/features/students/hooks/use-delete-student";
import { useStudents } from "@/features/students/hooks/use-students";
import type { StudentRead } from "@/types/student";
import { getUserDisplayName } from "@/types/user";

export function StudentsPageView() {
  const { data = [], isLoading, isError, error } = useStudents();
  const { data: groups = [] } = useGroups();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<StudentRead | null>(null);
  const [deleting, setDeleting] = useState<StudentRead | null>(null);
  const deleteStudent = useDeleteStudent();

  const groupById = useMemo(
    () => new Map(groups.map((g) => [g.id, g.group_number])),
    [groups]
  );

  const groupLabel = useCallback(
    (groupId: number | null) => {
      if (groupId == null) return "—";
      return groupById.get(groupId) ?? String(groupId);
    },
    [groupById]
  );

  const columns = useMemo(
    () =>
      createStudentColumns({
        onEdit: setEditing,
        onDelete: setDeleting,
        groupLabel,
      }),
    [groupLabel]
  );

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (s) =>
        getUserDisplayName(s).toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        String(s.student_id).includes(q)
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage learners, grant status, and group assignments
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search students..."
            className="w-full sm:w-72"
          />
          <CreateStudentDialog />
        </div>
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={columns}
        data={filtered}
        loading={isLoading}
        emptyIcon={GraduationCapIcon}
        emptyTitle="No students"
        emptyDescription="Create students via the API or adjust search."
      />
      <EditStudentDialog
        student={editing}
        open={editing != null}
        onOpenChange={(open) => !open && setEditing(null)}
      />
      <ConfirmDialog
        open={deleting != null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete student"
        description={
          deleting ? (
            <>
              Permanently delete <strong>{getUserDisplayName(deleting)}</strong>{" "}
              (ID {deleting.student_id})? This action cannot be undone.
            </>
          ) : (
            ""
          )
        }
        variant="destructive"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteStudent.isPending}
        onConfirm={() => {
          if (deleting) {
            deleteStudent.mutate(deleting.id, {
              onSuccess: () => setDeleting(null),
            });
          }
        }}
      />
    </div>
  );
}
