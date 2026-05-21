"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { MultiSelect } from "@/components/admin/multi-select";
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
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useUpdateMentor } from "@/features/mentors/hooks/use-update-mentor";
import {
  assignMentorGroupsSchema,
  type AssignMentorGroupsFormValues,
} from "@/schemas/assign-mentor-groups.schema";
import type { MentorRead } from "@/types/mentor";
import { getUserDisplayName } from "@/types/user";

interface AssignMentorGroupsDialogProps {
  mentor: MentorRead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignMentorGroupsDialog({
  mentor,
  open,
  onOpenChange,
}: AssignMentorGroupsDialogProps) {
  const updateMentor = useUpdateMentor();
  const { data: groups = [] } = useGroups();

  const form = useForm<AssignMentorGroupsFormValues>({
    resolver: zodResolver(assignMentorGroupsSchema),
    defaultValues: { group_ids: [] },
  });

  useEffect(() => {
    if (mentor && open) {
      form.reset({
        group_ids: mentor.groups?.map((g) => g.id) ?? [],
      });
    }
  }, [mentor, open, form]);

  function onSubmit(values: AssignMentorGroupsFormValues) {
    if (!mentor) return;
    updateMentor.mutate(
      {
        id: mentor.id,
        payload: { group_ids: values.group_ids },
      },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign groups</DialogTitle>
          <DialogDescription>
            {mentor
              ? `Choose which groups ${getUserDisplayName(mentor)} manages.`
              : "Select groups for this mentor."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="group_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Groups</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select groups"
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
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMentor.isPending}>
                {updateMentor.isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : null}
                Save groups
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
