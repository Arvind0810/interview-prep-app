"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, BookOpen, CalendarClock, CheckCircle2, Flame, GraduationCap,
  Layers, ListChecks, PlayCircle, Target, Timer,
} from "lucide-react";
import { CHECKLISTS } from "@/data/checklists";
import { LESSONS } from "@/data/nav";
import { KEYS, readJSON } from "@/lib/storage";
import { computeReadiness } from "@/lib/readiness";
import { Button, PageHeader, Panel, PanelTitle, ProgressBar, StatTile } from "@/components/ui";

const READY = 0.75;
const OK = 0.4;
const CLOSED = new Set(["Rejected", "Withdrawn"]);
const ACTIVITY_DAYS = 14;
const DAY_MS = 86400000;

const toneFor = (s) => (s >= READY ? "good" : s >= OK ? "warn" : "bad");
const isoDay = (offset) => new Date(Date.now() - offset * DAY_MS).toISOString().slice(0, 10);

function loadState() {
  const checklists = Object.fromEntries(
    Object.keys(CHECKLISTS).map((id) => [id, readJSON(KEYS.checklistPrefix + id, [])])
  );
  return {
    checklists,
    quizStats: readJSON(KEYS.quizStats, {}),
    storiesReady: readJSON(KEYS.storiesReady, []),
    mockSessions: readJSON(KEYS.mockSessions, []),
    pipeline: readJSON(KEYS.pipeline, []),
    lessonsDone: readJSON(KEYS.lessonsDone, []),
    lastLesson: readJSON(KEYS.lastLesson, null),
    studyDays: readJSON(KEYS.studyDays, []),
    flashcards: readJSON(KEYS.flashcards, {}),
    qReviewed: readJSON(KEYS.qReviewed, []),
  };
}

function streakOf(days) {
  const set = new Set(days);
  let streak = 0;
  // Today not studied yet doesn't break yesterday's streak.
  for (let i = set.has(isoDay(0)) ? 0 : 1; set.has(isoDay(i)); i++) streak++;
  return streak;
}

function RoundBar({ round }) {
  const pct = Math.round(round.score * 100);
  return (
    <details className="!my-1.5 !bg-transparent">
      <summary className="flex list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
        <span className="w-32 shrink-0 text-sm font-semibold text-fg sm:w-40">{round.label}</span>
        <ProgressBar value={round.score} tone={toneFor(round.score)} className="flex-1" />
        <span className="w-10 text-right text-sm tabular-nums text-muted">{pct}%</span>
      </summary>
      <ul className="!mt-2 text-sm">
        {round.parts.map(([label, v]) => <li key={label} className="text-muted">{label}: {Math.round(v * 100)}%</li>)}
      </ul>
      <Link href={round.href} className="text-sm">Prepare this round →</Link>
    </details>
  );
}

function NextInterview({ pipeline }) {
  const today = isoDay(0);
  const next = pipeline
    .filter((e) => !CLOSED.has(e.stage) && e.nextDate && e.nextDate >= today)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))[0];
  if (!next) {
    return (
      <>
        <p className="!mt-0 text-sm text-muted">Nothing scheduled yet. Add your active processes and the next round shows up here.</p>
        <Button href="/pipeline" variant="secondary" size="sm">Open pipeline <ArrowRight size={14} /></Button>
      </>
    );
  }
  const days = Math.round((new Date(next.nextDate) - new Date(today)) / DAY_MS);
  return (
    <>
      <div className="text-lg font-semibold text-fg">{next.company}</div>
      <div className="text-sm text-muted">{next.stage}{next.interviewer ? ` · with ${next.interviewer}` : ""}</div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-warn/10 px-3 py-1.5 text-sm font-semibold text-warn">
        <CalendarClock size={16} /> {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`} · {next.nextDate}
      </div>
      <div className="mt-3"><Link href="/interview-day" className="text-sm">Interview-day checklist →</Link></div>
    </>
  );
}

function ContinueLearning({ lastLesson, lessonsDone }) {
  const last = lastLesson && LESSONS.find((l) => l.href === lastLesson.href && !lessonsDone.includes(l.href));
  const target = last || LESSONS.find((l) => !lessonsDone.includes(l.href));
  const done = LESSONS.filter((l) => lessonsDone.includes(l.href)).length;
  return (
    <>
      <div className="mb-3 flex items-center gap-3">
        <ProgressBar value={done / LESSONS.length} className="flex-1" />
        <span className="text-sm tabular-nums text-muted">{done}/{LESSONS.length}</span>
      </div>
      {target ? (
        <Link href={last && lastLesson.section ? `${target.href}#${lastLesson.section}` : target.href} className="group flex items-center gap-3 rounded-xl border border-border bg-panel2 p-3 no-underline hover:border-accent/50 hover:no-underline">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><target.icon size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-subtle">{last ? "Continue" : "Up next"}</span>
            <span className="block truncate font-semibold text-fg group-hover:text-accent">{target.label}</span>
          </span>
          <PlayCircle size={20} className="text-accent" />
        </Link>
      ) : (
        <p className="!m-0 text-sm text-good">All lessons complete.</p>
      )}
    </>
  );
}

