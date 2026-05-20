import type { Metadata } from "next";

import { GroupsPageView } from "@/features/groups/components/groups-page-view";

export const metadata: Metadata = { title: "Groups" };

export default function AdminGroupsPage() {
  return <GroupsPageView />;
}
