"use client";
import { useEffect, useMemo, useState } from "react";
import { CHALLENGES, LANGUAGES, DIFFICULTIES, leetcodeUrl } from "@/data/leetcode";

const LANG_FILTERS = ["All", ...LANGUAGES];
const DIFF_FILTERS = ["All", ...DIFFICULTIES];
const PAGE_SIZES = [10, 25, 50];
const STORAGE_KEY = "iprep_lcSolved";
const PAGE_WINDOW = 2; // numbered buttons shown on each side of the current page

const diffColor = (d) =>
  d === "easy" ? "text-emerald-400" : d === "med" ? "text-amber-400" : "text-red-400";

const langColor = (l) =>
  l === "Go" ? "bg-cyan-800" : l === "JavaScript" ? "bg-amber-800" : "bg-violet-800";

// Page numbers around `current`, with null marking an elided run.
function pageItems(current, total) {
  if (total <= 1) return [1];
  const pages = new Set([1, total]);
  for (let p = current - PAGE_WINDOW; p <= current + PAGE_WINDOW; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const items = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push(null);
    items.push(p);
  });
  return items;
}

export default function LeetCodePage() {
  const [lang, setLang] = useState("All");
  const [diff, setDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [unsolvedOnly, setUnsolvedOnly] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [solved, setSolved] = useState(new Set());
  // Solutions stay hidden until asked for, so the problem can be attempted first.
  const [revealed, setRevealed] = useState(new Set());

  useEffect(() => {
    try {
      setSolved(new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")));
    } catch {}
  }, []);

  const toggleSolved = (key) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const toggleRevealed = (key) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CHALLENGES.filter((c) => {
      if (lang !== "All" && c.lang !== lang) return false;
      if (diff !== "All" && c.difficulty !== diff) return false;
      if (unsolvedOnly && solved.has(c.key)) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.pattern.toLowerCase().includes(q) ||
        c.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [lang, diff, search, unsolvedOnly, solved]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // A narrowing filter can leave `page` past the end of the new result set.
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const resetTo = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <>
      <h1>LeetCode Challenges ({CHALLENGES.length})</h1>
      <p>
        Curated problems solved in Go, JavaScript and SQL. Expand a problem to read what it asks,
        try it yourself, then hit <em>Show solution</em> for the approach and the full code.
      </p>

      <input
        type="text"
        placeholder="Search by title, pattern or topic..."
        value={search}
        onChange={(e) => resetTo(setSearch)(e.target.value)}
        className="w-full px-3 py-2 bg-panel2 border border-border rounded-md text-sm text-slate-200 my-3 focus:outline-none focus:border-accent"
      />

      <div className="flex flex-wrap gap-2 my-3">
        {LANG_FILTERS.map((l) => (
          <button
            key={l}
            onClick={() => resetTo(setLang)(l)}
            className={`px-3 py-1 rounded-full text-xs border ${lang === l ? "bg-accent text-slate-900 border-accent" : "bg-panel border-border text-slate-200"}`}
          >
            {l}
          </button>
        ))}
        <span className="text-xs text-slate-400 self-center border-l border-border pl-3 ml-2">
          Difficulty:
        </span>
        {DIFF_FILTERS.map((d) => (
          <button
            key={d}
            onClick={() => resetTo(setDiff)(d)}
            className={`px-3 py-1 rounded-full text-xs border ${diff === d ? "bg-accent text-slate-900 border-accent" : "bg-panel border-border text-slate-200"}`}
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => resetTo(setUnsolvedOnly)(!unsolvedOnly)}
          className={`px-3 py-1 rounded-full text-xs border ml-2 ${unsolvedOnly ? "bg-violet-500 text-slate-900 border-violet-500" : "bg-panel border-border text-slate-200"}`}
        >
          ○ Unsolved only
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 my-3">
        <p className="text-xs text-slate-400 m-0">
          {filtered.length === 0
            ? "0 problems"
            : `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}`}{" "}
          • {solved.size} solved
        </p>
        <label className="text-xs text-slate-400 flex items-center gap-2">
          Per page:
          <select
            value={pageSize}
            onChange={(e) => resetTo(setPageSize)(Number(e.target.value))}
            className="bg-panel2 border border-border rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-accent"
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="text-slate-400 mt-4">No problems match your filters.</p>
      ) : (
        visible.map((c) => (
          <details key={c.key}>
            <summary>
              <span className={`text-[11px] text-white px-2 py-0.5 rounded mr-2 ${langColor(c.lang)}`}>
                {c.lang}
              </span>
              <span className={`text-[11px] font-bold uppercase mr-2 ${diffColor(c.difficulty)}`}>
                {c.difficulty}
              </span>
              <span className="text-slate-400 mr-1">{c.id}.</span>
              {c.title}
              {solved.has(c.key) && <span className="text-emerald-400 ml-2">✓</span>}
            </summary>

            <div className="flex flex-wrap gap-2 items-center mt-2">
              {c.topics.map((t) => (
                <span key={t} className="text-[11px] text-slate-400 border border-border px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-2">{c.description}</p>

            <div className="flex flex-wrap gap-3 items-center mt-3">
              <button
                onClick={() => toggleRevealed(c.key)}
                aria-expanded={revealed.has(c.key)}
                className="px-3 py-1 text-sm border border-accent rounded text-accent hover:bg-accent hover:text-slate-900"
              >
                {revealed.has(c.key) ? "Hide solution" : "Show solution"}
              </button>
              <button
                onClick={() => toggleSolved(c.key)}
                className="px-3 py-1 text-sm border border-border rounded text-slate-200 hover:border-accent"
              >
                {solved.has(c.key) ? "✓ Solved" : "Mark as solved"}
              </button>
              <a
                href={leetcodeUrl(c.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Open on LeetCode ↗
              </a>
            </div>

            {revealed.has(c.key) && (
              <div className="mt-3 border-t border-border pt-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[11px] bg-slate-700 text-slate-100 px-2 py-0.5 rounded">
                    {c.pattern}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Time <code>{c.complexity.time}</code> • Space <code>{c.complexity.space}</code>
                  </span>
                </div>
                <p className="mt-2">{c.approach}</p>
                <pre>
                  <code>{c.code}</code>
                </pre>
              </div>
            )}
          </details>
        ))
      )}

      {filtered.length > 0 && (
        <nav className="flex flex-wrap items-center justify-center gap-1 mt-6" aria-label="Pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded text-xs border bg-panel border-border text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          {pageItems(page, totalPages).map((p, i) =>
            p === null ? (
              <span key={`gap-${i}`} className="px-2 text-xs text-slate-500">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                aria-current={p === page ? "page" : undefined}
                className={`px-3 py-1 rounded text-xs border ${p === page ? "bg-accent text-slate-900 border-accent font-semibold" : "bg-panel border-border text-slate-200"}`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded text-xs border bg-panel border-border text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </nav>
      )}
    </>
  );
}
