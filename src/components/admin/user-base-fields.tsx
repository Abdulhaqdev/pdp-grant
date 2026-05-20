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

interface UserBaseFieldsProps<T extends FieldValues> {
  control: Control<T>;
}

export function UserBaseFields<T extends FieldValues>({
  control,
}: UserBaseFieldsProps<T>) {
  const fields: {
    name: FieldPath<T>;
    label: string;
    placeholder: string;
    type?: string;
  }[] = [
    { name: "first_name" as FieldPath<T>, label: "Ism", placeholder: "Ali" },
    {
      name: "last_name" as FieldPath<T>,
      label: "Familiya",
      placeholder: "Valiyev",
    },
    {
      name: "father_name" as FieldPath<T>,
      label: "Otasining ismi",
      placeholder: "Vali",
    },
    {
      name: "phone" as FieldPath<T>,
      label: "Telefon",
      placeholder: "+998901234567",
    },
    {
      name: "email" as FieldPath<T>,
      label: "Email",
      placeholder: "user@grant.uz",
      type: "email",
    },
    {
      name: "password" as FieldPath<T>,
      label: "Parol",
      placeholder: "••••••••",
      type: "password",
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
            <FormItem
              className={
                field.name === ("password" as FieldPath<T>) ||
                field.name === ("email" as FieldPath<T>)
                  ? "sm:col-span-2"
                  : undefined
              }
            >
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input type={field.type ?? "text"} placeholder={field.placeholder} {...f} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
