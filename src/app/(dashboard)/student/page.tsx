import type { Metadata } from "next";
import {
  BookOpenIcon,
  MedalIcon,
  TargetIcon,
  TrophyIcon,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Learning"
        description="Track your progress, rank, and upcoming milestones."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Overall Progress"
          value="64%"
          icon={TargetIcon}
          trend={{ value: "+8% this week", positive: true }}
        />
        <StatCard
          title="Leaderboard Rank"
          value="#12"
          icon={MedalIcon}
          description="of 248 students"
        />
        <StatCard
          title="Modules Completed"
          value="8/14"
          icon={BookOpenIcon}
        />
        <StatCard
          title="Points Earned"
          value="1,420"
          icon={TrophyIcon}
          trend={{ value: "+120 pts", positive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current module</CardTitle>
            <CardDescription>Grant writing fundamentals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lesson progress</span>
                <span className="font-medium">3 of 5</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Next up: Budget narrative & justification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly goals</CardTitle>
            <CardDescription>Stay on track to earn your certificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Complete 2 lessons", done: true },
              { label: "Submit peer review", done: false },
              { label: "Attend mentor session", done: false },
            ].map((goal) => (
              <div key={goal.label} className="flex items-center justify-between text-sm">
                <span className={goal.done ? "text-muted-foreground line-through" : ""}>
                  {goal.label}
                </span>
                <span className={goal.done ? "text-primary" : "text-muted-foreground"}>
                  {goal.done ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
