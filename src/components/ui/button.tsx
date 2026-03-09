import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          {
            "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90":
              variant === "default",
            "border border-primary/20 bg-transparent text-primary hover:bg-primary/10":
              variant === "outline",
            "hover:bg-primary/10 text-primary": variant === "ghost",
            "bg-surface text-surface-foreground hover:bg-surface/80":
              variant === "secondary",
            "h-12 px-6 py-3": size === "default",
            "h-9 px-4 text-xs": size === "sm",
            "h-14 px-8 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
