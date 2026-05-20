import { z } from "zod";

export const createGroupSchema = z.object({
  group_number: z.string().min(1, "Guruh raqami majburiy").max(25),
  mentor_id: z.string().optional(),
});

export type CreateGroupFormValues = z.infer<typeof createGroupSchema>;
