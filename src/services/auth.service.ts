import type { Token } from "@/types/api";
import type { UserRead } from "@/types/user";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export interface LoginPayload {
  username: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<Token> {
    const form = new URLSearchParams();
    form.append("username", payload.username);
    form.append("password", payload.password);

    const { data } = await apiClient.post<Token>(ENDPOINTS.auth.login, form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
  },

  async me(): Promise<UserRead> {
    const { data } = await apiClient.get<UserRead>(ENDPOINTS.auth.me);
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.auth.logout);
  },
};
