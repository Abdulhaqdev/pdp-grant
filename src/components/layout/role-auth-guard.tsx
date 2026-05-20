"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { PageSkeleton } from "@/components/admin/page-skeleton";
import type { AppRole } from "@/constants/routes";
import { ROUTES, ROLE_DASHBOARD } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";

interface RoleAuthGuardProps {
  children: React.ReactNode;
  allowedRole: AppRole;
}

export function RoleAuthGuard({ children, allowedRole }: RoleAuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.login);
      return;
    }
    if (user && user.role !== allowedRole) {
      router.replace(ROLE_DASHBOARD[user.role as AppRole] ?? ROUTES.login);
    }
  }, [isAuthenticated, user, router, allowedRole]);

  if (!isAuthenticated || (user && user.role !== allowedRole)) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <PageSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
