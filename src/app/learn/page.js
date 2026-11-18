"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, CircleDashed, PlayCircle } from "lucide-react";
import { LESSONS, LESSON_TRACKS } from "@/data/nav";
import { KEYS, useStoredValue } from "@/lib/storage";
import { Badge, Button, Chip, PageHeader, Panel, ProgressRing } from "@/components/ui";

const ALL = "All";

function ContinueCard({ last, done }) {
  const lesson = last && LESSONS.find((l) => l.href === last.href);
  const nextUp = LESSONS.find((l) => !done.includes(l.href));
  const target = lesson && !done.includes(lesson.href) ? lesson : nextUp;
  if (!target) {
    return (
      <Panel className="flex items-center gap-4">
        <CheckCircle2 size={28} className="text-good" />
        <div><div className="font-semibold text-fg">All lessons complete</div><div className="text-sm text-muted">Switch to practice: mock rounds and flashcards.</div></div>
      </Panel>
    );
  }
  const resuming = lesson && target.href === lesson.href && last.section;
  const Icon = target.icon;
  return (
    <Panel className="flex flex-col gap-4 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 sm:flex-row sm:items-center">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Icon size={24} /></span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent">{resuming ? "Continue where you left off" : "Up next"}</div>
        <div className="text-lg font-semibold text-fg">{target.label}</div>
        <div className="truncate text-sm text-muted">{resuming ? `At: ${last.sectionTitle || "last section"}` : target.blurb}</div>
      </div>
      <Button href={resuming ? `${target.href}#${last.section}` : target.href}>
        <PlayCircle size={16} /> {resuming ? "Resume" : "Start"}
      </Button>
    </Panel>
  );
}

function LessonCard({ lesson, index, status }) {
  const Icon = lesson.icon;
  const statusBadge = {
    done: <Badge tone="good"><CheckCircle2 size={12} /> Complete</Badge>,
    progress: <Badge tone="accent"><PlayCircle size={12} /> In progress</Badge>,
    todo: <Badge><CircleDashed size={12} /> Not started</Badge>,
  }[status];
  return (
    <Link
      href={lesson.href}
      className="group flex flex-col rounded-2xl border border-border bg-panel p-5 no-underline shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent2/10 text-accent2"><Icon size={22} /></span>
        {statusBadge}
      </div>
      <div className="mt-4 text-xs font-semibold text-subtle">Lesson {index + 1} · {lesson.track}</div>
      <div className="mt-0.5 font-semibold text-fg group-hover:text-accent">{lesson.label}</div>
      <p className="!mb-0 !mt-1 flex-1 !text-sm text-muted">{lesson.blurb}</p>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {lesson.rounds.map((r) => <Badge key={r} tone="violet">{r}</Badge>)}
        <ArrowRight size={16} className="ml-auto text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}

export default function LearnPage() {
  const done = useStoredValue(KEYS.lessonsDone, []);
  const last = useStoredValue(KEYS.lastLesson, null);
  const [track, setTrack] = useState(ALL);

  const doneCount = LESSONS.filter((l) => done.includes(l.href)).length;
  const visible = LESSONS.map((l, i) => ({ l, i })).filter(({ l }) => track === ALL || l.track === track);
  const statusOf = (href) => (done.includes(href) ? "done" : last?.href === href ? "progress" : "todo");

  return (
    <>
      <PageHeader
        eyebrow="Study library"
        title="Learn"
        description="Every topic on your resume as a lesson. Each one has a table of contents and progress tracking, and you mark it complete when you're done."
        actions={<ProgressRing value={doneCount / LESSONS.length} size={56} label={`${doneCount}/${LESSONS.length}`} />}
      />

      <ContinueCard last={last} done={done} />

      <div className="no-scrollbar -mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1">
        {[ALL, ...LESSON_TRACKS].map((t) => (
          <Chip key={t} active={track === t} onClick={() => setTrack(t)}>
            {t}{t !== ALL && ` · ${LESSONS.filter((l) => l.track === t).length}`}
          </Chip>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map(({ l, i }) => <LessonCard key={l.href} lesson={l} index={i} status={statusOf(l.href)} />)}
      </div>
    </>
  );
}
