"use client";

import { AppLayout } from "@/components/layout/app-layout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return <AppLayout role="admin">{children}</AppLayout>;
}
