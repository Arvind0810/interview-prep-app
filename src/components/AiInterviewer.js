"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle, Bot, CheckCircle2, KeyRound, Loader2, Mic, MicOff, Send, ShieldAlert, Sparkles, Square,
  Trophy, User, Volume2, VolumeX,
} from "lucide-react";
import { COMPANIES } from "@/data/companies";
import { QUESTION_COUNTS, ROUND_OPTIONS, TONE_OPTIONS, roundLabel } from "@/data/aiOptions";
import { KEYS, readJSON, usePersistentState, writeJSON } from "@/lib/storage";
import { Badge, Button, EmptyState, Panel, PanelTitle, ProgressRing, inputClass } from "@/components/ui";

const END_MARKER = "[[END]]";
const ERROR_MARKER = "[[ERROR]]";
const ACCESS_CODE_KEY = "iprep_aiAccessCode";
const HISTORY_LIMIT = 30;
const MAX_ANSWER_CHARS = 4000;
const RUBRIC_KEYS = [["structure", "Structure"], ["depth", "Depth"], ["ownership", "Ownership"], ["concise", "Concise"]];
const VERDICT_TONE = { "Strong hire": "good", Hire: "good", "Lean hire": "warn", "Lean no hire": "bad", "No hire": "bad" };

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const avg = (nums) => (nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0);

// Browser speech APIs are optional — every caller checks for support first.
const SpeechRecognitionImpl = () =>
  typeof window === "undefined" ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null;

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

