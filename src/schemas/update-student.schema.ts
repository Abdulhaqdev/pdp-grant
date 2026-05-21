import { z } from "zod";

export const updateStudentSchema = z.object({
  group_id: z.number().int().positive().nullable(),
  is_grant: z.boolean(),
  course_number: z.number().int().min(1).max(10),
  attendance: z.number().int().min(0),
  academic: z.number().int().min(0),
  assignment: z.number().int().min(0),
});

export type UpdateStudentFormValues = z.infer<typeof updateStudentSchema>;
