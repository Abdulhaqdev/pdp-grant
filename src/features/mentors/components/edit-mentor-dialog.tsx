"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { MultiSelect } from "@/components/admin/multi-select";
import { UserEditableFields } from "@/components/admin/user-editable-fields";
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
import { Separator } from "@/components/ui/separator";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useUpdateMentorProfile } from "@/features/mentors/hooks/use-update-mentor-profile";
import {
  updateMentorSchema,
  type UpdateMentorFormValues,
} from "@/schemas/update-mentor.schema";
import type { MentorRead } from "@/types/mentor";
import { getUserDisplayName } from "@/types/user";

interface EditMentorDialogProps {
  mentor: MentorRead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMentorDialog({
  mentor,
  open,
  onOpenChange,
}: EditMentorDialogProps) {
  const updateMentor = useUpdateMentorProfile();
  const { data: groups = [] } = useGroups();

  const form = useForm<UpdateMentorFormValues>({
    resolver: zodResolver(updateMentorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      phone: "",
      email: "",
      group_ids: [],
    },
  });

  useEffect(() => {
    if (mentor && open) {
      form.reset({
        first_name: mentor.first_name,
        last_name: mentor.last_name,
        father_name: mentor.father_name,
        phone: mentor.phone,
        email: mentor.email,
        group_ids: mentor.groups?.map((g) => g.id) ?? [],
      });
    }
  }, [mentor, open, form]);

  function onSubmit(values: UpdateMentorFormValues) {
    if (!mentor) return;
    updateMentor.mutate(
      {
        mentorId: mentor.id,
        userId: mentor.user_id ?? mentor.id,
        values,
      },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit mentor</DialogTitle>
          <DialogDescription>
            {mentor
              ? `Update profile and group assignments for ${getUserDisplayName(mentor)}.`
              : "Update mentor details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Profile</p>
              <UserEditableFields control={form.control} />
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Group assignments
                </p>
                <p className="text-xs text-muted-foreground">
                  Select groups this mentor is assigned to.
                </p>
              </div>
              <FormField
                control={form.control}
                name="group_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Groups</FormLabel>
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
            </div>

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
