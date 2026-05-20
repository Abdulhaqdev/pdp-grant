import type { Metadata } from "next";

import { MonthlyScoresPageView } from "@/features/monthly-scores/components/monthly-scores-page-view";

export const metadata: Metadata = { title: "Monthly Scores" };

export default function AdminMonthlyScoresPage() {
  return <MonthlyScoresPageView />;
}
