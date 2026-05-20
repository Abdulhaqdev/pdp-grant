import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Leaderboard" };

export default function StudentLeaderboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard"
        description="Reyting va o‘rinlaringiz."
      />
    </div>
  );
}