async function readError(res) {
  try {
    return (await res.json()).error || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

function useDictation(onText) {
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(Boolean(SpeechRecognitionImpl()));
    return () => recRef.current?.abort();
  }, []);

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const Impl = SpeechRecognitionImpl();
    if (!Impl) return;
    const rec = new Impl();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-IN";
    rec.onresult = (e) => {
      const text = Array.from(e.results).slice(e.resultIndex).map((r) => r[0].transcript).join(" ");
      onText(text.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  return { supported, listening, toggle, stop: () => recRef.current?.stop() };
}

function Setup({ status, onStart }) {
  const [company, setCompany] = useState("general");
  const [round, setRound] = useState("technical");
  const [questions, setQuestions] = useState(5);
  const [tone, setTone] = useState("neutral");
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => setAccessCode(readJSON(ACCESS_CODE_KEY, "")), []);

  if (status && !status.configured) {
    return (
      <EmptyState icon={KeyRound} title="Add a free Gemini API key to enable the AI interviewer">
        <ol className="mx-auto mt-3 max-w-md list-decimal space-y-1 pl-5 text-left">
          <li>Create a free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a> and restrict it to the Generative Language API.</li>
          <li>Copy <code>.env.example</code> to <code>.env.local</code> and set <code>GEMINI_API_KEY</code>.</li>
          <li>Restart <code>npm run dev</code>.</li>
        </ol>
      </EmptyState>
    );
  }

  const start = () => {
    if (status?.accessCodeRequired) writeJSON(ACCESS_CODE_KEY, accessCode);
    onStart({ company, round, questions, tone }, accessCode);
  };

  return (
    <Panel>
      <PanelTitle icon={Bot}>Set up your interview</PanelTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          <div className="mb-1 text-muted">Company</div>
          <select value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass}>
            <option value="general">General (fintech product company)</option>
            {COMPANIES.map((c) => <option key={c.slug} value={c.slug}>{c.company} — {c.role}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <div className="mb-1 text-muted">Round</div>
          <select value={round} onChange={(e) => setRound(e.target.value)} className={inputClass}>
            {ROUND_OPTIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <div className="mb-1 text-muted">Main questions</div>
          <select value={questions} onChange={(e) => setQuestions(Number(e.target.value))} className={inputClass}>
            {QUESTION_COUNTS.map((n) => <option key={n} value={n}>{n} (plus follow-ups)</option>)}
          </select>
        </label>
        <label className="text-sm">
          <div className="mb-1 text-muted">Interviewer style</div>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputClass}>
            {TONE_OPTIONS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </label>
        {status?.accessCodeRequired && (
          <label className="text-sm md:col-span-2">
            <div className="mb-1 text-muted">Access code</div>
            <input type="password" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className={inputClass} autoComplete="off" />
          </label>
        )}
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-warn/40 bg-warn/10 p-3 text-sm text-fg">
        <ShieldAlert size={18} className="mt-0.5 shrink-0 text-warn" />
        <span>
          This uses Gemini&apos;s <b>free tier</b>. Google says free-tier content is used to improve its products, so
          don&apos;t type anything confidential (client secrets, internal URLs, real salary slips). Transcripts are
          stored only in this browser.
        </span>
      </div>
      <Button size="lg" className="mt-4" onClick={start} disabled={!status}>
        <Sparkles size={18} /> Start interview
      </Button>
    </Panel>
  );
}

function Bubble({ message, streaming }) {
  const isAi = message.role === "interviewer";
  return (
    <div className={`flex gap-3 ${isAi ? "" : "flex-row-reverse"}`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isAi ? "bg-accent2/15 text-accent2" : "bg-accent/15 text-accent"}`}>
        {isAi ? <Bot size={16} /> : <User size={16} />}
      </span>
      <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${isAi ? "rounded-tl-sm border border-border bg-panel text-fg" : "rounded-tr-sm bg-accent/15 text-fg"}`}>
        {message.text || (streaming ? <Loader2 size={16} className="animate-spin text-subtle" /> : "")}
        {streaming && message.text && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />}
        {message.secs != null && <div className="mt-1 text-right text-[11px] text-subtle">{fmt(message.secs)}</div>}
      </div>
    </div>
  );
}

function Report({ grade, meta, onRestart }) {
  const all = grade.answers.flatMap((a) => Object.values(a.scores));
  const overall = avg(all);
  return (
    <div className="space-y-4">
      <Panel className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ProgressRing value={overall / 4} size={72} stroke={7} label={overall.toFixed(1)} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={VERDICT_TONE[grade.overall.verdict] || "neutral"}>{grade.overall.verdict}</Badge>
            <span className="text-sm text-subtle">{roundLabel(meta.round)} · {meta.companyLabel} · graded by {meta.model}</span>
          </div>
          <p className="!mb-0 !mt-2 text-fg">{grade.overall.summary}</p>
        </div>
        <Button variant="secondary" onClick={onRestart}>New interview</Button>
      </Panel>

      <Panel>
        <PanelTitle icon={Trophy}>Scores by answer (1–4)</PanelTitle>
        <table className="!my-0">
          <thead><tr><th>Question</th>{RUBRIC_KEYS.map(([, l]) => <th key={l}>{l}</th>)}</tr></thead>
          <tbody>
            {grade.answers.map((a) => (
              <tr key={a.question}>
                <td>
                  <div className="font-semibold">{a.question}</div>
                  <div className="mt-1 text-sm text-muted">{a.evidence}</div>
                  <Badge tone="accent" className="mt-1">{a.topic}</Badge>
                </td>
                {RUBRIC_KEYS.map(([k]) => (
                  <td key={k} className={`text-center font-bold ${a.scores[k] >= 3 ? "text-good" : a.scores[k] === 2 ? "text-warn" : "text-bad"}`}>{a.scores[k]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <PanelTitle icon={CheckCircle2}>Strengths</PanelTitle>
          <ul className="!mt-0">{grade.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </Panel>
        <Panel>
          <PanelTitle icon={AlertTriangle}>Gaps to fix</PanelTitle>
          <ul className="!mt-0">{grade.gaps.map((s) => <li key={s}>{s}</li>)}</ul>
        </Panel>
      </div>

      {grade.overclaims.length > 0 && (
        <Panel className="border-bad/40">
          <PanelTitle icon={ShieldAlert}>Possible overclaims</PanelTitle>
          <ul className="!mt-0">{grade.overclaims.map((s) => <li key={s}>{s}</li>)}</ul>
        </Panel>
      )}

      {grade.improvedAnswers.length > 0 && (
        <Panel>
          <PanelTitle icon={Sparkles}>How your weakest answers could sound</PanelTitle>
          {grade.improvedAnswers.map((x) => (
            <details key={x.question}>
              <summary>{x.question}</summary>
              <p className="!mb-0 whitespace-pre-wrap">{x.betterAnswer}</p>
            </details>
          ))}
        </Panel>
      )}
    </div>
  );
}

export default function AiInterviewer() {
  const [status, setStatus] = useState(null);
  const [config, setConfig] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [finished, setFinished] = useState(false);
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState(null);
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const [readAloud, setReadAloud] = usePersistentState("iprep_aiReadAloud", false);
  const [answerSecs, setAnswerSecs] = useState(0);
  const abortRef = useRef(null);
  const bottomRef = useRef(null);

  const dictation = useDictation((text) => setDraft((d) => (d ? `${d} ${text}` : text).slice(0, MAX_ANSWER_CHARS)));

  useEffect(() => {
    fetch("/api/interview")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ configured: false, accessCodeRequired: false }));
    return () => {
      abortRef.current?.abort();
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  // Per-answer timer runs while it's the candidate's turn.
  const yourTurn = config && !streaming && !finished && !grade && messages.length > 0;
  useEffect(() => {
    if (!yourTurn) return undefined;
    setAnswerSecs(0);
    const id = setInterval(() => setAnswerSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [yourTurn, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const headers = useCallback(
    (code) => ({ "Content-Type": "application/json", ...(code ? { "x-access-code": code } : {}) }),
    []
  );

  const requestTurn = useCallback(async (cfg, history, code) => {
    setError("");
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    setMessages([...history, { role: "interviewer", text: "" }]);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: headers(code),
        body: JSON.stringify({ config: cfg, messages: history.map(({ role, text }) => ({ role, text })) }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(await readError(res));
      setModel(res.headers.get("X-Model") || "");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "interviewer", text: text.replace(END_MARKER, "").trimEnd() }]);
      }
      if (text.includes(ERROR_MARKER)) throw new Error("The interviewer's reply was cut off. Send your answer again.");
      const clean = text.replace(END_MARKER, "").trim();
      setMessages([...history, { role: "interviewer", text: clean }]);
      if (text.includes(END_MARKER)) setFinished(true);
      if (readAloud) speak(clean);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
      // Drop the partial interviewer bubble and hand the unsent answer back for a retry.
      const last = history[history.length - 1];
      if (last?.role === "candidate") {
        setDraft(last.text);
        setMessages(history.slice(0, -1));
      } else {
        setMessages(history);
      }
    } finally {
      setStreaming(false);
    }
  }, [headers, readAloud]);

  const start = (cfg, code) => {
    setConfig(cfg);
    setAccessCode(code);
    setMessages([]);
    setFinished(false);
    setGrade(null);
    requestTurn(cfg, [], code);
  };

  const send = () => {
    const text = draft.trim();
    if (!text || streaming) return;
    dictation.stop();
    const history = [...messages, { role: "candidate", text, secs: answerSecs }];
    setDraft("");
    requestTurn(config, history, accessCode);
  };

  const gradeInterview = async () => {
    abortRef.current?.abort();
    setStreaming(false);
    setGrading(true);
    setError("");
    try {
      const transcript = messages.filter((m) => m.text).map(({ role, text }) => ({ role, text }));
      const res = await fetch("/api/interview/grade", {
        method: "POST",
        headers: headers(accessCode),
        body: JSON.stringify({ config, messages: transcript }),
      });
      if (!res.ok) throw new Error(await readError(res));
      const data = await res.json();
      setGrade(data.grade);
      setModel(data.model);
      saveSession(data.grade);
    } catch (err) {
      setError(err.message);
    } finally {
      setGrading(false);
    }
  };

  // Graded answers join the existing mock history, so dashboard readiness picks them up.
  const saveSession = (g) => {
    const secsByOrder = messages.filter((m) => m.role === "candidate").map((m) => m.secs || 0);
    const session = {
      at: new Date().toISOString(),
      track: `AI · ${roundLabel(config.round)}`,
      source: "ai",
      company: config.company,
      verdict: g.overall.verdict,
      items: g.answers.map((a, i) => ({
        t: a.topic,
        kind: a.topic === "Behavioral" ? "behavioral" : "technical",
        q: a.question,
        secs: secsByOrder[i] || 0,
        scores: a.scores,
      })),
    };
    writeJSON(KEYS.mockSessions, [...readJSON(KEYS.mockSessions, []), session].slice(-HISTORY_LIMIT));
  };

  const restart = () => {
    abortRef.current?.abort();
    setConfig(null);
    setMessages([]);
    setGrade(null);
    setFinished(false);
    setError("");
  };

  const companyLabel = config?.company === "general" ? "General" : COMPANIES.find((c) => c.slug === config?.company)?.company;

  if (grade) return <Report grade={grade} meta={{ round: config.round, companyLabel, model }} onRestart={restart} />;
  if (!config) return <Setup status={status} onStart={start} />;

  const answered = messages.filter((m) => m.role === "candidate").length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone="violet">{roundLabel(config.round)}</Badge>
        <Badge>{companyLabel}</Badge>
        <Badge>{answered} answered</Badge>
        {model && <span className="text-xs text-subtle">{model}</span>}
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => setReadAloud((v) => !v)}
          className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-panel2 hover:text-fg"
          title={readAloud ? "Stop reading questions aloud" : "Read questions aloud"}
          aria-pressed={readAloud}
        >
          {readAloud ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <Button variant="ghost" size="sm" onClick={restart}><Square size={14} /> Quit</Button>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-panel2 p-4 md:p-5" aria-live="polite">
        {messages.map((m, i) => (
          <Bubble key={i} message={m} streaming={streaming && i === messages.length - 1 && m.role === "interviewer"} />
        ))}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-bad/40 bg-bad/10 p-3 text-sm text-fg" role="alert">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-bad" /> {error}
        </div>
      )}

      {finished || grading ? (
        <Panel className="mt-4 text-center">
          <div className="font-semibold text-fg">{grading ? "Grading your interview…" : "Interview complete"}</div>
          <p className="!mt-1 text-sm text-muted">You&apos;ll get scores for each answer, gaps, possible overclaims and stronger versions of your weakest answers.</p>
          <Button size="lg" onClick={gradeInterview} disabled={grading}>
            {grading ? <Loader2 size={18} className="animate-spin" /> : <Trophy size={18} />} {grading ? "Grading…" : "Get my scorecard"}
          </Button>
        </Panel>
      ) : (
        <div className="mt-4 rounded-2xl border border-border bg-panel p-3 shadow-card">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_ANSWER_CHARS))}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); } }}
            rows={4}
            disabled={streaming}
            placeholder={streaming ? "Interviewer is typing…" : "Answer as you would out loud… (⌘/Ctrl + Enter to send)"}
            className="w-full resize-y bg-transparent text-[15px] text-fg placeholder:text-subtle focus:outline-none"
            aria-label="Your answer"
          />
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className={`font-mono text-sm tabular-nums ${answerSecs > 150 ? "text-bad" : "text-muted"}`}>{yourTurn ? fmt(answerSecs) : "–:––"}</span>
            {dictation.supported && (
              <Button variant={dictation.listening ? "danger" : "secondary"} size="sm" onClick={dictation.toggle} disabled={streaming} aria-pressed={dictation.listening}>
                {dictation.listening ? <><MicOff size={14} /> Stop dictation</> : <><Mic size={14} /> Dictate</>}
              </Button>
            )}
            <span className="flex-1" />
            {answered > 0 && (
              <Button variant="ghost" size="sm" onClick={gradeInterview} disabled={streaming}>End &amp; grade</Button>
            )}
            <Button size="sm" onClick={send} disabled={streaming || !draft.trim()}><Send size={14} /> Send</Button>
          </div>
        </div>
      )}
    </div>
  );
}
