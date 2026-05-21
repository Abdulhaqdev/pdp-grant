import { z } from "zod";

export const updateGroupSchema = z.object({
  group_number: z.string().min(1, "Group number is required").max(25),
  mentor_id: z.string(),
});

export type UpdateGroupFormValues = z.infer<typeof updateGroupSchema>;
