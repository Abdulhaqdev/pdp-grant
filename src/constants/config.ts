import { env } from "@/utils/env";

export const APP_CONFIG = {
  name: env.appName,
  url: env.appUrl,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  defaultLocale: "en",
} as const;
