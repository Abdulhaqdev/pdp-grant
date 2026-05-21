"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { queryKeys } from "@/constants/query-keys";
import { PDP_MARKET_CATALOG_EVENT } from "@/features/pdp-market/data/mock-catalog";
import { fetchPdpMarket } from "@/features/pdp-market/lib/fetch-pdp-market";
import { useAuthStore } from "@/store/auth.store";

const REFETCH_MS = 30_000;

export function usePdpMarket() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: queryKeys.pdpMarket.catalog,
    queryFn: fetchPdpMarket,
    enabled: !!user && user.role === "student",
    refetchInterval: REFETCH_MS,
    refetchOnWindowFocus: true,
    staleTime: 5_000,
  });
}

/** Refetch when admin updates catalog or leaderboard pushes an update. */
export function usePdpMarketLiveSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function refresh() {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.pdpMarket.catalog,
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.pdpMarket.adminCatalog,
      });
    }

    function onStorage(e: StorageEvent) {
      if (e.key === "pdp-market-mock-catalog") refresh();
    }

    window.addEventListener(PDP_MARKET_CATALOG_EVENT, refresh);
    window.addEventListener("leaderboard:update", refresh);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(PDP_MARKET_CATALOG_EVENT, refresh);
      window.removeEventListener("leaderboard:update", refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [queryClient]);
}
