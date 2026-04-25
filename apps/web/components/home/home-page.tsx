"use client"

import { ApiHealthCard } from "@/components/home/api-health-card"
import { ContributorsSection } from "@/components/home/contributors-section"
import { HomeHero } from "@/components/home/home-hero"
import { SetupSteps } from "@/components/home/setup-steps"
import { StackSection } from "@/components/home/stack-section"
import { WhyThisExists } from "@/components/home/why-this-exists"
import { useApiHealth } from "@/hooks/api/use-api-health"
import { API_BASE_URL } from "@/lib/axios"

function HomePage() {
  const apiHealth = useApiHealth()

  return (
    <main className="min-h-svh bg-background text-foreground">
      <HomeHero />

      <section className="border-b border-border bg-background px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <ApiHealthCard
            apiUrl={API_BASE_URL}
            isLoading={apiHealth.isPending}
            isError={apiHealth.isError}
            message={apiHealth.data}
            onRefresh={() => void apiHealth.refetch()}
          />
        </div>
      </section>

      <StackSection />
      <SetupSteps />
      <WhyThisExists />
      <ContributorsSection />
    </main>
  )
}

export { HomePage }
