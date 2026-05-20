import type { LucideIcon } from "lucide-react";
import {
  AwardIcon,
  BarChart3Icon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MedalIcon,
  ScrollTextIcon,
  SettingsIcon,
  UserCogIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react";

import type { AppRole } from "@/constants/routes";
import { ROUTES } from "@/constants/routes";

export interface AppNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: "pendingCertificates";
}

const ADMIN_NAV: AppNavItem[] = [
  { title: "Dashboard", href: ROUTES.admin.dashboard, icon: LayoutDashboardIcon },
  { title: "Students", href: ROUTES.admin.students, icon: GraduationCapIcon },
  { title: "Mentors", href: ROUTES.admin.mentors, icon: UsersIcon },
  { title: "Groups", href: ROUTES.admin.groups, icon: UsersRoundIcon },
  { title: "Users", href: ROUTES.admin.users, icon: UserCogIcon },
  {
    title: "Certificates",
    href: ROUTES.admin.certificates,
    icon: AwardIcon,
    badgeKey: "pendingCertificates",
  },
  { title: "Monthly Scores", href: ROUTES.admin.monthlyScores, icon: BarChart3Icon },
  { title: "Leaderboard", href: ROUTES.admin.leaderboard, icon: MedalIcon },
  { title: "Logs", href: ROUTES.admin.logs, icon: ScrollTextIcon },
  { title: "Settings", href: ROUTES.admin.settings, icon: SettingsIcon },
];

const STUDENT_NAV: AppNavItem[] = [
  { title: "Dashboard", href: ROUTES.student.dashboard, icon: LayoutDashboardIcon },
  { title: "My Group", href: ROUTES.student.group, icon: UsersRoundIcon },
  { title: "Leaderboard", href: ROUTES.student.leaderboard, icon: MedalIcon },
  { title: "Certificates", href: ROUTES.student.certificates, icon: AwardIcon },
];

const MENTOR_NAV: AppNavItem[] = [
  { title: "Dashboard", href: ROUTES.mentor.dashboard, icon: LayoutDashboardIcon },
  { title: "My Students", href: ROUTES.mentor.students, icon: GraduationCapIcon },
  { title: "Groups", href: ROUTES.mentor.groups, icon: UsersRoundIcon },
  { title: "Leaderboard", href: ROUTES.mentor.leaderboard, icon: MedalIcon },
];

export const NAV_BY_ROLE: Record<AppRole, AppNavItem[]> = {
  admin: ADMIN_NAV,
  student: STUDENT_NAV,
  mentor: MENTOR_NAV,
};

export const DASHBOARD_HOME: Record<AppRole, string> = {
  admin: ROUTES.admin.dashboard,
  student: ROUTES.student.dashboard,
  mentor: ROUTES.mentor.dashboard,
};

export const BREADCRUMB_LABELS: Record<AppRole, Record<string, string>> = {
  admin: {
    students: "Students",
    mentors: "Mentors",
    groups: "Groups",
    users: "Users",
    certificates: "Certificates",
    "monthly-scores": "Monthly Scores",
    leaderboard: "Leaderboard",
    logs: "Logs",
    settings: "Settings",
  },
  student: {
    group: "My Group",
    leaderboard: "Leaderboard",
    certificates: "Certificates",
  },
  mentor: {
    students: "My Students",
    groups: "Groups",
    leaderboard: "Leaderboard",
  },
};

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin",
  student: "Student",
  mentor: "Mentor",
};
