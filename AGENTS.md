# AI Implementation Guide

This file is the root instruction file for AI agents working in this repository.

When making changes, follow these rules unless the user explicitly asks for a different approach.

## Repository Context

This is an npm-workspaces monorepo using Turborepo.

Primary workspaces:

- `apps/web`: Next.js app router frontend.
- `apps/api`: NestJS backend.
- `packages/shared`: shared frontend/backend TypeScript contracts.
- `packages/ui`: shared shadcn/ui components, hooks, styles, and UI utilities.
- `packages/eslint-config`: shared ESLint configuration.
- `packages/typescript-config`: shared TypeScript configuration.

Use npm from the repository root. Do not create nested lockfiles.

## Environment Variables

- Keep committed env templates in `.env.example`, `apps/web/.env.example`, and `apps/api/.env.example`.
- Never commit real secrets or real `.env` files.
- Use `apps/web/.env.local` for local Next.js frontend variables.
- Use `apps/api/.env` for local NestJS API and Prisma variables.
- Use root `.env` only for Docker Compose/root-level overrides.
- Frontend variables exposed to browser code must be prefixed with `NEXT_PUBLIC_`.
- Backend secrets must never be exposed through `NEXT_PUBLIC_` variables.
- Update the relevant `.env.example` whenever adding a new required env var.
- For Docker Compose, the API connects to Postgres through the `postgres` hostname.
- For host-run backend commands, the API should use `localhost` in `DATABASE_URL`.

## Core Principles

- Keep implementations modular and easy to extend.
- Prefer existing project patterns over inventing new ones.
- Reuse components, helpers, services, repositories, and hooks whenever practical.
- Keep files focused. If a file starts growing too much, split it.
- Avoid `any`. Prefer explicit, narrow TypeScript types.
- Keep workspace boundaries clear: app code belongs in `apps/*`; reusable UI and utilities belong in `packages/*` when they are genuinely shared.
- Do not run destructive Git commands unless the user explicitly asks.

## Dependency Rules

- Do not run `npm install` unless the user explicitly asks you to install dependencies.
- When dependencies are needed, tell the user the exact root-level command to run.
- Install frontend-only packages with `npm install <package> -w web`.
- Install backend-only packages with `npm install <package> -w api`.
- Install shared contract packages with `npm install <package> -w @workspace/shared` only when the package is truly needed by shared contracts.
- Install shared UI packages with `npm install <package> -w @workspace/ui`.
- Install root tooling from the monorepo root with `npm install -D <package>`.
- Do not create `package-lock.json` files inside `apps/web`, `apps/api`, or `packages/*`.

## Frontend Rules

### App Structure

- Keep route files in `apps/web/app/**/page.tsx` minimal.
- A page file should usually import and render a feature component.
- Prefer feature-oriented folders under `apps/web/components/` for app-specific views.
- Keep shared reusable UI in `packages/ui/src/components/`.
- Do not put large feature implementations directly in route files.

### Components

- Do not let page components or feature components become overly large.
- If a feature view contains multiple sections, move sections into separate files.
- Move helpers, constants, and view-specific utilities into separate files when they start cluttering the main component.
- Prefer reusable components when the same UI or behavior appears more than once.
- Use shared `@workspace/ui` components before creating app-local UI primitives.
- When making frontend UI changes or features, always consider both light and dark mode. Check contrast, surfaces, borders, muted text, hover states, and shadows in both themes before considering the work done.

### shadcn/ui

- Shared shadcn/ui components live in `packages/ui/src/components/` and are exported through `@workspace/ui`.
- Prefer existing shadcn/ui components over native HTML controls when an equivalent exists.
- Example: use the shared `Button` component instead of a plain `<button>` for application actions.
- If a needed shadcn component does not exist yet, ask the user before adding or installing it.
- Avoid using the Sparkles icon unless the user explicitly wants it or it is truly necessary for the design.

### Forms

- Use React Hook Form for forms.
- Use Zod for validation.
- Place frontend validation schemas in `apps/web/lib/validations/` unless a schema is shared across apps.
- Put shared schemas in a dedicated package only when they are truly reused by multiple workspaces.
- Do not build forms with ad hoc local state when React Hook Form is appropriate.

### Data Fetching

- Use a shared Axios client from `apps/web/lib/axios.ts` when HTTP calls are needed.
- Do not create one-off fetch utilities if Axios is the project standard.
- For client-side server state, use TanStack Query.
- Put TanStack Query logic in hook files under `apps/web/hooks/`.
- For feature-specific hooks, prefer feature folders when useful, such as `apps/web/hooks/dashboard/use-dashboard-data.ts`.
- Keep API wrapper functions in `apps/web/lib/api/`.
- Any component that renders TanStack Query data must explicitly handle the loading state using `isPending` or `isLoading`.
- Prefer rendering clear loading, error, and empty/data states instead of assuming query data is immediately available.

