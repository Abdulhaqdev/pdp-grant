import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Leaderboard" };

export default function MentorLeaderboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard"
        description="Guruh va talabalar reytingi."
      />
    </div>
  );
}
