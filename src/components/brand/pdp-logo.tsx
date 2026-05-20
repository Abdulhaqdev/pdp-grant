import Image from "next/image";
import Link from "next/link";

import { BRAND } from "@/constants/brand";
import { cn } from "@/lib/utils";

interface PdpLogoProps {
  variant?: "mark" | "wordmark" | "full";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
  priority?: boolean;
}

const MARK_SIZES = {
  sm: 48,
  md: 72,
  lg: 96,
  xl: 128,
} as const;

export function PdpLogo({
  variant = "mark",
  size = "lg",
  href,
  className,
  priority,
}: PdpLogoProps) {
  const markSize = MARK_SIZES[size];

  const mark = (
    <Image
      src={BRAND.logo}
      alt={BRAND.name}
      width={markSize}
      height={markSize}
      priority={priority}
      className={cn("rounded-full object-contain", className)}
    />
  );

  const wordmark = (
    <Image
      src={BRAND.logoWordmark}
      alt={BRAND.name}
      width={size === "sm" ? 100 : size === "md" ? 130 : 160}
      height={size === "sm" ? 26 : size === "md" ? 34 : 42}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );

  const content =
    variant === "mark" ? (
      mark
    ) : variant === "wordmark" ? (
      wordmark
    ) : (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        {mark}
        {wordmark}
      </div>
    );

  if (href) {
    return (
      <Link href={href} className="inline-flex transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
