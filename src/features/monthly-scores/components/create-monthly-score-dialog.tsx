"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { MonthlyScoreFields } from "@/features/monthly-scores/components/monthly-score-fields";
import { useCreateMonthlyScore } from "@/features/monthly-scores/hooks/use-create-monthly-score";
import {
  createMonthlyScoreSchema,
  type CreateMonthlyScoreFormValues,
} from "@/schemas/monthly-score.schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { StudentRead } from "@/types/student";
import type { MonthlyScoreCreate } from "@/types/monthly-score";

interface CreateMonthlyScoreDialogProps {
  student: StudentRead;
  studentApiId: number;
}

const defaultValues: CreateMonthlyScoreFormValues = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  academic_percent: 0,
  attendance_percent: 0,
  assignment_score: 0,
  discipline_score: 0,
  penalty_score: 0,
  recovery_score: 0,
  employment_score: 0,
};

function toPayload(
  studentId: number,
  values: CreateMonthlyScoreFormValues
): MonthlyScoreCreate {
  return {
    student_id: studentId,
    month: values.month,
    year: values.year,
    academic_percent: values.academic_percent ?? 0,
    attendance_percent: values.attendance_percent ?? 0,
    assignment_score: values.assignment_score ?? 0,
    discipline_score: values.discipline_score ?? 0,
    penalty_score: values.penalty_score ?? 0,
    recovery_score: values.recovery_score ?? 0,
    employment_score: values.employment_score ?? 0,
  };
}

export function CreateMonthlyScoreDialog({
  student,
  studentApiId,
}: CreateMonthlyScoreDialogProps) {
  const [open, setOpen] = useState(false);
  const createScore = useCreateMonthlyScore(studentApiId);

  const form = useForm<CreateMonthlyScoreFormValues>({
    resolver: zodResolver(createMonthlyScoreSchema),
    defaultValues,
  });

  function onSubmit(values: CreateMonthlyScoreFormValues) {
    createScore.mutate(toPayload(student.student_id, values), {
      onSuccess: () => {
        setOpen(false);
        form.reset(defaultValues);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <PlusIcon className="size-4" />
            Add month
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add monthly score</DialogTitle>
          <DialogDescription>
            Create a new KPI record for this student.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={12}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={2020}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <MonthlyScoreFields control={form.control} />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createScore.isPending}>
                {createScore.isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : null}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
