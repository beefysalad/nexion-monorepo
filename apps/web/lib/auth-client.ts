import { createAuthClient } from "better-auth/react"

import { API_BASE_URL } from "@/lib/axios"

// Better Auth is hosted by the NestJS API (see apps/api/src/auth).
const authClient = createAuthClient({
  baseURL: API_BASE_URL,
})

export { authClient }
