"use client";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Image as ImageIcon, Layers, ListFilter, Search, SquareStack } from "lucide-react";
import { QBANK } from "@/data/questions";
import { diagramFor } from "@/data/diagrams";
import Diagram from "@/components/Diagram";
import Flashcards from "@/components/Flashcards";
import { KEYS, usePersistentState } from "@/lib/storage";
import { Badge, Button, Chip, EmptyState, PageHeader, ProgressBar, Tabs, inputClass } from "@/components/ui";

const PAGE_SIZE = 25;
const ALL = "All";
const DIFFS = [ALL, "easy", "med", "hard"];
const DIFF_TONE = { easy: "good", med: "warn", hard: "bad" };

const INDEXED = QBANK.map((q, idx) => ({ ...q, idx }));
const TOPICS = [...new Set(QBANK.map((q) => q.t))];

function QuestionRow({ q, reviewed, onToggleReviewed }) {
  const [open, setOpen] = useState(false);
  return (
    <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)} className={reviewed ? "!border-good/40" : ""}>
      <summary className="flex list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
        {reviewed ? <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-good" /> : <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-border" />}
        <span className="min-w-0 flex-1">
          <span className="font-semibold text-fg">{q.q}</span>
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            <Badge tone="accent">{q.t}</Badge>
            <Badge tone={DIFF_TONE[q.d]}>{q.d}</Badge>
            {q.dia && <Badge tone="violet"><ImageIcon size={11} /> diagram</Badge>}
          </span>
        </span>
      </summary>
      {open && (
        <div className="mt-3 animate-fade-in pl-7">
          <p className="!mt-0 font-normal">{q.a}</p>
          {q.dia && <Diagram entry={diagramFor(q.dia)} />}
          <Button variant={reviewed ? "good" : "secondary"} size="sm" onClick={onToggleReviewed}>
            <CheckCircle2 size={14} /> {reviewed ? "Reviewed" : "Mark as reviewed"}
          </Button>
        </div>
      )}
    </details>
  );
}

function Browse() {
  const [topic, setTopic] = useState(ALL);
  const [diff, setDiff] = useState(ALL);
  const [search, setSearch] = useState("");
  const [diagramsOnly, setDiagramsOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [reviewed, setReviewed] = usePersistentState(KEYS.qReviewed, []);
  const reviewedSet = useMemo(() => new Set(reviewed), [reviewed]);

  // ⌘K search links here as /qbank?q=…
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setSearch(q);
  }, []);

  useEffect(() => setLimit(PAGE_SIZE), [topic, diff, search, diagramsOnly]);

  const list = useMemo(() => {
    const s = search.trim().toLowerCase();
    return INDEXED.filter((q) =>
      (topic === ALL || q.t === topic) &&
      (diff === ALL || q.d === diff) &&
      (!diagramsOnly || q.dia) &&
      (!s || q.q.toLowerCase().includes(s) || q.a.toLowerCase().includes(s))
    );
  }, [topic, diff, search, diagramsOnly]);

  const toggle = (idx) =>
    setReviewed((prev) => (prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]));

  return (
    <>
      <div className="sticky top-14 z-20 -mx-4 border-b border-border bg-bg/90 px-4 pb-3 pt-3 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
          <input type="search" placeholder="Search questions and answers…" value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pl-9`} aria-label="Search questions" />
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {[ALL, ...TOPICS].map((t) => <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</Chip>)}
        </div>
        <div className="no-scrollbar mt-2 flex items-center gap-2 overflow-x-auto">
          <ListFilter size={14} className="shrink-0 text-subtle" />
          {DIFFS.map((d) => <Chip key={d} active={diff === d} onClick={() => setDiff(d)}>{d}</Chip>)}
          <span className="mx-1 h-4 w-px shrink-0 bg-border" />
          <Chip active={diagramsOnly} onClick={() => setDiagramsOnly((v) => !v)}><ImageIcon size={12} className="mr-1 inline" />With diagram</Chip>
        </div>
      </div>

      <div className="my-4 flex flex-wrap items-center gap-3 text-sm text-muted">
        <span>{list.length} of {QBANK.length} shown</span>
        <span className="flex flex-1 items-center gap-2 sm:max-w-xs">
          <ProgressBar value={reviewed.length / QBANK.length} tone="good" />
          <span className="shrink-0">{reviewed.length} reviewed</span>
        </span>
      </div>

      {list.length === 0 ? (
        <EmptyState icon={Search} title="No questions match">Try a different topic or clear the search.</EmptyState>
      ) : (
        <>
          {list.slice(0, limit).map((q) => (
            <QuestionRow key={q.idx} q={q} reviewed={reviewedSet.has(q.idx)} onToggleReviewed={() => toggle(q.idx)} />
          ))}
          {limit < list.length && (
            <div className="mt-4 text-center">
              <Button variant="secondary" onClick={() => setLimit((n) => n + PAGE_SIZE)}>
                Show {Math.min(PAGE_SIZE, list.length - limit)} more · {list.length - limit} remaining
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function QBankPage() {
  const [tab, setTab] = useState("browse");
  return (
    <>
      <PageHeader
        eyebrow="Practice"
        title="Question Bank"
        description={`${QBANK.length} interview questions across ${TOPICS.length} topics. Browse to read model answers, or drill them as flashcards with spaced repetition.`}
      />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[{ id: "browse", label: "Browse", icon: Layers }, { id: "cards", label: "Flashcards", icon: SquareStack }]}
      />
      <div className="mt-4">
        {tab === "browse" ? <Browse /> : <Flashcards questions={INDEXED} topics={TOPICS} />}
      </div>
    </>
  );
}
