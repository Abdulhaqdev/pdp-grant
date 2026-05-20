import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Certificates" };

export default function StudentCertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description="Sertifikatlaringiz va holati."
      />
    </div>
  );
}
