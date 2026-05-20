"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV_ITEMS } from "@/constants/admin-nav";
import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";
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
import { AdminSidebarUser } from "@/components/layout/admin-sidebar-user";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

interface AdminSidebarProps {
  pendingCertificates?: number;
  className?: string;
}

export function AdminSidebar({
  pendingCertificates = 0,
  className,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border/60 bg-sidebar",
        sidebarCollapsed ? "w-[4.5rem]" : "w-60",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center border-b border-border/60 px-3",
          sidebarCollapsed
            ? "h-[4.5rem] flex-col justify-center gap-1.5 py-2"
            : "h-14 gap-2"
        )}
      >
        <Link
          href={ROUTES.admin.dashboard}
          className={cn(
            "flex items-center transition-opacity hover:opacity-90",
            sidebarCollapsed
              ? "size-9 shrink-0 overflow-hidden rounded-lg"
              : "min-w-0 flex-1 py-1"
          )}
          aria-label={BRAND.name}
        >
          <Image
            src={BRAND.logoWordmark}
            alt={BRAND.name}
            width={sidebarCollapsed ? 36 : 140}
            height={sidebarCollapsed ? 36 : 36}
            className={cn(
              "object-contain object-left",
              sidebarCollapsed ? "size-9 object-cover" : "h-8 w-auto max-w-full"
            )}
            priority
          />
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className={cn(sidebarCollapsed && "shrink-0")}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <PanelLeftOpenIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-0.5">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== ROUTES.admin.dashboard &&
                pathname.startsWith(item.href));

            const badge =
              item.badgeKey === "pendingCertificates" && pendingCertificates > 0
                ? String(pendingCertificates)
                : undefined;

            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="size-4 shrink-0 opacity-80" />
                {!sidebarCollapsed && (
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

            if (sidebarCollapsed) {
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

      <AdminSidebarUser />
    </aside>
  );
}
