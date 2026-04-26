import {
  RiDashboardLine,
  RiDatabase2Line,
  RiFlashlightLine,
  RiLayoutGridLine,
  RiPulseLine,
  RiSettings3Line,
  RiShieldUserLine,
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

const dashboardStats = [
  {
    icon: RiShieldUserLine,
    label: "Synced users",
    value: "1",
  },
  {
    icon: RiPulseLine,
    label: "Webhook state",
    value: "Live",
  },
  {
    icon: RiFlashlightLine,
    label: "API health",
    value: "Online",
  },
]

const dashboardActivity = [
  "Clerk user webhook received",
  "Current user profile synced",
  "Dashboard session initialized",
]

export { dashboardActivity, dashboardNavItems, dashboardStats }
