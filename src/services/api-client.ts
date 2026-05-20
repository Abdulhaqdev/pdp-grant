import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { APP_CONFIG } from "@/constants/config";
import type { HTTPValidationError } from "@/types/api";

function extractErrorMessage(error: AxiosError): string {
  const data = error.response?.data as
    | HTTPValidationError
    | { message?: string; detail?: string }
    | undefined;

  if (data && "detail" in data && Array.isArray(data.detail) && data.detail[0]) {
    return data.detail[0].msg;
  }
  if (data && "message" in data && typeof data.message === "string") {
    return data.message;
  }
  if (data && "detail" in data && typeof data.detail === "string") {
    return data.detail;
  }
  return error.message || "An unexpected error occurred";
}

export const apiClient = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  timeout: 30_000,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = extractErrorMessage(error);

    if (error.response?.status === 401 && typeof window !== "undefined") {
      const isLogin = error.config?.url?.includes("/auth/login");
      if (!isLogin) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(new Error(message));
  }
);
