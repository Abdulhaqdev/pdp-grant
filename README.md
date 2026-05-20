# Grant LMS — Frontend Starter

Modern learning management system frontend built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Data:** TanStack Query + Axios
- **State:** Zustand
- **Forms:** React Hook Form + Zod

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login

| Email | Role |
|-------|------|
| `admin@lms.com` | Admin dashboard |
| `student@lms.com` | Student dashboard |
| `mentor@lms.com` | Mentor dashboard |

Password: any value with 6+ characters (e.g. `password`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript check |

## Project structure

```
src/
├── app/              # Routes (auth, dashboard, api)
├── components/       # UI, layout, shared, tables
├── features/         # Domain modules (auth, students, …)
├── services/         # API client & endpoints
├── store/            # Zustand stores
├── providers/        # React context providers
├── hooks/
├── types/
├── schemas/
├── constants/
├── utils/
└── lib/
```

## Environment variables

See `.env.example` for required `NEXT_PUBLIC_*` variables.
