"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import type { CertificateAdminTab } from "@/features/certificates/lib/certificate-status";
import { certificatesService } from "@/services/certificates.service";

const fetchByTab: Record<
  CertificateAdminTab,
  () => ReturnType<typeof certificatesService.getPending>
> = {
  pending: () => certificatesService.getPending(),
  confirmed: () => certificatesService.getConfirmed(),
  rejected: () => certificatesService.getRejected(),
  all: () => certificatesService.getAll(),
};

export function useAdminCertificates(tab: CertificateAdminTab) {
  return useQuery({
    queryKey: queryKeys.certificates.list(tab),
    queryFn: fetchByTab[tab],
  });
}
