import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer } from "../home/motion-presets"
import { Button } from "@workspace/ui/components/button"
import { RiArrowLeftLine, RiRefreshLine } from "@remixicon/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
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
    <main className="bg-background flex min-h-svh flex-col items-center justify-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="space-y-3 text-left">
              <p className="text-muted-foreground text-sm">Application error</p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
                Something went wrong
              </CardTitle>
              <CardDescription className="max-w-xl text-sm leading-6">
                An unexpected error interrupted this screen. You can retry the
                request or head back to the home page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  onClick={() => reset()}
                  className="h-11 gap-2 rounded-2xl px-6"
                >
                  <RiRefreshLine className="size-4" />
                  Try again
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-2xl px-6"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <RiArrowLeftLine className="size-4" />
                    Back to Home
                  </Link>
                </Button>
              </motion.div>

              {error.digest ? (
                <motion.p
                  variants={fadeUp}
                  className="text-muted-foreground font-mono text-xs"
                >
                  Error Digest: {error.digest}
                </motion.p>
              ) : null}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  )
}

export default ErrorPage
