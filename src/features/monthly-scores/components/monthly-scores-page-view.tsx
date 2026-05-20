"use client";

import { BarChart3Icon } from "lucide-react";

import { DashboardCard } from "@/components/admin/dashboard-card";
import { EmptyState } from "@/components/admin/empty-state";

export function MonthlyScoresPageView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Monthly Scores</h1>
        <p className="text-sm text-muted-foreground">
          Create and update KPI scores via API endpoints
        </p>
      </div>
      <DashboardCard
        title="Score management"
        description="POST /user/monthly-score · PATCH /user/monthly-score/tutor"
      >
        <EmptyState
          icon={BarChart3Icon}
          title="Score forms coming soon"
          description="Wire create/update forms to monthlyScoresService. List endpoint will be added when backend exposes GET."
          className="border-0 bg-transparent"
        />
      </DashboardCard>
    </div>
  );
}
