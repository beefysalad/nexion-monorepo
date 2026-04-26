"use client"

import { motion } from "framer-motion"

import { Spinner } from "@workspace/ui/components/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <Spinner className="h-10 w-10 text-primary" />
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        </div>
        <p className="animate-pulse text-sm font-medium text-muted-foreground tracking-wide uppercase">
          Loading
        </p>
      </motion.div>
    </div>
  )
}
