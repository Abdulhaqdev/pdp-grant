export type CertificateStatus = "pending" | "approved" | "rejected" | string;

export interface CertificateRead {
  id: number;
  student_id: number;
  title: string;
  cert_type: string;
  file_path: string;
  status: CertificateStatus;
  points: number;
  created_at: string;
}

export interface CertificateUpdateStatus {
  status: string;
}
