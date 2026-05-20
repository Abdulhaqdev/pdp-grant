"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  AwardIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MedalIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react";

import { APP_CONFIG } from "@/constants/config";
import type { UserRole } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  admin: [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboardIcon },
    { title: "Students", href: "/admin/students", icon: GraduationCapIcon },
    { title: "Mentors", href: "/admin/mentors", icon: UsersIcon },
    { title: "Groups", href: "/admin/groups", icon: UsersRoundIcon },
    { title: "Leaderboard", href: "/admin/leaderboard", icon: MedalIcon },
    { title: "Certificates", href: "/admin/certificates", icon: AwardIcon },
  ],
  student: [
    { title: "Dashboard", href: "/student", icon: LayoutDashboardIcon },
    { title: "My Group", href: "/student/group", icon: UsersRoundIcon },
    { title: "Leaderboard", href: "/student/leaderboard", icon: MedalIcon },
    { title: "Certificates", href: "/student/certificates", icon: AwardIcon },
  ],
  mentor: [
    { title: "Dashboard", href: "/mentor", icon: LayoutDashboardIcon },
    { title: "My Students", href: "/mentor/students", icon: GraduationCapIcon },
    { title: "Groups", href: "/mentor/groups", icon: UsersRoundIcon },
    { title: "Leaderboard", href: "/mentor/leaderboard", icon: MedalIcon },
  ],
};

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const items = NAV_BY_ROLE[role];

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        sidebarCollapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b px-3",
          sidebarCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCapIcon className="size-4" />
            </div>
            <span className="truncate text-sm">{APP_CONFIG.name}</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpenIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role}` && pathname.startsWith(item.href));

            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 truncate">{item.title}</span>
                    {item.badge ? (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
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

      <Separator />
      <div className={cn("p-3", sidebarCollapsed && "flex justify-center")}>
        {!sidebarCollapsed && (
          <p className="text-xs text-muted-foreground">v0.1.0 · Starter</p>
        )}
      </div>
    </aside>
  );
}
