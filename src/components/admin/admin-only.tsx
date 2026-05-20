"use client";

import type { ReactNode } from "react";

import { useAuthStore } from "@/store/auth.store";

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Renders children only when the current user has admin role. */
export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const user = useAuthStore((s) => s.user);
  if (user?.role !== "admin") {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
