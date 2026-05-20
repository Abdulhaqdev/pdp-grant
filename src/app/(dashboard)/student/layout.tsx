"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <DashboardLayout role="student">{children}</DashboardLayout>
    </TooltipProvider>
  );
}
