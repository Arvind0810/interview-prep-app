import { Card } from "@/components/Card";
import SayThis from "@/components/SayThis";
import PrepChecklist from "@/components/PrepChecklist";
import { CHECKLISTS } from "@/data/checklists";

export const metadata = { title: "Offer & Negotiation — Interview Prep" };

export default function OfferPage() {
  return (
    <>
      <h1>Round 5 · Offer &amp; Negotiation</h1>
      <p>
        When an offer arrives, the company has already decided it wants you, and in most cases the
        first number isn&apos;t final. Recruiters expect you to negotiate. What they don&apos;t
        expect is a candidate who is calm, has the numbers ready and is easy to say yes to.
      </p>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-400">Before any offer call: three numbers on paper</h3>
        <ol>
          <li><b>Walk-away:</b> the total below which you&apos;d genuinely say no. Never say it out loud.</li>
          <li><b>Target:</b> what you&apos;d be happy to sign today.</li>
          <li><b>Anchor:</b> the top of your researched range, which is what you ask for.</li>
        </ol>
        <p className="text-sm text-slate-400 m-0">
          Sources for the range: offers friends have actually received, the recruiter&apos;s band, and
          public salary data for the same level and city. Treat public salary sites as rough
          ranges, not facts.
        </p>
      </Card>

      <h2>Read the offer, not just the headline</h2>
      <table>
        <thead><tr><th>Component</th><th>What to check</th></tr></thead>
        <tbody>
          <tr><td>Fixed pay</td><td>This is the only guaranteed number. Compare offers on fixed pay first.</td></tr>
          <tr><td>Variable / bonus</td><td>Is it a target or a guarantee? What was the actual payout percentage last year? Is it paid annually or quarterly?</td></tr>
          <tr><td>Joining bonus</td><td>Is there a clawback if you leave within 12 months? Use it to cover a notice buyout or a forfeited bonus.</td></tr>
          <tr><td>ESOPs / RSUs</td><td>Vesting schedule, cliff, strike price, and whether there&apos;s any route to liquidity. Value private-company ESOPs at close to zero when comparing offers.</td></tr>
          <tr><td>Benefits</td><td>Health insurance (family? parents?), PF structure, gratuity, learning budget.</td></tr>
          <tr><td>Level and title</td><td>These matter more than ₹1–2L, because your next offer is negotiated from them.</td></tr>
        </tbody>
      </table>

      <h2>Scripts</h2>
      <SayThis
        q="They give a number and wait."
        say="Thank you, I'm genuinely excited about the role. Can you send the full breakdown in writing? I'd like to look at it properly and come back to you by [specific day]."
        avoid="Accepting or rejecting on the call."
        why="Never decide on the call. Asking for it in writing and naming a day shows you're serious and gives you time to think."
      />
      <SayThis
        q="The counter."
        say="I've gone through it carefully. To make this an easy yes, I'd need the fixed component at [anchor]. That reflects [the scope of the role / a competing process at stage X / the market for senior Go engineers]. If we can get there, I'm ready to sign this week."
        avoid="Can you do a bit better? / I was hoping for more."
        why="Give one specific number, one reason and a clear commitment. Being vague invites a vague, small increase."
      />
      <SayThis
        q="They say the band is maxed out."
        say="I understand. Could we close the gap another way — a joining bonus to cover my notice buyout, a guaranteed first-year variable, or a compensation review at six months, in writing?"
        avoid="Accepting immediately, or walking away immediately."
        why="When fixed pay is capped, recruiters usually still have room on the joining bonus, a review date or the level. Ask about each."
      />
      <SayThis
        q="Your current employer counter-offers."
        say="Thanks — I appreciate it. I've made this decision for the role and the growth, not just the number, so I'm going ahead."
        avoid="Using the counter to re-open the new offer a second time."
        why="If you accept a counter-offer, your current employer now knows you were leaving. Going back to the new company for more a second time burns that relationship too. Decide before you resign."
      />

      <h2>Accepting and declining well</h2>
      <Card>
        <ul>
          <li><b>Accept</b> only once everything agreed is in the offer letter: CTC split, level, joining date, joining bonus terms and location.</li>
          <li><b>Resign</b> only after you&apos;ve signed the offer and, where possible, cleared background verification.</li>
          <li><b>Decline</b> within 24 hours of deciding, politely and briefly. Recruiters remember the people who didn&apos;t leave them hanging, and they call them first next time.</li>
        </ul>
      </Card>

      <PrepChecklist id="offer" title="Offer-ready checklist" items={CHECKLISTS.offer} />
    </>
  );
}
