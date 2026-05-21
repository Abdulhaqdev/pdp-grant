"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import {
  DEFAULT_MOCK_PRODUCTS,
  readMockCatalog,
  resetMockCatalog,
  writeMockCatalog,
} from "@/features/pdp-market/data/mock-catalog";
import type { MarketProduct } from "@/types/pdp-market";

function nextProductId(products: MarketProduct[]): number {
  return products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

export function useAdminMarketCatalog() {
  return useQuery({
    queryKey: queryKeys.pdpMarket.adminCatalog,
    queryFn: () => readMockCatalog(),
    staleTime: Infinity,
  });
}

export function useSaveAdminMarketCatalog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (products: MarketProduct[]) => {
      writeMockCatalog(products);
      return products;
    },
    onSuccess: (products) => {
      queryClient.setQueryData(queryKeys.pdpMarket.adminCatalog, products);
      void queryClient.invalidateQueries({
        queryKey: queryKeys.pdpMarket.catalog,
      });
      toast.success("Catalog saved — students will see the same products");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useResetAdminMarketCatalog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => resetMockCatalog(),
    onSuccess: (products) => {
      queryClient.setQueryData(queryKeys.pdpMarket.adminCatalog, products);
      toast.info("Catalog reset to defaults");
    },
  });
}

export function useUpsertMockProduct() {
  const queryClient = useQueryClient();
  const save = useSaveAdminMarketCatalog();

  function upsert(product: Omit<MarketProduct, "id"> & { id?: number }) {
    const current =
      queryClient.getQueryData<MarketProduct[]>(
        queryKeys.pdpMarket.adminCatalog
      ) ?? readMockCatalog();

    const next: MarketProduct[] =
      product.id != null
        ? current.map((p) =>
            p.id === product.id ? ({ ...p, ...product } as MarketProduct) : p
          )
        : [...current, { ...product, id: nextProductId(current) }];

    save.mutate(next);
  }

  return { upsert, isPending: save.isPending };
}

export function useDeleteMockProduct() {
  const save = useSaveAdminMarketCatalog();

  function remove(id: number) {
    const current = readMockCatalog().filter((p) => p.id !== id);
    save.mutate(current);
  }

  return { remove, isPending: save.isPending };
}

export { DEFAULT_MOCK_PRODUCTS };
