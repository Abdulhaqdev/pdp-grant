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
            variant="desktop"
            pendingCertificates={
              role === "admin" ? stats?.pendingCertificates : undefined
            }
            className="max-lg:hidden lg:flex"
          />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent
              side="left"
              showCloseButton
              className="w-60 max-w-[min(240px,85vw)] gap-0 border-r p-0 data-[side=left]:w-60 data-[side=left]:sm:max-w-[min(240px,85vw)]"
            >
              <AppSidebar
                role={role}
                variant="mobile"
                pendingCertificates={
                  role === "admin" ? stats?.pendingCertificates : undefined
                }
                onNavigate={() => setMobileOpen(false)}
                className="w-full border-0"
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
