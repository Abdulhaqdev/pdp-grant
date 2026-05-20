"use client";

import { SettingsIcon } from "lucide-react";

import { DashboardCard } from "@/components/admin/dashboard-card";
import { APP_CONFIG } from "@/constants/config";
import { useAuthStore } from "@/store/auth.store";
import { getUserDisplayName } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function SettingsPageView() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          System configuration and account preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Account" description="Signed-in administrator">
          {user ? (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{getUserDisplayName(user)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Role</dt>
                <dd>
                  <Badge className="capitalize">{user.role}</Badge>
                </dd>
              </div>
            </dl>
          ) : null}
        </DashboardCard>

        <DashboardCard title="Application" description="Environment">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">App</dt>
              <dd>{APP_CONFIG.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">API URL</dt>
              <dd className="max-w-[200px] truncate font-mono text-xs">
                {APP_CONFIG.apiUrl}
              </dd>
            </div>
          </dl>
          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            Future: permissions, notifications, analytics modules
          </p>
        </DashboardCard>

        <DashboardCard
          title="Planned modules"
          description="Architecture prepared for expansion"
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap gap-2">
            {[
              "Audit logs API",
              "Push notifications",
              "Analytics dashboard",
              "RBAC permissions",
              "Activity history",
            ].map((item) => (
              <Badge key={item} variant="outline">
                <SettingsIcon className="size-3" />
                {item}
              </Badge>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
