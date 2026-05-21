"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserEditableFieldsProps<T extends FieldValues> {
  control: Control<T>;
}

export function UserEditableFields<T extends FieldValues>({
  control,
}: UserEditableFieldsProps<T>) {
  const fields: {
    name: FieldPath<T>;
    label: string;
    placeholder: string;
    type?: string;
    span?: boolean;
  }[] = [
    { name: "first_name" as FieldPath<T>, label: "First name", placeholder: "John" },
    { name: "last_name" as FieldPath<T>, label: "Last name", placeholder: "Doe" },
    {
      name: "father_name" as FieldPath<T>,
      label: "Father's name",
      placeholder: "Michael",
    },
    {
      name: "phone" as FieldPath<T>,
      label: "Phone",
      placeholder: "+998901234567",
    },
    {
      name: "email" as FieldPath<T>,
      label: "Email",
      placeholder: "mentor@grant.uz",
      type: "email",
      span: true,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <FormField
          key={String(field.name)}
          control={control}
          name={field.name}
          render={({ field: f }) => (
            <FormItem className={field.span ? "sm:col-span-2" : undefined}>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  {...f}
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
