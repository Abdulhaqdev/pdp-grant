import type { CertificateRead } from "@/types/certificate";

export type CertificateAdminTab =
  | "pending"
  | "confirmed"
  | "rejected"
  | "all";

export const CERTIFICATE_ADMIN_TABS: {
  value: CertificateAdminTab;
  label: string;
}[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

export function isCertificateApproved(status: string): boolean {
  return status === "approved" || status === "confirmed";
}

export function getCertificateStatusBadgeVariant(
  status: CertificateRead["status"]
): "default" | "secondary" | "destructive" {
  if (status === "pending") return "secondary";
  if (isCertificateApproved(status)) return "default";
  if (status === "rejected") return "destructive";
  return "secondary";
}

export function formatCertificateStatus(status: string): string {
  if (status === "confirmed") return "Approved";
  return status.charAt(0).toUpperCase() + status.slice(1);
}
