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
import { useCreateAdmin } from "@/features/users/hooks/use-create-admin";
import {
  createAdminSchema,
  type CreateAdminFormValues,
} from "@/schemas/create-admin.schema";
import type { AdminCreate } from "@/types/admin";

export function CreateAdminDialog() {
  const [open, setOpen] = useState(false);
  const createAdmin = useCreateAdmin();

  const form = useForm<CreateAdminFormValues>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      phone: "",
      email: "",
      password: "",
      is_superadmin: false,
    },
  });

  function onSubmit(values: CreateAdminFormValues) {
    const payload: AdminCreate = {
      ...values,
      role: "admin",
    };
    createAdmin.mutate(payload, {
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
              Admin qo‘shish
            </Button>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Yangi admin</DialogTitle>
            <DialogDescription>
              POST /user/admin — faqat admin uchun
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <UserBaseFields control={form.control} />
              <FormField
                control={form.control}
                name="is_superadmin"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Superadmin</FormLabel>
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
                <Button type="submit" disabled={createAdmin.isPending}>
                  {createAdmin.isPending ? (
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
