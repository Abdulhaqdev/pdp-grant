"use client";

import { CoinsIcon, ShoppingBagIcon, WalletIcon } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MarketProductCard } from "@/features/pdp-market/components/market-product-card";
import {
  usePdpMarket,
  usePdpMarketLiveSync,
} from "@/features/pdp-market/hooks/use-pdp-market";

export function StudentPdpMarketPageView() {
  const { data, isLoading, isError, error } = usePdpMarket();
  usePdpMarketLiveSync();

  const products = (data?.products ?? []).filter(
    (p) => p.active !== false
  );
  const potentialPoints = data?.potential_points ?? 0;
  const actualBalance = data?.student_balance ?? 0;

  const affordableCount = products.filter(
    (p) => potentialPoints >= p.price
  ).length;
  const closeCount = products.filter(
    (p) => potentialPoints < p.price && potentialPoints >= p.price * 0.75
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="PDP Market"
        description="Spend market points earned from your grant performance. Points update as your final score changes."
      />

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      <Alert className="border-[#229b91]/30 bg-[#229b91]/5">
        <CoinsIcon className="size-4 text-[#229b91]" />
        <AlertTitle>How market points work</AlertTitle>
        <AlertDescription>
          Estimated points this month = final score × 10. They stay
          &quot;potential&quot; until month-end, when your finalized score
          credits your actual balance. Catalog refreshes every 30 seconds and
          when leaderboard data changes.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Estimated points this month"
          value={isLoading ? "…" : potentialPoints.toLocaleString()}
          icon={CoinsIcon}
          description="potential_points = final_score × 10"
          className="sm:col-span-2 xl:col-span-1"
        />
        <StatCard
          title="Actual balance"
          value={isLoading ? "…" : actualBalance.toLocaleString()}
          icon={WalletIcon}
          description="Credited after monthly finalization"
        />
        <StatCard
          title="Rewards in reach"
          value={
            isLoading
              ? "…"
              : `${affordableCount} ready · ${closeCount} close`
          }
          icon={ShoppingBagIcon}
          description={`${products.length} products in catalog`}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-xl border bg-muted/40"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-sm text-muted-foreground">
          No products in the market catalog yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <MarketProductCard
              key={product.id}
              product={product}
              potentialPoints={potentialPoints}
              actualBalance={actualBalance}
            />
          ))}
        </div>
      )}
    </div>
  );
}
