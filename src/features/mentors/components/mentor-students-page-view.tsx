"use client";

import { GraduationCapIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { mentorStudentColumns } from "@/features/mentors/config/mentor-student-columns";
import { useMyMentorGroups } from "@/features/mentors/hooks/use-my-mentor-groups";
import {
  countMentorStudents,
  filterMentorStudents,
  flattenMentorStudents,
} from "@/features/mentors/lib/mentor-data";

export function MentorStudentsPageView() {
  const { data: groups = [], isLoading, isError, error } = useMyMentorGroups();
  const [search, setSearch] = useState("");

  const students = useMemo(() => flattenMentorStudents(groups), [groups]);

  const grantCount = useMemo(
    () => students.filter((s) => s.is_grant).length,
    [students]
  );

  const filtered = useMemo(
    () => filterMentorStudents(students, search),
    [students, search]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Students"
        description="Students from your assigned groups."
      />

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total students"
          value={String(countMentorStudents(groups))}
          icon={GraduationCapIcon}
          description={`Across ${groups.length} groups`}
        />
        <StatCard
          title="Grant students"
          value={String(grantCount)}
          icon={GraduationCapIcon}
        />
        <StatCard
          title="Groups"
          value={String(groups.length)}
          icon={GraduationCapIcon}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by student ID, user ID, or group..."
          className="w-full sm:w-80"
        />
      </div>

      <AdminTable
        columns={mentorStudentColumns}
        data={filtered}
        loading={isLoading}
        emptyIcon={GraduationCapIcon}
        emptyTitle="No students found"
        emptyDescription={
          groups.length > 0
            ? "No students match your search."
            : "You have no groups assigned yet."
        }
      />
    </div>
  );
}
