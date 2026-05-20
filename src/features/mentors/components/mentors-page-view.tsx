"use client";

import { UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { mentorColumns } from "@/features/mentors/config/table-columns";
import { useMentors } from "@/features/mentors/hooks/use-mentors";
import { getUserDisplayName } from "@/types/user";

export function MentorsPageView() {
  const { data = [], isLoading, isError, error } = useMentors();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (m) =>
        getUserDisplayName(m).toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mentors</h1>
          <p className="text-sm text-muted-foreground">
            Tutors and group assignments
          </p>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search mentors..."
          className="w-full sm:w-72"
        />
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={mentorColumns}
        data={filtered}
        loading={isLoading}
        emptyIcon={UsersIcon}
        emptyTitle="No mentors"
      />
    </div>
  );
}
