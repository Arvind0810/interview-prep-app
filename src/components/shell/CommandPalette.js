"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, FileText, HelpCircle, Search } from "lucide-react";
import { ALL_PAGES } from "@/data/nav";
import { OPEN_PALETTE } from "@/components/shell/events";

const MAX_PAGES = 7;
const MAX_QUESTIONS = 8;

function matchPages(query) {
  if (!query) return ALL_PAGES.slice(0, MAX_PAGES);
  const q = query.toLowerCase();
  return ALL_PAGES
    .map((p) => {
      const label = p.label.toLowerCase();
      const score = label.startsWith(q) ? 0 : label.includes(q) ? 1 : p.group.toLowerCase().includes(q) ? 2 : -1;
      return { p, score };
    })
    .filter((x) => x.score >= 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_PAGES)
    .map((x) => x.p);
}

function matchQuestions(questions, query) {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (!questions || words.length === 0) return [];
  const out = [];
  for (const item of questions) {
    const hay = item.q.toLowerCase();
    if (words.every((w) => hay.includes(w))) out.push(item);
    if (out.length >= MAX_QUESTIONS) break;
  }
  return out;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [questions, setQuestions] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener(OPEN_PALETTE, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_PALETTE, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // The question bank is large, so it is only loaded the first time the palette opens.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCursor(0);
    requestAnimationFrame(() => inputRef.current?.focus());
    if (!questions) {
      import("@/data/questions")
        .then((m) => setQuestions(m.QBANK))
        .catch(() => setQuestions([]));
    }
  }, [open, questions]);

  const results = useMemo(() => {
    const pages = matchPages(query).map((p) => ({ kind: "page", key: p.href, title: p.label, sub: p.group, href: p.href, icon: p.icon }));
    const qs = matchQuestions(questions, query).map((q) => ({
      kind: "question", key: q.q, title: q.q, sub: `${q.t} · ${q.d}`, href: `/qbank?q=${encodeURIComponent(q.q)}`,
    }));
    return [...pages, ...qs];
  }, [query, questions]);

  if (!open) return null;

  const go = (r) => {
    setOpen(false);
    router.push(r.href);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(results.length - 1, c + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
    else if (e.key === "Enter" && results[cursor]) go(results[cursor]);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl animate-fade-in overflow-hidden rounded-2xl border border-border bg-elevated shadow-pop">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={18} className="text-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
            onKeyDown={onKeyDown}
            placeholder="Search pages, lessons and 490+ questions…"
            className="h-14 flex-1 bg-transparent text-fg placeholder:text-subtle focus:outline-none"
            aria-label="Search"
          />
          <kbd className="rounded border border-border px-1.5 text-[10px] text-subtle">esc</kbd>
        </div>
        <ul className="max-h-[55vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-subtle">No matches</li>}
          {results.map((r, i) => {
            const Icon = r.icon || (r.kind === "question" ? HelpCircle : FileText);
            const showHeader = i === 0 || results[i - 1].kind !== r.kind;
            return (
              <li key={r.kind + r.key} role="option" aria-selected={i === cursor}>
                {showHeader && (
                  <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    {r.kind === "page" ? "Pages" : "Questions"}
                  </div>
                )}
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(r)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${i === cursor ? "bg-accent/10" : ""}`}
                >
                  <Icon size={16} className={i === cursor ? "text-accent" : "text-subtle"} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-fg">{r.title}</span>
                    <span className="block text-xs text-subtle">{r.sub}</span>
                  </span>
                  {i === cursor && <CornerDownLeft size={14} className="text-subtle" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
