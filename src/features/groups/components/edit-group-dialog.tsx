"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { LabeledSelect } from "@/components/admin/labeled-select";
import { Button } from "@/components/ui/button";
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
import { useUpdateGroup } from "@/features/groups/hooks/use-update-group";
import { useMentors } from "@/features/mentors/hooks/use-mentors";
import {
  updateGroupSchema,
  type UpdateGroupFormValues,
} from "@/schemas/update-group.schema";
import type { GroupRead } from "@/types/group";
import { getUserDisplayName } from "@/types/user";

function mentorSelectValue(userId: number | null | undefined): string {
  return userId != null ? String(userId) : "none";
}

interface EditGroupDialogProps {
  group: GroupRead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditGroupDialog({
  group,
  open,
  onOpenChange,
}: EditGroupDialogProps) {
  const updateGroup = useUpdateGroup();
  const { data: mentors = [] } = useMentors();

  const form = useForm<UpdateGroupFormValues>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues: {
      group_number: "",
      mentor_id: "none",
    },
  });

  useEffect(() => {
    if (group && open) {
      form.reset({
        group_number: group.group_number,
        mentor_id: mentorSelectValue(group.mentor_id),
      });
    }
  }, [group, open, form]);

  function onSubmit(values: UpdateGroupFormValues) {
    if (!group) return;
    updateGroup.mutate(
      {
        id: group.id,
        payload: {
          group_number: values.group_number,
          mentor_id:
            values.mentor_id && values.mentor_id !== "none"
              ? Number(values.mentor_id)
              : null,
        },
      },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit group</DialogTitle>
          <DialogDescription>
            {group
              ? `Update group number and mentor for ${group.group_number}.`
              : "Update group details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="group_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group number</FormLabel>
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
                      placeholder="Select mentor"
                      options={[
                        { value: "none", label: "Unassigned" },
                        ...mentors.map((m) => ({
                          value: String(m.user_id ?? m.id),
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
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateGroup.isPending}>
                {updateGroup.isPending ? (
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
