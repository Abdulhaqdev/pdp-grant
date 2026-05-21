import type { Metadata } from "next";

import { MentorGroupsPageView } from "@/features/mentors/components/mentor-groups-page-view";

export const metadata: Metadata = { title: "Groups" };

export default function MentorGroupsPage() {
  return <MentorGroupsPageView />;
}
