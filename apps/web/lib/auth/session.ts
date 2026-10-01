import { cookies } from "next/headers"

import { API_BASE_URL } from "@/lib/axios"

type AuthSessionUser = {
  id: string
  email: string
  name: string
  image?: string | null
}

type AuthSession = {
  user: AuthSessionUser
}

// Reads the session from the API using the browser's cookies. Server-only.
async function getServerSession(): Promise<AuthSession | null> {
  const cookieHeader = (await cookies()).toString()

  if (!cookieHeader) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/get-session`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as AuthSession | null

    return data?.user ? data : null
  } catch {
    return null
  }
}

export { getServerSession }
export type { AuthSession, AuthSessionUser }
