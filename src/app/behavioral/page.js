import { Card } from "@/components/Card";

export const metadata = { title: "Behavioral & STAR — Interview Prep" };

function STAR({ s, t, a, r }) {
  return (
    <Card>
      <div className="grid grid-cols-[80px_1fr] gap-3 my-2">
        <div className="text-violet-400 font-semibold">Situation</div>
        <div>{s}</div>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-3 my-2">
        <div className="text-violet-400 font-semibold">Task</div>
        <div>{t}</div>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-3 my-2">
        <div className="text-violet-400 font-semibold">Action</div>
        <div>{a}</div>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-3 my-2">
        <div className="text-violet-400 font-semibold">Result</div>
        <div>{r}</div>
      </div>
    </Card>
  );
}

export default function BehavioralPage() {
  return (
    <>
      <h1>Behavioral &amp; STAR Stories</h1>
      <p>Behavioral rounds are about pattern recognition: interviewers want to see judgment, ownership, collaboration, and growth. Use STAR — Situation, Task, Action, Result.</p>
      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Framing note:</b> These stories are written as a <i>team contributor with feature-level ownership</i>. They focus on modules you actually own (Magazine, In-the-News, HR Conclave, Master Class, etc.) rather than claiming you architected the whole 1Finance website platform.
      </p>

      <h2>Your STAR Stories (drawn from actual modules)</h2>

      <h3>Story 1 — Owning a feature end-to-end (Magazine module)</h3>
      <STAR
        s={'"1Finance launched a print magazine that needed a public website registration flow plus an admin dashboard for the editorial team to export and filter registrations."'}
        t={'"As a team contributor on the 1Finance website team, I was given full ownership of the Magazine module — both the public registration endpoint and the admin tooling."'}
        a={'"Built the public POST /magazine/v1/magazine-website-register endpoint behind static-token auth so only our website could call it. Added admin endpoints for listing, filtering, and CSV export, each gated by our DB-backed JWT middleware with per-endpoint permission strings. When we realised early rows were stored as plaintext, I added a separate admin-gated encryption backfill endpoint that re-encrypted legacy data idempotently. Also added a static-token-protected daily filter endpoint so an internal cron could pull yesterday\'s registrations."'}
        r={'"Module shipped on schedule. Editorial uses the CSV export weekly. The encryption backfill ran once in production and migrated all legacy rows without downtime. The pattern of public+admin+internal auth tiers became a template I reused for HR Conclave."'}
      />

      <h3>Story 2 — Designing a clean V3 migration (In-the-News)</h3>
      <STAR
        s='"The original /in-the-news V1 admin API had grown organically — flat endpoints, no body validation, no separation between landing/archive reads and admin operations. Editorial wanted publish toggles, snapshot refresh, and a cleaner admin UX."'
        t='"Rebuild the admin pipeline without breaking V1 (it was still consumed by another internal tool)."'
        a='"Introduced /in-the-news/v3 with two public read paths (landing + archive) and a nested /v3/admin group behind a single RBAC permission (ManageInTheNews). Inside admin, split endpoints into clear actions: list, get-by-id, create+update with body validators, dedicated publish toggle, type toggle, snapshot refresh, and delete. Kept V1 routes live for backwards compat. Added related sub-resources — news-authors and news-publications — also gated by the same admin permission."'
        r='"V3 shipped behind a feature flag for editorial. V1 retired in the following quarter once consumers migrated. The clean separation (public vs admin, action-specific endpoints) became the convention for new modules on the team."'
      />

      <h3>Story 3 — Schema evolution without breaking consumers (HR Conclave V2 speakers)</h3>
      <STAR
        s='"HR Conclave V1 speaker data lived in a nested schema with structured sections. Marketing now wanted rich-text content and a flat short_about+content shape for richer landing pages — but the V1 endpoint was already consumed by the live site."'
        t='"Ship a V2 schema without breaking V1 consumers and without forcing the team to migrate."'
        a='"Added a /v2/speakers route group under HR Conclave with new admin endpoints reusing the same ManageHrConclaveSpeakers RBAC permission so existing admin roles worked immediately. Wrote a separate body validator for the V2 shape. Kept V1 endpoints untouched until marketing confirmed migration. Documented both shapes in our internal API doc."'
        r='"Marketing migrated to V2 over two sprints. Zero V1 outages. Existing admin tooling worked because we reused the permission key. Pattern reused later when we needed a flat schema for other features."'
      />

      <h3>Story 4 — Production data crisis (WordPress media migration)</h3>
      <STAR
        s={'"After a WordPress migration, hundreds of media references — featured images, embedded files — were broken. Editorial couldn\'t republish without manual repair, and SEO was visibly degrading."'}
        t={'"Recover the broken media relationships across thousands of posts without manual cleanup."'}
        a={'"Reverse-engineered the old/new attachment ID mapping using filename and parent post pairs. Wrote SQL remapping scripts that joined wp_posts and wp_postmeta to reconstruct attachment relationships. Ran against a staging clone first, validated a sample of 100 posts manually, then ran in prod inside a transaction."'}
        r={'"Around 94% of broken references restored automatically; the remaining 6% surfaced via a report for editorial cleanup. Editorial team unblocked within 2 days."'}
      />

      <h3>Story 5 — Disagreement / pushback (auth boundary on internal endpoint)</h3>
      <STAR
        s='"While building the Magazine encryption backfill, a teammate suggested re-using our standard JWT/RBAC middleware so any admin with the right permission could trigger it."'
        t='"Decide the right auth boundary — convenience vs blast radius."'
        a='"I pushed back. The backfill mutated every row in a sensitive table; even with a permission, an accidental admin click could ruin data. I proposed gating it with a separate static token kept only in our deployment secret store, so triggering required server-level access. Walked through the threat model — what happens if a junior admin clicks the wrong thing, what an attacker with leaked JWT can do — and the team agreed. Same pattern later used for HR Conclave encryption backfill."'
        r='"Backfill ran exactly once with zero accidents. The static-token-for-irreversible-internal-ops pattern is now our convention. Teammate later said the threat-model walkthrough convinced him."'
      />

      <h3>Story 6 — Mentoring / leverage (goroutine leaks)</h3>
      <STAR
        s='"A teammate was struggling with goroutine leaks — services were ballooning memory in staging after a feature that spawned background workers."'
        t='"Help them find and fix the leaks, and prevent recurrences team-wide."'
        a='"Walked through pprof live — captured a goroutine profile, showed how channels were left open. Co-wrote a checklist: every goroutine needs a clear exit, every channel needs a closer. Added go vet with the channel-leak linter to our CI."'
        r='"Memory issue resolved that week. The checklist became part of our onboarding doc. No goroutine leaks shipped to prod since."'
      />

      <h3>Story 7 — Tackling ambiguity (SEO audit tool)</h3>
      <STAR
        s={'"Product asked for \'an SEO tool that audits our blog\' — no spec, no priority list."'}
        t={'"Translate it into something concrete and useful."'}
        a={'"Interviewed the editorial team to understand what they actually struggled with. Researched standard SEO audits (Lighthouse, Screaming Frog) and distilled them into 16 concrete rules across semantics, metadata, structured data, and links. Built it as a tool with actionable suggestions, not just pass/fail."'}
        r={'"Editorial uses it on every post. Audit time dropped from 30 min to under 5. Three rules surfaced consistent issues we\'d never noticed."'}
      />

      <h3>Story 8 — Failure / learning (Redis TTL miss)</h3>
      <STAR
        s='"Early in my work on a caching change I pushed a Redis SET without a TTL on one new key pattern in a feature I was contributing to."'
        t='"Recognize, recover, and prevent."'
        a='"Within 4 hours Redis memory was climbing fast. Spotted it in the dashboard, traced to my recent deploy, manually expired the keys, and deployed a fix with a proper TTL. Wrote a postmortem the next morning: it was a missed code-review point. Proposed and implemented a CI check that scans the repo for SET without EX/EXPIRE."'
        r='"No prod impact — caught within memory headroom. The CI check has flagged 3 similar mistakes since (not all mine). I now reflexively pair every cache write with an explicit TTL and try to add CI guardrails for any pattern I noticed in review."'
      />

      <h2>Common Behavioral Questions</h2>
      <details><summary>Tell me about a time you disagreed with a teammate</summary><p>Use Story 5 (static-token for irreversible internal ops).</p></details>
      <details><summary>Tell me about a feature you owned end-to-end</summary><p>Use Story 1 (Magazine) or Story 2 (In-the-News V3).</p></details>
      <details><summary>How do you handle schema evolution / API versioning?</summary><p>Use Story 3 (HR Conclave V2 speaker cards).</p></details>
      <details><summary>Describe a difficult bug or production issue</summary><p>Use Story 4 (WordPress media migration) or Story 8 (Redis TTL miss).</p></details>
      <details><summary>Tell me about a time you failed</summary><p>Use Story 8 (Redis TTL miss). Don&apos;t pick a &quot;fake failure&quot; — show real reflection.</p></details>
      <details><summary>How do you handle ambiguous requirements?</summary><p>Use Story 7 (SEO tool).</p></details>
      <details><summary>Tell me about a time you mentored someone</summary><p>Use Story 6 (goroutine leaks).</p></details>
      <details><summary>How do you prioritize when everything&apos;s urgent?</summary><p>Talk about impact × cost matrix, batching low-priority items, escalating with concrete trade-offs to product.</p></details>
      <details><summary>Why are you leaving your current role?</summary><p>Always positive: growth opportunity, deeper architectural ownership, tech stack alignment. Never criticize current employer.</p></details>
      <details><summary>Where do you see yourself in 3 years?</summary><p>Senior engineer with broader architectural ownership (not just module ownership), mentoring juniors, contributing to design decisions on a fintech or developer-platform team.</p></details>

      <h2>Questions to ASK the Interviewer</h2>
      <p>Always come with 3–5 prepared. Shows engagement and helps you evaluate them.</p>
      <ul>
        <li>&quot;What does the architecture of [their product] look like, and what&apos;s been the most recent significant change?&quot;</li>
        <li>&quot;How does the team make technical decisions — RFCs, ADRs, informal?&quot;</li>
        <li>&quot;What&apos;s a recent project you&apos;re proud of, and what made it hard?&quot;</li>
        <li>&quot;How is success measured for engineers at my level?&quot;</li>
        <li>&quot;What&apos;s the on-call rotation like and how is it supported?&quot;</li>
        <li>&quot;What part of the codebase or stack are you actively trying to improve?&quot;</li>
        <li>&quot;What would the first 30/60/90 days look like for this role?&quot;</li>
      </ul>
    </>
  );
}
