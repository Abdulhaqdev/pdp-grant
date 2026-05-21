import type { Metadata } from "next";

import { StudentLeaderboardPageView } from "@/features/leaderboard/components/student-leaderboard-page-view";

export const metadata: Metadata = { title: "Leaderboard" };

export default function StudentLeaderboardPage() {
  return <StudentLeaderboardPageView />;
}
