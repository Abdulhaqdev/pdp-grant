import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserRead } from "@/types/user";

interface AuthState {
  user: UserRead | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: UserRead, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setSession: (user, accessToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", accessToken);
        }
        set({ user, accessToken, isAuthenticated: true });
      },
      clearSession: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: "lms-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
