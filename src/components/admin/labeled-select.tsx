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

export interface SelectOption {
  value: string;
  label: ReactNode;
}

interface LabeledSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function LabeledSelect({
  value,
  onValueChange,
  options,
  placeholder,
  className,
}: LabeledSelectProps) {
  const items = options.map((o) => ({ value: o.value, label: o.label }));

  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v ?? "")}
      items={items}
    >
      <SelectTrigger className={cn("h-9 w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
