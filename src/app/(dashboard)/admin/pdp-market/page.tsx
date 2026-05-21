import type { Metadata } from "next";

import { AdminPdpMarketPageView } from "@/features/pdp-market/components/admin-pdp-market-page-view";

export const metadata: Metadata = { title: "PDP Market" };

export default function AdminPdpMarketPage() {
  return <AdminPdpMarketPageView />;
}
