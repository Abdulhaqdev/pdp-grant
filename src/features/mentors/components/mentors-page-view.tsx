"use client";

import { UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { CreateMentorDialog } from "@/features/mentors/components/create-mentor-dialog";
import { AssignMentorGroupsDialog } from "@/features/mentors/components/assign-mentor-groups-dialog";
import { EditMentorDialog } from "@/features/mentors/components/edit-mentor-dialog";
import { createMentorColumns } from "@/features/mentors/config/table-columns";
import { useDeleteMentor } from "@/features/mentors/hooks/use-delete-mentor";
import { useMentors } from "@/features/mentors/hooks/use-mentors";
import type { MentorRead } from "@/types/mentor";
import { getUserDisplayName } from "@/types/user";

export function MentorsPageView() {
  const { data = [], isLoading, isError, error } = useMentors();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<MentorRead | null>(null);
  const [assigningGroups, setAssigningGroups] = useState<MentorRead | null>(
    null
  );
  const [deleting, setDeleting] = useState<MentorRead | null>(null);
  const deleteMentor = useDeleteMentor();

  const columns = useMemo(
    () =>
      createMentorColumns({
        onEdit: setEditing,
        onAssignGroups: setAssigningGroups,
        onDelete: setDeleting,
      }),
    []
  );

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (m) =>
        getUserDisplayName(m).toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.includes(q)
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mentors</h1>
          <p className="text-sm text-muted-foreground">
            Manage mentor profiles, group assignments, and accounts
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search mentors..."
            className="w-full sm:w-72"
          />
          <CreateMentorDialog />
        </div>
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={columns}
        data={filtered}
        loading={isLoading}
        emptyIcon={UsersIcon}
        emptyTitle="No mentors"
        emptyDescription="Add a mentor or adjust your search."
      />
      <EditMentorDialog
        mentor={editing}
        open={editing != null}
        onOpenChange={(open) => !open && setEditing(null)}
      />
      <AssignMentorGroupsDialog
        mentor={assigningGroups}
        open={assigningGroups != null}
        onOpenChange={(open) => !open && setAssigningGroups(null)}
      />
      <ConfirmDialog
        open={deleting != null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete mentor"
        description={
          deleting ? (
            <>
              Permanently delete <strong>{getUserDisplayName(deleting)}</strong>?
              This action cannot be undone.
            </>
          ) : (
            ""
          )
        }
        variant="destructive"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteMentor.isPending}
        onConfirm={() => {
          if (deleting) {
            deleteMentor.mutate(deleting.id, {
              onSuccess: () => setDeleting(null),
            });
          }
        }}
      />
    </div>
  );
}
