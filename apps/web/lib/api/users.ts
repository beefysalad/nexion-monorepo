import type {
  CurrentUserResponse,
  GetAllUsersResponse,
} from "@workspace/shared"

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
async function getAllUsers(token: string): Promise<GetAllUsersResponse> {
  const response = await apiClient.get<GetAllUsersResponse>("/users/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export { getAllUsers, syncCurrentUser }
export type { CurrentUserResponse, GetAllUsersResponse }
