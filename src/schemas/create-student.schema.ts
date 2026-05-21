import { z } from "zod";

import { baseUserFieldsSchema } from "@/schemas/shared-user.schema";

export const createStudentSchema = baseUserFieldsSchema.extend({
  student_id: z.number().int().positive("Student ID must be a positive number"),
  group_id: z.number().int().positive().nullable().optional(),
  is_grant: z.boolean(),
  course_number: z.number().int().min(1).max(10),
  attendance: z.number().int().min(0),
  academic: z.number().int().min(0),
  assignment: z.number().int().min(0),
});

export type CreateStudentFormValues = z.infer<typeof createStudentSchema>;
