"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/constants/query-keys";
import { certificatesService } from "@/services/certificates.service";
import { useAuthStore } from "@/store/auth.store";

export function useMyCertificates() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: queryKeys.certificates.my,
    queryFn: () => certificatesService.getMy(),
    enabled: !!user && user.role === "student",
  });
}

/** @deprecated Use useAdminCertificates("pending") */
export function usePendingCertificates() {
  return useQuery({
    queryKey: queryKeys.certificates.list("pending"),
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
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats });
      toast.success("Certificate status updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
