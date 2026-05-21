import type { MonthlyScoreRead } from "@/types/monthly-score";

export function sortMonthlyScores(scores: MonthlyScoreRead[]): MonthlyScoreRead[] {
  return [...scores].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.month - a.month;
  });
}
