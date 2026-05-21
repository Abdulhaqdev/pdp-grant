"use client";

import Image from "next/image";
import { useState } from "react";

import { resolveProductImageUrl } from "@/features/pdp-market/lib/product-image";
import { cn } from "@/lib/utils";

interface ProductImageThumbProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}

export function ProductImageThumb({
  src,
  alt,
  className,
  size = 48,
}: ProductImageThumbProps) {
  const [error, setError] = useState(false);
  const url = resolveProductImageUrl(src);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-md border bg-muted/40",
        className
      )}
      style={{ width: size, height: size }}
    >
      {!error ? (
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setError(true)}
          unoptimized={url.endsWith(".svg")}
        />
      ) : (
        <span className="flex size-full items-center justify-center text-[10px] text-muted-foreground">
          N/A
        </span>
      )}
    </div>
  );
}
