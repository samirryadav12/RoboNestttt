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
        primary: {
          DEFAULT: "#C85A32",
          container: "#D4673D",
          fixed: "#FAF0E8",
          "fixed-dim": "#F5D5C2",
        },
        "on-primary": "#ffffff",
        "on-primary-container": "#4A1706",
        secondary: {
          DEFAULT: "#1E252B",
          container: "#2A333C",
          fixed: "#ECE5DD",
          "fixed-dim": "#DCD4C8",
        },
        "on-secondary": "#ffffff",
        "on-secondary-container": "#12161A",
        tertiary: {
          DEFAULT: "#786B61",
          container: "#8F8176",
          fixed: "#EFE8E1",
        },
        "on-tertiary": "#ffffff",
        surface: {
          DEFAULT: "#FAF7F2",
          dim: "#EAE3DA",
          bright: "#FAF7F2",
          variant: "#EFE9E0",
          "container-lowest": "#ffffff",
          "container-low": "#F7F3EC",
          container: "#F2ECE4",
          "container-high": "#EDE5DB",
          "container-highest": "#E7DED3",
        },
        background: "#FAF7F2",
        "on-background": "#181A1C",
        "on-surface": "#181A1C",
        "on-surface-variant": "#5A626A",
        outline: "#857D75",
        "outline-variant": "#E8E2D9",
        "surface-tint": "#C85A32",
        brand: {
          50: "#FAF4EF",
          100: "#F5E5DC",
          200: "#ECCBB8",
          300: "#DF9E7E",
          400: "#D4774E",
          500: "#C85A32",
          600: "#B04A23",
          700: "#8F3717",
          800: "#6E280E",
          900: "#4A1706",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(45, 30, 20, 0.04)",
        lift: "0 12px 28px -4px rgba(45, 30, 20, 0.08)",
        glow: "0 0 25px -5px rgba(200, 90, 50, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
