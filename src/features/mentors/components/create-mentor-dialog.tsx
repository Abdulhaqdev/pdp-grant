"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { MultiSelect } from "@/components/admin/multi-select";
import { AdminOnly } from "@/components/admin/admin-only";
import { UserBaseFields } from "@/components/admin/user-base-fields";
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
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useCreateMentor } from "@/features/mentors/hooks/use-create-mentor";
import {
  createMentorSchema,
  type CreateMentorFormValues,
} from "@/schemas/create-mentor.schema";
import type { MentorCreate } from "@/types/mentor";

export function CreateMentorDialog() {
  const [open, setOpen] = useState(false);
  const createMentor = useCreateMentor();
  const { data: groups = [] } = useGroups();

  const form = useForm<CreateMentorFormValues>({
    resolver: zodResolver(createMentorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      phone: "",
      email: "",
      password: "",
      group_ids: [],
    },
  });

  function onSubmit(values: CreateMentorFormValues) {
    const { group_ids, ...rest } = values;
    const payload: MentorCreate = {
      ...rest,
      role: "mentor",
      group_ids: group_ids.length > 0 ? group_ids : undefined,
    };
    createMentor.mutate(payload, {
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
              Mentor qo‘shish
            </Button>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Yangi mentor</DialogTitle>
            <DialogDescription>
              POST /user/mentor — faqat admin uchun
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <UserBaseFields control={form.control} />
              <FormField
                control={form.control}
                name="group_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guruhlar (ixtiyoriy)</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Guruhlarni tanlang"
                        options={groups.map((g) => ({
                          value: g.id,
                          label: g.group_number,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={createMentor.isPending}>
                  {createMentor.isPending ? (
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
