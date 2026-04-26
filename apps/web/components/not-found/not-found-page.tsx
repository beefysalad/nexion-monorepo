"use client"

import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"
import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"
import { fadeUp, staggerContainer } from "@/components/home/motion-presets"

const NotFoundPage = () => {
  return (
    <main className="bg-background flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={fadeUp} className="space-y-2">
          <h1 className="text-muted-foreground/20 text-8xl font-bold tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-base leading-7 sm:text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Button asChild variant="outline" className="h-11 rounded-2xl px-6">
            <Link href="/" className="flex items-center gap-2">
              <RiArrowLeftLine className="size-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}

export default NotFoundPage
