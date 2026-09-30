const treeRows = [
  { path: "nexion-monorepo/" },
  { path: "├─ apps/" },
  { path: "│  ├─ web/", note: "Next.js App Router" },
  { path: "│  └─ api/", note: "NestJS + Prisma" },
  { path: "├─ packages/" },
  { path: "│  ├─ ui/", note: "shared shadcn/ui" },
  { path: "│  ├─ shared/", note: "HTTP contract types" },
  { path: "│  ├─ eslint-config/" },
  { path: "│  └─ typescript-config/" },
  { path: "├─ docker-compose.yml", note: "postgres :5433" },
  { path: "└─ turbo.json" },
]

function RepoTreePanel() {
  return (
    <div className="bg-lp-code-bg text-lp-code-fg min-w-0 flex-[1_1_420px] overflow-hidden rounded-[10px] font-mono text-[13.5px] leading-[1.75] md:max-w-[520px]">
      <div className="text-lp-code-dim flex justify-between border-b border-white/8 px-5 py-3 text-xs">
        <span>tree -L 2</span>
        <span>2 apps · 4 packages</span>
      </div>
      <div className="overflow-x-auto px-5 pt-[18px] pb-5">
        <div className="min-w-[340px]">
          <ul>
            {treeRows.map((row) => (
              <li key={row.path} className="flex justify-between gap-6">
                <span className="whitespace-pre">{row.path}</span>
                {row.note ? (
                  <span className="text-lp-code-dim">{row.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-dashed border-white/12 pt-4">
            <p>
              <span className="text-lp-accent">$</span> npm run dev:apps
            </p>
            <p>
              <span className="text-lp-code-dim">web&nbsp; ready on </span>
              localhost:3000
            </p>
            <p>
              <span className="text-lp-code-dim">api&nbsp; ready on </span>
              localhost:3001
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { RepoTreePanel }
