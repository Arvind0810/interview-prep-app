"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Circle, Clock, ListTree } from "lucide-react";
import { APP_PAGES, LESSONS, lessonIndex } from "@/data/nav";
import { KEYS, readJSON, recordStudyDay, useStoredValue, writeAndBroadcast, writeJSON } from "@/lib/storage";

const WORDS_PER_MINUTE = 200;
const MIN_TOC_SECTIONS = 3;
const ACTIVE_OFFSET_PX = 120;

const slugify = (text) =>
  text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";

// Gives every h2 a stable id and returns the section list. Pages keep their plain <h2>s.
function collectSections(root) {
  const seen = new Map();
  return [...root.querySelectorAll("h2")].map((h) => {
    if (!h.id) {
      const base = slugify(h.textContent || "");
      const n = seen.get(base) || 0;
      seen.set(base, n + 1);
      h.id = n ? `${base}-${n}` : base;
    }
    return { id: h.id, title: (h.textContent || "").trim() };
  });
}

function useDocument(contentRef, pathname, enabled) {
  const [sections, setSections] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = contentRef.current;
    if (!enabled || !root) {
      setSections([]);
      return undefined;
    }
    const found = collectSections(root);
    setSections(found);
    setMinutes(Math.max(1, Math.round((root.textContent || "").split(/\s+/).length / WORDS_PER_MINUTE)));

    // Ids exist only after mount, so honour a #hash link now.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.scrollIntoView();

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1);
      let current = found[0]?.id ?? null;
      for (const s of found) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET_PX) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [contentRef, pathname, enabled]);

  return { sections, minutes, active, progress };
}

function TocList({ sections, active, onPick }) {
  return (
    <ol className="space-y-0.5 border-l border-border">
      {sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={onPick}
            className={`-ml-px block border-l-2 py-1 pl-3 pr-1 text-[13px] leading-snug no-underline hover:no-underline ${
              active === s.id ? "border-accent font-semibold text-fg" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

function LessonFooter({ pathname }) {
  const done = useStoredValue(KEYS.lessonsDone, []);
  const idx = lessonIndex(pathname);
  const prev = LESSONS[idx - 1];
  const next = LESSONS[idx + 1];
  const isDone = done.includes(pathname);

  const toggle = () => {
    const current = readJSON(KEYS.lessonsDone, []);
    writeAndBroadcast(KEYS.lessonsDone, isDone ? current.filter((h) => h !== pathname) : [...current, pathname]);
  };

  return (
    <div className="mt-14 border-t border-border pt-8">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-panel p-6 text-center">
        {isDone ? <CheckCircle2 size={32} className="text-good" /> : <Circle size={32} className="text-subtle" />}
        <div className="font-semibold text-fg">{isDone ? "Lesson complete" : "Finished reading?"}</div>
        <button
          type="button"
          onClick={toggle}
          className={`h-10 rounded-lg px-5 text-sm font-semibold ${isDone ? "border border-border text-muted hover:text-fg" : "bg-gradient-to-r from-cyan-600 to-violet-600 text-white"}`}
        >
          {isDone ? "Mark as not complete" : "Mark lesson complete"}
        </button>
        <div className="text-xs text-subtle">{done.filter((h) => LESSONS.some((l) => l.href === h)).length} of {LESSONS.length} lessons complete</div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="group rounded-xl border border-border bg-panel p-4 no-underline hover:border-accent/50 hover:no-underline">
            <div className="flex items-center gap-1 text-xs text-subtle"><ArrowLeft size={14} /> Previous</div>
            <div className="mt-1 font-semibold text-fg group-hover:text-accent">{prev.label}</div>
          </Link>
        ) : <span />}
        {next && (
          <Link href={next.href} className="group rounded-xl border border-border bg-panel p-4 text-right no-underline hover:border-accent/50 hover:no-underline">
            <div className="flex items-center justify-end gap-1 text-xs text-subtle">Next <ArrowRight size={14} /></div>
            <div className="mt-1 font-semibold text-fg group-hover:text-accent">{next.label}</div>
          </Link>
        )}
      </div>
    </div>
  );
}

// Wraps every page. Document pages get reading progress, a table of contents and reading time;
// lessons also get completion + prev/next. App pages (dashboard, quiz, …) render full width.
export default function PageFrame({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);
  const isDoc = !APP_PAGES.has(pathname);
  const isLesson = lessonIndex(pathname) >= 0;
  const { sections, minutes, active, progress } = useDocument(contentRef, pathname, isDoc);
  const [tocOpen, setTocOpen] = useState(false);
  const hasToc = sections.length >= MIN_TOC_SECTIONS;

  useEffect(() => {
    recordStudyDay();
    setTocOpen(false);
  }, [pathname]);

  // Remember where the learner is, for "continue where you left off".
  useEffect(() => {
    if (!isLesson || !active) return;
    const section = sections.find((s) => s.id === active);
    writeJSON(KEYS.lastLesson, { href: pathname, section: active, sectionTitle: section?.title, at: Date.now() });
  }, [isLesson, active, pathname, sections]);

  if (!isDoc) {
    return <div className="prose-section mx-auto w-full max-w-6xl animate-fade-in">{children}</div>;
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="mx-auto flex w-full max-w-6xl gap-10">
        <article className="min-w-0 max-w-[52rem] flex-1 animate-fade-in">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-subtle">
            {isLesson && <span className="rounded-full bg-accent/10 px-2 py-0.5 font-semibold text-accent">Lesson {lessonIndex(pathname) + 1} of {LESSONS.length}</span>}
            <span className="inline-flex items-center gap-1"><Clock size={13} /> {minutes} min read</span>
            {hasToc && <span className="inline-flex items-center gap-1"><ListTree size={13} /> {sections.length} sections</span>}
          </div>

          {hasToc && (
            <div className="mb-4 xl:hidden">
              <button
                type="button"
                onClick={() => setTocOpen((o) => !o)}
                aria-expanded={tocOpen}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-panel px-4 py-2.5 text-sm font-semibold text-fg"
              >
                <span className="inline-flex items-center gap-2"><ListTree size={16} className="text-accent" /> On this page</span>
                <ChevronDown size={16} className={`transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              </button>
              {tocOpen && (
                <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-panel p-3">
                  <TocList sections={sections} active={active} onPick={() => setTocOpen(false)} />
                </div>
              )}
            </div>
          )}

          <div ref={contentRef} className="prose-section">{children}</div>
          {isLesson && <LessonFooter pathname={pathname} />}
        </article>

        {hasToc && (
          <aside className="hidden w-60 shrink-0 xl:block">
            <div className="no-scrollbar sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-subtle">
                <ListTree size={14} /> On this page
              </div>
              <TocList sections={sections} active={active} />
              <div className="mt-4 text-xs text-subtle">{Math.round(progress * 100)}% read</div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
