function HomeFooter() {
  return (
    <footer className="text-lp-muted mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 px-6 pt-8 pb-12 font-mono text-[13px]">
      <span>Nexion · MIT</span>
      <a
        href="https://github.com/beefysalad/nexion-monorepo"
        target="_blank"
        rel="noreferrer"
        className="decoration-lp-rule hover:text-lp-ink hover:decoration-lp-ink underline underline-offset-4"
      >
        github.com/beefysalad/nexion-monorepo
      </a>
    </footer>
  )
}

export { HomeFooter }
