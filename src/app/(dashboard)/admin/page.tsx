import type { Metadata } from "next";
import {
  AwardIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DataTablePlaceholder } from "@/components/tables/data-table-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your grant program, learners, and outcomes."
        action={
          <Button size="sm">
            <AwardIcon />
            Export report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,248"
          description="vs last month"
          icon={GraduationCapIcon}
          trend={{ value: "+12%", positive: true }}
        />
        <StatCard
          title="Active Mentors"
          value="86"
          description="across 14 groups"
          icon={UsersIcon}
          trend={{ value: "+4", positive: true }}
        />
        <StatCard
          title="Completion Rate"
          value="78%"
          description="program average"
          icon={TrendingUpIcon}
          trend={{ value: "+5.2%", positive: true }}
        />
        <StatCard
          title="Certificates Issued"
          value="412"
          description="this quarter"
          icon={AwardIcon}
          trend={{ value: "+28", positive: true }}
        />
      </div>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Recent activity</TabsTrigger>
          <TabsTrigger value="groups">Top groups</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest enrollments</CardTitle>
              <CardDescription>
                Students who joined in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTablePlaceholder
                columns={["Student", "Group", "Mentor", "Status", "Joined"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="groups" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Group performance</CardTitle>
                <CardDescription>Ranked by average score</CardDescription>
              </div>
              <Badge variant="secondary">Live</Badge>
            </CardHeader>
            <CardContent>
              <DataTablePlaceholder
                columns={["Group", "Students", "Avg. Score", "Mentor"]}
                rows={4}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
