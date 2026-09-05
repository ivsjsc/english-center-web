import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 min-h-[36px] gap-1.5",
      md: "text-sm px-5 py-2.5 min-h-[44px] gap-2", // 44px touch target standard
      lg: "text-base px-7 py-3.5 min-h-[50px] gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20 active:bg-brand-800",
      secondary:
        "bg-brand-navy text-white hover:bg-brand-sapphire shadow-md shadow-brand-navy/20",
      accent:
        "bg-accent-amber text-brand-navy hover:bg-accent-gold font-bold shadow-md shadow-accent-amber/20",
      outline:
        "border-2 border-brand-200 text-brand-navy hover:bg-brand-50 hover:border-brand-400 bg-white",
      ghost: "text-slate-600 hover:text-brand-600 hover:bg-brand-50",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
