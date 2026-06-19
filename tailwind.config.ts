import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "rgba(5, 12, 24, 0.78)",
        line: "rgba(76, 201, 240, 0.28)",
      },
      boxShadow: {
        panel: "0 20px 70px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
