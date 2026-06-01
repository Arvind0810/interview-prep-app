"use client";
import { useEffect, useState } from "react";
import { QBANK } from "@/data/questions";

const TOPICS = ["All", "Go", "Node", "SQL", "Redis", "Docker", "API", "Next/React", "SysDesign", "Behavioral", "Fintech"];
const DIFFS = ["All", "easy", "med", "hard"];

export default function QBankPage() {
  const [topic, setTopic] = useState("All");
  const [diff, setDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [reviewed, setReviewed] = useState(new Set());

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem("iprep_qReviewed") || "[]");
      setReviewed(new Set(r));
    } catch {}
  }, []);

  const toggleReviewed = (id) => {
    const next = new Set(reviewed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setReviewed(next);
    localStorage.setItem("iprep_qReviewed", JSON.stringify([...next]));
  };

  const list = QBANK.map((q, idx) => ({ ...q, idx })).filter((q) => {
    if (topic !== "All" && q.t !== topic) return false;
    if (diff !== "All" && q.d !== diff) return false;
    if (search && !(q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const diffColor = (d) => (d === "easy" ? "text-emerald-400" : d === "med" ? "text-amber-400" : "text-red-400");

  return (
    <>
      <h1>Question Bank (150+)</h1>
      <p>Filter by topic and difficulty. Click a question to expand the answer. Mark as reviewed to track progress.</p>

      <input
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 bg-panel2 border border-border rounded-md text-sm text-slate-200 my-3 focus:outline-none focus:border-accent"
      />

      <div className="flex flex-wrap gap-2 my-3">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={`px-3 py-1 rounded-full text-xs border ${topic === t ? "bg-accent text-slate-900 border-accent" : "bg-panel border-border text-slate-200"}`}
          >
            {t}
          </button>
        ))}
        <span className="text-xs text-slate-400 self-center border-l border-border pl-3 ml-2">Difficulty:</span>
        {DIFFS.map((d) => (
          <button
            key={d}
            onClick={() => setDiff(d)}
            className={`px-3 py-1 rounded-full text-xs border ${diff === d ? "bg-accent text-slate-900 border-accent" : "bg-panel border-border text-slate-200"}`}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400">{list.length} of {QBANK.length} questions shown • {reviewed.size} reviewed</p>

      {list.length === 0 ? (
        <p className="text-slate-400 mt-4">No questions match your filters.</p>
      ) : (
        list.map((q) => (
          <details key={q.idx} open={reviewed.has(q.idx)}>
            <summary>
              <span className="text-[11px] bg-slate-700 px-2 py-0.5 rounded mr-2">{q.t}</span>
              <span className={`text-[11px] font-bold uppercase mr-2 ${diffColor(q.d)}`}>{q.d}</span>
              {q.q}
            </summary>
            <p className="mt-2">{q.a}</p>
            <button
              onClick={() => toggleReviewed(q.idx)}
              className="mt-2 px-3 py-1 text-sm border border-border rounded text-slate-200 hover:border-accent"
            >
              {reviewed.has(q.idx) ? "✓ Reviewed" : "Mark as reviewed"}
            </button>
          </details>
        ))
      )}
    </>
  );
}
