import type { Metadata } from "next";

import { StudentPdpMarketPageView } from "@/features/pdp-market/components/student-pdp-market-page-view";

export const metadata: Metadata = { title: "PDP Market" };

export default function StudentPdpMarketPage() {
  return <StudentPdpMarketPageView />;
}
