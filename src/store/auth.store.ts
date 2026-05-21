import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserRead } from "@/types/user";

const ACCESS_TOKEN_KEY = "access_token";

function readStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

interface AuthState {
  user: UserRead | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setSession: (user: UserRead, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setSession: (user, accessToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }
        set({ user, accessToken, isAuthenticated: true });
      },
      clearSession: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "lms-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          useAuthStore.setState({ _hasHydrated: true });
          return;
        }

        const tokenFromStorage = readStoredAccessToken();

        if (state) {
          if (state.accessToken) {
            if (typeof window !== "undefined") {
              localStorage.setItem(ACCESS_TOKEN_KEY, state.accessToken);
            }
          } else if (tokenFromStorage) {
            state.accessToken = tokenFromStorage;
            state.isAuthenticated = true;
          }
        }

        useAuthStore.setState({ _hasHydrated: true });
      },
    }
  )
);

/** Resolved token from store or localStorage (after hydration). */
export function getAccessToken(): string | null {
  return useAuthStore.getState().accessToken ?? readStoredAccessToken();
}
