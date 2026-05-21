"use client";

import {
  CheckCircle2Icon,
  LockIcon,
  SparklesIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resolveProductImageUrl } from "@/features/pdp-market/lib/product-image";
import {
  getProductAffordability,
  pointsProgress,
  type MarketProduct,
} from "@/types/pdp-market";
import { cn } from "@/lib/utils";

interface MarketProductCardProps {
  product: MarketProduct;
  potentialPoints: number;
  actualBalance?: number;
}

const AFFORDABILITY_COPY = {
  affordable: {
    label: "Within reach",
    variant: "default" as const,
    icon: CheckCircle2Icon,
  },
  close: {
    label: "Almost there",
    variant: "secondary" as const,
    icon: SparklesIcon,
  },
  locked: {
    label: "Keep earning",
    variant: "outline" as const,
    icon: LockIcon,
  },
};

export function MarketProductCard({
  product,
  potentialPoints,
  actualBalance,
}: MarketProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = resolveProductImageUrl(product.image);
  const affordability = getProductAffordability(
    potentialPoints,
    product.price
  );
  const progress = pointsProgress(potentialPoints, product.price);
  const meta = AFFORDABILITY_COPY[affordability];
  const StatusIcon = meta.icon;
  const pointsNeeded = Math.max(0, product.price - potentialPoints);
  const canRedeemWithBalance = (actualBalance ?? 0) >= product.price;

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-shadow hover:shadow-md",
        affordability === "affordable" && "ring-1 ring-primary/30"
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
            unoptimized={imageSrc.endsWith(".svg")}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Image unavailable
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
          <Badge variant={meta.variant} className="shrink-0 gap-1">
            <StatusIcon className="size-3" />
            {meta.label}
          </Badge>
        </div>
        {product.description ? (
          <CardDescription className="line-clamp-2 text-xs">
            {product.description}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 pb-2">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold tabular-nums text-[var(--pdp-navy)]">
            {product.price}
          </span>
          <span className="text-xs text-muted-foreground">points</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress (estimated)</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {affordability !== "affordable" ? (
          <p className="text-xs text-muted-foreground">
            {pointsNeeded} more estimated points needed this month
          </p>
        ) : (
          <p className="text-xs text-primary">
            Your estimated points cover this reward
          </p>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/30 pt-3 text-xs text-muted-foreground">
        {canRedeemWithBalance
          ? "You have enough balance to redeem (when shop opens)"
          : `Balance: ${actualBalance ?? 0} pts · Finalized at month end`}
      </CardFooter>
    </Card>
  );
}
