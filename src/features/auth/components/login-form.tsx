"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types/user";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DEMO_ACCOUNTS: Record<string, Omit<User, "id">> = {
  "admin@lms.com": {
    email: "admin@lms.com",
    name: "Alex Admin",
    role: "admin",
  },
  "student@lms.com": {
    email: "student@lms.com",
    name: "Sam Student",
    role: "student",
  },
  "mentor@lms.com": {
    email: "mentor@lms.com",
    name: "Morgan Mentor",
    role: "mentor",
  },
};

function resolveDemoUser(email: string): User | null {
  const account = DEMO_ACCOUNTS[email.toLowerCase()];
  if (!account) return null;
  return { id: `demo-${account.role}`, ...account };
}

export function LoginForm() {
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@lms.com",
      password: "password",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: LoginFormValues) {
    const user = resolveDemoUser(values.email);
    if (!user) {
      form.setError("email", {
        message: "Use admin@lms.com, student@lms.com, or mentor@lms.com",
      });
      return;
    }
    await new Promise((r) => setTimeout(r, 600));
    login(user, "demo-access-token");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Demo accounts: admin@lms.com · student@lms.com · mentor@lms.com
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-t-0 bg-transparent pt-0">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
