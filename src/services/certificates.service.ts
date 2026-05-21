import type {
  CertificateRead,
  CertificateUpdateStatus,
  CertificateUploadParams,
} from "@/types/certificate";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const certificatesService = {
  async getMy(): Promise<CertificateRead[]> {
    const { data } = await apiClient.get<CertificateRead[]>(
      ENDPOINTS.certificates.my
    );
    return data;
  },

  async getPending(): Promise<CertificateRead[]> {
    const { data } = await apiClient.get<CertificateRead[]>(
      ENDPOINTS.certificates.pending
    );
    return data;
  },

  async getConfirmed(): Promise<CertificateRead[]> {
    const { data } = await apiClient.get<CertificateRead[]>(
      ENDPOINTS.certificates.confirmed
    );
    return data;
  },

  async getRejected(): Promise<CertificateRead[]> {
    const { data } = await apiClient.get<CertificateRead[]>(
      ENDPOINTS.certificates.rejected
    );
    return data;
  },

  async getAll(): Promise<CertificateRead[]> {
    const { data } = await apiClient.get<CertificateRead[]>(
      ENDPOINTS.certificates.all
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

  async upload(params: CertificateUploadParams): Promise<CertificateRead> {
    const formData = new FormData();
    formData.append("file", params.file);

    const { data } = await apiClient.post<CertificateRead>(
      ENDPOINTS.certificates.upload,
      formData,
      {
        params: {
          title: params.title,
          cert_type: params.cert_type,
        },
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },
};
