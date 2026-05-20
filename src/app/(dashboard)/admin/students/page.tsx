import type { Metadata } from "next";

import { StudentsPageView } from "@/features/students/components/students-page-view";

export const metadata: Metadata = { title: "Students" };

export default function AdminStudentsPage() {
  return <StudentsPageView />;
}
