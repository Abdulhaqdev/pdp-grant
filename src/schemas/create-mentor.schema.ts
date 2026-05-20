import { z } from "zod";

import { baseUserFieldsSchema } from "@/schemas/shared-user.schema";

export const createMentorSchema = baseUserFieldsSchema.extend({
  group_ids: z.array(z.number()),
});

export type CreateMentorFormValues = z.infer<typeof createMentorSchema>;
