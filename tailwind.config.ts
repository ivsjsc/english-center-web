import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "390px",
        tablet: "768px",
        desktop: "1440px",
      },
      colors: {
        // Canonical Stitch Tokens
        "primary-deep": "#00288E",
        "primary": "#1E40AF",
        "primary-vibrant": "#2563EB",
        "primary-light": "#EFF6FF",
        "primary-highlight": "#DBEAFE",
        "accent-amber": "#F59E0B",
        "accent-amber-hover": "#D97706",
        "growth": "#10B981",
        "growth-dark": "#059669",
        "surface": "#F8F9FF",
        "surface-subtle": "#F8FAFC",
        "text-heading": "#0F172A",
        "text-default": "#334155",
        "text-muted": "#64748B",
        border: "#E2E8F0",
        error: "#BA1A1A",

        // Palette aliases for compatibility
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#00288E",
          navy: "#00288E", // Reconciled from old AURA 0B2545 to Stitch canonical 00288E
          sapphire: "#1E40AF", // Reconciled from 134074 to Stitch primary 1E40AF
          light: "#EFF6FF",
        },
        accent: {
          gold: "#F59E0B",
          amber: "#F59E0B",
          "amber-hover": "#D97706",
          emerald: "#10B981",
          teal: "#0D9488",
          coral: "#F43F5E",
        },
        surface: {
          DEFAULT: "#F8F9FF",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          800: "#1E293B",
          900: "#0F172A",
          subtle: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "sans-serif"],
        display: ["var(--font-be-vietnam-pro)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px -2px rgba(0, 40, 142, 0.06)",
        "card-hover": "0 12px 28px -4px rgba(0, 40, 142, 0.12)",
        premium: "0 20px 40px -15px rgba(0, 40, 142, 0.20)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
    },
  },
  plugins: [],
};

export default config;
