/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",
        panel: "#1e293b",
        panel2: "#111827",
        accent: "#22d3ee",
        accent2: "#a78bfa",
        good: "#34d399",
        warn: "#fbbf24",
        bad: "#f87171",
        border: "#334155",
      },
    },
  },
  plugins: [],
};
