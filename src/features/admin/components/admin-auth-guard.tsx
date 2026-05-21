"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { PageSkeleton } from "@/components/admin/page-skeleton";
import { ROUTES } from "@/constants/routes";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useAuthStore } from "@/store/auth.store";

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { hasHydrated, user, isLoggedIn, isRestoring, meQuery } =
    useAuthSession();
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    if (!hasHydrated || isRestoring) return;

    if (!isLoggedIn) {
      router.replace(ROUTES.login);
      return;
    }

    if (user && user.role !== "admin") {
      router.replace(`/${user.role}`);
    }
  }, [hasHydrated, isRestoring, isLoggedIn, user, router]);

  useEffect(() => {
    if (!hasHydrated || isRestoring) return;
    if (meQuery.isError) {
      clearSession();
      router.replace(ROUTES.login);
    }
  }, [hasHydrated, isRestoring, meQuery.isError, clearSession, router]);

  if (!hasHydrated || isRestoring) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <PageSkeleton />
      </div>
    );
  }

  if (!isLoggedIn || (user && user.role !== "admin")) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <PageSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
