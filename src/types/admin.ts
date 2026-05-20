import type { ApiUserRole, UserRead } from "@/types/user";

export interface AdminRead extends UserRead {
  user_id: number;
  is_superadmin: boolean;
}

export interface AdminCreate {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  father_name: string;
  role: ApiUserRole;
  password: string;
  is_superadmin: boolean;
}
