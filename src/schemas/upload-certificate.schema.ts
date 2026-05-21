import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const uploadCertificateSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  cert_type: z.string().min(1, "Certificate type is required").max(50),
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "File must be 10 MB or less"),
});

export type UploadCertificateFormValues = z.infer<typeof uploadCertificateSchema>;

export const CERTIFICATE_TYPES = [
  { value: "course", label: "Course completion" },
  { value: "language", label: "Language" },
  { value: "achievement", label: "Achievement" },
  { value: "internship", label: "Internship" },
  { value: "other", label: "Other" },
] as const;
