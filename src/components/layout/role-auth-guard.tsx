"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { PageSkeleton } from "@/components/admin/page-skeleton";
import type { AppRole } from "@/constants/routes";
import { ROUTES, ROLE_DASHBOARD } from "@/constants/routes";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useAuthStore } from "@/store/auth.store";

interface RoleAuthGuardProps {
  children: React.ReactNode;
  allowedRole: AppRole;
}

export function RoleAuthGuard({ children, allowedRole }: RoleAuthGuardProps) {
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

    if (user && user.role !== allowedRole) {
      router.replace(ROLE_DASHBOARD[user.role as AppRole] ?? ROUTES.login);
    }
  }, [hasHydrated, isRestoring, isLoggedIn, user, router, allowedRole]);

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

  if (!isLoggedIn || (user && user.role !== allowedRole)) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <PageSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
