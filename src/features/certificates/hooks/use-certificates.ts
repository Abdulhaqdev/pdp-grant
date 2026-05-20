"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { certificatesService } from "@/services/certificates.service";

export function usePendingCertificates() {
  return useQuery({
    queryKey: queryKeys.certificates.pending,
    queryFn: () => certificatesService.getPending(),
  });
}

export function useUpdateCertificateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      certId,
      status,
    }: {
      certId: number;
      status: string;
    }) => certificatesService.updateStatus(certId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.pending });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Certificate status updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
