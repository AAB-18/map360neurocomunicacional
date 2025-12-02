import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, children, disabled, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full py-4 px-6 rounded-lg font-bold uppercase tracking-wider transition-all duration-300",
          disabled
            ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
            : "bg-transparent text-foreground border-2 border-primary neon-border hover:bg-primary hover:text-primary-foreground hover:neon-border-strong",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeonButton.displayName = "NeonButton";

export { NeonButton };
