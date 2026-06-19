import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        gold: "#D4AF37",
        ivory: "#F5F5F5",
        graphite: "#2C2C2C",
        'brand-primary': '#0D3B39',
        'brand-secondary': '#FCF7B6',
      },
      fontFamily: {
        title: ["var(--font-title)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
      },
      boxShadow: {
        gold: "0 20px 60px rgba(212, 175, 55, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
