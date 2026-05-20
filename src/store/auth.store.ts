import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserRole } from "@/constants/routes";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, accessToken: string) => void;
  clearSession: () => void;
  setRole: (role: UserRole) => void;
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
      setRole: (role) =>
        set((state) =>
          state.user ? { user: { ...state.user, role } } : state
        ),
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
