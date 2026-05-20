import type { Metadata } from "next";
import {
  CalendarIcon,
  GraduationCapIcon,
  MessageSquareIcon,
  UsersRoundIcon,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DataTablePlaceholder } from "@/components/tables/data-table-placeholder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mentor Dashboard",
};

export default function MentorDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Mentor Dashboard"
        description="Support your cohort and track student engagement."
        action={
          <Button size="sm" variant="outline">
            <CalendarIcon />
            Schedule session
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Assigned Students"
          value="24"
          icon={GraduationCapIcon}
          description="across 2 groups"
        />
        <StatCard
          title="Active Groups"
          value="2"
          icon={UsersRoundIcon}
        />
        <StatCard
          title="Pending Reviews"
          value="7"
          icon={MessageSquareIcon}
          trend={{ value: "3 due today", positive: false }}
        />
        <StatCard
          title="Avg. Cohort Score"
          value="82%"
          icon={CalendarIcon}
          trend={{ value: "+2.1%", positive: true }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students needing attention</CardTitle>
          <CardDescription>
            Based on inactivity or scores below threshold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTablePlaceholder
            columns={["Student", "Group", "Last active", "Score", "Action"]}
            rows={6}
          />
        </CardContent>
      </Card>
    </div>
  );
}
