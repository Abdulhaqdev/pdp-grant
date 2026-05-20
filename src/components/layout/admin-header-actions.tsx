"use client";

import { BellIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminHeaderActions() {
  return (
    <div className="flex h-14 w-full items-center gap-3 px-4 lg:px-6">
      <div className="relative hidden max-w-md flex-1 md:block">
        <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Talaba, guruh, mentor qidirish..."
          className="h-9 pl-8"
        />
      </div>
      <div className="ml-auto flex items-center">
        <Button variant="ghost" size="icon" aria-label="Bildirishnomalar">
          <BellIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
