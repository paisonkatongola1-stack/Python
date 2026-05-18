import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#6366f1", // Indigo
          dark: "#4f46e5",
          light: "#818cf8",
        },
        secondary: {
          DEFAULT: "#0ea5e9", // Sky blue
          dark: "#0284c7",
          light: "#38bdf8",
        },
        accent: {
          DEFAULT: "#a855f7", // Purple
          dark: "#9333ea",
          light: "#c084fc",
        },
        surface: {
          DEFAULT: "#1e1b4b", // Dark blue/indigo surface
          light: "#312e81",
          dark: "#0f172a",
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        'gradient-brand': 'linear-gradient(to right, #6366f1, #a855f7)',
        'gradient-surface': 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
