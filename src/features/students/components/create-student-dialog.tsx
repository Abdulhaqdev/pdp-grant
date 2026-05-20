"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AdminOnly } from "@/components/admin/admin-only";
import { UserBaseFields } from "@/components/admin/user-base-fields";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { LabeledSelect } from "@/components/admin/labeled-select";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useCreateStudent } from "@/features/students/hooks/use-create-student";
import {
  createStudentSchema,
  type CreateStudentFormValues,
} from "@/schemas/create-student.schema";
import type { StudentCreate } from "@/types/student";

export function CreateStudentDialog() {
  const [open, setOpen] = useState(false);
  const createStudent = useCreateStudent();
  const { data: groups = [] } = useGroups();

  const form = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      phone: "",
      email: "",
      password: "",
      student_id: 0,
      group_id: null,
      is_grant: false,
      course_number: 1,
      attendance: 0,
      academic: 0,
      assignment: 0,
    },
  });

  function onSubmit(values: CreateStudentFormValues) {
    const payload: StudentCreate = {
      ...values,
      role: "student",
      group_id: values.group_id ?? null,
    };
    createStudent.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <AdminOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button size="sm">
              <PlusIcon className="size-4" />
              Talaba qo‘shish
            </Button>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Yangi talaba</DialogTitle>
            <DialogDescription>
              POST /user/student — faqat admin uchun
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <UserBaseFields control={form.control} />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1042"
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
                  name="course_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kurs</FormLabel>
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
                      <FormLabel>Guruh</FormLabel>
                      <FormControl>
                        <LabeledSelect
                          value={field.value ? String(field.value) : "none"}
                          onValueChange={(v) =>
                            field.onChange(
                              v === "none" ? undefined : Number(v)
                            )
                          }
                          placeholder="Guruh tanlang"
                          options={[
                            { value: "none", label: "Tanlanmagan" },
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
                  name="is_grant"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 sm:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Grant talaba</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={createStudent.isPending}>
                  {createStudent.isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : null}
                  Saqlash
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminOnly>
  );
}
