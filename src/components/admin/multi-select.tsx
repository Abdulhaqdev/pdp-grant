"use client";

import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface MultiSelectOption<T extends string | number = number> {
  value: T;
  label: ReactNode;
}

interface MultiSelectProps<T extends string | number = number> {
  value: T[];
  onValueChange: (value: T[]) => void;
  options: MultiSelectOption<T>[];
  placeholder?: string;
  className?: string;
}

export function MultiSelect<T extends string | number = number>({
  value,
  onValueChange,
  options,
  placeholder,
  className,
}: MultiSelectProps<T>) {
  const items = options.map((o) => ({ value: o.value, label: o.label }));
  const labelByValue = new Map(
    options.map((o) => [String(o.value), o.label] as const)
  );

  return (
    <Select
      multiple
      value={value}
      onValueChange={onValueChange}
      items={items}
    >
      <SelectTrigger className={cn("h-auto min-h-9 w-full py-1.5", className)}>
        <SelectValue placeholder={placeholder}>
          {(selected: T[] | null) => {
            if (!selected?.length) return null;
            return selected
              .map((v) => labelByValue.get(String(v)) ?? String(v))
              .join(", ");
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={String(o.value)} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
