import { RiLoader3Fill, RiLoaderLine } from "@remixicon/react"
import { cn } from "@workspace/ui/lib/utils"

function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<typeof RiLoaderLine>, "children">) {
  return (
    <RiLoader3Fill
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
