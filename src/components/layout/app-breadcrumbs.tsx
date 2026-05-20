"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

import {
  BREADCRUMB_LABELS,
  DASHBOARD_HOME,
  ROLE_LABELS,
} from "@/constants/app-nav";
import type { AppRole } from "@/constants/routes";

interface AppBreadcrumbsProps {
  role: AppRole;
}

export function AppBreadcrumbs({ role }: AppBreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const home = DASHBOARD_HOME[role];
  const labels = BREADCRUMB_LABELS[role];

  if (segments.length <= 1) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
        <span className="font-medium text-foreground">Overview</span>
      </nav>
    );
  }

  const crumbs = segments.slice(1).map((seg, index) => {
    const href = `/${role}/${segments.slice(1, index + 2).join("/")}`;
    const label = labels[seg] ?? seg;
    const isLast = index === segments.slice(1).length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        href={home}
        className="text-muted-foreground transition-colors hover:text-foreground"
        title={ROLE_LABELS[role]}
      >
        <HomeIcon className="size-3.5" />
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
          {crumb.isLast ? (
            <span className="font-medium text-foreground">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
