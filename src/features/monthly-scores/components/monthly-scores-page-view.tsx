"use client";

import { BarChart3Icon, UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/admin/empty-state";
import { SearchInput } from "@/components/admin/search-input";
import { StudentPerformancePanel } from "@/features/monthly-scores/components/student-performance-panel";
import { useStudents } from "@/features/students/hooks/use-students";
import { useGroups } from "@/features/groups/hooks/use-groups";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { StudentRead } from "@/types/student";
import { getUserDisplayName } from "@/types/user";
import { cn } from "@/lib/utils";

export function MonthlyScoresPageView() {
  const { data: students = [], isLoading, isError, error } = useStudents();
  const { data: groups = [] } = useGroups();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const groupById = useMemo(
    () => new Map(groups.map((g) => [g.id, g.group_number])),
    [groups]
  );

  const filtered = useMemo(() => {
    if (!search) return students;
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        getUserDisplayName(s).toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        String(s.student_id).includes(q)
    );
  }, [students, search]);

  const selected = useMemo(
    () => students.find((s) => s.id === selectedId) ?? null,
    [students, selectedId]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Monthly Scores</h1>
        <p className="text-sm text-muted-foreground">
          Select a student to view and edit monthly KPI scores
        </p>
      </div>

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <Card className="flex max-h-[calc(100vh-12rem)] flex-col overflow-hidden">
          <CardHeader className="shrink-0 space-y-3 border-b pb-4">
            <div className="space-y-1">
              <CardTitle className="text-base">Students</CardTitle>
              <CardDescription>
                {isLoading ? "Loading…" : `${filtered.length} students`}
              </CardDescription>
            </div>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by name, email, ID…"
            />
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
            {isLoading ? (
              <div className="space-y-2 p-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={UsersIcon}
                title="No students"
                description="No students match your search."
                className="border-0"
              />
            ) : (
              <ul className="divide-y">
                {filtered.map((student) => (
                  <StudentListItem
                    key={student.id}
                    student={student}
                    groupLabel={
                      student.group_id != null
                        ? groupById.get(student.group_id) ?? String(student.group_id)
                        : "—"
                    }
                    selected={selectedId === student.id}
                    onSelect={() => setSelectedId(student.id)}
                  />
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          {selected ? (
            <StudentPerformancePanel student={selected} />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center p-8">
              <EmptyState
                icon={BarChart3Icon}
                title="Select a student"
                description="Choose a student from the list to load their monthly performance scores."
                className="border-0 bg-transparent"
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function StudentListItem({
  student,
  groupLabel,
  selected,
  onSelect,
}: {
  student: StudentRead;
  groupLabel: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-muted/50",
          selected && "bg-[#e8f5f4] hover:bg-[#e8f5f4]"
        )}
      >
        <span
          className={cn(
            "font-medium text-[var(--pdp-navy)]",
            selected && "text-[#229b91]"
          )}
        >
          {getUserDisplayName(student)}
        </span>
        <span className="text-xs text-muted-foreground">
          ID {student.student_id} · {groupLabel}
        </span>
      </button>
    </li>
  );
}
