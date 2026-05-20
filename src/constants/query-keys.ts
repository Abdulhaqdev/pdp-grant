export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  admin: {
    stats: ["admin", "stats"] as const,
    activity: ["admin", "activity"] as const,
  },
  students: {
    all: ["students"] as const,
    list: (params?: { page?: number; limit?: number }) =>
      ["students", "list", params] as const,
    detail: (id: number) => ["students", id] as const,
  },
  mentors: {
    all: ["mentors"] as const,
    list: (params?: { page?: number; limit?: number }) =>
      ["mentors", "list", params] as const,
    detail: (id: number) => ["mentors", id] as const,
  },
  groups: {
    all: ["groups"] as const,
    list: ["groups", "list"] as const,
    detail: (id: number) => ["groups", id] as const,
  },
  leaderboard: {
    all: ["leaderboard"] as const,
  },
  certificates: {
    pending: ["certificates", "pending"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: { page?: number; limit?: number; role?: string }) =>
      ["users", "list", params] as const,
  },
  logs: {
    list: (params?: object) => ["logs", "list", params] as const,
  },
} as const;
