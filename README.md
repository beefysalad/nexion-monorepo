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

Build production images separately:

```bash
docker build --target web -t nexion-web .
docker build --target api -t nexion-api .
```

## Deployment Notes

Vercel should treat `apps/web` and `apps/api` as separate projects if both are deployed there.

Frontend project:

- Root Directory: `apps/web`
- Build Command: `npm run build -w web`
- Install Command: `npm install`

Backend project:

- Root Directory: `apps/api`
- Build Command: `npm run build -w api`
- Install Command: `npm install`

Docker is for local development or Docker-capable hosts. Vercel does not deploy Docker images directly.
