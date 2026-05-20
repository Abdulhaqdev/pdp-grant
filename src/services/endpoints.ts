export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me/",
  },
  users: {
    list: "/user/",
    byId: (id: number) => `/user/id/${id}`,
    byEmail: "/user/email/",
    byPhone: "/user/phone/",
    updatePassword: "/user/update_password/",
    updateName: "/user/update_name/",
    updateUnique: "/user/update_unique/",
    delete: (id: number) => `/user/${id}`,
  },
  admins: {
    list: "/user/admin",
    detail: (id: number) => `/user/admin/${id}`,
  },
  students: {
    list: "/user/student",
    detail: (id: number) => `/user/student/${id}`,
  },
  mentors: {
    list: "/user/mentor",
    detail: (id: number) => `/user/mentor/${id}`,
  },
  groups: {
    list: "/groups/",
    detail: (id: number) => `/groups/${id}`,
  },
  leaderboard: "/leaderboard/",
  certificates: {
    pending: "/user/certificate/pending",
    status: (id: number) => `/user/certificate/${id}/status`,
    upload: "/user/certificate/upload",
  },
  monthlyScores: {
    create: "/user/monthly-score",
    updateTutor: "/user/monthly-score/tutor",
  },
  logs: {
    list: "/audit/logs",
  },
} as const;
