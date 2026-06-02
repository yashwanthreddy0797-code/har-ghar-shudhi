import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#050505",
          emerald: "#0d3b2e",
          "emerald-light": "#1a5c47",
          gold: "#c9a962",
          "gold-dim": "#8a7340",
          cream: "#f5f0e8",
        },
        brand: {
          white: "#ffffff",
          cream: "#faf9f6",
          sand: "#f3f2ed",
          text: "#1a1a1a",
          muted: "#6b7280",
          green: "#3d6b4f",
          "green-dark": "#2d5239",
          "green-light": "#e8f2eb",
          accent: "#c45c26",
          border: "#e5e7e3",
        },
        checkout: {
          cream: "#f9f6ee",
          panel: "#4a3228",
          "panel-fg": "#faf7f2",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
