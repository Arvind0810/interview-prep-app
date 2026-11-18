"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Atom, Boxes, Cpu, Database, Landmark, Network, PlugZap, Settings2, Trophy, Zap } from "lucide-react";
import { QUIZZES } from "@/data/quizzes";
import { Badge, Button, PageHeader, ProgressBar, ProgressRing } from "@/components/ui";

const QUIZ_ICONS = {
  "go-basics": Cpu,
  "go-advanced": Settings2,
  postgres: Database,
  "redis-cache": Zap,
  "system-design": Network,
  "nextjs-react": Atom,
  "apis-microservices": PlugZap,
  "fintech-domain": Landmark,
  "rewards-platform": Boxes,
};
const PASS_PCT = 80;
const OK_PCT = 60;

const ROUND_SIZE = 15;

const shuffled = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Reorders the options and moves the correct-answer index to match.
const withShuffledOptions = (question) => {
  const order = shuffled(question.o.map((_, i) => i));
  return { ...question, o: order.map((i) => question.o[i]), c: order.indexOf(question.c) };
};

const drawRound = (questions) => shuffled(questions).slice(0, ROUND_SIZE).map(withShuffledOptions);

const roundSizeFor = (quiz) => Math.min(ROUND_SIZE, quiz.questions.length);

export default function QuizPage() {
  const [stats, setStats] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [round, setRound] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);
  const recordedRef = useRef(false);
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("iprep_quizStats") || "{}");
      setStats(s);
    } catch {}
    hydratedRef.current = true;
  }, []);

  const start = (id) => {
    recordedRef.current = false;
    setActiveId(id);
    setRound(drawRound(QUIZZES[id].questions));
    setIdx(0);
    setScore(0);
    setAnswers([]);
    setPicked(null);
  };

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === round[idx].c) setScore((s) => s + 1);
    setAnswers((a) => [...a, i]);
  };

  const next = () => {
    setPicked(null);
    setIdx((n) => n + 1);
  };

  useEffect(() => {
    if (!activeId || recordedRef.current || round.length === 0) return;
    if (idx < round.length || answers.length !== round.length) return;

    recordedRef.current = true;
    const pct = Math.round((score / round.length) * 100);
    setStats((prev) => {
      const entry = prev[activeId] || { best: 0, attempts: 0 };
      return { ...prev, [activeId]: { best: Math.max(entry.best, pct), attempts: entry.attempts + 1 } };
    });
    try {
      localStorage.setItem("iprep_lastQuiz", JSON.stringify(pct));
    } catch {}
  }, [idx, answers.length, activeId, score, round.length]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem("iprep_quizStats", JSON.stringify(stats));
    } catch {}
  }, [stats]);

  const back = () => {
    setActiveId(null);
    setRound([]);
  };

  if (!activeId) {
    return (
      <>
        <PageHeader
          eyebrow="Practice"
          title="Skill Tests"
          description={`Each attempt draws ${ROUND_SIZE} random questions from the topic pool, with the options shuffled too, so retrying covers new ground instead of rewarding memorised positions. Best scores feed your dashboard.`}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(QUIZZES).map(([id, quiz]) => {
            const Icon = QUIZ_ICONS[id] || Trophy;
            const best = stats[id]?.best;
            return (
              <div key={id} className="flex flex-col rounded-2xl border border-border bg-panel p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent2/10 text-accent2"><Icon size={22} /></span>
                  {best != null ? <ProgressRing value={best / 100} size={48} /> : <Badge>Not taken</Badge>}
                </div>
                <div className="mt-4 font-semibold text-fg">{quiz.title}</div>
                <div className="mt-0.5 flex-1 text-sm text-muted">{quiz.desc}</div>
                <div className="mt-3 text-xs text-subtle">
                  {roundSizeFor(quiz)} of {quiz.questions.length} questions
                  {stats[id]?.attempts ? ` · ${stats[id].attempts} ${stats[id].attempts === 1 ? "attempt" : "attempts"}` : ""}
                </div>
                <Button onClick={() => start(id)} variant={best != null ? "secondary" : "primary"} className="mt-4 w-full">
                  {best != null ? "Retake" : "Start"} <ArrowRight size={16} />
                </Button>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  const quiz = QUIZZES[activeId];

  if (round.length === 0) return null;

  if (idx >= round.length) {
    const pct = Math.round((score / round.length) * 100);
    const verdict = pct >= PASS_PCT ? "Great job. You're interview-ready on this topic." : pct >= OK_PCT ? "Solid. Review the misses below." : "Review the lesson for this topic, then retry.";
    return (
      <>
        <PageHeader eyebrow="Result" title={quiz.title} />
        <div className="flex items-center gap-5 rounded-2xl border border-border bg-panel p-5 shadow-card">
          <ProgressRing value={pct / 100} size={72} stroke={7} />
          <div>
            <div className="text-2xl font-bold text-fg tabular-nums">{score} / {round.length}</div>
            <div className="text-muted">{verdict}</div>
          </div>
        </div>
        <h3>Review</h3>
        {round.map((q, i) => {
          const ans = answers[i];
          const correct = ans === q.c;
          return (
            <div key={i} className="bg-panel border border-border rounded-xl p-4 my-3">
              <p><b>Q{i + 1}.</b> {q.q}</p>
              <p>
                Your answer: <span className={correct ? "text-emerald-400" : "text-red-400"}>{q.o[ans]}</span>
                {correct ? " ✓" : <> — Correct: <span className="text-emerald-400">{q.o[q.c]}</span></>}
              </p>
              <p className="text-slate-400 text-sm">{q.e}</p>
            </div>
          );
        })}
        <div className="flex flex-wrap gap-3 items-center mt-4">
          <Button onClick={() => start(activeId)}>New set of {roundSizeFor(quiz)} <ArrowRight size={16} /></Button>
          <Button variant="secondary" onClick={back}>Pick another quiz</Button>
          <span className="text-xs text-slate-500">Drawn from a pool of {quiz.questions.length}.</span>
        </div>
      </>
    );
  }

  const q = round[idx];
  const answered = picked !== null;
  const correct = answered && picked === q.c;
  const isLast = idx === round.length - 1;
  const progress = ((idx + (answered ? 1 : 0)) / round.length) * 100;

  return (
    <>
      <PageHeader eyebrow="Skill test" title={quiz.title} />
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-panel p-5 shadow-card md:p-7">
        <div className="mb-2 flex justify-between text-sm text-muted">
          <span>Question {idx + 1} of {round.length}</span>
          <span>{score} correct</span>
        </div>
        <ProgressBar value={progress / 100} />
        <h3 className="!mt-5 text-lg font-semibold !text-fg">{q.q}</h3>
        {q.o.map((opt, i) => {
          let cls = "bg-panel2 border-border hover:border-accent/60";
          if (answered) {
            if (i === q.c) cls = "bg-emerald-900/50 border-emerald-500";
            else if (i === picked) cls = "bg-red-900/50 border-red-500";
            else cls = "bg-panel2 border-border opacity-60";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              disabled={answered}
              className={`my-2 flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-fg transition-all ${cls} ${answered ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border text-xs font-bold text-muted">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          );
        })}

        {answered && (
          <div className={`mt-4 rounded-md border p-4 ${correct ? "border-emerald-600 bg-emerald-900/20" : "border-red-600 bg-red-900/20"}`}>
            <p className={`m-0 font-semibold ${correct ? "text-emerald-400" : "text-red-400"}`}>
              {correct ? "✓ Correct" : `✗ Not quite — the answer is ${String.fromCharCode(65 + q.c)}. ${q.o[q.c]}`}
            </p>
            <p className="text-slate-300 text-sm mt-2 mb-0">{q.e}</p>
          </div>
        )}
      </div>

      <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center gap-3">
        {answered && (
          <Button onClick={next}>
            {isLast ? "See results" : "Next question"} <ArrowRight size={16} />
          </Button>
        )}
        <Button variant="ghost" onClick={back}><ArrowLeft size={16} /> Exit quiz</Button>
        {!answered && <span className="text-xs text-slate-500">Pick an answer to see the explanation.</span>}
      </div>
    </>
  );
}
