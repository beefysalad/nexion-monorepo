FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN npm ci

FROM deps AS api-builder
COPY . .
RUN npm run build -w api

FROM deps AS web-builder
COPY . .
RUN npm run build -w web

FROM node:22-alpine AS api
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm ci --omit=dev --workspace api --include-workspace-root=false
COPY --from=api-builder /app/apps/api/dist ./apps/api/dist
COPY --from=api-builder /app/apps/api/prisma ./apps/api/prisma
EXPOSE 3000
CMD ["npm", "run", "start:prod", "-w", "api"]

FROM node:22-alpine AS web
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN npm ci --omit=dev --workspace web --workspace @workspace/shared --workspace @workspace/ui --include-workspace-root=false
COPY --from=web-builder /app/packages ./packages
COPY --from=web-builder /app/apps/web/next.config.mjs ./apps/web/next.config.mjs
COPY --from=web-builder /app/apps/web/.next ./apps/web/.next
EXPOSE 3000
CMD ["npm", "run", "start", "-w", "web"]
