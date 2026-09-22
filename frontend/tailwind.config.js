/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f6f3",
          100: "#dfe9e1",
          200: "#bdd3c2",
          300: "#94b69d",
          400: "#6b9878",
          500: "#4c7d5a",
          600: "#396345",
          700: "#2d4f3a", // primary brand green
          800: "#213b2b",
          900: "#152719",
          950: "#0c1710",
        },
        cream: {
          50: "#fefdfb",
          100: "#faf6ee", // base background
          200: "#f4ecd9",
          300: "#ecdfc2",
        },
        clay: {
          400: "#d99a6c",
          500: "#c1743f", // accent terracotta
          600: "#a55c2e",
          700: "#824625",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(21, 39, 25, 0.12)",
        card: "0 2px 12px -2px rgba(21, 39, 25, 0.08)",
      },
    },
  },
  plugins: [],
};
