import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        absolute: "#050505",
        base: "#080808",
        surface: "#0D0D0D",
        card: "#121212",
        cardSoft: "#171717",
        line: "#262626",
        lineActive: "#3A3A3A",
        divider: "#1F1F1F",
        ink: "#F5F5F5",
        muted: "#A3A3A3",
        faint: "#737373",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(255,255,255,0.12)",
        deep: "0 30px 120px rgba(0,0,0,0.65)",
      },
    },
  },
  plugins: [],
} satisfies Config;
