"use client";

import { MoreHorizontalIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ActionDropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  separator?: boolean;
}

interface ActionDropdownProps {
  items: ActionDropdownItem[];
  align?: "start" | "end";
}

export function ActionDropdown({ items, align = "end" }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Open actions">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align={align} className="w-48">
        {items.map((item, i) => (
          <div key={`${item.label}-${i}`}>
            {item.separator ? <DropdownMenuSeparator /> : null}
            <DropdownMenuItem
              variant={item.variant}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
