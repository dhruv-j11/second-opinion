import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0A0A0A",
        accent: {
          DEFAULT: "#2D4A3E",
          light: "#3A6152",
          subtle: "#E8F0EC",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#6B7280",
        },
        border: "#E5E7EB",
        danger: "#DC2626",
        warning: "#F59E0B",
        success: "#2D4A3E",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0A0A0A",
        },
        input: "#E5E7EB",
        ring: "#2D4A3E",
        primary: {
          DEFAULT: "#2D4A3E",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E8F0EC",
          foreground: "#2D4A3E",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
