import type { CertificateRead } from "@/types/certificate";
import type { GroupRead } from "@/types/group";
import type { LeaderboardRow } from "@/types/leaderboard";
import type { MentorRead } from "@/types/mentor";
import type { StudentRead } from "@/types/student";

export interface AdminDashboardStats {
  totalStudents: number;
  totalMentors: number;
  totalGroups: number;
  grantStudents: number;
  pendingCertificates: number;
  averageKpi: number;
  topStudents: LeaderboardRow[];
}

export function computeAdminStats(
  students: StudentRead[],
  mentors: MentorRead[],
  groups: GroupRead[],
  certificates: CertificateRead[],
  leaderboard: LeaderboardRow[]
): AdminDashboardStats {
  const grantStudents = students.filter((s) => s.is_grant).length;
  const pendingCertificates = certificates.filter(
    (c) => c.status === "pending"
  ).length;
  const averageKpi =
    leaderboard.length > 0
      ? leaderboard.reduce((sum, r) => sum + r.total_kpi, 0) /
        leaderboard.length
      : 0;

  return {
    totalStudents: students.length,
    totalMentors: mentors.length,
    totalGroups: groups.length,
    grantStudents,
    pendingCertificates,
    averageKpi: Math.round(averageKpi * 10) / 10,
    topStudents: leaderboard.slice(0, 5),
  };
}
