"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QBANK } from "@/data/questions";
import { STORIES } from "@/data/stories";
import { Bot, ClipboardCheck } from "lucide-react";
import { KEYS, usePersistentState } from "@/lib/storage";
import AiInterviewer from "@/components/AiInterviewer";
import { PageHeader, Tabs } from "@/components/ui";

const RUBRIC = [
  { key: "structure", label: "Structure", hint: "Answered first, then expanded. STAR shape for stories." },
  { key: "depth", label: "Depth", hint: "Went past the definition into a real example or trade-off." },
  { key: "ownership", label: "Ownership", hint: "Clear about what I did versus the team. No bluffing." },
  { key: "concise", label: "Concise", hint: "Finished within the target time and stopped talking." },
];
const SCALE = [1, 2, 3, 4];
const TARGET_SECS = { technical: 120, behavioral: 150 };
const ROUND_SIZES = [3, 5, 8];
const HISTORY_LIMIT = 30;
const MIXED = "Mixed";

const TECH_TOPICS = [...new Set(QBANK.map((q) => q.t))].filter((t) => t !== "Behavioral");

const STORY_PROMPTS = STORIES.flatMap((s) =>
  s.answers.map((q) => ({ t: "Behavioral", q, story: s.title, kind: "behavioral" }))
);

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildPool(track, topic) {
  const tech = QBANK.filter((q) => q.t !== "Behavioral" && (topic === MIXED || q.t === topic)).map((q) => ({
    t: q.t, q: q.q, a: q.a, kind: "technical",
  }));
  if (track === "technical") return tech;
  if (track === "behavioral") return STORY_PROMPTS;
  return [...tech, ...STORY_PROMPTS];
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const avg = (nums) => (nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0);

function Setup({ onStart, history }) {
  const [track, setTrack] = useState("mixed");
  const [topic, setTopic] = useState(MIXED);
  const [size, setSize] = useState(5);
  const poolSize = buildPool(track, topic).length;

  return (
    <>
      <div className="bg-panel border border-border rounded-xl p-5 my-4 grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          <div className="text-slate-400 mb-1">Round type</div>
          <select value={track} onChange={(e) => setTrack(e.target.value)} className="w-full px-3 py-2 bg-panel2 border border-border rounded-md">
            <option value="mixed">Mixed (like a real loop)</option>
            <option value="technical">Technical only</option>
            <option value="behavioral">Behavioral only</option>
          </select>
        </label>
        <label className="text-sm">
          <div className="text-slate-400 mb-1">Technical topic</div>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} disabled={track === "behavioral"} className="w-full px-3 py-2 bg-panel2 border border-border rounded-md disabled:opacity-50">
            {[MIXED, ...TECH_TOPICS].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <div className="text-slate-400 mb-1">Questions</div>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full px-3 py-2 bg-panel2 border border-border rounded-md">
            {ROUND_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <div className="md:col-span-3 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onStart(shuffle(buildPool(track, topic)).slice(0, size), track)}
            disabled={poolSize === 0}
            className="px-5 py-2 rounded-md bg-gradient-to-r from-cyan-700 to-violet-700 text-white font-semibold disabled:opacity-50"
          >
            Start mock round
          </button>
          <span className="text-sm text-slate-400">{poolSize} questions in this pool</span>
        </div>
      </div>

      {history.length > 0 && (
        <>
          <h2>Recent rounds</h2>
          <table>
            <thead><tr><th>Date</th><th>Type</th><th>Questions</th><th>Average (1–4)</th></tr></thead>
            <tbody>
              {history.slice(-5).reverse().map((s) => (
                <tr key={s.at}>
                  <td>{new Date(s.at).toLocaleDateString()}</td>
                  <td>{s.track}</td>
                  <td>{s.items.length}</td>
                  <td>{avg(s.items.flatMap((it) => Object.values(it.scores))).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

function Timer({ running, target, onTick }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  useEffect(() => onTick(secs), [secs, onTick]);
  const over = secs > target;
  return (
    <div className={`text-3xl font-mono font-bold ${over ? "text-bad" : "text-accent"}`}>
      {fmt(secs)} <span className="text-sm text-slate-400 font-sans font-normal">/ target {fmt(target)}</span>
    </div>
  );
}

function Question({ item, index, total, onDone }) {
  const [phase, setPhase] = useState("answer");
  const [secs, setSecs] = useState(0);
  const [scores, setScores] = useState({});
  const complete = RUBRIC.every((r) => scores[r.key]);

  return (
    <div className="bg-panel border border-border rounded-xl p-5 my-4">
      <div className="text-sm text-slate-400 mb-2">Question {index + 1} of {total} · {item.t}</div>
      <div className="text-xl text-fg font-semibold mb-4">{item.q}</div>

      <Timer running={phase === "answer"} target={TARGET_SECS[item.kind]} onTick={setSecs} />
      <p className="text-sm text-slate-400">Answer out loud, as if the interviewer were there. Don&apos;t read ahead.</p>

      {phase === "answer" ? (
        <button onClick={() => setPhase("review")} className="px-5 py-2 rounded-md bg-panel border border-border text-fg hover:border-accent/60 font-semibold">
          I&apos;m done answering
        </button>
      ) : (
        <>
          <div className="border border-border rounded-lg p-4 my-3 bg-panel2">
            <div className="text-[11px] uppercase tracking-wider text-accent2 mb-1">
              {item.kind === "technical" ? "Reference answer" : "Best story for this"}
            </div>
            {item.kind === "technical" ? (
              <p className="m-0">{item.a}</p>
            ) : (
              <p className="m-0">{item.story} — <Link href="/behavioral">open in Story bank</Link></p>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {RUBRIC.map((r) => (
              <div key={r.key}>
                <div className="font-semibold text-[15px]">{r.label}</div>
                <div className="text-xs text-slate-400 mb-1">{r.hint}</div>
                <div className="flex gap-2">
                  {SCALE.map((n) => (
                    <button
                      key={n}
                      onClick={() => setScores((s) => ({ ...s, [r.key]: n }))}
                      aria-pressed={scores[r.key] === n}
                      className={`w-10 h-10 rounded-md border ${scores[r.key] === n ? "bg-cyan-700 border-accent text-white" : "border-border text-slate-300"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onDone({ t: item.t, kind: item.kind, q: item.q, secs, scores })}
            disabled={!complete}
            className="mt-4 px-5 py-2 rounded-md bg-gradient-to-r from-cyan-700 to-violet-700 text-white font-semibold disabled:opacity-40"
          >
            {index + 1 === total ? "Finish round" : "Next question"}
          </button>
        </>
      )}
    </div>
  );
}

function Summary({ session, onRestart }) {
  const byCriterion = RUBRIC.map((r) => ({ ...r, avg: avg(session.items.map((it) => it.scores[r.key])) }));
  const overTime = session.items.filter((it) => it.secs > TARGET_SECS[it.kind]).length;
  const weakest = [...byCriterion].sort((a, b) => a.avg - b.avg)[0];

  return (
    <div className="bg-panel border border-border rounded-xl p-5 my-4">
      <h2 className="mt-0">Round complete</h2>
      <table>
        <thead><tr><th>Criterion</th><th>Average (1–4)</th></tr></thead>
        <tbody>{byCriterion.map((r) => <tr key={r.key}><td>{r.label}</td><td>{r.avg.toFixed(1)}</td></tr>)}</tbody>
      </table>
      <p><b>Over time:</b> {overTime} of {session.items.length} answers.</p>
      <p className="text-amber-300"><b>Work on next:</b> {weakest.label}. {weakest.hint}</p>
      <button onClick={onRestart} className="px-5 py-2 rounded-md bg-panel border border-border text-fg hover:border-accent/60 font-semibold">New round</button>
    </div>
  );
}

function SelfScoredMock() {
  const [history, setHistory] = usePersistentState(KEYS.mockSessions, []);
  const [round, setRound] = useState(null);
  const [track, setTrack] = useState("mixed");
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(null);

  const start = (questions, chosenTrack) => {
    setRound(questions);
    setTrack(chosenTrack);
    setResults([]);
    setFinished(null);
  };

  const record = (result) => {
    const next = [...results, result];
    if (next.length < round.length) {
      setResults(next);
      return;
    }
    const session = { at: new Date().toISOString(), track, items: next };
    setHistory((prev) => [...prev, session].slice(-HISTORY_LIMIT));
    setFinished(session);
    setRound(null);
  };

  const current = useMemo(() => (round ? round[results.length] : null), [round, results.length]);

  return (
    <>
      <p className="text-muted">
        Each question is timed, and you score yourself honestly on the same four things an interviewer
        notes. Your scores feed the dashboard&apos;s readiness view.
      </p>

      {finished && <Summary session={finished} onRestart={() => setFinished(null)} />}
      {!finished && current && (
        <Question key={results.length} item={current} index={results.length} total={round.length} onDone={record} />
      )}
      {!finished && !current && <Setup onStart={start} history={history} />}
    </>
  );
}

export default function MockPage() {
  const [tab, setTab] = usePersistentState("iprep_mockTab", "ai");
  return (
    <>
      <PageHeader
        eyebrow="Practice"
        title="Mock Interview"
        description="Reading answers isn't practice. Saying them under pressure is. Run a live interview with an AI interviewer that asks follow-ups on what you actually say, or drill timed questions and score yourself."
      />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[{ id: "ai", label: "AI Interviewer", icon: Bot }, { id: "self", label: "Self-scored", icon: ClipboardCheck }]}
      />
      <div className="mt-5">{tab === "ai" ? <AiInterviewer /> : <SelfScoredMock />}</div>
    </>
  );
}
