"use client";

import { AwardIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { ActionDropdown } from "@/components/admin/action-dropdown";
import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { certificateColumns } from "@/features/certificates/config/table-columns";
import { useAdminCertificates } from "@/features/certificates/hooks/use-admin-certificates";
import { useUpdateCertificateStatus } from "@/features/certificates/hooks/use-certificates";
import {
  CERTIFICATE_ADMIN_TABS,
  type CertificateAdminTab,
} from "@/features/certificates/lib/certificate-status";
import type { CertificateRead } from "@/types/certificate";

const EMPTY_COPY: Record<
  CertificateAdminTab,
  { title: string; description: string }
> = {
  pending: {
    title: "No pending certificates",
    description: "All submissions have been reviewed.",
  },
  confirmed: {
    title: "No approved certificates",
    description: "Approved certificates will appear here.",
  },
  rejected: {
    title: "No rejected certificates",
    description: "Rejected submissions will appear here.",
  },
  all: {
    title: "No certificates",
    description: "Certificate submissions will appear here.",
  },
};

export function CertificatesPageView() {
  const [tab, setTab] = useState<CertificateAdminTab>("pending");
  const { data = [], isLoading, isError, error } = useAdminCertificates(tab);
  const updateStatus = useUpdateCertificateStatus();
  const [confirm, setConfirm] = useState<{
    cert: CertificateRead;
    status: string;
  } | null>(null);

  const columns: ColumnDef<CertificateRead>[] = useMemo(() => {
    if (tab !== "pending") {
      return certificateColumns;
    }
    return [
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
  }, [tab]);

  const empty = EMPTY_COPY[tab];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Certificates</h1>
        <p className="text-sm text-muted-foreground">
          Review submissions by status — approve or reject pending items
        </p>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as CertificateAdminTab)}
      >
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:w-fit">
          {CERTIFICATE_ADMIN_TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="rounded-lg px-4 data-active:bg-background data-active:shadow-sm"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isError ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      <AdminTable
        columns={columns}
        data={data}
        loading={isLoading}
        emptyIcon={AwardIcon}
        emptyTitle={empty.title}
        emptyDescription={empty.description}
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
