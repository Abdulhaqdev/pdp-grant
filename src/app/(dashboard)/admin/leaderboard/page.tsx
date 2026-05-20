import type { Metadata } from "next";

import { LeaderboardPageView } from "@/features/leaderboard/components/leaderboard-page-view";

export const metadata: Metadata = { title: "Leaderboard" };

export default function AdminLeaderboardPage() {
  return <LeaderboardPageView />;
}
