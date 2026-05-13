# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Authoritative Conventions

`AGENTS.md` at the repo root is the primary instruction file for AI agents and contains the full set of repository, frontend, backend, and dependency rules. Read it before non-trivial changes. The notes below summarize what is most useful in day-to-day work and do not replace it.

## Repository Shape

npm-workspaces monorepo (Node 20+) driven by Turborepo:

- `apps/web` — Next.js App Router frontend. Routes under `app/`, feature components under `components/`, TanStack Query hooks under `hooks/`, Axios wrappers under `lib/api/`, Zod schemas under `lib/validations/`. Protected routes live under `app/(protected)/**`.
- `apps/api` — NestJS backend. Feature modules under `src/<feature>/` (e.g. `users`, `inventory`, `webhooks`). Prisma client is generated into `src/generated/`. Uses `@clerk/backend` for auth and Postgres via `@prisma/adapter-pg`.
- `packages/shared` — shared HTTP contract types imported as `@workspace/shared` (type-only consumption preferred). Do not put runtime app code here.
- `packages/ui` — shared shadcn/ui components imported as `@workspace/ui` (e.g. `@workspace/ui/components/button`). New shadcn components are added with `npx shadcn@latest add <name> -c apps/web`.
- `packages/eslint-config`, `packages/typescript-config` — shared tool configs.

Workspace boundaries matter: app code stays in `apps/*`; only genuinely shared UI/contracts move into `packages/*`. Never create nested lockfiles — install from the root.

## Common Commands

Run from the repo root unless noted.

```bash
# Dev
npm run dev                 # turbo dev across all workspaces
npm run dev -w web          # frontend only
npm run dev -w api          # backend only (runs `prisma generate` first)

# Verification (prefer narrowest first)
npm run typecheck -w web
npm run build -w web
npm run build -w api        # runs `prisma generate` then `nest build`
npm run test -w api         # Jest; tests are `*.spec.ts` under apps/api/src
npm run test -w api -- <pattern>   # run a single test file/name

# Full-repo
npm run lint
npm run typecheck
npm run build
npm run format              # turbo format
npm run prettier            # repo-wide prettier write

# Prisma (api workspace)
npm run db:generate
npm run db:migrate:deploy   # do not run unless the user asks
npm run db:seed
```

Do not run `npm install` or Prisma migrations unless the user explicitly asks — instead, tell them the exact command.

Installing deps: `npm install <pkg> -w web | -w api | -w @workspace/ui | -w @workspace/shared`; root tooling with `npm install -D <pkg>` at the root.

## Environment Variables

Templates are committed in `.env.example`, `apps/web/.env.example`, `apps/api/.env.example`. Local files: `apps/web/.env.local`, `apps/api/.env`, and root `.env` for Docker Compose. Browser-exposed vars must be `NEXT_PUBLIC_`-prefixed; backend secrets must never be. Update the matching `.env.example` whenever a new required var is added.

`DATABASE_URL` differs by host:
- Host-run API → `localhost:5433` (Docker Postgres is published on 5433).
- Inside Docker Compose → hostname `postgres:5432`.

## Frontend Patterns (enforced)

- Forms: React Hook Form + Zod (`apps/web/lib/validations/`).
- HTTP: shared Axios client at `apps/web/lib/axios.ts`; wrappers in `apps/web/lib/api/`.
- Server state: TanStack Query hooks in `apps/web/hooks/`; components rendering query data must handle `isPending`/`isLoading` explicitly.
- UI primitives: prefer `@workspace/ui` shadcn components over native HTML. Don't add a new shadcn component without asking.
- Always design for both light and dark mode; prefer shared theme tokens over ad hoc tinted utilities (`bg-muted/30`, `bg-green-50`, etc.).
- Protected pages share an intro pattern: muted eyebrow, `font-heading` title with `text-3xl font-semibold tracking-normal md:text-4xl`, optional muted description.

## Backend Patterns (enforced)

- Thin controllers → injectable services → repository/provider classes for data access. Don't pile features into `app.service.ts`.
- DTOs for all request shapes; avoid `any`; explicit return types across controller/service/repository boundaries.
- Prisma calls belong in repositories, business decisions in services.

## API Boundary

HTTP request/response types shared by web and api live in `packages/shared` and are imported type-only as `@workspace/shared`. Do not duplicate the same contract types in both apps.

## Docker

`docker compose up --build` brings up `postgres` (host port 5433), `api` (3001), and `web` (3000). The `Dockerfile` has separate `web` and `api` targets. Vercel deploys from source, not these images. Don't remove the `postgres_data` volume unless the user is resetting local DB state.
