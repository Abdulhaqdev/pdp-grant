import type { ApiResponse } from "@/types/api";
import type { AuthSession, LoginCredentials } from "@/types/auth";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const { data } = await apiClient.post<ApiResponse<AuthSession>>(
      ENDPOINTS.auth.login,
      credentials
    );
    return data.data;
  },

  async me(): Promise<AuthSession["user"]> {
    const { data } = await apiClient.get<ApiResponse<AuthSession["user"]>>(
      ENDPOINTS.auth.me
    );
    return data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.auth.logout);
  },
};
