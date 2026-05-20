import type { GroupCreate, GroupRead, GroupUpdate } from "@/types/group";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const groupsService = {
  async list(): Promise<GroupRead[]> {
    const { data } = await apiClient.get<GroupRead[]>(ENDPOINTS.groups.list);
    return data;
  },

  async getById(id: number): Promise<GroupRead> {
    const { data } = await apiClient.get<GroupRead>(
      ENDPOINTS.groups.detail(id)
    );
    return data;
  },

  async create(payload: GroupCreate): Promise<GroupRead> {
    const { data } = await apiClient.post<GroupRead>(
      ENDPOINTS.groups.list,
      payload
    );
    return data;
  },

  async update(id: number, payload: GroupUpdate): Promise<GroupRead> {
    const { data } = await apiClient.put<GroupRead>(
      ENDPOINTS.groups.detail(id),
      payload
    );
    return data;
  },

  async remove(id: number): Promise<boolean> {
    const { data } = await apiClient.delete<boolean>(
      ENDPOINTS.groups.detail(id)
    );
    return data;
  },
};
