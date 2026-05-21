import type { PaginatedParams } from "@/types/api";
import type {
  ApiUserRole,
  UserRead,
  UserUpdateName,
  UserUpdateUnique,
} from "@/types/user";

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

  async updateName(
    payload: UserUpdateName,
    userId?: number
  ): Promise<void> {
    await apiClient.put(ENDPOINTS.users.updateName, payload, {
      params: userId != null ? { user_id: userId } : undefined,
    });
  },

  async updateUnique(
    payload: UserUpdateUnique,
    userId?: number
  ): Promise<UserRead> {
    const { data } = await apiClient.put<UserRead>(
      ENDPOINTS.users.updateUnique,
      payload,
      { params: userId != null ? { user_id: userId } : undefined }
    );
    return data;
  },
};
