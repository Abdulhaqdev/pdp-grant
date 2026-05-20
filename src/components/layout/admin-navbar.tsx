"use client";

import { AppNavbar } from "@/components/layout/app-navbar";

interface AdminNavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export function AdminNavbar(props: AdminNavbarProps) {
  return <AppNavbar role="admin" {...props} />;
}
