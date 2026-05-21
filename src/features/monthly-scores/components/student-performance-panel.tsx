"use client";

import { format } from "date-fns";
import { BarChart3Icon, PencilIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/admin/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateMonthlyScoreDialog } from "@/features/monthly-scores/components/create-monthly-score-dialog";
import { EditMonthlyScoreSheet } from "@/features/monthly-scores/components/edit-monthly-score-sheet";
import { useStudentPerformance } from "@/features/monthly-scores/hooks/use-student-performance";
import { formatMonthYear } from "@/features/monthly-scores/lib/month-label";
import { sortMonthlyScores } from "@/features/monthly-scores/lib/sort-monthly-scores";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MonthlyScoreRead } from "@/types/monthly-score";
import type { StudentRead } from "@/types/student";
import { getUserDisplayName } from "@/types/user";

function formatNum(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

interface StudentPerformancePanelProps {
  student: StudentRead;
}

export function StudentPerformancePanel({ student }: StudentPerformancePanelProps) {
  const studentApiId = student.id;
  const { data = [], isLoading, isError, error } = useStudentPerformance(studentApiId);
  const [editing, setEditing] = useState<MonthlyScoreRead | null>(null);

  const scores = useMemo(() => sortMonthlyScores(data), [data]);

  return (
    <div className="flex min-h-[420px] flex-col">
      <div className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{getUserDisplayName(student)}</h2>
          <p className="text-sm text-muted-foreground">
            Student ID {student.student_id}
            {student.group_id != null ? ` · Group ${student.group_id}` : ""}
          </p>
        </div>
        <CreateMonthlyScoreDialog
          student={student}
          studentApiId={studentApiId}
        />
      </div>

      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive">{error.message}</p>
        ) : scores.length === 0 ? (
          <EmptyState
            icon={BarChart3Icon}
            title="No monthly scores"
            description="Add a monthly score record for this student."
            className="border-0 bg-transparent"
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Acad. %</TableHead>
                  <TableHead className="text-right">Att. %</TableHead>
                  <TableHead className="text-right">Assign.</TableHead>
                  <TableHead className="text-right">Disc.</TableHead>
                  <TableHead className="text-right">Tutor</TableHead>
                  <TableHead className="text-right">Penalty</TableHead>
                  <TableHead className="text-right">Recovery</TableHead>
                  <TableHead className="text-right">Employ.</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((score) => (
                  <TableRow key={score.id}>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">
                          {formatMonthYear(score.month, score.year)}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          ID {score.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.academic_percent)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.attendance_percent)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.assignment_score)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.discipline_score)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.tutor_score)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.penalty_score)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.recovery_score)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNum(score.employment_score)}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditing(score)}
                      >
                        <PencilIcon className="size-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {scores[0] ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Last updated{" "}
            {format(new Date(scores[0].updated_at), "MMM d, yyyy HH:mm")}
          </p>
        ) : null}
      </div>

      <EditMonthlyScoreSheet
        score={editing}
        studentApiId={studentApiId}
        open={editing != null}
        onOpenChange={(open) => !open && setEditing(null)}
      />
    </div>
  );
}
