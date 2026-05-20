import type { Metadata } from "next";

import { CertificatesPageView } from "@/features/certificates/components/certificates-page-view";

export const metadata: Metadata = { title: "Certificates" };

export default function AdminCertificatesPage() {
  return <CertificatesPageView />;
}
