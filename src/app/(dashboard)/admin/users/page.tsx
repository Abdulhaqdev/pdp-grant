import type { Metadata } from "next";

import { UsersPageView } from "@/features/users/components/users-page-view";

export const metadata: Metadata = { title: "Foydalanuvchilar" };

export default function AdminUsersPage() {
  return <UsersPageView />;
}
