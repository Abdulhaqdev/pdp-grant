"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AdminOnly } from "@/components/admin/admin-only";
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
import { LabeledSelect } from "@/components/admin/labeled-select";
import { useCreateGroup } from "@/features/groups/hooks/use-create-group";
import { useMentors } from "@/features/mentors/hooks/use-mentors";
import {
  createGroupSchema,
  type CreateGroupFormValues,
} from "@/schemas/create-group.schema";
import { getUserDisplayName } from "@/types/user";

export function CreateGroupDialog() {
  const [open, setOpen] = useState(false);
  const createGroup = useCreateGroup();
  const { data: mentors = [] } = useMentors();

  const form = useForm<CreateGroupFormValues>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      group_number: "",
      mentor_id: "none",
    },
  });

  function onSubmit(values: CreateGroupFormValues) {
    createGroup.mutate(
      {
        group_number: values.group_number,
        mentor_id:
          values.mentor_id && values.mentor_id !== "none"
            ? Number(values.mentor_id)
            : null,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      }
    );
  }

  return (
    <AdminOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button size="sm">
              <PlusIcon className="size-4" />
              Guruh qo‘shish
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Yangi guruh</DialogTitle>
            <DialogDescription>
              POST /groups/ — faqat admin uchun
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="group_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guruh raqami</FormLabel>
                    <FormControl>
                      <Input placeholder="G-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mentor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentor</FormLabel>
                    <FormControl>
                      <LabeledSelect
                        value={field.value ?? "none"}
                        onValueChange={field.onChange}
                        placeholder="Mentor tanlang"
                        options={[
                          { value: "none", label: "Tanlanmagan" },
                          ...mentors.map((m) => ({
                            value: String(m.user_id),
                            label: getUserDisplayName(m),
                          })),
                        ]}
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
                <Button type="submit" disabled={createGroup.isPending}>
                  {createGroup.isPending ? (
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
