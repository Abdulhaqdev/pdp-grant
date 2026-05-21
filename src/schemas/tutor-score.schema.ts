import { z } from "zod";

export const tutorScoreSchema = z.object({
  student_id: z.string().min(1, "Select a student"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
  tutor_score: z.number().min(0).max(100),
});

export type TutorScoreFormValues = z.infer<typeof tutorScoreSchema>;
