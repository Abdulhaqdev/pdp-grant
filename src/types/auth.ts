import type { User } from "@/types/user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}
