import { MOCK_AUDIT_LOGS } from "@/features/logs/data/mock-logs";
import type { LogsFilterParams, LogsPaginatedResponse } from "@/types/logs";

/**
 * Logs service — uses mock data until backend audit API is available.
 * Swap `fetchLogs` implementation when GET /audit/logs is ready.
 */
export const logsService = {
  async list(filters: LogsFilterParams = {}): Promise<LogsPaginatedResponse> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    let results = [...MOCK_AUDIT_LOGS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (log) =>
          log.user_name.toLowerCase().includes(q) ||
          log.user_email.toLowerCase().includes(q) ||
          log.entity_label.toLowerCase().includes(q) ||
          log.action_label.toLowerCase().includes(q) ||
          String(log.id).includes(q)
      );
    }

    if (filters.role && filters.role !== "all") {
      results = results.filter((log) => log.role === filters.role);
    }

    if (filters.action && filters.action !== "all") {
      results = results.filter((log) => log.action === filters.action);
    }

    if (filters.category && filters.category !== "all") {
      results = results.filter((log) => log.category === filters.category);
    }

    if (filters.status && filters.status !== "all") {
      results = results.filter((log) => log.status === filters.status);
    }

    if (filters.date_from) {
      const from = new Date(filters.date_from).getTime();
      results = results.filter(
        (log) => new Date(log.created_at).getTime() >= from
      );
    }

    if (filters.date_to) {
      const to = new Date(filters.date_to).getTime();
      results = results.filter(
        (log) => new Date(log.created_at).getTime() <= to
      );
    }

    results.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const total = results.length;
    const total_pages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit);

    await new Promise((r) => setTimeout(r, 300));

    return {
      data,
      meta: { total, page, limit, total_pages },
    };
  },

  /** Future: POST audit event from client after mutations */
  async track(): Promise<void> {
    // no-op until backend ready
  },
};
