"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { MonthlyScoreFields } from "@/features/monthly-scores/components/monthly-score-fields";
import { useUpdateMonthlyScore } from "@/features/monthly-scores/hooks/use-update-monthly-score";
import { formatMonthYear } from "@/features/monthly-scores/lib/month-label";
import {
  updateMonthlyScoreSchema,
  type UpdateMonthlyScoreFormValues,
} from "@/schemas/monthly-score.schema";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import type { MonthlyScoreRead } from "@/types/monthly-score";
import type { MonthlyScoreUpdate } from "@/types/monthly-score";

interface EditMonthlyScoreSheetProps {
  score: MonthlyScoreRead | null;
  studentApiId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function toFormValues(score: MonthlyScoreRead): UpdateMonthlyScoreFormValues {
  return {
    academic_percent: score.academic_percent ?? undefined,
    attendance_percent: score.attendance_percent ?? undefined,
    assignment_score: score.assignment_score ?? undefined,
    discipline_score: score.discipline_score ?? undefined,
    penalty_score: score.penalty_score ?? undefined,
    recovery_score: score.recovery_score ?? undefined,
    employment_score: score.employment_score ?? undefined,
  };
}

function toPayload(values: UpdateMonthlyScoreFormValues): MonthlyScoreUpdate {
  return {
    academic_percent: values.academic_percent ?? null,
    attendance_percent: values.attendance_percent ?? null,
    assignment_score: values.assignment_score ?? null,
    discipline_score: values.discipline_score ?? null,
    penalty_score: values.penalty_score ?? null,
    recovery_score: values.recovery_score ?? null,
    employment_score: values.employment_score ?? null,
  };
}

export function EditMonthlyScoreSheet({
  score,
  studentApiId,
  open,
  onOpenChange,
}: EditMonthlyScoreSheetProps) {
  const updateScore = useUpdateMonthlyScore(studentApiId);

  const form = useForm<UpdateMonthlyScoreFormValues>({
    resolver: zodResolver(updateMonthlyScoreSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (score && open) {
      form.reset(toFormValues(score));
    }
  }, [score, open, form]);

  function onSubmit(values: UpdateMonthlyScoreFormValues) {
    if (!score) return;
    updateScore.mutate(
      { scoreId: score.id, payload: toPayload(values) },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Edit monthly score</SheetTitle>
          <SheetDescription>
            {score
              ? `${formatMonthYear(score.month, score.year)} · Score ID ${score.id}`
              : "Select a score to edit"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6 px-1"
          >
            <MonthlyScoreFields control={form.control} />
            <SheetFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateScore.isPending}>
                {updateScore.isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : null}
                Save changes
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
