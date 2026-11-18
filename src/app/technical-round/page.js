import Link from "next/link";
import { Card } from "@/components/Card";
import PrepChecklist from "@/components/PrepChecklist";
import { CHECKLISTS } from "@/data/checklists";

export const metadata = { title: "Technical Round — Interview Prep" };

const SCORE = [
  ["Correctness", "Does the code or explanation actually work, including edge cases?"],
  ["Reasoning out loud", "Can they follow your thinking before you write any code?"],
  ["Depth on your own work", "Can you go three follow-ups deep on something you shipped?"],
  ["Trade-offs", "Do you name what you gave up, not just what you picked?"],
  ["Honesty at the edge", "When you don't know, do you say so and reason it out, or bluff?"],
];

export default function TechnicalRoundPage() {
  return (
    <>
      <h1>Round 2 · Technical</h1>
      <p>
        Usually two parts: a coding or DSA problem, then a resume deep dive on what you&apos;ve
        built. In a services-to-product move, the deep dive is where offers are won. It&apos;s
        the one part of the interview where you know more than the interviewer.
      </p>

      <h2>How you are scored</h2>
      <table>
        <thead><tr><th>Signal</th><th>What the interviewer is checking</th></tr></thead>
        <tbody>{SCORE.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody>
      </table>

      <h2>The coding problem — a repeatable shape</h2>
      <Card>
        <ol>
          <li><b>Restate and clarify</b> (1 min): input size, edge cases, whether the input is sorted, whether there are duplicates.</li>
          <li><b>Brute force first, out loud</b>, including its complexity.</li>
          <li><b>Optimise</b>: name the pattern (hash map, two pointers, sliding window, heap, BFS).</li>
          <li><b>Code</b> while narrating. If you&apos;re silent for more than 30 seconds, the interviewer can&apos;t follow you.</li>
          <li><b>Test by hand</b> on one normal case and one edge case before saying &quot;done&quot;.</li>
        </ol>
        <p className="m-0">Practice: <Link href="/leetcode">LeetCode Challenges</Link> · <Link href="/dsa">DSA Refresher</Link></p>
      </Card>

      <h2>The resume deep dive — prepare it, don&apos;t improvise it</h2>
      <Card>
        <p>Interviewers pick one line from your resume and ask &quot;why?&quot; until you run out of answers. Pre-load your three strongest threads:</p>
        <ul>
          <li><b>~40% latency cut:</b> name the query, the plan change, the cache key and the TTL.</li>
          <li><b>Trust tiers and encryption backfill:</b> why three auth modes, and why the backfill is idempotent.</li>
          <li><b>HR community ledger (as contributor):</b> why it&apos;s append-only, why there&apos;s an outbox, and why consumers re-read the source row.</li>
        </ul>
        <p className="m-0">
          Source material: <Link href="/modules">My 1Finance Modules</Link> ·{" "}
          <Link href="/hr-community">HR Community Platform</Link> ·{" "}
          <Link href="/behavioral">STAR stories</Link>
        </p>
      </Card>

      <h2>When you don&apos;t know</h2>
      <Card className="border-emerald-700">
        <p className="text-emerald-300 m-0">
          &quot;I haven&apos;t used that in production. Here&apos;s how I&apos;d reason about it from
          what I do know: [closest real experience]. Is that the direction you mean?&quot;
        </p>
        <p className="text-sm text-slate-400 mt-2 mb-0">
          Most interviewers rate an honest &quot;I don&apos;t know, here&apos;s my reasoning&quot;
          above a confident wrong answer, and a bluff that gets caught affects how they judge
          everything else you said.
        </p>
      </Card>

      <h2>Drill</h2>
      <ul>
        <li><Link href="/mock">Mock Interview</Link>: timed questions, self-scored against the rubric above</li>
        <li><Link href="/quiz">Skill Test</Link>: MCQs per topic; these feed your dashboard readiness score</li>
        <li><Link href="/qbank">Question Bank</Link>: 330+ Q&amp;As by topic and difficulty</li>
        <li><Link href="/sysdesign">System Design</Link>: the next round</li>
      </ul>

      <PrepChecklist id="technical" title="Technical-round checklist" items={CHECKLISTS.technical} />
    </>
  );
}
