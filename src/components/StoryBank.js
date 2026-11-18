"use client";
import { useState } from "react";
import { Pill } from "@/components/Card";
import { STORIES, STORY_THEMES } from "@/data/stories";
import { KEYS, usePersistentState } from "@/lib/storage";

const ALL = "All themes";

function Section({ label, children }) {
  return (
    <div className="mt-3">
      <div className="text-[11px] uppercase tracking-wider text-accent2 mb-1">{label}</div>
      {children}
    </div>
  );
}

function StoryCard({ story, ready, onToggle }) {
  return (
    <details className={ready ? "border-emerald-700" : ""}>
      <summary>
        {ready ? "✓ " : ""}{story.title}
        <span className="block text-xs font-normal text-slate-400 mt-1">{story.source}</span>
      </summary>
      <div className="mt-2">
        {story.themes.map((t) => <Pill key={t} color="purple">{t}</Pill>)}

        <Section label="Answers questions like">
          <ul>{story.answers.map((a) => <li key={a}><i>{a}</i></li>)}</ul>
        </Section>

        <Section label="Situation (10%)"><p className="m-0">{story.situation}</p></Section>
        <Section label="Task (10%)"><p className="m-0">{story.task}</p></Section>
        <Section label="Action (60%) — say 'I'">
          <ol>{story.action.map((a) => <li key={a}>{a}</li>)}</ol>
        </Section>
        <Section label="Result (20%)"><p className="m-0">{story.result}</p></Section>

        <p className="text-amber-300 text-sm mt-3"><b>Ownership line:</b> {story.ownership}</p>

        <Section label="Follow-ups they'll probe">
          {story.followUps.map((f) => (
            <div key={f.q} className="mb-2">
              <div className="font-semibold text-[15px]">{f.q}</div>
              <div className="text-slate-300 text-[15px]">{f.a}</div>
            </div>
          ))}
        </Section>

        <label className="flex gap-2 items-center mt-4 cursor-pointer text-sm">
          <input type="checkbox" className="accent-emerald-400" checked={ready} onChange={onToggle} />
          Every [bracket] filled in, and I&apos;ve said this out loud in under 2½ minutes
        </label>
      </div>
    </details>
  );
}

export default function StoryBank() {
  const [ready, setReady] = usePersistentState(KEYS.storiesReady, []);
  const [theme, setTheme] = useState(ALL);
  const visible = theme === ALL ? STORIES : STORIES.filter((s) => s.themes.includes(theme));

  const toggle = (id) =>
    setReady((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 my-3">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="px-3 py-2 bg-panel2 border border-border rounded-md text-sm text-slate-200"
          aria-label="Filter stories by theme"
        >
          {[ALL, ...STORY_THEMES].map((t) => <option key={t}>{t}</option>)}
        </select>
        <span className="text-sm text-slate-400">
          {STORIES.filter((s) => ready.includes(s.id)).length}/{STORIES.length} interview-ready
        </span>
      </div>
      {visible.map((s) => (
        <StoryCard key={s.id} story={s} ready={ready.includes(s.id)} onToggle={() => toggle(s.id)} />
      ))}
    </>
  );
}
