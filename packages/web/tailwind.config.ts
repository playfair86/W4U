import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E8F5EC",
          100: "#C6E5CF",
          200: "#9FD3AE",
          300: "#74C08C",
          400: "#4FB272",
          500: "#2DA55A",
          600: "#1B7A3D",
          700: "#145C2E",
          800: "#0D3F1F",
          900: "#062110",
        },
        accent: {
          400: "#FFC857",
          500: "#F5A623",
        },
        ink: {
          900: "#0B1220",
          700: "#334155",
          500: "#64748B",
          300: "#CBD5E1",
          100: "#F1F5F9",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        phone:
          "0 40px 80px -20px rgba(11, 18, 32, 0.35), 0 0 0 10px #0B1220, 0 0 0 11px #1f2937",
      },
    },
  },
  plugins: [],
};

export default config;
