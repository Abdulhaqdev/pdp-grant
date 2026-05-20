import { env } from "@/utils/env";

export const APP_CONFIG = {
  name: env.appName,
  url: env.appUrl,
  apiUrl: env.apiUrl,
  defaultLocale: "en",
} as const;
