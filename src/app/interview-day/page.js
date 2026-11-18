import Link from "next/link";
import { Card } from "@/components/Card";
import PrepChecklist from "@/components/PrepChecklist";
import { CHECKLISTS } from "@/data/checklists";

export const metadata = { title: "Interview Day — Interview Prep" };

export default function InterviewDayPage() {
  return (
    <>
      <h1>Interview Day</h1>
      <p>
        The night before, don&apos;t learn anything new. You&apos;re there to show what you
        already know. A rested, calm candidate with 80% of the knowledge usually beats a tired
        one with 100%.
      </p>

      <h2>T-24 hours</h2>
      <Card>
        <ul>
          <li>Read the company&apos;s recruiter brief (Companies section in the sidebar). Know your angle and their top 3 risks.</li>
          <li>Pick <b>3 STAR stories</b> that match the JD and say each one out loud once. Don&apos;t memorise them word for word.</li>
          <li>Say your intro out loud twice, timed. Stop at the target length.</li>
          <li>Look up who&apos;s interviewing you (LinkedIn) and what they&apos;ve worked on.</li>
          <li>Sleep. Seriously.</li>
        </ul>
      </Card>

      <PrepChecklist id="day" title="T-1 hour checklist" items={CHECKLISTS.day} />

      <h2>In the room</h2>
      <Card>
        <ul>
          <li><b>Answer first, then expand.</b> &quot;Yes — and here&apos;s why…&quot; beats a two-minute lead-up.</li>
          <li><b>Check in after about 2 minutes:</b> &quot;Want me to go deeper on that, or move on?&quot;</li>
          <li><b>Say &quot;I&quot; for your work and &quot;we&quot; for the team&apos;s.</b> Saying &quot;we&quot; for everything hides what you did.</li>
          <li><b>Take 5 seconds before answering a hard question.</b> Silence feels much longer to you than to them.</li>
          <li><b>Save 5 minutes for your questions.</b> If time runs short, ask for it.</li>
        </ul>
      </Card>

      <h2>Within 24 hours after</h2>
      <Card>
        <ol>
          <li>Write down every question you were asked, while you still remember them. Add the ones you fumbled to the question bank or this app.</li>
          <li>Update the round outcome and next step in the <Link href="/pipeline">Pipeline</Link>.</li>
          <li>Send a short thank-you to the recruiter (template below).</li>
        </ol>
        <pre><code>{`Hi [Recruiter],

Thanks for setting up today's [round] with [Interviewer].
I enjoyed the discussion on [one specific topic] — it made
me more interested in the role.

Looking forward to hearing about next steps.

Best,
Arvind`}</code></pre>
        <p className="text-sm text-slate-400 m-0">Keep it to four lines. Don&apos;t re-argue answers you think you got wrong.</p>
      </Card>

      <h2>If it went badly</h2>
      <p>
        One bad round rarely ends a loop on its own, because panels average the signals. Write
        down exactly what went wrong, fix that one thing, and move on to the next round. If you
        get rejected, ask the recruiter for feedback. Most won&apos;t give it, but some will, and
        that&apos;s useful information.
      </p>
    </>
  );
}
