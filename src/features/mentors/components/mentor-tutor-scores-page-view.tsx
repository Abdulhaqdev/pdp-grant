"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3Icon, Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { LabeledSelect } from "@/components/admin/labeled-select";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMyMentorGroups } from "@/features/mentors/hooks/use-my-mentor-groups";
import { useUpdateTutorScore } from "@/features/mentors/hooks/use-update-tutor-score";
import { flattenMentorStudents } from "@/features/mentors/lib/mentor-data";
import {
  tutorScoreSchema,
  type TutorScoreFormValues,
} from "@/schemas/tutor-score.schema";

const defaultValues: TutorScoreFormValues = {
  student_id: "",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  tutor_score: 0,
};

export function MentorTutorScoresPageView() {
  const { data: groups = [], isLoading: groupsLoading } = useMyMentorGroups();
  const updateTutorScore = useUpdateTutorScore();

  const students = useMemo(() => flattenMentorStudents(groups), [groups]);

  const studentOptions = useMemo(
    () =>
      [...students]
        .sort((a, b) => a.student_id - b.student_id)
        .map((s) => ({
          value: String(s.student_id),
          label: `ID ${s.student_id} · Group ${s.group_number}`,
        })),
    [students]
  );

  const form = useForm<TutorScoreFormValues>({
    resolver: zodResolver(tutorScoreSchema),
    defaultValues,
  });

  function onSubmit(values: TutorScoreFormValues) {
    updateTutorScore.mutate(
      {
        student_id: Number(values.student_id),
        month: values.month,
        year: values.year,
        tutor_score: values.tutor_score,
      },
      {
        onSuccess: () => {
          form.reset({
            ...defaultValues,
            month: values.month,
            year: values.year,
          });
        },
      }
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tutor scores"
        description="Submit monthly tutor scores for your students."
      />

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3Icon className="size-5 text-[#229b91]" />
            Add tutor score
          </CardTitle>
          <CardDescription>
            Select a student and period, then enter the tutor score (0–100).
            Requires an existing monthly score record for that month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {groupsLoading ? (
            <p className="text-sm text-muted-foreground">Loading students…</p>
          ) : students.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have no students assigned yet. Scores can be added once
              students are in your groups.
            </p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student</FormLabel>
                      <FormControl>
                        <LabeledSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select student"
                          options={studentOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tutor_score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tutor score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          step={0.01}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={updateTutorScore.isPending}
                >
                  {updateTutorScore.isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : null}
                  Save tutor score
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
