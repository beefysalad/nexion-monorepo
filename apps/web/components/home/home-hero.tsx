import { RiGithubFill } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"

import { CopyCommandButton } from "@/components/home/copy-command-button"
import { RepoTreePanel } from "@/components/home/repo-tree-panel"

const GITHUB_URL = "https://github.com/beefysalad/nexion-monorepo"

function HomeHero() {
  return (
    <section className="border-lp-rule border-b">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end gap-16 px-6 pt-[88px] pb-24">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-9">
          <p className="text-lp-muted font-mono text-[13px] font-medium">
            nexion-monorepo · open-source starter
          </p>
          <h1 className="text-[clamp(46px,7.2vw,92px)] leading-[0.95] font-semibold tracking-[-0.045em]">
            A monorepo that&apos;s{" "}
            <mark className="bg-lp-accent text-lp-on-accent box-decoration-clone px-[0.08em]">
              already set up
            </mark>
            .
          </h1>
          <p className="text-lp-muted max-w-[520px] text-[19px] leading-normal">
            Next.js, NestJS, Prisma and Postgres, wired together with shared UI
            and typed API contracts. Clone it, point it at a database, and start
            on the part that&apos;s actually yours.
          </p>
          <div className="flex flex-wrap gap-3">
            <CopyCommandButton />
            <Button
              asChild
              variant="outline"
              className="border-lp-rule text-lp-ink hover:border-lp-ink h-12 gap-2 rounded-lg bg-transparent px-[18px] text-[15px] font-medium shadow-none hover:bg-transparent hover:shadow-none dark:bg-transparent dark:hover:bg-transparent"
            >
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                <RiGithubFill className="size-[18px]" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
        <RepoTreePanel />
      </div>
    </section>
  )
}

export { GITHUB_URL, HomeHero }
