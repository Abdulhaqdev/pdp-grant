"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DASHBOARD_HOME,
  NAV_BY_ROLE,
  type AppNavItem,
} from "@/constants/app-nav";
import { BRAND } from "@/constants/brand";
import type { AppRole } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppSidebarUser } from "@/components/layout/app-sidebar-user";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

interface AppSidebarProps {
  role: AppRole;
  variant?: "desktop" | "mobile";
  pendingCertificates?: number;
  className?: string;
  onNavigate?: () => void;
}

export function AppSidebar({
  role,
  variant = "desktop",
  pendingCertificates = 0,
  className,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const isMobile = variant === "mobile";
  const collapsed = isMobile ? false : sidebarCollapsed;
  const items = NAV_BY_ROLE[role];
  const home = DASHBOARD_HOME[role];

  function isActive(item: AppNavItem) {
    return (
      pathname === item.href ||
      (item.href !== home && pathname.startsWith(item.href))
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border/60 bg-sidebar",
        collapsed
          ? "w-[4.5rem]"
          : isMobile
            ? "w-full"
            : "w-60",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center border-b border-border/60 px-3",
          collapsed
            ? "h-[4.5rem] flex-col justify-center gap-1.5 py-2"
            : "h-14 gap-2"
        )}
      >
        <Link
          href={home}
          onClick={onNavigate}
          className={cn(
            "flex items-center transition-opacity hover:opacity-90",
            collapsed
              ? "size-9 shrink-0 overflow-hidden rounded-lg"
              : "min-w-0 flex-1 py-1"
          )}
          aria-label={BRAND.name}
        >
          <Image
            src={BRAND.logoWordmark}
            alt={BRAND.name}
            width={collapsed ? 36 : 140}
            height={collapsed ? 36 : 36}
            className={cn(
              "object-contain object-left",
              collapsed ? "size-9 object-cover" : "h-8 w-auto max-w-full"
            )}
            priority
          />
        </Link>
        {!isMobile ? (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleSidebar}
            className={cn(collapsed && "shrink-0")}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeftOpenIcon className="size-4" />
            ) : (
              <PanelLeftCloseIcon className="size-4" />
            )}
          </Button>
        ) : null}
      </div>

      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-0.5">
          {items.map((item) => {
            const active = isActive(item);
            const badge =
              item.badgeKey === "pendingCertificates" && pendingCertificates > 0
                ? String(pendingCertificates)
                : undefined;

            const link = (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="size-4 shrink-0 opacity-80" />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.title}</span>
                    {badge ? (
                      <Badge className="h-5 min-w-5 px-1 text-[10px]">
                        {badge}
                      </Badge>
                    ) : null}
                  </>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger render={link} />
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              );
            }
            return link;
          })}
        </nav>
      </ScrollArea>

      <AppSidebarUser />
    </aside>
  );
}
