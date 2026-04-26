# Nexion Monorepo

Nexion is an npm-workspaces monorepo with a Next.js frontend, a NestJS backend, and shared shadcn/ui workspace packages.

## Workspace Layout

```text
apps/
  web/                 # Next.js app router frontend
  api/                 # NestJS backend
packages/
  ui/                  # Shared shadcn/ui components, hooks, styles, and utilities
  eslint-config/       # Shared ESLint configs
  typescript-config/   # Shared TypeScript configs
```

## Tech Stack

- Monorepo: npm workspaces + Turborepo
- Frontend: Next.js, React, Tailwind CSS, shadcn/ui
- Backend: NestJS
- Shared UI: `@workspace/ui`
- Package manager: npm
- Runtime: Node.js 20+

## Getting Started

Install dependencies from the repository root:

```bash
npm install
```

Run all apps in development mode:

```bash
npm run dev
```

Run a specific workspace:

```bash
npm run dev -w web
npm run dev -w api
```

Default local URLs:

- Web: http://localhost:3000
- API: http://localhost:3001 when run through Docker Compose, or the Nest default port when run directly unless configured otherwise

## Environment Variables

Example env files are committed for each runtime:

```text
.env.example             # Docker Compose/root-level defaults
apps/web/.env.example    # Next.js frontend variables
apps/api/.env.example    # NestJS API and Prisma variables
```

For local development, copy the examples you need:

```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Do not commit real `.env` files. They are ignored by Git.

Important variables:

- `NEXT_PUBLIC_API_URL`: browser-facing API URL used by the frontend.
- `PORT`: internal port used by the NestJS API.
- `DATABASE_URL`: Prisma database connection string.
- `CORS_ORIGIN`: comma-separated browser origins allowed by the API.
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`: Docker Postgres settings.

## Common Commands

```bash
npm run build
npm run lint
npm run typecheck
npm run format
```

Workspace-specific examples:

```bash
npm run build -w web
npm run build -w api
npm run test -w api
```

Prisma commands:

```bash
npm run db:generate
npm run db:migrate:deploy
```

`npm run build -w api` automatically runs `prisma generate` before compiling NestJS. Production database migrations should still be run intentionally with `npm run db:migrate:deploy` against the target database.

## Installing Packages

Always install from the monorepo root.

Frontend-only dependency:

```bash
npm install <package> -w web
```

Backend-only dependency:

```bash
npm install <package> -w api
```

Shared UI dependency:

```bash
npm install <package> -w @workspace/ui
```

Root dev tooling:

```bash
npm install -D <package>
```

## Shared UI

Shared UI components live in `packages/ui` and are imported through `@workspace/ui`.

Example:

```tsx
import { Button } from "@workspace/ui/components/button";
```

Add shadcn components from the repository root using the configured workspace paths.

```bash
npx shadcn@latest add button -c apps/web
```

## Docker

Run the full local stack with Docker Compose:

```bash
docker compose up --build
```

The apps will be available at:

- Web: http://localhost:3000
- API: http://localhost:3001
- Postgres: localhost:5433

Build production images separately:

```bash
docker build --target web -t nexion-web .
docker build --target api -t nexion-api .
```

The Docker API container connects to Postgres with the internal hostname `postgres`.

When running backend commands from your host machine, use the localhost URL in `apps/api/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/nexion_monorepo?schema=public"
```

When running inside Docker Compose, the API uses:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/nexion_monorepo?schema=public"
```

Apply local Docker migrations intentionally with:

```bash
docker compose run --rm api npm run db:migrate:deploy -w api
```

To remove the local Docker database volume and start fresh:

```bash
docker compose down -v
```

## Deployment Notes

Vercel should treat `apps/web` and `apps/api` as separate projects if both are deployed there.

Frontend project:

- Root Directory: `apps/web`
- Build Command: `npm run build -w web`
- Install Command: `npm install`

Backend project:

- Root Directory: `apps/api`
- Build Command: `npm run vercel-build`
- Install Command: `npm install`

If the backend Vercel project uses the monorepo root as its root directory, use this Build Command instead:

```bash
npm run vercel-build:api
```

The API deploy build runs `prisma generate`, `prisma migrate deploy`, and then `nest build`.
`DATABASE_URL` must point at the deployed database in the deployment environment.

Docker is for local development or Docker-capable hosts. Vercel does not deploy Docker images directly.
