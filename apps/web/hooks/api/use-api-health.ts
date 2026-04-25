"use client"

import { useQuery } from "@tanstack/react-query"

import { getApiHealth } from "@/lib/api/health"

const apiHealthQueryKey = ["api", "health"] as const

function useApiHealth() {
  return useQuery({
    queryKey: apiHealthQueryKey,
    queryFn: getApiHealth,
  })
}

export { apiHealthQueryKey, useApiHealth }
