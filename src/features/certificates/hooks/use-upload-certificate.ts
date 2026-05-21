"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { certificatesService } from "@/services/certificates.service";
import type { CertificateUploadParams } from "@/types/certificate";

export function useUploadCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CertificateUploadParams) =>
      certificatesService.upload(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.my });
      queryClient.invalidateQueries({ queryKey: queryKeys.pdpMarket.catalog });
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Certificate uploaded successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
