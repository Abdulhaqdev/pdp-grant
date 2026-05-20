"use client";

import Link from "next/link";
import {
  AwardIcon,
  BarChart3Icon,
  GraduationCapIcon,
  MedalIcon,
  PlusIcon,
  TrendingUpIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardCard } from "@/components/admin/dashboard-card";
import { StatsCard } from "@/components/admin/stats-card";
import { PageSkeleton } from "@/components/admin/page-skeleton";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useAdminStats } from "@/features/admin/hooks/use-admin-stats";
import { formatNumber } from "@/utils/format";

const QUICK_ACTIONS = [
  { label: "Add student", href: ROUTES.admin.students, icon: PlusIcon },
  { label: "Review certificates", href: ROUTES.admin.certificates, icon: AwardIcon },
  { label: "View leaderboard", href: ROUTES.admin.leaderboard, icon: MedalIcon },
  { label: "Audit logs", href: ROUTES.admin.logs, icon: BarChart3Icon },
];

export function AdminDashboardView() {
  const { stats, isLoading } = useAdminStats();

  if (isLoading || !stats) {
    return <PageSkeleton />;
  }

  const chartData = stats.topStudents.map((s) => ({
    name: s.student_name.split(" ").slice(-1)[0] ?? s.student_name,
    score: s.final_score,
    kpi: s.total_kpi,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Grant program overview and key metrics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <action.icon className="size-3.5" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        <StatsCard title="Total Students" value={formatNumber(stats.totalStudents)} icon={GraduationCapIcon} />
        <StatsCard title="Total Mentors" value={formatNumber(stats.totalMentors)} icon={UsersIcon} />
        <StatsCard title="Total Groups" value={formatNumber(stats.totalGroups)} icon={UsersRoundIcon} />
        <StatsCard title="Grant Students" value={formatNumber(stats.grantStudents)} icon={TrendingUpIcon} className="xl:col-span-1" />
        <StatsCard
          title="Pending Certificates"
          value={formatNumber(stats.pendingCertificates)}
          icon={AwardIcon}
          trend={stats.pendingCertificates > 0 ? { value: "Needs review", positive: false } : undefined}
        />
        <StatsCard title="Average KPI" value={`${stats.averageKpi}%`} icon={BarChart3Icon} />
        <StatsCard title="Top Students" value={stats.topStudents.length} icon={MedalIcon} description="On leaderboard" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardCard
          title="Score distribution"
          description="Top 5 students by final score"
          className="lg:col-span-2"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--popover))",
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Final score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Leaderboard preview" description="Top performers">
          <ul className="space-y-3">
            {stats.topStudents.map((row, i) => (
              <li
                key={row.student_id}
                className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{row.student_name}</p>
                    <p className="text-xs text-muted-foreground">{row.group_name ?? "—"}</p>
                  </div>
                </div>
                <Badge variant="secondary">{row.final_score.toFixed(1)}</Badge>
              </li>
            ))}
          </ul>
          <Link
            href={ROUTES.admin.leaderboard}
            className={cn(
              buttonVariants({ variant: "link" }),
              "mt-2 h-auto p-0"
            )}
          >
            View all
          </Link>
        </DashboardCard>
      </div>

      <DashboardCard title="Recent activity" description="Latest system events (from audit logs)">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Certificate approvals, student updates, and KPI changes appear here once connected to the audit API.</p>
          <Link
            href={ROUTES.admin.logs}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Open logs
          </Link>
        </div>
      </DashboardCard>
    </div>
  );
}
