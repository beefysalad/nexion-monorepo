import type { GetAllUsersResponse } from "@workspace/shared"

import { apiClient } from "@/lib/axios"

async function getAllUsers(): Promise<GetAllUsersResponse> {
  const response = await apiClient.get<GetAllUsersResponse>("/users/all")

  return response.data
}

export { getAllUsers }
export type { GetAllUsersResponse }
