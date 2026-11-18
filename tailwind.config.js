/** @type {import('tailwindcss').Config} */
// Colours are CSS variables (RGB triplets, see globals.css) so one class works in both themes.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        panel: token("panel"),
        panel2: token("panel2"),
        elevated: token("elevated"),
        border: token("border"),
        fg: token("fg"),
        muted: token("muted"),
        subtle: token("subtle"),
        accent: token("accent"),
        accent2: token("accent2"),
        good: token("good"),
        warn: token("warn"),
        bad: token("bad"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.06), 0 1px 3px rgb(0 0 0 / 0.08)",
        pop: "0 12px 40px -8px rgb(0 0 0 / 0.35)",
      },
      keyframes: {
        "fade-in": { from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "none" } },
      },
      animation: { "fade-in": "fade-in 160ms ease-out" },
    },
  },
  plugins: [],
};
