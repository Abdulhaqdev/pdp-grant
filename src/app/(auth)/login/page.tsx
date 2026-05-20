import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { LoginForm } from "@/features/auth";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Kirish",
  description: `${BRAND.name} Grant LMS tizimiga kirish`,
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
