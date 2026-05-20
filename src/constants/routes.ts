export const ROUTES = {
  home: "/",
  login: "/login",
  admin: {
    dashboard: "/admin",
  },
  student: {
    dashboard: "/student",
  },
  mentor: {
    dashboard: "/mentor",
  },
} as const;

export type UserRole = "admin" | "student" | "mentor";

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  admin: ROUTES.admin.dashboard,
  student: ROUTES.student.dashboard,
  mentor: ROUTES.mentor.dashboard,
};
