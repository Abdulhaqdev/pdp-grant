"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { queryKeys } from "@/constants/query-keys";
import { authService } from "@/services/auth.service";
import { getAccessToken, useAuthStore } from "@/store/auth.store";

/**
 * Restores the session after refresh: waits for persist hydration, then
 * fetches /auth/me/ when a token exists but user is not in memory yet.
 */
export function useAuthSession() {
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setSession = useAuthStore((s) => s.setSession);

  const accessToken = hasHydrated ? getAccessToken() : null;
  const needsBootstrap = hasHydrated && !!accessToken && !user;

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => authService.me(),
    enabled: needsBootstrap,
    retry: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (meQuery.data && accessToken) {
      setSession(meQuery.data, accessToken);
    }
  }, [meQuery.data, accessToken, setSession]);

  const isRestoring = needsBootstrap && meQuery.isPending;
  const isLoggedIn = hasHydrated && !!user && (!!isAuthenticated || !!accessToken);

  return {
    hasHydrated,
    user,
    accessToken,
    isLoggedIn,
    isRestoring,
    meQuery,
  };
}
