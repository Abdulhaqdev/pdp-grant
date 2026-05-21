import type { Metadata } from "next";

import { StudentCertificatesPageView } from "@/features/certificates/components/student-certificates-page-view";

export const metadata: Metadata = { title: "Certificates" };

export default function StudentCertificatesPage() {
  return <StudentCertificatesPageView />;
}
