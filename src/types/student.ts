import type { CertificateRead } from "@/types/certificate";
import type { MonthlyScoreRead } from "@/types/monthly-score";
import type { ApiUserRole, UserRead } from "@/types/user";

export interface StudentRead extends UserRead {
  user_id: number;
  student_id: number;
  group_id: number | null;
  is_grant: boolean;
  course_number: number;
  attendance: number;
  academic: number;
  assignment: number;
  monthly_scores?: MonthlyScoreRead[];
  certificates?: CertificateRead[];
}

export interface StudentCreate {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  father_name: string;
  role: ApiUserRole;
  password: string;
  student_id: number;
  group_id?: number | null;
  is_grant?: boolean;
  course_number?: number;
  attendance?: number;
  academic?: number;
  assignment?: number;
}

export interface StudentUpdate {
  group_id?: number | null;
  is_grant?: boolean | null;
  course_number?: number | null;
  attendance?: number | null;
  academic?: number | null;
  assignment?: number | null;
}
