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
    me: ["students", "me"] as const,
  },
  mentors: {
    all: ["mentors"] as const,
    list: (params?: { page?: number; limit?: number }) =>
      ["mentors", "list", params] as const,
    detail: (id: number) => ["mentors", id] as const,
    me: ["mentors", "me"] as const,
    myGroups: ["mentors", "my-groups"] as const,
    myStudents: (groupId?: number | null) =>
      ["mentors", "my-students", groupId ?? "all"] as const,
  },
  groups: {
    all: ["groups"] as const,
    list: ["groups", "list"] as const,
    detail: (id: number) => ["groups", id] as const,
  },
  leaderboard: {
    all: ["leaderboard"] as const,
    list: (params?: { limit?: number; page?: number }) =>
      ["leaderboard", "list", params] as const,
  },
  pdpMarket: {
    catalog: ["pdp-market", "catalog"] as const,
    adminCatalog: ["pdp-market", "admin-catalog"] as const,
  },
  certificates: {
    all: ["certificates"] as const,
    my: ["certificates", "my"] as const,
    list: (tab: string) => ["certificates", "list", tab] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: { page?: number; limit?: number; role?: string }) =>
      ["users", "list", params] as const,
  },
  logs: {
    list: (params?: object) => ["logs", "list", params] as const,
  },
  monthlyScores: {
    all: ["monthly-scores"] as const,
    performance: (studentId: number) =>
      ["monthly-scores", "performance", studentId] as const,
  },
} as const;
