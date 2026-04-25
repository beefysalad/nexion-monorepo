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
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-20 sm:py-32">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] [background-size:20px_20px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      <div className="absolute top-0 -left-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <motion.div variants={staggerContainer} className="space-y-10">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase shadow-sm"
          >
            <RiCodeSSlashLine className="size-4" />
            V1.0 is now live
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-balance sm:text-7xl">
              Build your next <br />
              <span className="text-primary">SaaS faster.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A solid, production-ready starting point for full-stack apps.
              Wired with Next.js, NestJS, Prisma, and Tailwind CSS.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="h-14 rounded-2xl px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleCopyCommand}
            >
              {copied ? (
                <RiCheckLine className="size-5" />
              ) : (
                <RiFileCopyLine className="size-5" />
              )}
              {copied ? "Copied" : "Copy dev command"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-2xl px-8 text-base transition-all hover:bg-muted"
              asChild
            >
              <a
                href="https://github.com/beefysalad/nexion-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill className="size-5" />
                View Repository
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-2xl lg:rotate-2"
        >
          <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent blur-sm" />
          <div className="relative rounded-[2rem] border border-border bg-background/80 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between border-b border-border pb-5">
              <div className="flex gap-2">
                <span className="size-3 rounded-full bg-red-400 shadow-sm shadow-red-400/50" />
                <span className="size-3 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50" />
                <span className="size-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              </div>
              <span className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">
                system.terminal
              </span>
            </div>
            <div className="space-y-4 font-mono text-sm leading-relaxed">
              <div className="flex gap-3">
                <span className="font-bold text-primary select-none">➜</span>
                <p>
                  <span className="text-muted-foreground">npm run</span>{" "}
                  dev:apps
                </p>
              </div>
              <div className="space-y-2 pl-7 text-xs text-muted-foreground/80">
                <p className="flex items-center gap-2">
                  <span className="size-1 animate-pulse rounded-full bg-emerald-400" />
                  web ready on localhost:3000
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-1 animate-pulse rounded-full bg-emerald-400" />
                  api ready on localhost:3001
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-blue-400" />
                  postgres exposed on localhost:5433
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
