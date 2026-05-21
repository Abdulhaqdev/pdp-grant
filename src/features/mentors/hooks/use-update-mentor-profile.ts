"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { mentorsService } from "@/services/mentors.service";
import { usersService } from "@/services/users.service";
import type { UpdateMentorFormValues } from "@/schemas/update-mentor.schema";

interface UpdateMentorProfileInput {
  mentorId: number;
  userId: number;
  values: UpdateMentorFormValues;
}

export function useUpdateMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mentorId, userId, values }: UpdateMentorProfileInput) => {
      const { group_ids, first_name, last_name, father_name, phone, email } =
        values;

      await Promise.all([
        usersService.updateName(
          { first_name, last_name, father_name },
          userId
        ),
        usersService.updateUnique({ phone, email }, userId),
        mentorsService.update(mentorId, {
          group_ids: group_ids.length > 0 ? group_ids : null,
        }),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Mentor updated successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
