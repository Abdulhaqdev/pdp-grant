"use client";

import { Toaster } from "@/components/ui/sonner";
import { AuthRehydrateProvider } from "@/providers/auth-rehydrate-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthRehydrateProvider>{children}</AuthRehydrateProvider>
        <Toaster richColors closeButton position="top-right" />
      </QueryProvider>
    </ThemeProvider>
  );
}
