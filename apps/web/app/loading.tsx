"use client"

import { motion } from "framer-motion"

import { Spinner } from "@workspace/ui/components/spinner"

export default function Loading() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <Spinner className="text-primary h-10 w-10" />
          <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full" />
        </div>
        <p className="text-muted-foreground animate-pulse text-sm font-medium tracking-wide uppercase">
          Loading
        </p>
      </motion.div>
    </div>
  )
}
