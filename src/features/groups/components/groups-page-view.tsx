"use client";

import { UsersRoundIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { CreateGroupDialog } from "@/features/groups/components/create-group-dialog";
import { EditGroupDialog } from "@/features/groups/components/edit-group-dialog";
import { createGroupColumns } from "@/features/groups/config/table-columns";
import { useDeleteGroup } from "@/features/groups/hooks/use-delete-group";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useMentors } from "@/features/mentors/hooks/use-mentors";
import type { GroupRead } from "@/types/group";
import { getUserDisplayName } from "@/types/user";

export function GroupsPageView() {
  const { data = [], isLoading, isError, error } = useGroups();
  const { data: mentors = [] } = useMentors();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<GroupRead | null>(null);
  const [deleting, setDeleting] = useState<GroupRead | null>(null);
  const deleteGroup = useDeleteGroup();

  const mentorByUserId = useMemo(() => {
    const map = new Map<number, string>();
    for (const m of mentors) {
      const uid = m.user_id ?? m.id;
      map.set(uid, getUserDisplayName(m));
    }
    return map;
  }, [mentors]);

  const mentorLabel = useCallback(
    (mentorUserId: number | null) => {
      if (mentorUserId == null) return "—";
      return mentorByUserId.get(mentorUserId) ?? String(mentorUserId);
    },
    [mentorByUserId]
  );

  const columns = useMemo(
    () =>
      createGroupColumns({
        onEdit: setEditing,
        onDelete: setDeleting,
        mentorLabel,
      }),
    [mentorLabel]
  );

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (g) =>
        g.group_number.toLowerCase().includes(q) ||
        String(g.id).includes(q)
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
          <p className="text-sm text-muted-foreground">Cohorts and mentor links</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search groups..."
            className="w-full sm:w-72"
          />
          <CreateGroupDialog />
        </div>
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={columns}
        data={filtered}
        loading={isLoading}
        emptyIcon={UsersRoundIcon}
        emptyTitle="No groups"
      />
      <EditGroupDialog
        group={editing}
        open={editing != null}
        onOpenChange={(open) => !open && setEditing(null)}
      />
      <ConfirmDialog
        open={deleting != null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete group"
        description={
          deleting ? (
            <>
              Permanently delete group <strong>{deleting.group_number}</strong>?
              This action cannot be undone.
            </>
          ) : (
            ""
          )
        }
        variant="destructive"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteGroup.isPending}
        onConfirm={() => {
          if (deleting) {
            deleteGroup.mutate(deleting.id, {
              onSuccess: () => setDeleting(null),
            });
          }
        }}
      />
    </div>
  );
}
