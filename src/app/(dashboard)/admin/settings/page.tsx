import type { Metadata } from "next";

import { SettingsPageView } from "@/features/admin/components/settings-page-view";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return <SettingsPageView />;
}
