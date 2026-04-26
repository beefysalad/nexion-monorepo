import { cn } from "@workspace/ui/lib/utils"
import { RiLoaderLine } from "@remixicon/react"

function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<typeof RiLoaderLine>, "children">) {
  return (
    <RiLoaderLine
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
