"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import type { AppRole } from "@/constants/routes";
import { ROLE_DASHBOARD } from "@/constants/routes";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setSession, clearSession, accessToken } =
    useAuthStore();

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => authService.me(),
    enabled: !!accessToken && !user,
    retry: false,
  });

  useEffect(() => {
    if (meQuery.data && accessToken && !user) {
      setSession(meQuery.data, accessToken);
    }
  }, [meQuery.data, accessToken, user, setSession]);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (token) => {
      localStorage.setItem("access_token", token.access_token);
      const me = await authService.me();
      setSession(me, token.access_token);
      queryClient.setQueryData(queryKeys.auth.me, me);
      toast.success(`Welcome back, ${me.first_name}`);
      const role = me.role as AppRole;
      router.push(ROLE_DASHBOARD[role] ?? ROLE_DASHBOARD.admin);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid credentials");
    },
  });

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // proceed
    }
    clearSession();
    queryClient.clear();
    toast.info("Signed out");
    router.push("/login");
  }, [clearSession, queryClient, router]);

  const login = useCallback(
    (username: string, password: string) => {
      loginMutation.mutate({ username, password });
    },
    [loginMutation]
  );

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
    meQuery,
  };
}
