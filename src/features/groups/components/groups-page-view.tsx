"use client";

import { UsersRoundIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { groupColumns } from "@/features/groups/config/table-columns";
import { useGroups } from "@/features/groups/hooks/use-groups";

export function GroupsPageView() {
  const { data = [], isLoading, isError, error } = useGroups();
  const [search, setSearch] = useState("");

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
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search groups..."
          className="w-full sm:w-72"
        />
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={groupColumns}
        data={filtered}
        loading={isLoading}
        emptyIcon={UsersRoundIcon}
        emptyTitle="No groups"
      />
    </div>
  );
}
