"use client";

import { useState } from "react";

import { AdminNavbar } from "@/components/layout/admin-navbar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAdminStats } from "@/features/admin/hooks/use-admin-stats";
import { AdminAuthGuard } from "@/features/admin/components/admin-auth-guard";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { stats } = useAdminStats();

  return (
    <AdminAuthGuard>
      <TooltipProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <AdminSidebar
            pendingCertificates={stats?.pendingCertificates}
            className="hidden lg:flex"
          />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" className="w-60 p-0">
              <AdminSidebar pendingCertificates={stats?.pendingCertificates} />
            </SheetContent>
          </Sheet>

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <AdminNavbar onMenuClick={() => setMobileOpen(true)} />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-[1600px] p-4 lg:p-6">{children}</div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AdminAuthGuard>
  );
}
