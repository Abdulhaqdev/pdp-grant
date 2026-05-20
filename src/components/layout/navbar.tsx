"use client";

import { BellIcon, LogOutIcon, SearchIcon, UserIcon } from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { getUserDisplayName, getUserInitials } from "@/types/user";

interface NavbarProps {
  compact?: boolean;
}

export function Navbar({ compact }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-14 w-full items-center gap-4 px-2 lg:px-4">
      {!compact && (
        <div className="relative hidden max-w-md flex-1 md:block">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students, groups, mentors..."
            className="h-9 pl-8"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellIcon className="size-4" />
        </Button>
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative h-9 gap-2 px-2"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="text-xs">
                    {user ? getUserInitials(user) : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">
                  {user ? getUserDisplayName(user) : "Guest"}
                </span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user ? getUserDisplayName(user) : "Guest"}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user?.email ?? "Not signed in"}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOutIcon className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
