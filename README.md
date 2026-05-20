# Grant LMS — Frontend

Enterprise admin dashboard for the Grant LMS API ([Swagger](https://api.grant.boostify.uz/docs)).

## Stack

Next.js 15 · TypeScript · Tailwind v4 · shadcn/ui · TanStack Query · Axios · Zustand · React Hook Form · Zod · Recharts

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL=https://api.grant.boostify.uz` (no `/api` suffix — paths match OpenAPI).

Login uses OAuth2 password flow: **email as `username`**, form-urlencoded `POST /auth/login`.

## Admin console (`/admin`)

| Route | Feature |
|-------|---------|
| `/admin` | Dashboard — stats, charts, leaderboard preview |
| `/admin/students` | Students CRUD list |
| `/admin/mentors` | Mentors list |
| `/admin/groups` | Groups list |
| `/admin/certificates` | Pending approvals |
| `/admin/monthly-scores` | KPI scores (forms placeholder) |
| `/admin/leaderboard` | Full rankings table |
| `/admin/logs` | Audit logs (mock data, API-ready) |
| `/admin/settings` | Account & env |

## Architecture

```
src/
├── app/(dashboard)/admin/     # Admin routes
├── components/admin/          # AdminTable, StatsCard, FilterBar, …
├── components/layout/         # AdminLayout, sidebar, breadcrumbs
├── features/
│   ├── admin/                 # Dashboard, stats, settings
│   ├── students|mentors|groups|certificates|leaderboard|monthly-scores|logs/
├── services/                  # API clients aligned with OpenAPI
├── types/                     # Generated-style DTOs
└── constants/                 # routes, query-keys, admin-nav
```

## Logs (future API)

`logsService.list()` uses mock data in `features/logs/data/mock-logs.ts`. When `GET /audit/logs` exists, replace the implementation in `services/logs.service.ts` only.

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run format`
