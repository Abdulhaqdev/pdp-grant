import { AppLayout } from "@/components/layout/app-layout";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout role="mentor">{children}</AppLayout>;
}
