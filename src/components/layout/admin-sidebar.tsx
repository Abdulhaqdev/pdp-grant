"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";

interface AdminSidebarProps {
  pendingCertificates?: number;
  className?: string;
}

export function AdminSidebar(props: AdminSidebarProps) {
  return <AppSidebar role="admin" {...props} />;
}
