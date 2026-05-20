import type { PaginatedParams } from "@/types/api";
import type { ApiUserRole, UserRead } from "@/types/user";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const usersService = {
  async list(
    params?: PaginatedParams & { role?: ApiUserRole }
  ): Promise<UserRead[]> {
    const { data } = await apiClient.get<UserRead[]>(ENDPOINTS.users.list, {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 100,
        role: params?.role,
      },
    });
    return data;
  },

  async getById(id: number): Promise<UserRead> {
    const { data } = await apiClient.get<UserRead>(ENDPOINTS.users.byId(id));
    return data;
  },
};
