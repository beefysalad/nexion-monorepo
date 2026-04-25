# API Deployment

The API must run Prisma production migrations before each deployment starts serving traffic.

## Vercel

If the Vercel project root is the monorepo root, use this Build Command:

```bash
npm run vercel-build:api
```

If the Vercel project root is `apps/api`, use this Build Command:

```bash
npm run vercel-build
```

Both commands run:

```bash
prisma generate && prisma migrate deploy && nest build
```

`DATABASE_URL` must be set in the deployment environment and must point at the deployed database.

## Docker

The production API image starts with:

```bash
npm run start:migrate:prod -w api
```

That command applies pending migrations and then starts the Nest server.
