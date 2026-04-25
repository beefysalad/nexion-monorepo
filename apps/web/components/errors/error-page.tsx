import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer } from "../home/motion-presets"
import { Button } from "@workspace/ui/components/button"
import { RiArrowLeftLine, RiRefreshLine } from "@remixicon/react"
import Link from "next/link"

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={fadeUp} className="space-y-2">
          <h1 className="text-8xl font-bold tracking-tighter text-destructive/20">
            Error
          </h1>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Something went wrong
          </h2>
          <p className="mx-auto max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            An unexpected error has occurred. We apologize for the
            inconvenience.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            onClick={() => reset()}
            className="h-11 gap-2 rounded-2xl px-6"
          >
            <RiRefreshLine className="size-4" />
            Try again
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-2xl px-6">
            <Link href="/" className="flex items-center gap-2">
              <RiArrowLeftLine className="size-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {error.digest && (
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-muted-foreground"
          >
            Error Digest: {error.digest}
          </motion.p>
        )}
      </motion.div>
    </main>
  )
}

export default ErrorPage
