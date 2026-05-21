import type { Metadata } from "next";

import { MentorTutorScoresPageView } from "@/features/mentors/components/mentor-tutor-scores-page-view";

export const metadata: Metadata = { title: "Tutor Scores" };

export default function MentorTutorScoresPage() {
  return <MentorTutorScoresPageView />;
}
