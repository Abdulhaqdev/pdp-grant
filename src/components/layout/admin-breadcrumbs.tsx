"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

import { ADMIN_BREADCRUMB_LABELS } from "@/constants/admin-nav";
import { ROUTES } from "@/constants/routes";
export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
        <span className="font-medium text-foreground">Overview</span>
      </nav>
    );
  }

  const crumbs = segments.slice(1).map((seg, index) => {
    const href = `/admin/${segments.slice(1, index + 2).join("/")}`;
    const label = ADMIN_BREADCRUMB_LABELS[seg] ?? seg;
    const isLast = index === segments.slice(1).length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        href={ROUTES.admin.dashboard}
        className="text-muted-foreground transition-colors hover:text-foreground"
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
