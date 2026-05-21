"use client";

import type { Control, FieldPath } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { MonthlyScoreFieldsValues } from "@/schemas/monthly-score.schema";

const FIELDS: {
  name: keyof MonthlyScoreFieldsValues;
  label: string;
  step?: string;
}[] = [
  { name: "academic_percent", label: "Academic %", step: "0.01" },
  { name: "attendance_percent", label: "Attendance %", step: "0.01" },
  { name: "assignment_score", label: "Assignment", step: "0.01" },
  { name: "discipline_score", label: "Discipline", step: "0.01" },
  { name: "penalty_score", label: "Penalty", step: "0.01" },
  { name: "recovery_score", label: "Recovery", step: "0.01" },
  { name: "employment_score", label: "Employment", step: "0.01" },
];

interface MonthlyScoreFieldsProps<T extends MonthlyScoreFieldsValues> {
  control: Control<T>;
}

export function MonthlyScoreFields<T extends MonthlyScoreFieldsValues>({
  control,
}: MonthlyScoreFieldsProps<T>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map(({ name, label, step }) => (
        <FormField
          key={name}
          control={control}
          name={name as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={step}
                  placeholder="0"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    field.onChange(v === "" ? undefined : Number(v));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
