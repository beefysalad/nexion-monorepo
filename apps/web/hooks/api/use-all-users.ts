import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import type { GetAllUsersResponse } from "@workspace/shared"

import { getAllUsers } from "@/lib/api/users"

export function useAllUsers() {
  const { getToken } = useAuth()

  return useQuery<GetAllUsersResponse>({
    queryKey: ["users", "all"],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error("No token found")
      return getAllUsers(token)
    },
  })
}
