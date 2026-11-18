import Link from "next/link";
import { Card } from "@/components/Card";
import SayThis from "@/components/SayThis";
import PrepChecklist from "@/components/PrepChecklist";
import { CHECKLISTS } from "@/data/checklists";

export const metadata = { title: "Recruiter Screen — Interview Prep" };

export default function RecruiterScreenPage() {
  return (
    <>
      <h1>Round 1 · Recruiter Screen</h1>
      <p>
        This is the round strong engineers lose without noticing. A recruiter isn&apos;t testing
        your Go. They&apos;re checking whether they can <b>sell you to the hiring manager</b> without
        risk: does the profile match, is the money in band, can you join in time, and can you explain
        yourself clearly. Every answer should leave them with less to worry about.
      </p>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-400">What the recruiter writes down after your call</h3>
        <table>
          <thead><tr><th>Field on their sheet</th><th>What makes it a green tick</th></tr></thead>
          <tbody>
            <tr><td>Relevant experience</td><td>Years stated precisely: ~6 total, ~3.5 in Go. A rounded-up number they later catch is an instant red flag.</td></tr>
            <tr><td>Communication</td><td>Short, structured answers. You stop talking when the question is answered.</td></tr>
            <tr><td>CTC fit</td><td>Your expectation is a range, and it overlaps their band.</td></tr>
            <tr><td>Notice / joining</td><td>A clear date, plus what you can do to shorten it.</td></tr>
            <tr><td>Reason for change</td><td>You&apos;re moving <i>towards</i> something, not running from something.</td></tr>
            <tr><td>Flight risk</td><td>Specific interest in <i>this</i> company, and a believable plan for counter-offers.</td></tr>
          </tbody>
        </table>
      </Card>

      <h2>The 45-second screen pitch</h2>
      <Card>
        <p className="text-emerald-300">
          &quot;I&apos;m Arvind, a full-stack engineer with about six years of experience. For the last
          three and a half I&apos;ve been working mostly in Go on fintech products for 1Finance,
          through NeoSOFT, with Next.js on the frontend and Postgres and Redis underneath. I&apos;ve
          owned a set of backend modules end to end and contributed to an event-driven platform built
          on Kafka. I&apos;m looking for a role with deeper backend ownership, and that&apos;s why
          this one caught my eye: [one specific line about the role].&quot;
        </p>
        <p className="text-sm text-slate-400">
          No Kafka internals or outbox patterns here. The recruiter is matching keywords and checking
          you can communicate clearly. The full technical intros are on{" "}
          <Link href="/intro">Self-Introduction</Link>.
        </p>
      </Card>

      <h2>The questions that decide the round</h2>

      <h3>Logistics</h3>
      <SayThis
        q="What's your notice period?"
        say="It's [N] days. I've already checked what my manager would need to release me earlier, and [early release / buyout] is realistic, so I could likely join by [date]."
        avoid="It's 90 days, but I can probably leave sooner... I'm not sure, I'd have to check."
        why="Notice period is the most common reason a recruiter drops a profile that's otherwise a good match. A specific date, plus an earlier option, removes the risk."
      />
      <SayThis
        q="You're on NeoSOFT's payroll but work for 1Finance. Explain that."
        say="NeoSOFT is my employer, and I've been deployed full-time to 1Finance since January 2023. I sit with their engineering team, work in their codebase and attend their stand-ups. Day to day, it's a product engineering role."
        avoid="It's a services company, so... it's kind of a client project."
        why="Recruiters often rank product-company experience above services. Explain it in one sentence and focus on the product work."
      />
      <SayThis
        q="Are you open to relocation / hybrid / office days?"
        say="Yes, [city] works for me, and I can do [N] office days a week. Is there any flexibility on the start location?"
        avoid="Depends on the package."
        why="Linking location to money this early makes you sound like a negotiation risk. Settle logistics first; money comes separately."
      />

      <h3>Money</h3>
      <SayThis
        q="What's your current CTC?"
        say="My fixed is [X] and variable is [Y], so the total is [Z]. Happy to share the breakdown if it helps."
        avoid="Around 20-something, I think, with everything."
        why="Being vague about your current CTC looks like inflation. Know it to the rupee, split into fixed and variable. Don't inflate it, because offer letters often ask for payslips."
      />
      <SayThis
        q="What's your expected CTC?"
        say="I'm looking at the overall opportunity, but to keep it practical: for a senior Go backend role with this scope, I'm targeting [range, with the bottom above your walk-away]. What's the budgeted band for this position?"
        avoid="Whatever is standard. Or: a 30% hike."
        why="Give a researched range and ask for their band in the same breath. 'A 30% hike' anchors you to your current pay, not to the role. Full playbook on Offer & Negotiation."
      />
      <SayThis
        q="Do you have other offers or interviews?"
        say="I'm in process with a couple of other companies, at [stage]. This role is high on my list because [specific reason], so I'd like to keep the timelines aligned."
        avoid="No, this is the only one. (Or inventing an offer you don't have.)"
        why="Being in other processes gives you leverage and urgency. A made-up offer is a career risk, because recruiters talk to each other and verify."
      />

      <h3>Motivation</h3>
      <SayThis
        q="Why are you looking to leave?"
        say="I've grown a lot at 1Finance, from owning modules end to end to contributing to an event-driven platform. The next step I want is broader ownership of backend architecture, and this role offers that."
        avoid="The project is boring / my manager doesn't value me / services companies don't pay."
        why="Say what you're moving towards. Anything negative about your current employer makes the recruiter wonder what you'll say about them later."
      />
      <SayThis
        q="Why this company?"
        say="[One concrete fact about their product or domain] + [how it connects to something you've actually done]. E.g. 'Insurance at ICICI Lombard is PII-heavy and regulated, and protecting sensitive data — encryption backfills and RBAC split by data sensitivity — is the work I've enjoyed most.'"
        avoid="It's a great brand and a good growth opportunity."
        why="Generic answers suggest you'd take any job, which makes you a flight risk. Each company brief has your angle prepared."
      />
      <SayThis
        q="Your Go experience is ~3.5 years — the JD asks for 4+/5+."
        say="That's right, about three and a half years of production Go. Before that I spent [N] years on PHP and WooCommerce, which is where I learned to ship for real users. In Go I've [strongest specific]. Happy to go deep on any of it."
        avoid="Yes, I have 4+ years of Go. (When you don't.)"
        why="Say the true number before they calculate it. Once they catch one stretched number, they stop believing the rest of your profile."
      />

      <h2>Your own questions for the recruiter</h2>
      <Card>
        <ul>
          <li>&quot;What does the interview process look like — how many rounds, and what&apos;s each one assessing?&quot;</li>
          <li>&quot;Is there a take-home or live coding round, and which language?&quot;</li>
          <li>&quot;What&apos;s the budgeted band for this role?&quot;</li>
          <li>&quot;Why is this position open — a new role or a backfill?&quot;</li>
          <li>&quot;What&apos;s the timeline to an offer?&quot;</li>
        </ul>
        <p className="text-sm text-slate-400 m-0">Ask the first two on every call. Knowing the rounds in advance is worth more than an extra hour of study.</p>
      </Card>

      <PrepChecklist id="screen" title="Screen-ready checklist" items={CHECKLISTS.screen} />
    </>
  );
}
