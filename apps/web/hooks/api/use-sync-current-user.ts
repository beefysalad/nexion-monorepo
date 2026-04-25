"use client"

import { useEffect, useRef } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"

import { syncCurrentUser } from "@/lib/api/users"

function useSyncCurrentUser() {
  const { getToken, isSignedIn } = useAuth()
  const { user } = useUser()
  const lastSyncedUserIdRef = useRef<string | null>(null)

  const syncMutation = useMutation({
    mutationFn: syncCurrentUser,
  })
  const { mutate } = syncMutation

  useEffect(() => {
    if (!isSignedIn || !user?.id) {
      lastSyncedUserIdRef.current = null
      return
    }

    if (lastSyncedUserIdRef.current === user.id) {
      return
    }

    const userId = user.id
    let isActive = true

    async function syncUser() {
      const token = await getToken()

      if (!token || !isActive) {
        return
      }

      lastSyncedUserIdRef.current = userId
      mutate(token, {
        onError: () => {
          lastSyncedUserIdRef.current = null
        },
      })
    }

    void syncUser()

    return () => {
      isActive = false
    }
  }, [getToken, isSignedIn, mutate, user?.id])

  return syncMutation
}

export { useSyncCurrentUser }
