import type { CurrentUserResponse } from "@workspace/shared"

import { apiClient } from "@/lib/axios"

async function syncCurrentUser(token: string): Promise<CurrentUserResponse> {
  const response = await apiClient.post<CurrentUserResponse>(
    "/users/me/sync",
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export { syncCurrentUser }
export type { CurrentUserResponse }
