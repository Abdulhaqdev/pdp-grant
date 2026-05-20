import { z } from "zod";

import { baseUserFieldsSchema } from "@/schemas/shared-user.schema";

export const createAdminSchema = baseUserFieldsSchema.extend({
  is_superadmin: z.boolean(),
});

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>;
