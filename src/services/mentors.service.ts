import type { PaginatedParams } from "@/types/api";
import type { MentorCreate, MentorRead, MentorUpdate } from "@/types/mentor";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const mentorsService = {
  async list(params?: PaginatedParams): Promise<MentorRead[]> {
    const { data } = await apiClient.get<MentorRead[]>(ENDPOINTS.mentors.list, {
      params: { page: params?.page ?? 1, limit: params?.limit ?? 100 },
    });
    return data;
  },

  async getById(id: number): Promise<MentorRead> {
    const { data } = await apiClient.get<MentorRead>(
      ENDPOINTS.mentors.detail(id)
    );
    return data;
  },

  async create(payload: MentorCreate): Promise<MentorRead> {
    const { data } = await apiClient.post<MentorRead>(
      ENDPOINTS.mentors.list,
      payload
    );
    return data;
  },

  async update(id: number, payload: MentorUpdate): Promise<void> {
    await apiClient.put(ENDPOINTS.mentors.detail(id), payload);
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.mentors.detail(id));
  },
};
