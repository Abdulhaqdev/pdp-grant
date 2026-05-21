import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { LoginForm } from "@/features/auth";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to ${BRAND.name} Grant LMS`,
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
