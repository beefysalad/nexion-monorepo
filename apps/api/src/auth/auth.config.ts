import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import type { PrismaClient } from "../generated/prisma/client"

const DEFAULT_PORT = 3001
const DEFAULT_WEB_ORIGIN = "http://localhost:3000"
const MIN_SECRET_LENGTH = 32

function getTrustedOrigins(): string[] {
  const origins = process.env.CORS_ORIGIN ?? DEFAULT_WEB_ORIGIN

  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
}

// Better Auth silently falls back to a publicly known secret outside of
// production, so never let it start without a real one.
function getAuthSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET

  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `BETTER_AUTH_SECRET must be set to at least ${MIN_SECRET_LENGTH} characters (generate one with: openssl rand -base64 32)`
    )
  }

  return secret
}

function createAuth(prisma: PrismaClient) {
  return betterAuth({
    appName: "Nexion",
    baseURL:
      process.env.BETTER_AUTH_URL ??
      `http://localhost:${process.env.PORT ?? DEFAULT_PORT}`,
    secret: getAuthSecret(),
    trustedOrigins: getTrustedOrigins(),
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    emailAndPassword: {
      enabled: true,
    },
    // Enabled in every environment (Better Auth only enables it in production
    // by default). Stricter limits on credential endpoints; in-memory storage.
    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 60, max: 5 },
      },
    },
    user: {
      fields: {
        image: "imageUrl",
      },
    },
  })
}

type AppAuth = ReturnType<typeof createAuth>

export { createAuth, getAuthSecret, getTrustedOrigins }
export type { AppAuth }
