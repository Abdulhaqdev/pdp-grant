"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <DashboardLayout role="mentor">{children}</DashboardLayout>
    </TooltipProvider>
  );
}
