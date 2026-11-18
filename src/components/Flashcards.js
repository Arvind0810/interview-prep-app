"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Brain, Check, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { KEYS, usePersistentState } from "@/lib/storage";
import { Badge, Button, Chip, EmptyState, Panel, ProgressBar } from "@/components/ui";

// Leitner boxes: a correct answer moves a card up a box and pushes its next review further out.
const INTERVAL_DAYS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
const MASTERED_BOX = 5;
const NEW_PER_SESSION = 10;
const MAX_SESSION = 20;
const ALL = "All";

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (n) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function deckStats(cards, progress) {
  const now = today();
  let due = 0, fresh = 0, mastered = 0;
  for (const c of cards) {
    const p = progress[c.idx];
    if (!p) fresh++;
    else {
      if (p.due <= now) due++;
      if (p.box >= MASTERED_BOX) mastered++;
    }
  }
  return { due, fresh, mastered };
}

function buildSession(cards, progress) {
  const now = today();
  const due = shuffle(cards.filter((c) => progress[c.idx] && progress[c.idx].due <= now));
  const fresh = shuffle(cards.filter((c) => !progress[c.idx])).slice(0, NEW_PER_SESSION);
  return [...due, ...fresh].slice(0, MAX_SESSION);
}

function Card({ card, flipped, onFlip }) {
  const diffTone = { easy: "good", med: "warn", hard: "bad" }[card.d] || "neutral";
  return (
    <button
      type="button"
      onClick={onFlip}
      className="block w-full rounded-2xl border border-border bg-panel p-6 text-left shadow-card transition-colors hover:border-accent/40 md:p-8"
      aria-label={flipped ? "Answer shown" : "Show answer"}
    >
      <div className="mb-4 flex gap-2"><Badge tone="accent">{card.t}</Badge><Badge tone={diffTone}>{card.d}</Badge></div>
      <div className="text-lg font-semibold leading-snug text-fg md:text-xl">{card.q}</div>
      {flipped ? (
        <div className="mt-5 animate-fade-in border-t border-border pt-5 text-[15px] leading-relaxed text-fg/90">{card.a}</div>
      ) : (
        <div className="mt-8 text-sm text-subtle">Answer it out loud first, then tap to reveal · <kbd className="rounded border border-border px-1">Space</kbd></div>
      )}
    </button>
  );
}

export default function Flashcards({ questions, topics }) {
  const [progress, setProgress, loaded] = usePersistentState(KEYS.flashcards, {});
  const [topic, setTopic] = useState(ALL);
  const [queue, setQueue] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [sessionSize, setSessionSize] = useState(0);
  const [cleared, setCleared] = useState(0);

  const deck = useMemo(() => questions.filter((q) => topic === ALL || q.t === topic), [questions, topic]);
  const stats = deckStats(deck, progress);
  const card = queue?.[0];

  const start = () => {
    const session = buildSession(deck, progress);
    setQueue(session);
    setSessionSize(session.length);
    setCleared(0);
    setFlipped(false);
  };

  const grade = useCallback((knewIt) => {
    if (!card) return;
    setProgress((prev) => {
      const box = knewIt ? Math.min(MASTERED_BOX, (prev[card.idx]?.box || 0) + 1) : 1;
      return { ...prev, [card.idx]: { box, due: knewIt ? addDays(INTERVAL_DAYS[box]) : today() } };
    });
    setQueue((q) => (knewIt ? q.slice(1) : [...q.slice(1), q[0]]));
    if (knewIt) setCleared((n) => n + 1);
    setFlipped(false);
  }, [card, setProgress]);

  useEffect(() => {
    if (!card) return undefined;
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " ") { e.preventDefault(); setFlipped(true); }
      else if (flipped && e.key === "1") grade(false);
      else if (flipped && e.key === "2") grade(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, flipped, grade]);

  if (queue && card) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-3 flex items-center justify-between text-sm text-muted">
          <span>{cleared} of {sessionSize} cleared · {queue.length} left</span>
          <button type="button" onClick={() => setQueue(null)} className="text-subtle hover:text-fg">End session</button>
        </div>
        <ProgressBar value={sessionSize ? cleared / sessionSize : 0} className="mb-4" />
        <Card card={card} flipped={flipped} onFlip={() => setFlipped(true)} />
        {flipped && (
          <div className="mt-4 grid grid-cols-2 gap-3 animate-fade-in">
            <Button variant="danger" size="lg" onClick={() => grade(false)}><RotateCcw size={18} /> Review again <kbd className="ml-1 text-xs opacity-60">1</kbd></Button>
            <Button variant="good" size="lg" onClick={() => grade(true)}><Check size={18} /> Knew it <kbd className="ml-1 text-xs opacity-60">2</kbd></Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {queue && (
        <Panel className="mb-4 flex items-center gap-4 border-good/40">
          <Trophy size={28} className="text-good" />
          <div><div className="font-semibold text-fg">Session complete</div><div className="text-sm text-muted">{sessionSize} cards cleared. They&apos;ll come back when they&apos;re due.</div></div>
        </Panel>
      )}

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {[ALL, ...topics].map((t) => <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</Chip>)}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[["Due today", stats.due, "text-warn"], ["New", stats.fresh, "text-accent"], ["Mastered", stats.mastered, "text-good"]].map(([label, n, color]) => (
          <div key={label} className="rounded-xl border border-border bg-panel p-4 text-center">
            <div className={`text-2xl font-bold tabular-nums ${color}`}>{loaded ? n : "–"}</div>
            <div className="text-xs text-muted">{label}</div>
          </div>
        ))}
      </div>

      {stats.due + stats.fresh === 0 ? (
        <div className="mt-6"><EmptyState icon={Sparkles} title="Nothing due in this deck">Come back tomorrow, or pick another topic.</EmptyState></div>
      ) : (
        <Panel className="mt-6 text-center">
          <Brain size={32} className="mx-auto text-accent2" />
          <div className="mt-2 font-semibold text-fg">{topic === ALL ? "All topics" : topic} deck</div>
          <p className="!mt-1 !text-sm text-muted">
            Up to {MAX_SESSION} cards: everything due, plus up to {NEW_PER_SESSION} new ones. Cards you know move to longer intervals ({Object.values(INTERVAL_DAYS).join(", ")} days).
          </p>
          <Button size="lg" onClick={start} className="mt-2">Start session</Button>
        </Panel>
      )}
    </div>
  );
}
