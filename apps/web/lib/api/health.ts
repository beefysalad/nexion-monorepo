import type { ApiHealthResponse } from "@workspace/shared"

import { apiClient } from "@/lib/axios"

async function getApiHealth(): Promise<ApiHealthResponse> {
  const response = await apiClient.get<ApiHealthResponse>("/")

  return response.data
}

export { getApiHealth }
export type { ApiHealthResponse }
