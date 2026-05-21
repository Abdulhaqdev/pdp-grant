"use client";

import { LeaderboardView } from "@/features/leaderboard/components/leaderboard-view";
import { useMyStudent } from "@/features/students/hooks/use-my-student";

export function StudentLeaderboardPageView() {
  const { data: student } = useMyStudent();

  return (
    <LeaderboardView
      highlightStudentId={student?.student_id}
      showPersonalBanner
    />
  );
}