function ActivityStrip({ days }) {
  const set = new Set(days);
  const cells = Array.from({ length: ACTIVITY_DAYS }, (_, i) => isoDay(ACTIVITY_DAYS - 1 - i));
  return (
    <div className="flex gap-1.5" aria-label={`Study activity, last ${ACTIVITY_DAYS} days`}>
      {cells.map((d) => (
        <span key={d} title={d} className={`h-7 flex-1 rounded-md ${set.has(d) ? "bg-gradient-to-t from-cyan-600 to-violet-500" : "bg-border/60"}`} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [state, setState] = useState(null);
  useEffect(() => setState(loadState()), []);

  if (!state) return <div className="h-96 animate-pulse rounded-2xl bg-panel" />;

  const readiness = computeReadiness(state);
  const overall = readiness.rounds.reduce((a, r) => a + r.score, 0) / readiness.rounds.length;
  const mastered = Object.values(state.flashcards).filter((c) => c.box >= 5).length;
  const mockCount = state.mockSessions.length;
  const streak = streakOf(state.studyDays);

  return (
    <>
      <PageHeader
        eyebrow="Your game plan"
        title="Welcome back, Arvind"
        description="Prepare round by round. Fix your weakest area, keep learning, and keep every process in your pipeline moving."
        actions={<><Button href="/mock"><Timer size={16} /> Start a mock round</Button><Button href="/qbank" variant="secondary"><Layers size={16} /> Flashcards</Button></>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Target} value={`${Math.round(overall * 100)}%`} label="Overall readiness" />
        <StatTile icon={Flame} value={streak} label="day streak" tone="warn" />
        <StatTile icon={BookOpen} value={`${state.qReviewed.length}`} label={`reviewed · ${mastered} cards mastered`} tone="violet" />
        <StatTile icon={ListChecks} value={mockCount} label="mock rounds done" tone="good" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelTitle icon={CalendarClock}>Next interview</PanelTitle>
          <NextInterview pipeline={state.pipeline} />
        </Panel>
        <Panel>
          <PanelTitle icon={GraduationCap} action={<Link href="/learn" className="text-xs">All lessons</Link>}>Continue learning</PanelTitle>
          <ContinueLearning lastLesson={state.lastLesson} lessonsDone={state.lessonsDone} />
        </Panel>
        <Panel>
          <PanelTitle icon={AlertTriangle}>Fix these first</PanelTitle>
          {readiness.weak.length > 0 ? (
            <ol className="!m-0 !ml-5 space-y-1">
              {readiness.weak.map((w) => <li key={w.label} className="!text-sm"><Link href={w.href}>{w.label}</Link></li>)}
            </ol>
          ) : (
            <p className="!m-0 text-sm text-muted">No weak areas flagged yet. Take a quiz or a mock round to get a signal.</p>
          )}
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <PanelTitle icon={Target}>Readiness by round</PanelTitle>
          <p className="!mt-0 text-sm text-muted">Built from checklists, quiz best scores, mock self-scores and story prep. Open a round to see what feeds it.</p>
          {readiness.rounds.map((r) => <RoundBar key={r.key} round={r} />)}
        </Panel>
        <Panel>
          <PanelTitle icon={Activity}>Last {ACTIVITY_DAYS} days</PanelTitle>
          <ActivityStrip days={state.studyDays} />
          <p className="!mb-0 text-sm text-muted">
            {streak > 0 ? `${streak}-day streak. Keep it going.` : "Open any lesson or practice page to log today."}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <CheckCircle2 size={16} className="text-good" />
            {state.studyDays.length} study days in total
          </div>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelTitle icon={Layers}>How a loop runs, and where to prepare for each round</PanelTitle>
        <table className="!my-0">
          <thead><tr><th>Round</th><th>They&apos;re deciding</th><th>Prepare with</th></tr></thead>
          <tbody>
            <tr><td>1. Recruiter screen</td><td>Can I sell this profile? Is the CTC and notice period workable?</td><td><Link href="/recruiter-screen">Recruiter Screen</Link></td></tr>
            <tr><td>2. Technical</td><td>Can they code, and do they really understand their own work?</td><td><Link href="/technical-round">Technical</Link> · <Link href="/mock">Mock</Link></td></tr>
            <tr><td>3. System design</td><td>Do they reason about trade-offs at scale?</td><td><Link href="/sysdesign">System Design</Link></td></tr>
            <tr><td>4. Hiring manager</td><td>Would I trust them with a real problem?</td><td><Link href="/behavioral">Stories</Link></td></tr>
            <tr><td>5. Offer</td><td>The lowest number they&apos;ll happily accept.</td><td><Link href="/offer">Offer &amp; Negotiation</Link></td></tr>
          </tbody>
        </table>
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelTitle icon={BookOpen}>Resume facts to say exactly</PanelTitle>
          <ul className="!mt-0">
            <li><b>Experience:</b> ~6 years total, ~3.5 in production Go (since Jan 2023).</li>
            <li><b>Current:</b> NeoSOFT Technologies, deployed full-time to 1Finance.</li>
            <li><b>Owned end to end:</b> Magazine, In-the-News V3, HR Conclave admin, Master Class, QFA and more. <Link href="/modules">Details</Link></li>
            <li><b>Contributed to (not designed):</b> the India HR Conclave community platform. <Link href="/hr-community">Deep dive</Link></li>
          </ul>
        </Panel>
        <Panel className="border-good/40">
          <PanelTitle icon={CheckCircle2}>The one-line reframe</PanelTitle>
          <p className="!mt-0 font-semibold text-good">
            &quot;It&apos;s a gated community for HR professionals, and its growth feature pays out real money — a
            point is a rupee — so a mechanic that looks like gamification is built with financial-grade discipline.&quot;
          </p>
          <p className="!mb-0 text-sm text-muted">It answers &quot;isn&apos;t this over-engineered?&quot; before they ask. Lead with what&apos;s yours.</p>
        </Panel>
      </div>
    </>
  );
}
