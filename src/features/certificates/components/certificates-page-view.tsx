"use client";

import { AwardIcon } from "lucide-react";

import { ActionDropdown } from "@/components/admin/action-dropdown";
import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { certificateColumns } from "@/features/certificates/config/table-columns";
import {
  usePendingCertificates,
  useUpdateCertificateStatus,
} from "@/features/certificates/hooks/use-certificates";
import { useState } from "react";
import type { CertificateRead } from "@/types/certificate";
import type { ColumnDef } from "@tanstack/react-table";

export function CertificatesPageView() {
  const { data = [], isLoading, isError, error } = usePendingCertificates();
  const updateStatus = useUpdateCertificateStatus();
  const [confirm, setConfirm] = useState<{
    cert: CertificateRead;
    status: string;
  } | null>(null);

  const columns: ColumnDef<CertificateRead>[] = [
    ...certificateColumns,
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ActionDropdown
          items={[
            {
              label: "Approve",
              onClick: () =>
                setConfirm({ cert: row.original, status: "approved" }),
            },
            {
              label: "Reject",
              variant: "destructive",
              onClick: () =>
                setConfirm({ cert: row.original, status: "rejected" }),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Certificates</h1>
        <p className="text-sm text-muted-foreground">
          Review and approve pending certificate submissions
        </p>
      </div>
      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <AdminTable
        columns={columns}
        data={data}
        loading={isLoading}
        emptyIcon={AwardIcon}
        emptyTitle="No pending certificates"
        emptyDescription="All submissions have been reviewed."
      />
      <ConfirmDialog
        open={!!confirm}
        onOpenChange={(open) => !open && setConfirm(null)}
        title={`${confirm?.status === "approved" ? "Approve" : "Reject"} certificate`}
        description={
          confirm
            ? `Update status for "${confirm.cert.title}" (Student #${confirm.cert.student_id})?`
            : ""
        }
        variant={confirm?.status === "rejected" ? "destructive" : "default"}
        confirmLabel={confirm?.status === "approved" ? "Approve" : "Reject"}
        loading={updateStatus.isPending}
        onConfirm={() => {
          if (confirm) {
            updateStatus.mutate(
              { certId: confirm.cert.id, status: confirm.status },
              { onSettled: () => setConfirm(null) }
            );
          }
        }}
      />
    </div>
  );
}
