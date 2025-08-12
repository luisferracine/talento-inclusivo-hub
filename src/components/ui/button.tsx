import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white hover:bg-gradient-hover shadow-soft hover:shadow-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        secondary:
          "bg-gradient-hero text-white hover:bg-gradient-accent shadow-soft hover:shadow-hover",
        ghost: "bg-gradient-primary text-white hover:bg-gradient-hover shadow-soft hover:shadow-hover",
        link: "bg-gradient-primary text-white hover:bg-gradient-hover shadow-soft hover:shadow-hover underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-white font-semibold shadow-soft hover:shadow-hover hover:scale-105 hover:bg-gradient-hover transition-all duration-300",
        inclusive: "bg-gradient-hero text-white hover:bg-gradient-accent border-2 border-primary hover:border-secondary font-semibold shadow-soft hover:shadow-hover",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4",
        lg: "h-14 rounded-lg px-8 text-base",
        icon: "h-12 w-12",
        hero: "h-16 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
