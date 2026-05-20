import type {
  CertificateRead,
  CertificateUpdateStatus,
} from "@/types/certificate";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const certificatesService = {
  async getPending(): Promise<CertificateRead[]> {
    const { data } = await apiClient.get<CertificateRead[]>(
      ENDPOINTS.certificates.pending
    );
    return data;
  },

  async updateStatus(
    certId: number,
    payload: CertificateUpdateStatus
  ): Promise<CertificateRead> {
    const { data } = await apiClient.patch<CertificateRead>(
      ENDPOINTS.certificates.status(certId),
      payload
    );
    return data;
  },
};
