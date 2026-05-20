import type { GroupRead } from "@/types/group";
import type { ApiUserRole, UserRead } from "@/types/user";

export interface MentorRead extends UserRead {
  user_id: number;
  groups?: GroupRead[];
}

export interface MentorCreate {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  father_name: string;
  role: ApiUserRole;
  password: string;
  group_ids?: number[];
}

export interface MentorUpdate {
  group_ids?: number[] | null;
}
