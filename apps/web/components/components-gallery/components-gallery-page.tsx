"use client"

import Link from "next/link"
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiCheckLine,
  RiFileListLine,
  RiFolderLine,
  RiMoonLine,
  RiSearchLine,
  RiSunLine,
} from "@remixicon/react"
import { useTheme } from "next-themes"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts"
import { toast } from "sonner"

import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"
import { useLoading } from "@/components/providers/loading-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@workspace/ui/components/button-group"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { Label } from "@workspace/ui/components/label"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Progress } from "@workspace/ui/components/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Spinner } from "@workspace/ui/components/spinner"
import { Slider } from "@workspace/ui/components/slider"
import { Switch } from "@workspace/ui/components/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Toggle } from "@workspace/ui/components/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

const chartData = [
  { month: "Jan", signups: 186, revenue: 80, churn: 18 },
  { month: "Feb", signups: 305, revenue: 200, churn: 22 },
  { month: "Mar", signups: 237, revenue: 120, churn: 16 },
  { month: "Apr", signups: 173, revenue: 190, churn: 12 },
  { month: "May", signups: 209, revenue: 260, churn: 15 },
  { month: "Jun", signups: 264, revenue: 310, churn: 10 },
]

const acquisitionData = [
  { channel: "organic", value: 42, fill: "var(--color-organic)" },
  { channel: "referral", value: 28, fill: "var(--color-referral)" },
  { channel: "paid", value: 18, fill: "var(--color-paid)" },
  { channel: "direct", value: 12, fill: "var(--color-direct)" },
]

const planData = [
  { plan: "starter", value: 52, fill: "var(--color-starter)" },
  { plan: "growth", value: 31, fill: "var(--color-growth)" },
  { plan: "enterprise", value: 17, fill: "var(--color-enterprise)" },
]

const radarData = [
  { metric: "Speed", score: 86 },
  { metric: "Reliability", score: 92 },
  { metric: "UX", score: 78 },
  { metric: "Security", score: 88 },
  { metric: "Cost", score: 74 },
  { metric: "Scale", score: 81 },
]

