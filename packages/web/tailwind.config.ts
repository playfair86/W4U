import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E8F5EE",
          100: "#CDE8D6",
          200: "#A3D4B4",
          300: "#74BC8C",
          400: "#46A268",
          500: "#2B8B50",
          600: "#1B7A4E",
          700: "#145C3B",
          800: "#0D3F28",
          900: "#1A2B1E",
        },
        gold: {
          50: "#FBF3DB",
          100: "#F5E3A8",
          300: "#E8C460",
          500: "#D4A017",
          600: "#B38612",
          700: "#8F6A0E",
        },
        ink: {
          900: "#1A2B1E",
          700: "#3F4E44",
          500: "#5A6B5E",
          300: "#C3CBC5",
          100: "#F1F5F2",
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
