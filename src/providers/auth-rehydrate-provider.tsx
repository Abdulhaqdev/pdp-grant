"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/store/auth.store";

/**
 * Ensures Zustand auth state is rehydrated from localStorage on the client
 * before route guards evaluate session (required for Next.js App Router).
 */
export function AuthRehydrateProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const finishHydration = () => {
      if (!useAuthStore.getState()._hasHydrated) {
        useAuthStore.setState({ _hasHydrated: true });
      }
    };

    const unsub = useAuthStore.persist.onFinishHydration(finishHydration);

    if (useAuthStore.persist.hasHydrated()) {
      finishHydration();
    } else {
      void useAuthStore.persist.rehydrate();
    }

    return unsub;
  }, []);

  return <>{children}</>;
}
