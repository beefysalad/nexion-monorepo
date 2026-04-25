import { apiClient } from "@/lib/axios"

type HealthResponse = string

async function getApiHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<HealthResponse>("/")

  return response.data
}

export { getApiHealth }
export type { HealthResponse }
