"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  normalizeLoginUsername,
  type LoginFormValues,
} from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    login(normalizeLoginUsername(values.username), values.password);
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--border)] bg-card shadow-xl shadow-[#229b91]/8",
        "ring-1 ring-[#229b91]/10"
      )}
    >
      <div className="h-1.5 bg-gradient-to-r from-[#229b91] via-[#26a49d] to-[#ffcc19]" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[var(--pdp-navy)]">
                    Telefon raqam
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="text"
                      placeholder="+998901234567"
                      autoComplete="username"
                      className="h-10 border-[var(--border)] bg-background focus-visible:border-[#229b91] focus-visible:ring-[#229b91]/25"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[var(--pdp-navy)]">
                    Parol
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="h-10 border-[var(--border)] bg-background focus-visible:border-[#229b91] focus-visible:ring-[#229b91]/25"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 h-10 w-full bg-[#229b91] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#008982] hover:shadow-lg focus-visible:ring-[#ffcc19] focus-visible:ring-offset-2"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2Icon className="animate-spin" />
                Kirilmoqda...
              </>
            ) : (
              "Kirish"
            )}
          </Button>

        </form>
      </Form>
    </div>
  );
}
