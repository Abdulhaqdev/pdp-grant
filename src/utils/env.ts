function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function getPublicEnv(key: string, fallback?: string): string {
  return getEnv(key, fallback);
}

export const env = {
  appName: getPublicEnv("NEXT_PUBLIC_APP_NAME", "Grant LMS"),
  appUrl: getPublicEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  apiUrl: getPublicEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000/api"),
} as const;
