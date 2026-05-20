import type { LucideIcon } from "lucide-react";
import {
  AwardIcon,
  BarChart3Icon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MedalIcon,
  ScrollTextIcon,
  SettingsIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

export interface AdminNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: "pendingCertificates";
  description?: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    title: "Dashboard",
    href: ROUTES.admin.dashboard,
    icon: LayoutDashboardIcon,
    description: "Overview & analytics",
  },
  {
    title: "Students",
    href: ROUTES.admin.students,
    icon: GraduationCapIcon,
    description: "Manage learners",
  },
  {
    title: "Mentors",
    href: ROUTES.admin.mentors,
    icon: UsersIcon,
    description: "Mentor assignments",
  },
  {
    title: "Groups",
    href: ROUTES.admin.groups,
    icon: UsersRoundIcon,
    description: "Cohort groups",
  },
  {
    title: "Certificates",
    href: ROUTES.admin.certificates,
    icon: AwardIcon,
    badgeKey: "pendingCertificates",
    description: "Approval queue",
  },
  {
    title: "Monthly Scores",
    href: ROUTES.admin.monthlyScores,
    icon: BarChart3Icon,
    description: "KPI & scores",
  },
  {
    title: "Leaderboard",
    href: ROUTES.admin.leaderboard,
    icon: MedalIcon,
    description: "Rankings",
  },
  {
    title: "Logs",
    href: ROUTES.admin.logs,
    icon: ScrollTextIcon,
    description: "Audit trail",
  },
  {
    title: "Settings",
    href: ROUTES.admin.settings,
    icon: SettingsIcon,
    description: "System config",
  },
];

export const ADMIN_BREADCRUMB_LABELS: Record<string, string> = {
  admin: "Admin",
  students: "Students",
  mentors: "Mentors",
  groups: "Groups",
  certificates: "Certificates",
  "monthly-scores": "Monthly Scores",
  leaderboard: "Leaderboard",
  logs: "Logs",
  settings: "Settings",
};
