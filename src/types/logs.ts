import type { ApiUserRole } from "@/types/user";

export type LogActionType =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "approve"
  | "reject"
  | "upload"
  | "kpi_update"
  | "score_update";

export type LogEntityType =
  | "auth"
  | "student"
  | "mentor"
  | "group"
  | "certificate"
  | "monthly_score"
  | "admin"
  | "user"
  | "kpi"
  | "leaderboard";

export type LogStatus = "success" | "failed" | "pending";

export type LogCategory =
  | "login"
  | "user_action"
  | "crud"
  | "certificate"
  | "student"
  | "group"
  | "mentor"
  | "kpi";

export interface AuditLog {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  role: ApiUserRole;
  action: LogActionType;
  action_label: string;
  category: LogCategory;
  entity_type: LogEntityType;
  entity_id: string | null;
  entity_label: string;
  status: LogStatus;
  ip_address: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface LogsFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: ApiUserRole | "all";
  action?: LogActionType | "all";
  category?: LogCategory | "all";
  status?: LogStatus | "all";
  date_from?: string;
  date_to?: string;
}

export interface LogsPaginatedResponse {
  data: AuditLog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}
