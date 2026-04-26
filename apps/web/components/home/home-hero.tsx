"use client"

import {
  RiCheckLine,
  RiFileCopyLine,
  RiGithubFill,
  RiTerminalBoxLine,
} from "@remixicon/react"
import { motion } from "framer-motion"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
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
    <section className="border-border bg-background relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.88_0_0)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.88_0_0)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 dark:bg-[linear-gradient(to_right,oklch(1_0_0/5%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/5%)_1px,transparent_1px)]" />

      <div className="bg-primary/10 dark:bg-primary/15 absolute -top-40 -left-40 -z-10 h-[600px] w-[600px] rounded-full blur-[100px]" />

      <div className="absolute -right-20 -bottom-20 -z-10 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[80px] dark:bg-violet-500/8" />

      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center"
        >
          <motion.div variants={staggerContainer} className="space-y-10">
            <motion.div variants={fadeUp} className="space-y-5">
              <h1 className="text-5xl font-black tracking-tight text-balance sm:text-7xl">
                Ship your <span className="text-primary">App</span>lication{" "}
                <br className="hidden sm:block" />
                without the setup friction.
              </h1>
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                A production-ready monorepo wired with Next.js, NestJS, Prisma,
                and Tailwind CSS. Clone, configure, and build.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                className="shadow-primary/20 hover:shadow-primary/25 h-12 gap-2 rounded-xl px-6 text-sm font-semibold shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
                onClick={handleCopyCommand}
              >
                {copied ? (
                  <RiCheckLine className="size-4" />
                ) : (
                  <RiFileCopyLine className="size-4" />
                )}
                {copied ? "Copied!" : "npm run dev:apps"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 rounded-xl px-6 text-sm font-semibold"
                asChild
              >
                <a
                  href="https://github.com/beefysalad/nexion-monorepo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <RiGithubFill className="size-4" />
                  GitHub
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="text-muted-foreground flex items-center gap-6 pt-2 text-xs"
            >
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Next.js 15
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                NestJS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Prisma + Postgres
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Clerk Auth
              </span>
            </motion.div>
          </motion.div>

          {/* Right — terminal */}
          <motion.div variants={scaleIn} className="hidden lg:block">
            <div className="relative">
              {/* Glow behind card */}
              <div className="bg-primary/10 dark:bg-primary/15 absolute -inset-6 rounded-3xl blur-3xl" />

              <div className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-2xl shadow-black/5 dark:shadow-black/30">
                {/* Terminal bar */}
                <div className="border-border bg-muted/50 flex items-center gap-3 border-b px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-400/70" />
                    <div className="size-3 rounded-full bg-amber-400/70" />
                    <div className="size-3 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-1.5">
                    <RiTerminalBoxLine className="text-muted-foreground/60 size-3" />
                    <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wider">
                      nexion — bash
                    </span>
                  </div>
                </div>

                {/* Terminal body */}
                <div className="space-y-5 p-7 font-mono text-sm">
                  {/* Command */}
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold select-none">
                      ❯
                    </span>
                    <span className="text-muted-foreground">npm run</span>
                    <span className="text-foreground font-semibold">
                      dev:apps
                    </span>
                  </div>

                  {/* Output lines */}
                  <div className="border-border space-y-2 border-l pl-5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-muted-foreground">web</span>
                        <span className="text-muted-foreground/50">ready</span>
                      </div>
                      <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        :3000
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-muted-foreground">api</span>
                        <span className="text-muted-foreground/50">ready</span>
                      </div>
                      <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        :3001
                      </span>
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-blue-400" />
                        <span className="text-muted-foreground">postgres</span>
                        <span className="text-muted-foreground/50">docker</span>
                      </div>
                      <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                        :5433
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="border-border bg-muted/40 space-y-2 rounded-xl border p-4">
                    <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest uppercase">
                      <span className="text-muted-foreground">Build</span>
                      <span className="text-primary animate-pulse">Live</span>
                    </div>
                    <div className="bg-border h-0.5 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="via-primary h-full w-1/2 bg-gradient-to-r from-transparent to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
