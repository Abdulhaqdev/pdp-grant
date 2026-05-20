import { z } from "zod";

/** Backend phone: exactly 13 characters (e.g. +998901234567) */
const PHONE_LENGTH = 13;

function isEmail(value: string): boolean {
  return z.string().email().safeParse(value).success;
}

function isPhone(value: string): boolean {
  const normalized = normalizePhone(value);
  return normalized.length === PHONE_LENGTH;
}

export function normalizePhone(phone: string): string {
  return phone.trim().replace(/[\s\-()]/g, "");
}

export function normalizeLoginUsername(username: string): string {
  const trimmed = username.trim();
  if (trimmed.includes("@")) {
    return trimmed.toLowerCase();
  }
  return normalizePhone(trimmed);
}

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Email or phone number is required")
    .superRefine((value, ctx) => {
      const trimmed = value.trim();
      // if (!isPhone(trimmed)) {
      //   ctx.addIssue({
      //     code: "custom",
      //     message: `Phone must be ${PHONE_LENGTH} characters (e.g. +998901234567)`,
      //   });
      // }
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
