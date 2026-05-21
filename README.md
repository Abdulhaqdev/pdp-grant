# PDP Grant LMS

Web frontend for **PDP University Grant LMS** — manage students, mentors, groups, monthly KPI scores, certificates, and grant rankings. Connects to the [Grant LMS API](https://api.grant.boostify.uz/docs) (OpenAPI).

Built with **Next.js 15** (App Router), role-based dashboards for **admin**, **mentor**, and **student**, and a default **light** theme on first visit.

---

## Features by role

### Admin (`/admin`)

| Area | Description |
|------|-------------|
| **Dashboard** | Overview stats, leaderboard preview |
| **Students** | List, create, edit, delete students |
| **Mentors** | Mentor profiles; assign groups via `PUT /user/mentor/{id}` |
| **Groups** | Cohort management and mentor assignment |
| **Users** | Admin user management |
| **Certificates** | Tabs: Pending, Approved, Rejected, All |
| **Monthly scores** | Select student → view/edit performance; create & patch KPI records |
| **Leaderboard** | Full rankings table (paginated API) |
| **PDP Market** | Product catalog (local mock until backend catalog exists) |
| **Logs** | Audit log UI (mock data; ready for `GET /audit/logs`) |
| **Settings** | Account and environment info |

### Mentor (`/mentor`)

| Area | Description |
|------|-------------|
| **My Students** | Students from assigned groups (`GET /mentor/my-groups`) |
| **Groups** | Group list with nested students |
| **Tutor scores** | Submit tutor score per student/month (`PATCH` via performance + `score_id`) |
| **Leaderboard** | Shared rankings view |

### Student (`/student`)

| Area | Description |
|------|-------------|
| **Dashboard** | Personal overview |
| **My Group** | Group information |
| **Leaderboard** | Rankings with row highlight for current user |
| **Certificates** | Upload and track certificate status |
| **PDP Market** | Points and redeemable products (`GET /leaderboard/pdp-market`) |

---

## Tech stack

| Layer | Choices |
|-------|---------|
| Framework | Next.js 15 (App Router, Turbopack dev) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (Base UI) |
| Data | TanStack Query, Axios |
| State | Zustand (auth persist, UI preferences) |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table |
| Charts | Recharts |
| Theme | next-themes (default: **light**) |

---

## Prerequisites

- **Node.js** 20+
- **pnpm** or **npm**
- Access to the Grant LMS API (or local backend)

---

## Getting started

```bash
# 1. Clone and install
git clone <repository-url>
cd pdp-grant
pnpm install   # or: npm install

# 2. Environment
cp .env.example .env.local

# 3. Run dev server
pnpm dev       # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated users are redirected to `/login`.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | API base URL, e.g. `https://api.grant.boostify.uz` — **no** `/api` suffix |
| `NEXT_PUBLIC_APP_URL` | No | App URL for metadata (default `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_NAME` | No | Display name (default `PDP Grant LMS`) |
| `API_SECRET_KEY` | No | Server-only secret if needed later |

Example `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.grant.boostify.uz
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PDP Grant LMS
```

---

## Authentication

- **Login:** `POST /auth/login` (OAuth2 password flow, `application/x-www-form-urlencoded`)
- Use **email** as `username` and account password
- JWT stored in `localStorage` (`access_token`); session restored on refresh via Zustand persist + `/auth/me/`
- After login, users are routed by role: `admin` → `/admin`, `mentor` → `/mentor`, `student` → `/student`

---

## Route map

```
/                     → redirects by role or login
/login                → sign in

/admin/*              → admin console
/mentor/*             → mentor console
/student/*            → student console
```

Key paths are defined in `src/constants/routes.ts` and navigation in `src/constants/app-nav.ts`.

---

## Project structure

```
src/
├── app/
│   ├── (auth)/login/           # Login
│   ├── (dashboard)/
│   │   ├── admin/              # Admin pages
│   │   ├── mentor/             # Mentor pages
│   │   └── student/            # Student pages
│   ├── layout.tsx              # Root layout (default light theme)
│   └── globals.css             # PDP brand tokens
├── components/
│   ├── admin/                  # AdminTable, StatsCard, filters, …
│   ├── layout/                 # AppLayout, sidebar, navbar, auth guard
│   └── ui/                     # shadcn/ui primitives
├── features/                   # Domain modules (views, hooks, columns)
│   ├── admin/
│   ├── students|mentors|groups/
│   ├── certificates|leaderboard|monthly-scores/
│   ├── pdp-market|logs|auth/
│   └── …
├── services/                   # API clients (`endpoints.ts` + Axios)
├── types/                      # DTOs aligned with OpenAPI
├── constants/                  # routes, query-keys, nav, brand
├── store/                      # auth, UI (sidebar, theme)
└── providers/                  # Query, theme, auth rehydration
```

**Conventions**

- **Pages** are thin; logic lives in `features/*/components/*-page-view.tsx`
- **API** calls go through `src/services/*` — avoid raw `fetch` in components
- **Query keys** centralized in `src/constants/query-keys.ts`

---

## API integration notes

- Base client: `src/services/api-client.ts` (Bearer token, 401 → logout)
- OpenAPI-aligned paths in `src/services/endpoints.ts`
- **Tutor score:** backend may route `PATCH /user/monthly-score/tutor` incorrectly; the app resolves `score_id` from `GET /user/student/{id}/performance` then `PATCH /user/monthly-score/{score_id}`
- **PDP Market (admin):** product CRUD uses **localStorage** mock catalog shared with student view until a products API exists
- **Logs:** `logsService` reads mock data from `src/features/logs/data/mock-logs.ts`

Full API reference: [https://api.grant.boostify.uz/docs](https://api.grant.boostify.uz/docs)

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm format` | Prettier (src) |
| `pnpm format:check` | Prettier check |

---

## UI and branding

- PDP colors: teal `#229b91`, yellow `#ffcc19`, navy `#202d4c` (see `globals.css` / `--pdp-*`)
- Logo assets in `public/` (`logo.png`, `univerty.svg`)
- Responsive layout: desktop sidebar; mobile navigation via sheet drawer

---

## License

Private — PDP University / internal use unless otherwise specified.
