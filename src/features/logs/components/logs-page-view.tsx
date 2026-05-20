"use client";

import { ScrollTextIcon } from "lucide-react";

import { AdminTable } from "@/components/admin/admin-table";
import { FilterBar, FilterField } from "@/components/admin/filter-bar";
import { SearchInput } from "@/components/admin/search-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LabeledSelect } from "@/components/admin/labeled-select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logTableColumns } from "@/features/logs/config/log-table-columns";
import { useLogs } from "@/features/logs/hooks/use-logs";
import type { LogCategory } from "@/types/logs";

const LOG_TABS: { value: LogCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "login", label: "Login" },
  { value: "user_action", label: "User actions" },
  { value: "crud", label: "CRUD" },
  { value: "certificate", label: "Certificates" },
  { value: "student", label: "Students" },
  { value: "group", label: "Groups" },
  { value: "mentor", label: "Mentors" },
  { value: "kpi", label: "KPI" },
];

export function LogsPageView() {
  const {
    logs,
    meta,
    isLoading,
    page,
    setPage,
    search,
    setSearch,
    role,
    setRole,
    category,
    setCategory,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
  } = useLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">
          Login history, CRUD operations, certificate approvals, and KPI updates
        </p>
      </div>

      <Tabs
        value={category}
        onValueChange={(v) => {
          setCategory(v as LogCategory | "all");
          setPage(1);
        }}
      >
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {LOG_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg border data-active:border-primary data-active:bg-primary/5"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <FilterBar>
        <FilterField label="Search" className="min-w-[220px] flex-1">
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="User, action, entity..."
          />
        </FilterField>
        <FilterField label="Role">
          <LabeledSelect
            value={role}
            onValueChange={(v) => {
              setRole(v as typeof role);
              setPage(1);
            }}
            options={[
              { value: "all", label: "All roles" },
              { value: "admin", label: "Admin" },
              { value: "mentor", label: "Mentor" },
              { value: "student", label: "Student" },
            ]}
          />
        </FilterField>
        <FilterField label="From">
          <Input
            type="date"
            className="h-9"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
          />
        </FilterField>
        <FilterField label="To">
          <Input
            type="date"
            className="h-9"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
          />
        </FilterField>
      </FilterBar>

      <AdminTable
        columns={logTableColumns}
        data={logs}
        loading={isLoading}
        emptyIcon={ScrollTextIcon}
        emptyTitle="No logs found"
        emptyDescription="Adjust filters or wait for backend audit API."
        pagination={
          meta ? (
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                {meta.total} entries · Page {meta.page} of {meta.total_pages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= meta.total_pages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
}
