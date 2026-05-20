"use client";

import { useState } from "react";

import { AppNavbar } from "@/components/layout/app-navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { RoleAuthGuard } from "@/components/layout/role-auth-guard";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAdminStats } from "@/features/admin/hooks/use-admin-stats";
import type { AppRole } from "@/constants/routes";

interface AppLayoutProps {
  children: React.ReactNode;
  role: AppRole;
}

export function AppLayout({ children, role }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { stats } = useAdminStats({ enabled: role === "admin" });

  return (
    <RoleAuthGuard allowedRole={role}>
      <TooltipProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <AppSidebar
            role={role}
            pendingCertificates={
              role === "admin" ? stats?.pendingCertificates : undefined
            }
            className="hidden lg:flex"
          />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" className="w-60 p-0">
              <AppSidebar
                role={role}
                pendingCertificates={
                  role === "admin" ? stats?.pendingCertificates : undefined
                }
              />
            </SheetContent>
          </Sheet>

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <AppNavbar role={role} onMenuClick={() => setMobileOpen(true)} />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-[1600px] p-4 lg:p-6">{children}</div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </RoleAuthGuard>
  );
}
