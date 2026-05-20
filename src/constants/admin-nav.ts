import {
  BREADCRUMB_LABELS,
  NAV_BY_ROLE,
  type AppNavItem,
} from "@/constants/app-nav";

export type AdminNavItem = AppNavItem;

export const ADMIN_NAV_ITEMS = NAV_BY_ROLE.admin;

export const ADMIN_BREADCRUMB_LABELS = BREADCRUMB_LABELS.admin;
