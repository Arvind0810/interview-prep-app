import { Card } from "@/components/Card";
import StoryBank from "@/components/StoryBank";
import { STORIES, STORY_THEMES } from "@/data/stories";

export const metadata = { title: "Behavioral & STAR — Interview Prep" };

export default function BehavioralPage() {
  return (
    <>
      <h1>Round 4 · Hiring Manager &amp; Behavioral</h1>
      <p>
        The hiring manager is deciding one thing: <i>would I trust this person with a real problem
        on my team?</i> Generic answers can&apos;t show that. Specific ones can, with a real system,
        a real decision, a real number and a real mistake. Below are {STORIES.length} stories drawn
        from your own work.
      </p>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-400">Before you use any story</h3>
        <ul>
          <li>
            Every <code>[bracket]</code> is a fact only you can supply: a number, a date, a query
            name. Fill it in or cut the sentence. <b>Never replace a bracket with a number you
            can&apos;t defend after three follow-ups.</b>
          </li>
          <li>The HR community ledger story is told as a <b>contributor</b>. Keep it that way.</li>
          <li>The failure story is a template. It only works if it&apos;s real, so you have to write it yourself.</li>
        </ul>
      </Card>

      <h2>The STAR shape, with timing</h2>
      <p>
        Aim for about 2 minutes. <b>Situation + Task: 20%</b> (two sentences, no backstory).{" "}
        <b>Action: 60%</b> (what <i>you</i> did, using &quot;I&quot;, including the decision you
        rejected). <b>Result: 20%</b> (a number if you have one, plus what you learned). Then stop
        and let them pick the follow-up.
      </p>

      <h2>Story bank</h2>
      <p className="text-sm text-slate-400">
        Coverage: {STORY_THEMES.length} themes. Most behavioral questions map onto one of them, so
        filter by the theme of the question you&apos;re practising.
      </p>
      <StoryBank />

      <h2>Map the question to the story</h2>
      <table>
        <thead><tr><th>If they ask…</th><th>Reach for</th></tr></thead>
        <tbody>
          <tr><td>Disagreement or pushback with a colleague</td><td>Trust tiers (why not one auth mode), or V3 (why not patch V1)</td></tr>
          <tr><td>Tight deadline or a late change</td><td>Speaker cards V2</td></tr>
          <tr><td>Biggest technical achievement</td><td>Latency ~40%</td></tr>
          <tr><td>Something risky in production</td><td>Encryption backfill</td></tr>
          <tr><td>Learning fast or an unfamiliar codebase</td><td>HR community ledger (contributor)</td></tr>
          <tr><td>Ambiguity or bad input</td><td>CSV imports</td></tr>
          <tr><td>Failure, mistake or feedback</td><td>Your failure story (write it!)</td></tr>
          <tr><td>Mentoring or leadership</td><td>Gap: you have no prepared story yet. Find one (onboarding someone, a code-review habit, a doc you wrote) before senior loops.</td></tr>
        </tbody>
      </table>

      <h2>Questions to ask the hiring manager</h2>
      <ul>
        <li>&quot;What&apos;s the biggest technical problem the team is facing this quarter?&quot;</li>
        <li>&quot;What would a strong first 90 days look like for this role?&quot;</li>
        <li>&quot;How are architecture decisions made, and who has the final say?&quot;</li>
        <li>&quot;What happens after a production incident? What did the last post-mortem change?&quot;</li>
        <li>&quot;What separates the engineers who do really well here from the rest?&quot;</li>
      </ul>

      <h2>Red flags interviewers listen for</h2>
      <ul>
        <li><b>&quot;We&quot; for everything.</b> They can&apos;t tell what you did, so they assume it was very little.</li>
        <li><b>No numbers, or numbers you can&apos;t explain.</b> The second is worse than the first.</li>
        <li><b>Criticising past employers or teammates.</b> They&apos;ll assume you&apos;ll talk about them the same way.</li>
        <li><b>Fake weaknesses</b> (&quot;I&apos;m a perfectionist&quot;). Give a real, minor one and say what you do about it.</li>
        <li><b>Taking credit for a design you didn&apos;t make.</b> One probing question exposes it.</li>
      </ul>
    </>
  );
}
