import type { StudentRead } from "@/types/student";

export interface GroupRead {
  id: number;
  group_number: string;
  mentor_id: number | null;
  students?: StudentRead[];
  created_at: string;
  updated_at: string;
}

export interface GroupCreate {
  group_number: string;
  mentor_id?: number | null;
}

export interface GroupUpdate {
  group_number?: string | null;
  mentor_id?: number | null;
}
