"use client"

import {
  RiBookOpenLine,
  RiCheckLine,
  RiCodeSSlashLine,
  RiFileCopyLine,
  RiGithubFill,
  RiLoader4Line,
  RiTerminalLine,
} from "@remixicon/react"
import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"
import { useState } from "react"
import { useLoading } from "@/components/providers/loading-provider"
import {
  fadeUp,
  scaleIn,
  staggerContainer,
} from "@/components/home/motion-presets"

export function HomeHero() {
  const [copied, setCopied] = useState<boolean>(false)
  const { startLoading, stopLoading } = useLoading()

  async function handleCopyCommand() {
    await navigator.clipboard.writeText("npm run dev:apps")
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  function handlePreviewLoading() {
    startLoading("render", "Preview loading")
    window.setTimeout(() => stopLoading("render"), 1800)
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 sm:py-40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <motion.div variants={staggerContainer} className="space-y-12">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-bold tracking-wider text-primary uppercase"
          >
            <RiCodeSSlashLine className="size-4" />
            V1.0 is now live
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <h1 className="max-w-3xl text-6xl font-black tracking-tight text-balance sm:text-8xl">
              Build your next <br />
              <span className="text-primary">SaaS faster.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A premium, production-ready starting point for full-stack apps.
              Wired with Next.js, NestJS, Prisma, and Tailwind CSS.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="h-14 rounded-2xl px-8 text-base font-bold shadow-sm transition-all active:scale-[0.98]"
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
              className="h-14 rounded-2xl px-8 text-base transition-all hover:border-primary/50 hover:bg-muted"
              asChild
            >
              <a
                href="https://github.com/beefysalad/nexion-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill className="size-5" />
                Repository
              </a>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="h-14 rounded-2xl px-6 text-base text-muted-foreground transition-all hover:text-foreground"
              asChild
            >
              <a href="#" className="flex items-center gap-2">
                <RiBookOpenLine className="size-5" />
                Docs
              </a>
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="h-9 rounded-xl px-4 text-xs font-medium opacity-80 hover:opacity-100"
              onClick={handlePreviewLoading}
            >
              <RiLoader4Line className="animate-spin-slow mr-2 size-3.5" />
              Preview loading state
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={scaleIn} className="relative">
          <div className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-xl shadow-foreground/10 lg:rotate-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/90 p-0 shadow-sm">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-red-500" />
                  <div className="size-3 rounded-full bg-yellow-500" />
                  <div className="size-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1">
                  <RiTerminalLine className="size-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase">
                    nexion-bash
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono text-sm leading-relaxed">
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <span className="font-bold text-primary select-none">
                      ➜
                    </span>
                    <p className="flex items-center gap-2">
                    <span className="text-muted-foreground">nexion</span>
                      <span className="text-foreground">dev:apps</span>
                    </p>
                  </div>

                  <div className="space-y-3 border-l-2 border-primary/20 pl-6">
                    <div className="group flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-xs text-muted-foreground">
                          web-app
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400/80">
                        3000
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-xs text-muted-foreground">
                          rest-api
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400/80">
                        3001
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-1.5 rounded-full bg-blue-400" />
                        <span className="text-xs text-muted-foreground">
                          postgres
                        </span>
                      </div>
                      <span className="rounded-full bg-blue-400/10 px-2 py-0.5 text-[10px] font-bold text-blue-400/80">
                        5433
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-bold tracking-tighter text-primary uppercase">
                      <span>Build Stats</span>
                      <span className="animate-pulse">Active</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
