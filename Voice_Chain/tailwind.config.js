/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        "brand-navy": "hsl(var(--brand-navy))",
        "brand-green": "hsl(var(--brand-green))",
        "brand-red": "hsl(var(--brand-red))",
        "brand-dark": "hsl(var(--brand-dark))",
        "accent-green": "hsl(var(--accent-green))",
        "accent-red": "hsl(var(--accent-red))",
      },
    },
  },
  plugins: [],
}
