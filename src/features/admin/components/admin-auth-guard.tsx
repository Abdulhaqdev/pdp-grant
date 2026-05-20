"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { ROUTES } from "@/constants/routes";
import { PageSkeleton } from "@/components/admin/page-skeleton";
import { useAuthStore } from "@/store/auth.store";

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.login);
      return;
    }
    if (user && user.role !== "admin") {
      router.replace(`/${user.role}`);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || (user && user.role !== "admin")) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <PageSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
