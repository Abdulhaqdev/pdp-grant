"use client";

import { GraduationCapIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { studentColumns } from "@/features/students/config/table-columns";
import { useStudents } from "@/features/students/hooks/use-students";
import { getUserDisplayName } from "@/types/user";

export function StudentsPageView() {
  const { data = [], isLoading, isError, error } = useStudents();
  const [search, setSearch] = useState("");

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
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search students..."
          className="w-full sm:w-72"
        />
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={studentColumns}
        data={filtered}
        loading={isLoading}
        emptyIcon={GraduationCapIcon}
        emptyTitle="No students"
        emptyDescription="Create students via the API or adjust search."
      />
    </div>
  );
}
