import type { GroupRead } from "@/types/group";
import type { StudentRead } from "@/types/student";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const mentorService = {
  async getMyGroups(): Promise<GroupRead[]> {
    const { data } = await apiClient.get<GroupRead[]>(ENDPOINTS.mentors.myGroups);
    return data;
  },

  async getMyStudents(groupId?: number): Promise<StudentRead[]> {
    const { data } = await apiClient.get<StudentRead[]>(
      ENDPOINTS.mentors.myStudents,
      {
        params: groupId != null ? { group_id: groupId } : undefined,
      }
    );
    return data;
  },
};