const chartConfig = {
  signups: {
    label: "Signups",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
  churn: {
    label: "Churn",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const acquisitionChartConfig = {
  organic: {
    label: "Organic",
    color: "var(--chart-2)",
  },
  referral: {
    label: "Referral",
    color: "var(--chart-1)",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-5)",
  },
  direct: {
    label: "Direct",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const planChartConfig = {
  starter: {
    label: "Starter",
    color: "var(--chart-1)",
  },
  growth: {
    label: "Growth",
    color: "var(--chart-2)",
  },
  enterprise: {
    label: "Enterprise",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const radarChartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const radioOptions = [
  { value: "solo", title: "Solo", description: "One-person workspace." },
  { value: "team", title: "Team", description: "Shared access for operators." },
  {
    value: "enterprise",
    title: "Enterprise",
    description: "Advanced controls.",
  },
]

function ComponentsGalleryPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const loading = useLoading()
  const isDark = resolvedTheme === "dark"

  function handlePreviewLoading() {
    loading.startLoading("render", "Preview loading")
    window.setTimeout(() => loading.stopLoading("render"), 1800)
  }

  return (
    <TooltipProvider>
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Design System</p>
            <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
              Components Gallery
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Inspect installed shared components against the active brand
              color, light mode, and dark mode before using them in product
              screens.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="h-9 gap-2 rounded-xl px-4 text-xs text-muted-foreground hover:text-foreground"
              onClick={handlePreviewLoading}
              isLoading={loading.isLoading && loading.kind === "render"}
              loadingText="Preview loading"
            >
              Preview loading
            </Button>
            <Button
              variant="outline"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <RiSunLine /> : <RiMoonLine />}
              {isDark ? "Light mode" : "Dark mode"}
            </Button>
          </div>
        </section>

        <BrandThemeSettings />

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>
                Breadcrumbs and tabs for page-level orientation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Design</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Components</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="preview"
                  className="rounded-lg border bg-muted/30 p-4"
                >
                  Components should hold up in light and dark mode.
                </TabsContent>
                <TabsContent
                  value="tokens"
                  className="rounded-lg border bg-muted/30 p-4"
                >
                  Brand colors drive primary, ring, and sidebar highlights.
                </TabsContent>
                <TabsContent
                  value="usage"
                  className="rounded-lg border bg-muted/30 p-4"
                >
                  Prefer shared primitives from `packages/ui`.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>User identity and grouped presence.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarFallback>JP</AvatarFallback>
                <AvatarBadge />
              </Avatar>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>NM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>API</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+4</AvatarGroupCount>
              </AvatarGroup>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Buttons, Badges, Button Groups</CardTitle>
              <CardDescription>
                Core action surfaces and compact metadata states.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button>
                  <RiAddLine />
                  Primary
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button isLoading loadingText="Loading">
                  Loading
                </Button>
                <Button size="icon" aria-label="Confirm">
                  <RiCheckLine />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>

              <ButtonGroup>
                <Button variant="outline">Archive</Button>
                <ButtonGroupSeparator />
                <Button variant="outline">Report</Button>
                <ButtonGroupText>Cmd K</ButtonGroupText>
              </ButtonGroup>

              <div className="flex flex-wrap gap-2">
                <Toggle variant="outline" aria-label="Toggle grid view">
                  Grid
                </Toggle>
                <ToggleGroup type="single" defaultValue="comfortable">
                  <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
                  <ToggleGroupItem value="comfortable">
                    Comfortable
                  </ToggleGroupItem>
                  <ToggleGroupItem value="spacious">Spacious</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Labels and Inputs</CardTitle>
              <CardDescription>
                Form rows with normal, disabled, and invalid states.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="component-search">Search</Label>
                <div className="relative">
                  <RiSearchLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="component-search"
                    placeholder="Search components..."
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="disabled-input">Disabled</Label>
                  <Input id="disabled-input" placeholder="Unavailable" disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invalid-input">Invalid</Label>
                  <Input
                    id="invalid-input"
                    aria-invalid
                    placeholder="Missing value"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Fields</CardTitle>
              <CardDescription>
                Structured form labels, descriptions, and errors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSet>
                <FieldLegend>Workspace Settings</FieldLegend>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="workspace-name">
                      Workspace name
                    </FieldLabel>
                    <Input id="workspace-name" defaultValue="Nexion" />
                    <FieldDescription>
                      This appears in project navigation.
                    </FieldDescription>
                  </Field>
                  <Field data-invalid={true}>
                    <FieldLabel htmlFor="workspace-slug">Slug</FieldLabel>
                    <Input id="workspace-slug" aria-invalid defaultValue="" />
                    <FieldError>Slug is required.</FieldError>
                  </Field>
                  <FieldSeparator>Visibility</FieldSeparator>
                  <Field orientation="horizontal">
                    <Switch id="public-profile" />
                    <FieldContent>
                      <FieldTitle>Public profile</FieldTitle>
                      <FieldDescription>
                        Show this workspace in shared links.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Radio Group</CardTitle>
              <CardDescription>
                Mutually exclusive options with field helpers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="team">
                {radioOptions.map(({ value, title, description }) => (
                  <Field key={value} orientation="horizontal">
                    <RadioGroupItem value={value} id={`plan-${value}`} />
                    <FieldContent>
                      <FieldLabel htmlFor={`plan-${value}`}>
                        {title}
                      </FieldLabel>
                      <FieldDescription>{description}</FieldDescription>
                    </FieldContent>
                  </Field>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Single date selection surface.</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={new Date(2026, 3, 26)}
                className="rounded-lg border"
              />
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Bar Chart</CardTitle>
              <CardDescription>
                Recharts wrapper using the shared analytics palette.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-72 w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="signups"
                    fill="var(--color-signups)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className="rounded-lg shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Line and Area Charts</CardTitle>
              <CardDescription>
                Trend views for growth and retention metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2">
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <LineChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="signups"
                    type="monotone"
                    stroke="var(--color-signups)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="churn"
                    type="monotone"
                    stroke="var(--color-churn)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>

              <ChartContainer config={chartConfig} className="h-64 w-full">
                <AreaChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="revenue"
                    type="monotone"
                    fill="var(--color-revenue)"
                    fillOpacity={0.2}
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Donut Chart</CardTitle>
              <CardDescription>Acquisition channel mix.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={acquisitionChartConfig}
                className="mx-auto h-64 w-full"
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent nameKey="channel" hideLabel />
                    }
                  />
                  <Pie
                    data={acquisitionData}
                    dataKey="value"
                    nameKey="channel"
                    innerRadius={54}
                    outerRadius={82}
                    strokeWidth={4}
                  />
                  <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Pie Chart</CardTitle>
              <CardDescription>Plan distribution.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={planChartConfig} className="h-72 w-full">
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="plan" hideLabel />}
                  />
                  <Pie
                    data={planData}
                    dataKey="value"
                    nameKey="plan"
                    outerRadius={88}
                    strokeWidth={4}
                  >
                    {planData.map((entry) => (
                      <Cell key={entry.plan} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="plan" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Radar Chart</CardTitle>
              <CardDescription>
                Multi-axis product health snapshot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={radarChartConfig}
                className="mx-auto h-72 w-full"
              >
                <RadarChart data={radarData}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarGrid />
                  <Radar
                    dataKey="score"
                    fill="var(--color-score)"
                    fillOpacity={0.28}
                    stroke="var(--color-score)"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                    }}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Analytics Summary</CardTitle>
              <CardDescription>
                Compact KPI cards paired with chart surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {[
                ["MRR", "$24.8k", "+12.4%"],
                ["Activation", "68%", "+4.1%"],
                ["Churn", "2.8%", "-0.6%"],
              ].map(([label, value, change]) => (
                <div key={label} className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-normal">
                    {value}
                  </p>
                  <Badge variant="outline" className="mt-3">
                    {change}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Alerts and Progress</CardTitle>
              <CardDescription>Status messaging and completion state.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <RiCheckLine />
                <AlertTitle>Deployment ready</AlertTitle>
                <AlertDescription>
                  Production checks passed for the selected theme.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <RiFileListLine />
                <AlertTitle>Missing migration</AlertTitle>
                <AlertDescription>
                  Review database migrations before deployment.
                </AlertDescription>
              </Alert>
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Build progress</span>
                  <span className="text-muted-foreground">68%</span>
                </div>
                <Progress value={68} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Accordion and Items</CardTitle>
              <CardDescription>
                Expandable content and dense list rows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Accordion type="single" collapsible defaultValue="tokens">
                <AccordionItem value="tokens">
                  <AccordionTrigger>How are colors applied?</AccordionTrigger>
                  <AccordionContent>
                    Brand settings update CSS variables used by actions, focus
                    rings, and sidebar highlights.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="components">
                  <AccordionTrigger>Where do components live?</AccordionTrigger>
                  <AccordionContent>
                    Shared shadcn components live in `packages/ui/src/components`.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <ItemGroup>
                <Item variant="outline">
                  <ItemMedia variant="icon">
                    <RiFolderLine />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>packages/ui</ItemTitle>
                    <ItemDescription>Shared primitives and styles.</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Badge variant="secondary">Shared</Badge>
                  </ItemActions>
                </Item>
                <ItemSeparator />
                <Item variant="muted">
                  <ItemMedia variant="icon">
                    <RiFileListLine />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>components page</ItemTitle>
                    <ItemDescription>
                      Product-facing examples for installed primitives.
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </ItemGroup>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Table</CardTitle>
              <CardDescription>Structured data rows.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Component inventory sample.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Button", "Ready", "High"],
                    ["Dialog", "Ready", "Medium"],
                    ["Table", "Ready", "Low"],
                  ].map(([name, status, usage]) => (
                    <TableRow key={name}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Scroll Area</CardTitle>
              <CardDescription>Contained scrolling content.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 rounded-lg border">
                <div className="grid gap-3 p-4">
                  {Array.from({ length: 12 }, (_, index) => (
                    <div
                      key={index}
                      className="rounded-lg border bg-muted/30 p-3 text-sm"
                    >
                      Component audit item {index + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Menu-backed option selection.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Label htmlFor="environment-select">Environment</Label>
              <Select defaultValue="production">
                <SelectTrigger id="environment-select" className="w-full">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Deploy Targets</SelectLabel>
                    <SelectItem value="preview">Preview</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="production">Production</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Switch and Slider</CardTitle>
              <CardDescription>Binary and numeric settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="auto-sync-switch">Auto sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep webhook data current.
                  </p>
                </div>
                <Switch id="auto-sync-switch" defaultChecked />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="quality-slider">Quality threshold</Label>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <Slider
                  id="quality-slider"
                  defaultValue={[72]}
                  max={100}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Popover</CardTitle>
              <CardDescription>Inline contextual content.</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <PopoverHeader>
                    <PopoverTitle>Brand tokens</PopoverTitle>
                    <PopoverDescription>
                      Primary actions, focus rings, and sidebar highlights use
                      the selected color.
                    </PopoverDescription>
                  </PopoverHeader>
                  <Button size="sm">Apply</Button>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-4">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Centered confirmation modal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm publish</DialogTitle>
                    <DialogDescription>
                      This action updates the current dashboard theme settings.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Drawer</CardTitle>
              <CardDescription>Modal surface for focused actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Publish settings</DrawerTitle>
                    <DrawerDescription>
                      Review the release target before pushing changes live.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="grid gap-3 px-4 pb-4">
                    <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                      Production will receive the current component theme.
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Publish</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Sheet</CardTitle>
              <CardDescription>Side panel for contextual workflows.</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Component settings</SheetTitle>
                    <SheetDescription>
                      Use sheets when the user should stay oriented on the
                      current page.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 px-6 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-name">Name</Label>
                      <Input id="sheet-name" defaultValue="Components Gallery" />
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
                      <Label htmlFor="sheet-visible">Visible in nav</Label>
                      <Switch id="sheet-visible" defaultChecked />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button>Save changes</Button>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Carousel</CardTitle>
              <CardDescription>Horizontal content browsing.</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel opts={{ align: "start" }} className="px-10">
                <CarouselContent>
                  {["Button", "Badge", "Calendar"].map((item) => (
                    <CarouselItem key={item} className="basis-full md:basis-1/2">
                      <div className="flex h-36 items-center justify-center rounded-lg border bg-muted/30 text-sm font-medium">
                        {item}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Collapsible</CardTitle>
              <CardDescription>Expandable content pattern.</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible defaultOpen className="space-y-3">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Deployment checklist
                    <RiArrowDownSLine />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Run typecheck, build, and migration deploy before promoting an
                  API release.
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>
                Separator, tooltip, and toast examples.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Webhook sync</span>
                <Badge variant="outline">Online</Badge>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      Hover for tooltip
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Tooltips inherit the active theme.
                  </TooltipContent>
                </Tooltip>

                <Button
                  size="sm"
                  onClick={() =>
                    toast.success("Webhook synced", {
                      description: "User data is current.",
                    })
                  }
                >
                  Success
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    toast.info("New component available", {
                      description: "Add it to the gallery before using it.",
                    })
                  }
                >
                  Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.warning("Migration check needed", {
                      description: "Verify schema changes before deploy.",
                    })
                  }
                >
                  Warning
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    toast.error("Build failed", {
                      description: "Open the logs and rerun after fixing it.",
                    })
                  }
                >
                  Error
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/components/error-preview">Show error page</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/components/not-found-preview">
                    Show not found
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const id = toast.loading("Publishing changes")

                    window.setTimeout(() => {
                      toast.success("Published", {
                        id,
                        description: "The preview is up to date.",
                      })
                    }, 1200)
                  }}
                >
                  Loading
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast("Unsaved theme changes", {
                      description: "Save the brand settings before leaving.",
                      action: {
                        label: "Save",
                        onClick: () => toast.success("Theme saved"),
                      },
                    })
                  }
                >
                  Action
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
              <CardDescription>Loading placeholders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Spinner, Kbd, Hover Card, Pagination</CardTitle>
            <CardDescription>
              Utility primitives for loading, shortcuts, rich hover states, and
              paged navigation.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 xl:grid-cols-4">
            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Spinner</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Spinner className="text-primary" />
                Syncing dashboard state
              </div>
            </div>

            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Keyboard</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                Search with
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
                or save with
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>S</Kbd>
                </KbdGroup>
              </div>
            </div>

            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Hover Card</p>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm">
                    Hover theme info
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent align="start">
                  <div className="space-y-2">
                    <p className="font-medium">Brand theme</p>
                    <p className="text-sm text-muted-foreground">
                      Button, focus, and sidebar tokens update from the active
                      preset while charts keep their own analytics palette.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Pagination</p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#previous" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#page-1" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#page-2">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#next" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Empty State</CardTitle>
            <CardDescription>
              Blank-state pattern with action content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <RiFolderLine />
                </EmptyMedia>
                <EmptyTitle>No components selected</EmptyTitle>
                <EmptyDescription>
                  Choose a component family to preview usage, states, and theme
                  behavior.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">
                  <RiAddLine />
                  Add component
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Sidebar Preview</CardTitle>
            <CardDescription>
              Sidebar colors without leaving this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 overflow-hidden rounded-lg border">
              <SidebarProvider>
                <Sidebar collapsible="none">
                  <SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <RiCheckLine />
                          <span>Active item</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Preview</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {["Dashboard", "Components", "Settings"].map(
                            (item) => (
                              <SidebarMenuItem key={item}>
                                <SidebarMenuButton>
                                  <RiArrowRightLine />
                                  <span>{item}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )
                          )}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                <div className="flex flex-1 items-center justify-center bg-background p-6 text-sm text-muted-foreground">
                  Sidebar tokens are driven by the selected brand theme.
                </div>
              </SidebarProvider>
            </div>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  )
}

export { ComponentsGalleryPage }
