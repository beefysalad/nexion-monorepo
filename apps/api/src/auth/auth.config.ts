import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import type { PrismaClient } from "../generated/prisma/client"

const DEFAULT_PORT = 3001
const DEFAULT_WEB_ORIGIN = "http://localhost:3000"

function getTrustedOrigins(): string[] {
  const origins = process.env.CORS_ORIGIN ?? DEFAULT_WEB_ORIGIN

  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function createAuth(prisma: PrismaClient) {
  return betterAuth({
    appName: "Nexion",
    baseURL:
      process.env.BETTER_AUTH_URL ??
      `http://localhost:${process.env.PORT ?? DEFAULT_PORT}`,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: getTrustedOrigins(),
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    emailAndPassword: {
      enabled: true,
    },
    user: {
      fields: {
        image: "imageUrl",
      },
    },
  })
}

type AppAuth = ReturnType<typeof createAuth>

export { createAuth, getTrustedOrigins }
export type { AppAuth }
