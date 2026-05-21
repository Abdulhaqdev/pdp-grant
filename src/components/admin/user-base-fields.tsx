"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { UserEditableFields } from "@/components/admin/user-editable-fields";
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
  showPassword?: boolean;
}

export function UserBaseFields<T extends FieldValues>({
  control,
  showPassword = true,
}: UserBaseFieldsProps<T>) {
  return (
    <div className="space-y-4">
      <UserEditableFields control={control} />
      {showPassword ? (
        <FormField
          control={control}
          name={"password" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}
    </div>
  );
}
