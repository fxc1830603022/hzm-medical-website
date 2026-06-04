import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151514",
        graphite: "#2d2b29",
        porcelain: "#fbfaf7",
        mist: "#f0f3f2",
        champagne: "#c9a96e",
        bronze: "#9d7b45",
        sage: "#6f8178",
        rosewood: "#8a4d4d",
        whatsapp: "#25D366"
      },
      fontFamily: {
        display: ["Playfair Display", "Noto Serif SC", "Georgia", "serif"],
        serif: ["Playfair Display", "Noto Serif SC", "Georgia", "serif"],
        sans: ["Montserrat", "Noto Sans SC", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(21, 21, 20, 0.10)",
        lift: "0 28px 80px rgba(21, 21, 20, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
