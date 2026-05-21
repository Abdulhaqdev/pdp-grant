import { z } from "zod";

export const assignMentorGroupsSchema = z.object({
  group_ids: z.array(z.number().int().positive()),
});

export type AssignMentorGroupsFormValues = z.infer<
  typeof assignMentorGroupsSchema
>;
