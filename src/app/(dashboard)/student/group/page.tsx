import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "My Group" };

export default function StudentGroupPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Group"
        description="Group members and mentor information."
      />
    </div>
  );
}
