import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Groups" };

export default function MentorGroupsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Groups"
        description="Boshqarayotgan guruhlar."
      />
    </div>
  );
}
