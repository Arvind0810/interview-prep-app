"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { KEYS, writeJSON } from "@/lib/storage";

// Runs in <head> before first paint so the page never flashes the wrong theme.
export const THEME_INIT_SCRIPT = `(function(){try{var t=JSON.parse(localStorage.getItem("${KEYS.theme}"));if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    writeJSON(KEYS.theme, next);
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-panel2 hover:text-fg ${className}`}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
