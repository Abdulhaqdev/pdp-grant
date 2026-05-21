import type { Metadata } from "next";

import { MentorStudentsPageView } from "@/features/mentors/components/mentor-students-page-view";

export const metadata: Metadata = { title: "My Students" };

export default function MentorStudentsPage() {
  return <MentorStudentsPageView />;
}
