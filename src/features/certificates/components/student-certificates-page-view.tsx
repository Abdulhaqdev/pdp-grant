"use client";

import { AwardIcon } from "lucide-react";

import { AdminTable } from "@/components/admin/admin-table";
import { PageHeader } from "@/components/shared/page-header";
import { UploadCertificateForm } from "@/features/certificates/components/upload-certificate-form";
import { studentCertificateColumns } from "@/features/certificates/config/student-certificate-columns";
import { useMyCertificates } from "@/features/certificates/hooks/use-certificates";
import { useAuthStore } from "@/store/auth.store";

export function StudentCertificatesPageView() {
  const user = useAuthStore((s) => s.user);
  const { data: certificates = [], isLoading, isError, error } =
    useMyCertificates();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Certificates"
        description="Upload certificates for review and track approval status."
      />

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      {user?.role === "student" ? (
        <UploadCertificateForm />
      ) : null}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">My submissions</h2>
        <AdminTable
          columns={studentCertificateColumns}
          data={certificates}
          loading={isLoading}
          emptyIcon={AwardIcon}
          emptyTitle="No certificates yet"
          emptyDescription="Upload your first certificate using the form above."
        />
      </div>
    </div>
  );
}
