import type { Metadata } from "next";

import { MentorsPageView } from "@/features/mentors/components/mentors-page-view";

export const metadata: Metadata = { title: "Mentors" };

export default function AdminMentorsPage() {
  return <MentorsPageView />;
}
