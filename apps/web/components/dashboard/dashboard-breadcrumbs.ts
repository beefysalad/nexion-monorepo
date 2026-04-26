import { dashboardNavItems } from "@/components/dashboard/dashboard-data"

type DashboardBreadcrumbSegment = {
  href: string
  label: string
}

type DashboardBreadcrumbResolverInput = {
  pathname: string
  href: string
  segment: string
  previousSegment?: string
}

type DashboardBreadcrumbResolver = (
  input: DashboardBreadcrumbResolverInput
) => string | null

const staticSegmentLabels: Record<string, string> = {
  dashboard: "Overview",
  "error-preview": "Error Preview",
  "not-found-preview": "Not Found Preview",
}

const breadcrumbResolvers: DashboardBreadcrumbResolver[] = [
  ({ href }) => {
    const navItem = dashboardNavItems.find((item) => item.href === href)
    return navItem?.label ?? null
  },
  ({ segment, previousSegment }) => {
    if (segment !== "new" && segment !== "edit") {
      return null
    }

    return segment === "new" ? "New" : "Edit"
  },
  ({ segment }) => staticSegmentLabels[segment] ?? null,
  ({ segment }) => formatRouteSegment(segment),
]

function getDashboardBreadcrumbSegments(
  pathname: string
): DashboardBreadcrumbSegment[] {
  const routeSegments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !isOpaqueRouteSegment(segment))

  const breadcrumbs: DashboardBreadcrumbSegment[] = []

  routeSegments.forEach((segment, index) => {
    const href = `/${routeSegments.slice(0, index + 1).join("/")}`
    const previousSegment = findPreviousContextSegment(routeSegments, index)
    const label = resolveDashboardBreadcrumbLabel({
      pathname,
      href,
      segment,
      previousSegment,
    })

    breadcrumbs.push({
      href,
      label,
    })
  })

  return breadcrumbs
}

function resolveDashboardBreadcrumbLabel(
  input: DashboardBreadcrumbResolverInput
): string {
  for (const resolver of breadcrumbResolvers) {
    const label = resolver(input)

    if (label) {
      return label
    }
  }

  return formatRouteSegment(input.segment)
}

function findPreviousContextSegment(
  routeSegments: string[],
  currentIndex: number
): string | undefined {
  for (let index = currentIndex - 1; index >= 0; index -= 1) {
    const segment = routeSegments[index]

    if (segment && segment !== "new" && segment !== "edit") {
      return segment
    }
  }

  return undefined
}

function formatRouteSegment(segment: string): string {
  return segment
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function isOpaqueRouteSegment(segment: string): boolean {
  return (
    isUuidLike(segment) || isMongoObjectId(segment) || isLongNumericId(segment)
  )
}

function isUuidLike(segment: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    segment
  )
}

function isMongoObjectId(segment: string): boolean {
  return /^[0-9a-f]{24}$/i.test(segment)
}

function isLongNumericId(segment: string): boolean {
  return /^\d{8,}$/.test(segment)
}

export { getDashboardBreadcrumbSegments }
export type { DashboardBreadcrumbSegment }
