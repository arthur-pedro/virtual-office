import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3B82F6",
          secondary: "#6366F1",
          accent: "#FBBF24",
        },
      },
    },
  },
  plugins: [],
};

export default config;
