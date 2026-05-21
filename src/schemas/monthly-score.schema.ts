import { z } from "zod";

const scoreField = z.number().optional();

/** Admin-managed KPI fields (tutor score is set separately by mentors). */
export const monthlyScoreFieldsSchema = z.object({
  academic_percent: scoreField,
  attendance_percent: scoreField,
  assignment_score: scoreField,
  discipline_score: scoreField,
  penalty_score: scoreField,
  recovery_score: scoreField,
  employment_score: scoreField,
});

export const updateMonthlyScoreSchema = monthlyScoreFieldsSchema;

export const createMonthlyScoreSchema = monthlyScoreFieldsSchema.extend({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
});

export type MonthlyScoreFieldsValues = z.infer<typeof monthlyScoreFieldsSchema>;

export type UpdateMonthlyScoreFormValues = z.infer<
  typeof updateMonthlyScoreSchema
>;
export type CreateMonthlyScoreFormValues = z.infer<
  typeof createMonthlyScoreSchema
>;
