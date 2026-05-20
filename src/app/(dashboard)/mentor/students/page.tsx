import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "My Students" };

export default function MentorStudentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Students"
        description="Mentorlik qilayotgan talabalar ro‘yxati."
      />
    </div>
  );
}
