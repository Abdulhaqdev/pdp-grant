"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { LabeledSelect } from "@/components/admin/labeled-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useUpdateStudent } from "@/features/students/hooks/use-update-student";
import {
  updateStudentSchema,
  type UpdateStudentFormValues,
} from "@/schemas/update-student.schema";
import type { StudentRead } from "@/types/student";
import type { StudentUpdate } from "@/types/student";
import { getUserDisplayName } from "@/types/user";

interface EditStudentDialogProps {
  student: StudentRead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditStudentDialog({
  student,
  open,
  onOpenChange,
}: EditStudentDialogProps) {
  const updateStudent = useUpdateStudent();
  const { data: groups = [] } = useGroups();

  const form = useForm<UpdateStudentFormValues>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      group_id: null,
      is_grant: false,
      course_number: 1,
      attendance: 0,
      academic: 0,
      assignment: 0,
    },
  });

  useEffect(() => {
    if (student && open) {
      form.reset({
        group_id: student.group_id,
        is_grant: student.is_grant,
        course_number: student.course_number,
        attendance: student.attendance ?? 0,
        academic: student.academic ?? 0,
        assignment: student.assignment ?? 0,
      });
    }
  }, [student, open, form]);

  function onSubmit(values: UpdateStudentFormValues) {
    if (!student) return;
    const payload: StudentUpdate = {
      group_id: values.group_id ?? null,
      is_grant: values.is_grant,
      course_number: values.course_number,
      attendance: values.attendance,
      academic: values.academic,
      assignment: values.assignment,
    };
    updateStudent.mutate(
      { id: student.id, payload },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit student</DialogTitle>
          <DialogDescription>
            {student
              ? `Update enrollment and scores for ${getUserDisplayName(student)}.`
              : "Update student details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="course_number"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group_id"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Group</FormLabel>
                    <FormControl>
                      <LabeledSelect
                        value={
                          field.value != null ? String(field.value) : "none"
                        }
                        onValueChange={(v) =>
                          field.onChange(v === "none" ? null : Number(v))
                        }
                        placeholder="Select group"
                        options={[
                          { value: "none", label: "Unassigned" },
                          ...groups.map((g) => ({
                            value: String(g.id),
                            label: g.group_number,
                          })),
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attendance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="academic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_grant"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 sm:col-span-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Grant student</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateStudent.isPending}>
                {updateStudent.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : null}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
