import { z } from "zod";

import { normalizePhone } from "@/schemas/auth.schema";

const PHONE_LENGTH = 13;

export const phoneFieldSchema = z
  .string()
  .min(1, "Phone number is required")
  .transform((v) => normalizePhone(v))
  .refine((v) => v.length === PHONE_LENGTH, {
    message: `Phone must be ${PHONE_LENGTH} characters (e.g. +998901234567)`,
  });

export const userProfileFieldsSchema = z.object({
  phone: phoneFieldSchema,
  email: z.string().email("Enter a valid email").max(50),
  first_name: z.string().min(1, "First name is required").max(25),
  last_name: z.string().min(1, "Last name is required").max(25),
  father_name: z.string().min(1, "Father's name is required").max(25),
});

export const baseUserFieldsSchema = userProfileFieldsSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters").max(255),
});
