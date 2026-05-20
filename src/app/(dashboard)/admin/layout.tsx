"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <DashboardLayout role="admin">{children}</DashboardLayout>
    </TooltipProvider>
  );
}
