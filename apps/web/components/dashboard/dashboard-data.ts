import {
  RiDashboardLine,
  RiDatabase2Line,
  RiLayoutGridLine,
  RiSettings3Line,
  RiUserReceived2Line,
} from "@remixicon/react"

const dashboardNavItems = [
  {
    href: "/dashboard",
    icon: RiDashboardLine,
    label: "Overview",
  },
  {
    href: "/components",
    icon: RiLayoutGridLine,
    label: "Components",
  },
  {
    href: "/users",
    icon: RiUserReceived2Line,
    label: "Users",
  },
  {
    href: "/data",
    icon: RiDatabase2Line,
    label: "Data",
  },
  {
    href: "/settings",
    icon: RiSettings3Line,
    label: "Settings",
  },
]

export { dashboardNavItems }
