export const ROUTES = {
  home: "/",
  login: "/login",
  admin: {
    dashboard: "/admin",
    students: "/admin/students",
    mentors: "/admin/mentors",
    groups: "/admin/groups",
    users: "/admin/users",
    certificates: "/admin/certificates",
    monthlyScores: "/admin/monthly-scores",
    leaderboard: "/admin/leaderboard",
    logs: "/admin/logs",
    settings: "/admin/settings",
  },
  student: {
    dashboard: "/student",
    group: "/student/group",
    leaderboard: "/student/leaderboard",
    certificates: "/student/certificates",
  },
  mentor: {
    dashboard: "/mentor",
    students: "/mentor/students",
    groups: "/mentor/groups",
    leaderboard: "/mentor/leaderboard",
  },
} as const;

export type AppRole = "admin" | "student" | "mentor";

export const ROLE_DASHBOARD: Record<AppRole, string> = {
  admin: ROUTES.admin.dashboard,
  student: ROUTES.student.dashboard,
  mentor: ROUTES.mentor.dashboard,
};
