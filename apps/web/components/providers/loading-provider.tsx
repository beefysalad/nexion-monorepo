"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { usePathname } from "next/navigation"

type LoadingKind = "redirect" | "render"

type LoadingState = {
  isLoading: boolean
  kind: LoadingKind | null
  label: string | null
}

type LoadingContextValue = LoadingState & {
  startLoading: (kind: LoadingKind, label?: string) => void
  stopLoading: (kind?: LoadingKind) => void
}

const defaultLabels: Record<LoadingKind, string> = {
  redirect: "Opening page",
  render: "Loading page",
}

const LoadingContext = createContext<LoadingContextValue | null>(null)

function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathnameRef = useRef(pathname)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    kind: null,
    label: null,
  })

  const clearLoadingTimeout = useCallback(() => {
    if (!timeoutRef.current) {
      return
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }, [])

  const stopLoading = useCallback(
    (kind?: LoadingKind) => {
      clearLoadingTimeout()
      setState((current) => {
        if (kind && current.kind !== kind) {
          return current
        }

        return {
          isLoading: false,
          kind: null,
          label: null,
        }
      })
    },
    [clearLoadingTimeout]
  )

  const startLoading = useCallback(
    (kind: LoadingKind, label = defaultLabels[kind]) => {
      clearLoadingTimeout()
      setState({
        isLoading: true,
        kind,
        label,
      })

      timeoutRef.current = setTimeout(() => {
        stopLoading(kind)
      }, 10_000)
    },
    [clearLoadingTimeout, stopLoading]
  )

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return
    }

    previousPathnameRef.current = pathname

    const navigationSettledTimeout = setTimeout(() => {
      stopLoading()
    }, 0)

    return () => {
      clearTimeout(navigationSettledTimeout)
    }
  }, [pathname, stopLoading])

  useEffect(() => {
    function handleNavigationClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest("a[href]")

      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      if (anchor.target && anchor.target !== "_self") {
        return
      }

      if (anchor.hasAttribute("download")) {
        return
      }

      const nextUrl = new URL(anchor.href, window.location.href)

      if (nextUrl.origin !== window.location.origin) {
        return
      }

      if (
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search
      ) {
        return
      }

      startLoading("redirect", "Opening page")
    }

    document.addEventListener("click", handleNavigationClick, true)

    return () => {
      document.removeEventListener("click", handleNavigationClick, true)
    }
  }, [startLoading])

  useEffect(() => clearLoadingTimeout, [clearLoadingTimeout])

  const value = useMemo<LoadingContextValue>(
    () => ({
      ...state,
      startLoading,
      stopLoading,
    }),
    [startLoading, state, stopLoading]
  )

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}

function useLoading() {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider")
  }

  return context
}

export { LoadingProvider, useLoading }
export type { LoadingKind }
