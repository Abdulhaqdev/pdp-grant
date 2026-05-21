"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type LoginAudience = "parent" | "member";

const AUDIENCE_COPY: Record<
  LoginAudience,
  { label: string; description: string }
> = {
  parent: {
    label: "Parent",
    description:
      "Sign in with your phone or email and password to view your child's grant progress.",
  },
  member: {
    label: "Student / Mentor",
    description:
      "Sign in with your phone or email and password as a student or mentor.",
  },
};

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();
  const [audience, setAudience] = useState<LoginAudience>("member");

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

  const copy = AUDIENCE_COPY[audience];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--border)] bg-card shadow-xl shadow-[#229b91]/8",
        "ring-1 ring-[#229b91]/10"
      )}
    >
      <div className="h-1.5 bg-gradient-to-r from-[#229b91] via-[#26a49d] to-[#ffcc19]" />

      <Tabs
        value={audience}
        onValueChange={(v) => setAudience(v as LoginAudience)}
        className="gap-0"
      >
        <TabsList
          variant="default"
          className="mx-6 mt-6 grid h-10 w-[calc(100%-3rem)] grid-cols-2"
        >
          <TabsTrigger value="parent" className="text-xs sm:text-sm">
            {AUDIENCE_COPY.parent.label}
          </TabsTrigger>
          <TabsTrigger value="member" className="text-xs sm:text-sm">
            {AUDIENCE_COPY.member.label}
          </TabsTrigger>
        </TabsList>

        <div className="p-6 pt-4 sm:p-8 sm:pt-5">
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            {copy.description}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[var(--pdp-navy)]">
                      Phone or email
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
                      Password
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
              <Button
                type="submit"
                className="h-10 w-full bg-[#229b91] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#008982] hover:shadow-lg focus-visible:ring-[#ffcc19] focus-visible:ring-offset-2"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
              </Button>
            </form>
          </Form>
        </div>
      </Tabs>
    </div>
  );
}