### Frontend Folder Organization

Prefer this shape as the frontend grows:

```text
apps/web/app/                  # Routes only; keep page files thin
apps/web/components/           # App-specific feature components
apps/web/hooks/                # Client hooks and TanStack Query hooks
apps/web/lib/api/              # Axios-backed API wrappers
apps/web/lib/validations/      # Zod schemas
apps/web/lib/services/         # Frontend-only business/view services if needed
packages/ui/src/components/    # Shared shadcn/ui components
packages/ui/src/hooks/         # Shared UI hooks
packages/ui/src/lib/           # Shared UI utilities
```

Do not leave unrelated helpers, large inline types, or subcomponents buried in a page file unless they are truly tiny.

## Backend Rules

### NestJS Architecture

- Follow NestJS module boundaries.
- Keep controllers thin. Controllers should validate/route requests and delegate business work to services.
- Business logic belongs in injectable services.
- Data access belongs in repository/provider classes.
- Prefer feature modules as the backend grows, for example `users`, `auth`, or `organizations`.
- Avoid putting unrelated backend features into `app.service.ts` once real features exist.

### Backend Folder Organization

Prefer this shape inside `apps/api/src/` as features are added:

```text
apps/api/src/main.ts
apps/api/src/app.module.ts
apps/api/src/common/              # Shared guards, filters, pipes, interceptors, decorators
apps/api/src/config/              # Configuration modules and helpers
apps/api/src/<feature>/
  <feature>.module.ts
  <feature>.controller.ts
  <feature>.service.ts
  <feature>.repository.ts
  dto/
  entities/ or models/
```

If Prisma or another ORM is introduced later:

- Keep database calls in repositories, not controllers.
- Keep business decisions in services, not repositories.
- Do not run migrations or client generation unless the user explicitly asks.
- If migrations are needed, tell the user the exact command and explain why.

### Backend Typing

- Avoid `any`.
- Use explicit DTOs for request shapes.
- Use explicit return types where helpful, especially across controller, service, and repository boundaries.
- Keep data shapes clear between repositories, services, and controllers.

## API Boundary

- Put request/response contracts that are used by both frontend and backend in `packages/shared` and import them from `@workspace/shared`.
- Keep `packages/shared` focused on types and contract-level schemas only. Do not put app code, NestJS services, React components, browser-only code, or server-only code there.
- Prefer type-only imports from `@workspace/shared` in app code, for example `import type { ApiHealthResponse } from "@workspace/shared"`.
- Do not duplicate API response types separately in `apps/web` and `apps/api` when they describe the same HTTP contract.
- Prefer typed DTOs and explicit response shapes on the backend.
- Prefer frontend API wrappers in `apps/web/lib/api/` instead of calling Axios directly throughout components.
- Prefer TanStack Query hooks over manual loading/error state in components for server state.
- Keep environment-dependent URLs in environment variables, such as `NEXT_PUBLIC_API_URL` for the frontend.

## Docker Rules

- Docker files live at the repository root.
- `docker-compose.yml` is intended for local development.
- Docker Compose includes `postgres`, `api`, and `web` services.
- The root `Dockerfile` contains separate targets for `web` and `api`.
- Do not assume Docker is the Vercel deployment path. Vercel builds from source and does not deploy these Docker images directly.
- Do not remove the `postgres_data` volume unless the user explicitly wants to reset local database data.

## Expected Workflow For AI Changes

When implementing a frontend feature:

- Keep the route entry minimal.
- Create or reuse feature components under `apps/web/components/`.
- Use shared shadcn/ui primitives from `@workspace/ui`.
- Use React Hook Form and Zod for forms.
- Use Axios through `apps/web/lib/axios.ts`.
- Use TanStack Query through dedicated hooks in `apps/web/hooks/`.
- Render an explicit loading state from TanStack Query's `isPending` or `isLoading` before rendering query data.
- Put frontend API wrappers in `apps/web/lib/api/`.
- Split large files before they become difficult to maintain.

When implementing a backend feature:

- Create or reuse a NestJS feature module.
- Keep controllers thin.
- Put business logic in services.
- Put database or persistence access in repositories/providers.
- Use DTOs for input shapes.
- Add tests when behavior is non-trivial.

## Verification

Prefer running the narrowest relevant checks first:

```bash
npm run typecheck -w web
npm run build -w web
npm run build -w api
npm run test -w api
```

For full-repo checks:

```bash
npm run lint
npm run typecheck
npm run build
```

If a command cannot be run because dependencies are missing, network access is blocked, or credentials are unavailable, state that clearly and provide the command the user should run.

## Notes

These rules are meant to keep the codebase consistent and maintainable. If a request conflicts with these conventions, follow the user's explicit instruction.
