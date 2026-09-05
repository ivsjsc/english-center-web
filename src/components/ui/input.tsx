import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            clsx(
              "w-full px-4 py-3 rounded-xl border bg-white text-text-heading text-sm transition-colors duration-200 placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-vibrant focus:border-primary-vibrant min-h-[48px] h-12",
              error
                ? "border-error focus:ring-error focus:border-error"
                : "border-border hover:border-slate-300",
              className
            )
          )}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
