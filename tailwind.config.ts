import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          navy: "#0B2545",
          sapphire: "#134074",
          light: "#EEF4F8",
        },
        accent: {
          gold: "#F59E0B",
          amber: "#EE964B",
          emerald: "#10B981",
          teal: "#0D9488",
          coral: "#F43F5E",
        },
        surface: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          800: "#1E293B",
          900: "#0F172A",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-heading)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(11, 37, 69, 0.08)",
        "card-hover": "0 12px 30px -4px rgba(11, 37, 69, 0.15)",
        premium: "0 20px 40px -15px rgba(19, 64, 116, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      }
    },
  },
  plugins: [],
};

export default config;
