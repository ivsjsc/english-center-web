import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "vibrant" | "success" | "warning" | "amber" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "primary",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-semibold rounded-full";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
  };

  const variantStyles = {
    primary: "bg-primary-light text-primary border border-primary-highlight",
    secondary: "bg-primary-deep text-white",
    vibrant: "bg-primary-vibrant text-white",
    success: "bg-emerald-50 text-growth-dark border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    amber: "bg-amber-100/80 text-amber-900 border border-amber-300/60",
    danger: "bg-rose-50 text-error border border-rose-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    neutral: "bg-slate-100 text-text-default border border-border",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
