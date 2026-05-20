import type { LogActionType, LogStatus } from "@/types/logs";

export function getActionBadgeVariant(
  action: LogActionType
): "default" | "secondary" | "destructive" | "outline" {
  switch (action) {
    case "login":
    case "logout":
      return "outline";
    case "create":
    case "upload":
      return "default";
    case "approve":
      return "default";
    case "delete":
    case "reject":
      return "destructive";
    default:
      return "secondary";
  }
}

export function getStatusBadgeVariant(
  status: LogStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "success":
      return "default";
    case "failed":
      return "destructive";
    case "pending":
      return "secondary";
    default:
      return "outline";
  }
}
