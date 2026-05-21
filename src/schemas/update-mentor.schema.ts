import { z } from "zod";

import { userProfileFieldsSchema } from "@/schemas/shared-user.schema";

export const updateMentorSchema = userProfileFieldsSchema.extend({
  group_ids: z.array(z.number()),
});

export type UpdateMentorFormValues = z.infer<typeof updateMentorSchema>;
