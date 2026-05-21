"use client";

import { UserCogIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { CreateAdminDialog } from "@/features/users/components/create-admin-dialog";
import { userColumns } from "@/features/users/config/table-columns";
import { useUsers } from "@/features/users/hooks/use-users";
import type { ApiUserRole } from "@/types/user";
import { getUserDisplayName } from "@/types/user";
import { LabeledSelect } from "@/components/admin/labeled-select";

export function UsersPageView() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<ApiUserRole | "all">("all");

  const { data = [], isLoading, isError, error } = useUsers(
    roleFilter === "all" ? undefined : roleFilter
  );

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (u) =>
        getUserDisplayName(u).toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            View all users and create administrator accounts
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LabeledSelect
            value={roleFilter}
            onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}
            className="w-[140px]"
            options={[
              { value: "all", label: "All roles" },
              { value: "admin", label: "Admin" },
              { value: "mentor", label: "Mentor" },
              { value: "student", label: "Student" },
            ]}
          />
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search..."
            className="w-full sm:w-56"
          />
          <CreateAdminDialog />
        </div>
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={userColumns}
        data={filtered}
        loading={isLoading}
        emptyIcon={UserCogIcon}
        emptyTitle="No users found"
      />
    </div>
  );
}
