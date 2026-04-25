"use client"

import {
  RiCheckLine,
  RiCodeSSlashLine,
  RiFileCopyLine,
  RiGithubFill,
} from "@remixicon/react"
import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"
import { useState } from "react"
import {
  fadeUp,
  scaleIn,
  staggerContainer,
} from "@/components/home/motion-presets"

export function HomeHero() {
  const [copied, setCopied] = useState<boolean>(false)

  async function handleCopyCommand() {
    await navigator.clipboard.writeText("npm run dev:apps")
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section className="border-b border-border bg-background px-6 py-16 sm:py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <motion.div variants={staggerContainer} className="space-y-8">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <RiCodeSSlashLine className="size-4" />
            Next.js + NestJS monorepo boilerplate
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              A boringly solid starting point for full-stack apps.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Web, API, Postgres, Docker, shared UI, Axios, TanStack Query,
              React Hook Form, and Zod are set up with clear monorepo
              boundaries.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" onClick={handleCopyCommand}>
              {copied ? <RiCheckLine /> : <RiFileCopyLine />}
              {copied ? "Copied" : "Copy dev command"}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/beefysalad/nexion-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill />
                Repository
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="rounded-3xl border border-border bg-card p-3 shadow-sm"
        >
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                terminal
              </span>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <p>
                <span className="text-muted-foreground">$</span> npm run
                dev:apps
              </p>
              <p className="text-muted-foreground">
                web ready on localhost:3000
              </p>
              <p className="text-muted-foreground">
                api ready on localhost:3001
              </p>
              <p className="text-muted-foreground">
                postgres exposed on localhost:5433
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
