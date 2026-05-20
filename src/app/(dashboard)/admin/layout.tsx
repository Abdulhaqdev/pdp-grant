import { AdminLayout } from "@/components/layout/admin-layout";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>
      <ErrorBoundary>{children}</ErrorBoundary>
    </AdminLayout>
  );
}
