export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
  students: {
    list: "/students",
    detail: (id: string) => `/students/${id}`,
  },
  mentors: {
    list: "/mentors",
    detail: (id: string) => `/mentors/${id}`,
  },
  groups: {
    list: "/groups",
    detail: (id: string) => `/groups/${id}`,
  },
  leaderboard: {
    list: "/leaderboard",
  },
  certificates: {
    list: "/certificates",
    detail: (id: string) => `/certificates/${id}`,
  },
} as const;
