"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ROLE_DASHBOARD } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import type { User } from "@/types/user";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setSession, clearSession } = useAuthStore();

  const login = useCallback(
    (userData: User, accessToken: string) => {
      setSession(userData, accessToken);
      toast.success(`Welcome back, ${userData.name}`);
      router.push(ROLE_DASHBOARD[userData.role]);
    },
    [router, setSession]
  );

  const logout = useCallback(() => {
    clearSession();
    toast.info("You have been signed out");
    router.push("/login");
  }, [clearSession, router]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
