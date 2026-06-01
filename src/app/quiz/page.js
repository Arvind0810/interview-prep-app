"use client";
import { useEffect, useState } from "react";
import { QUIZZES } from "@/data/quizzes";

export default function QuizPage() {
  const [stats, setStats] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("iprep_quizStats") || "{}");
      setStats(s);
    } catch {}
  }, []);

  const start = (id) => {
    setActiveId(id);
    setIdx(0);
    setScore(0);
    setAnswers([]);
    setPicked(null);
  };

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    const q = QUIZZES[activeId].questions[idx];
    const correct = i === q.c;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, i]);
    setTimeout(() => {
      setPicked(null);
      setIdx((n) => n + 1);
    }, 900);
  };

  useEffect(() => {
    if (!activeId) return;
    const quiz = QUIZZES[activeId];
    if (idx >= quiz.questions.length && answers.length === quiz.questions.length) {
      const pct = Math.round((score / quiz.questions.length) * 100);
      const s = { ...stats };
      s[activeId] = s[activeId] || { best: 0, attempts: 0 };
      s[activeId].best = Math.max(s[activeId].best, pct);
      s[activeId].attempts++;
      setStats(s);
      localStorage.setItem("iprep_quizStats", JSON.stringify(s));
      localStorage.setItem("iprep_lastQuiz", JSON.stringify(pct));
    }
  }, [idx, answers.length, activeId, score, stats]);

  const back = () => {
    setActiveId(null);
  };

  if (!activeId) {
    return (
      <>
        <h1>Skill Test — Interactive Quizzes</h1>
        <p>Test yourself on each topic. Scores are saved locally so you can track improvement over time.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {Object.entries(QUIZZES).map(([id, quiz]) => (
            <div key={id} className="bg-panel border border-border rounded-xl p-5 text-center">
              <div className="text-4xl">{quiz.emoji}</div>
              <h3 className="text-violet-400 my-2 text-base font-semibold">{quiz.title}</h3>
              <p className="text-xs text-slate-400 m-0">{quiz.desc}</p>
              <p className="text-xs text-slate-400 mt-2">
                {quiz.questions.length} questions{stats[id] ? ` • Best: ${stats[id].best}%` : ""}
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

  if (idx >= quiz.questions.length) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    const verdict = pct >= 80 ? "🎉 Great job!" : pct >= 60 ? "👍 Solid — review the misses below" : "📚 Review the materials section and retry";
    return (
      <>
        <h1>{quiz.emoji} {quiz.title} — Result</h1>
        <p className="text-2xl text-accent">{score} / {quiz.questions.length} ({pct}%)</p>
        <p>{verdict}</p>
        <h3>Review</h3>
        {quiz.questions.map((q, i) => {
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
        <div className="flex gap-3 mt-4">
          <button onClick={() => start(activeId)} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-900 font-semibold rounded-md">Retry</button>
          <button onClick={back} className="px-4 py-2 border border-border text-slate-200 rounded-md">Pick another quiz</button>
        </div>
      </>
    );
  }

  const q = quiz.questions[idx];

  return (
    <>
      <h1>{quiz.emoji} {quiz.title}</h1>
      <div className="bg-panel border border-border rounded-xl p-5 my-3">
        <div className="h-2 bg-panel2 rounded overflow-hidden my-2">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: `${(idx / quiz.questions.length) * 100}%` }} />
        </div>
        <p className="text-slate-400 text-sm">Question {idx + 1} of {quiz.questions.length}</p>
        <h3 className="text-slate-100 mt-0 text-lg font-semibold">{q.q}</h3>
        {q.o.map((opt, i) => {
          let cls = "bg-panel2 border-border";
          if (picked !== null) {
            if (i === q.c) cls = "bg-emerald-900/50 border-emerald-500";
            else if (i === picked) cls = "bg-red-900/50 border-red-500";
          }
          return (
            <div
              key={i}
              onClick={() => pick(i)}
              className={`block px-3 py-2 my-2 rounded-md border cursor-pointer transition-all ${cls} hover:border-accent`}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </div>
          );
        })}
      </div>
      <button onClick={back} className="px-4 py-2 border border-border text-slate-200 rounded-md text-sm">← Exit quiz</button>
    </>
  );
}
