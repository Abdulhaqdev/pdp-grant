import type { PaginatedParams } from "@/types/api";
import type { StudentCreate, StudentRead, StudentUpdate } from "@/types/student";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const studentsService = {
  async list(params?: PaginatedParams): Promise<StudentRead[]> {
    const { data } = await apiClient.get<StudentRead[]>(ENDPOINTS.students.list, {
      params: { page: params?.page ?? 1, limit: params?.limit ?? 100 },
    });
    return data;
  },

  async getById(id: number): Promise<StudentRead> {
    const { data } = await apiClient.get<StudentRead>(
      ENDPOINTS.students.detail(id)
    );
    return data;
  },

  async create(payload: StudentCreate): Promise<StudentRead> {
    const { data } = await apiClient.post<StudentRead>(
      ENDPOINTS.students.list,
      payload
    );
    return data;
  },

  async update(id: number, payload: StudentUpdate): Promise<void> {
    await apiClient.put(ENDPOINTS.students.detail(id), payload);
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.students.detail(id));
  },
};
