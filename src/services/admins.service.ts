import type { PaginatedParams } from "@/types/api";
import type { AdminCreate, AdminRead } from "@/types/admin";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const adminsService = {
  async list(params?: PaginatedParams): Promise<AdminRead[]> {
    const { data } = await apiClient.get<AdminRead[]>(ENDPOINTS.admins.list, {
      params: { page: params?.page ?? 1, limit: params?.limit ?? 100 },
    });
    return data;
  },

  async create(payload: AdminCreate): Promise<AdminRead> {
    const { data } = await apiClient.post<AdminRead>(ENDPOINTS.admins.list, {
      ...payload,
      role: "admin" as const,
    });
    return data;
  },
};
