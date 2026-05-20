import { z } from "zod";

import { normalizePhone } from "@/schemas/auth.schema";

const PHONE_LENGTH = 13;

export const phoneFieldSchema = z
  .string()
  .min(1, "Telefon raqam majburiy")
  .transform((v) => normalizePhone(v))
  .refine((v) => v.length === PHONE_LENGTH, {
    message: `Telefon ${PHONE_LENGTH} belgidan iborat bo‘lishi kerak (+998901234567)`,
  });

export const baseUserFieldsSchema = z.object({
  phone: phoneFieldSchema,
  email: z.string().email("To‘g‘ri email kiriting").max(50),
  first_name: z.string().min(1, "Ism majburiy").max(25),
  last_name: z.string().min(1, "Familiya majburiy").max(25),
  father_name: z.string().min(1, "Otasining ismi majburiy").max(25),
  password: z.string().min(6, "Parol kamida 6 belgi").max(255),
});
