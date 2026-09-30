import { useQuery } from "@tanstack/react-query"
import type { GetAllUsersResponse } from "@workspace/shared"

import { getAllUsers } from "@/lib/api/users"

export function useAllUsers() {
  return useQuery<GetAllUsersResponse>({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
  })
}
