import type { Metadata } from "next";

import { LogsPageView } from "@/features/logs/components/logs-page-view";

export const metadata: Metadata = { title: "Audit Logs" };

export default function AdminLogsPage() {
  return <LogsPageView />;
}
