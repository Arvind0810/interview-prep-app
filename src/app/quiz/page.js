"use client";
import { useEffect, useRef, useState } from "react";
import { QUIZZES } from "@/data/quizzes";

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
        <h1>Skill Test — Interactive Quizzes</h1>
        <p>
          Each attempt draws a fresh random set of {ROUND_SIZE} questions from the topic pool, with the answer options
          shuffled too — so retrying covers new ground instead of rewarding memorised positions. Scores are saved
          locally so you can track improvement over time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {Object.entries(QUIZZES).map(([id, quiz]) => (
            <div key={id} className="bg-panel border border-border rounded-xl p-5 text-center">
              <div className="text-4xl">{quiz.emoji}</div>
              <h3 className="text-violet-400 my-2 text-base font-semibold">{quiz.title}</h3>
              <p className="text-xs text-slate-400 m-0">{quiz.desc}</p>
              <p className="text-xs text-slate-400 mt-2">
                {roundSizeFor(quiz)} random of {quiz.questions.length}
                {stats[id] ? ` • Best: ${stats[id].best}%` : ""}
                {stats[id]?.attempts ? ` • ${stats[id].attempts} ${stats[id].attempts === 1 ? "attempt" : "attempts"}` : ""}
              </p>
              <button
                onClick={() => start(id)}
                className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-900 font-semibold rounded-md text-sm"
              >
                Start
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  const quiz = QUIZZES[activeId];

  if (round.length === 0) return null;

  if (idx >= round.length) {
    const pct = Math.round((score / round.length) * 100);
    const verdict = pct >= 80 ? "🎉 Great job!" : pct >= 60 ? "👍 Solid — review the misses below" : "📚 Review the materials section and retry";
    return (
      <>
        <h1>{quiz.emoji} {quiz.title} — Result</h1>
        <p className="text-2xl text-accent">{score} / {round.length} ({pct}%)</p>
        <p>{verdict}</p>
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
          <button onClick={() => start(activeId)} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-900 font-semibold rounded-md">New set of {roundSizeFor(quiz)} →</button>
          <button onClick={back} className="px-4 py-2 border border-border text-slate-200 rounded-md">Pick another quiz</button>
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
      <h1>{quiz.emoji} {quiz.title}</h1>
      <div className="bg-panel border border-border rounded-xl p-5 my-3">
        <div className="h-2 bg-panel2 rounded overflow-hidden my-2">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-slate-400 text-sm">Question {idx + 1} of {round.length} • random set from {quiz.questions.length}</p>
        <h3 className="text-slate-100 mt-0 text-lg font-semibold">{q.q}</h3>
        {q.o.map((opt, i) => {
          let cls = "bg-panel2 border-border hover:border-accent";
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
              className={`block w-full text-left px-3 py-2 my-2 rounded-md border transition-all ${cls} ${answered ? "cursor-default" : "cursor-pointer"}`}
            >
              {String.fromCharCode(65 + i)}. {opt}
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

      <div className="flex flex-wrap gap-3 items-center">
        {answered && (
          <button
            onClick={next}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-900 font-semibold rounded-md"
          >
            {isLast ? "See results →" : "Next question →"}
          </button>
        )}
        <button onClick={back} className="px-4 py-2 border border-border text-slate-200 rounded-md text-sm">← Exit quiz</button>
        {!answered && <span className="text-xs text-slate-500">Pick an answer to see the explanation.</span>}
      </div>
    </>
  );
}
