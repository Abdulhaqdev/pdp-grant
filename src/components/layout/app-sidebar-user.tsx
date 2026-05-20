"use client";

import {
  ChevronUpIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { DASHBOARD_HOME } from "@/constants/app-nav";
import type { AppRole } from "@/constants/routes";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";
import { getUserDisplayName, getUserInitials } from "@/types/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getProfilePath(role: AppRole): string {
  if (role === "admin") return ROUTES.admin.settings;
  return DASHBOARD_HOME[role];
}

export function AppSidebarUser() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const { sidebarCollapsed } = useUiStore();

  const displayName = user ? getUserDisplayName(user) : "Guest";
  const initials = user ? getUserInitials(user) : "U";
  const role = (user?.role ?? "student") as AppRole;

  const trigger = (
    <Button
      variant="ghost"
      className={cn(
        "h-auto w-full gap-2 px-2 py-2 hover:bg-sidebar-accent",
        sidebarCollapsed ? "justify-center px-2" : "justify-start"
      )}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      {!sidebarCollapsed && (
        <>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email ?? user?.phone ?? "—"}
            </p>
          </div>
          <ChevronUpIcon className="size-4 shrink-0 text-muted-foreground" />
        </>
      )}
    </Button>
  );

  const menu = (
    <DropdownMenuContent
      side={sidebarCollapsed ? "right" : "top"}
      align={sidebarCollapsed ? "end" : "start"}
      className="w-56"
      sideOffset={8}
    >
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{displayName}</span>
            <span className="text-xs font-normal capitalize text-muted-foreground">
              {user?.role ?? "—"}
            </span>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => router.push(getProfilePath(role))}>
        <UserIcon className="size-4" />
        Profil
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <SunIcon className="size-4" />
          Mavzu
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon className="size-4" />
            Yorug‘
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon className="size-4" />
            Qorong‘u
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorIcon className="size-4" />
            Tizim
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={logout}>
        <LogOutIcon className="size-4" />
        Chiqish
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <div className="border-t border-border/60 p-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={trigger} />
        {menu}
      </DropdownMenu>
    </div>
  );
}
