"use client";

import { MenuIcon } from "lucide-react";

import { AdminBreadcrumbs } from "@/components/layout/admin-breadcrumbs";
import { AdminHeaderActions } from "@/components/layout/admin-header-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminNavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export function AdminNavbar({ onMenuClick, className }: AdminNavbarProps) {
  return (
    <header
      className={cn(
        "flex shrink-0 flex-col border-b border-border/60 bg-background/80 backdrop-blur-md lg:flex-row lg:items-center",
        className
      )}
    >
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Menyuni ochish"
        >
          <MenuIcon className="size-4" />
        </Button>
        <AdminBreadcrumbs />
      </div>
      <AdminHeaderActions />
    </header>
  );
}
