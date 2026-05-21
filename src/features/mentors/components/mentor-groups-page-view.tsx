"use client";

import { format } from "date-fns";
import { UsersRoundIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { SearchInput } from "@/components/admin/search-input";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mentorStudentColumns } from "@/features/mentors/config/mentor-student-columns";
import { useMyMentorGroups } from "@/features/mentors/hooks/use-my-mentor-groups";
import {
  countMentorStudents,
  type MentorStudentRow,
} from "@/features/mentors/lib/mentor-data";
import type { GroupRead } from "@/types/group";

function groupStudents(group: GroupRead): MentorStudentRow[] {
  return (group.students ?? []).map((s) => ({
    user_id: s.user_id,
    student_id: s.student_id,
    group_id: s.group_id ?? group.id,
    is_grant: s.is_grant,
    course_number: s.course_number,
    attendance: s.attendance,
    academic: s.academic,
    assignment: s.assignment,
    group_number: group.group_number,
  }));
}

export function MentorGroupsPageView() {
  const { data: groups = [], isLoading, isError, error } = useMyMentorGroups();
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!search) return groups;
    const q = search.toLowerCase();
    return groups.filter(
      (g) =>
        g.group_number.toLowerCase().includes(q) ||
        String(g.id).includes(q) ||
        (g.students ?? []).some((s) =>
          String(s.student_id).includes(q)
        )
    );
  }, [groups, search]);

  const totalStudents = countMentorStudents(groups);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Groups"
        description="Groups you manage and their students."
      />

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          title="Active groups"
          value={String(groups.length)}
          icon={UsersRoundIcon}
        />
        <StatCard
          title="Total students"
          value={String(totalStudents)}
          icon={UsersRoundIcon}
          description="Across all your groups"
        />
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search groups or students..."
        className="w-full sm:max-w-sm"
      />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border bg-muted/40"
            />
          ))}
        </div>
      ) : filteredGroups.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          {groups.length === 0
            ? "You have no groups assigned yet."
            : "No groups match your search."}
        </p>
      ) : (
        <div className="space-y-6">
          {filteredGroups.map((group) => {
            const students = groupStudents(group);
            const grantInGroup = students.filter((s) => s.is_grant).length;

            return (
              <Card key={group.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">
                        Group {group.group_number}
                      </CardTitle>
                      <CardDescription>
                        {students.length} student
                        {students.length === 1 ? "" : "s"}
                        {grantInGroup > 0
                          ? ` · ${grantInGroup} on grant`
                          : ""}
                      </CardDescription>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Updated{" "}
                      {format(new Date(group.updated_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  {students.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No students in this group.
                    </p>
                  ) : (
                    <AdminTable
                      columns={mentorStudentColumns}
                      data={students}
                      emptyTitle="No students"
                      emptyDescription=""
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
