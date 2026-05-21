"use client";

import { PlusIcon, RotateCcwIcon, StoreIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { PageHeader } from "@/components/shared/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AdminProductDialog } from "@/features/pdp-market/components/admin-product-dialog";
import { createAdminProductColumns } from "@/features/pdp-market/config/admin-product-columns";
import {
  useAdminMarketCatalog,
  useDeleteMockProduct,
  useResetAdminMarketCatalog,
  useUpsertMockProduct,
} from "@/features/pdp-market/hooks/use-admin-market-catalog";
import { usePdpMarketLiveSync } from "@/features/pdp-market/hooks/use-pdp-market";
import type { MarketProduct } from "@/types/pdp-market";

export function AdminPdpMarketPageView() {
  usePdpMarketLiveSync();
  const { data: products = [], isLoading } = useAdminMarketCatalog();
  const { upsert, isPending: saving } = useUpsertMockProduct();
  const { remove, isPending: deleting } = useDeleteMockProduct();
  const resetCatalog = useResetAdminMarketCatalog();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MarketProduct | null>(null);
  const [deletingProduct, setDeletingProduct] =
    useState<MarketProduct | null>(null);

  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.image.toLowerCase().includes(q) ||
        String(p.id).includes(q)
    );
  }, [products, search]);

  const columns = useMemo(
    () =>
      createAdminProductColumns({
        onEdit: (p) => {
          setEditing(p);
          setDialogOpen(true);
        },
        onDelete: setDeletingProduct,
      }),
    []
  );

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function handleProductSubmit(
    values: {
      name: string;
      price: number;
      image: string;
      description?: string;
      active: boolean;
      id?: number;
    }
  ) {
    upsert(values);
    setDialogOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="PDP Market"
        description="Configure the reward shop catalog. Students use the same product list from shared storage."
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => resetCatalog.mutate()}
              disabled={resetCatalog.isPending}
            >
              <RotateCcwIcon className="size-4" />
              Reset defaults
            </Button>
            <Button size="sm" onClick={openCreate}>
              <PlusIcon className="size-4" />
              Add product
            </Button>
          </div>
        }
      />

      <Alert>
        <StoreIcon className="size-4" />
        <AlertTitle>Shared catalog</AlertTitle>
        <AlertDescription>
          Product list and images are stored in this browser&apos;s local storage
          and shown to students on the PDP Market page. Point balances still come
          from <code className="text-xs">GET /leaderboard/pdp-market</code>.
          Open student market in the same browser to preview changes instantly.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length === 1 ? "" : "s"} · formula:{" "}
          <span className="font-medium text-foreground">
            potential_points = final_score × 10
          </span>
        </p>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search products..."
          className="w-full sm:w-64"
        />
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        loading={isLoading}
        emptyIcon={StoreIcon}
        emptyTitle="No products"
        emptyDescription="Add your first reward to the mock catalog."
      />

      <AdminProductDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditing(null);
        }}
        product={editing}
        onSubmit={handleProductSubmit}
        loading={saving}
      />

      <ConfirmDialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
        title="Delete product"
        description={
          deletingProduct
            ? `Remove "${deletingProduct.name}" from the mock catalog?`
            : ""
        }
        variant="destructive"
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={() => {
          if (deletingProduct) {
            remove(deletingProduct.id);
            setDeletingProduct(null);
          }
        }}
      />
    </div>
  );
}
