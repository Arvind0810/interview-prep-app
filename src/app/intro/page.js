import { Card } from "@/components/Card";

export const metadata = { title: "Self-Introduction — Interview Prep" };

function Script({ label, target, words, children }) {
  const seconds = Math.round((words / 150) * 60);
  return (
    <p className="text-xs text-slate-400 mb-2">
      {label} • target <b>{target}</b> • this script is <b>{words} words</b> ≈{" "}
      <b className="text-cyan-400">{seconds}s</b> at 150 wpm
      {children}
    </p>
  );
}

export default function IntroPage() {
  return (
    <>
      <h1>Self-Introduction &amp; Intro Video</h1>
      <p>
        Your opening 60 seconds set the entire interview&apos;s tone. Pick the script length
        that matches the format, rehearse out loud, and record yourself on your phone to refine
        pace and energy.
      </p>

      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Framing note — two different claims, keep them separate:</b> On the 1Finance website
        platform you are a <i>team contributor with concrete module ownership</i> — several modules
        are yours end-to-end. On the <i>HR community platform</i> you are a <i>contributor</i> — you
        worked on it, you did not design the ledger or the saga. Say &quot;I worked on&quot; there,
        never &quot;I built&quot; or &quot;I designed.&quot;
        <br /><br />
        <b>And describe it correctly:</b> it is a <i>gated community platform for HR professionals</i>
        that happens to have a points feature — not &quot;a rewards platform.&quot; Leading with the
        rewards undersells the product and invites the wrong questions.
      </p>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">Timing maths — why these scripts are the length they are</h3>
        <p>
          Interview pace is <b>~150 words per minute</b> — slower than casual chat, because you are
          pausing between sentences. So: <b>60s ≈ 150 words</b>, <b>90s ≈ 225 words</b>,
          <b> 2min ≈ 300 words</b>. Every script below shows its real word count and the duration
          that implies, so you can check you are not overrunning before you are in the room.
        </p>
        <p className="text-slate-400 text-sm">
          Running long is the most common self-intro failure: you hit 2 minutes on a question that
          wanted 45 seconds, the interviewer stops listening around the 90-second mark, and your
          best material is in the part they tuned out. When in doubt, use the shorter script and let
          them ask for more — being asked a follow-up is a better outcome than filling the silence.
        </p>
      </Card>

      <h2>The 60-Second Script (Most Common)</h2>
      <Script label="HR screens, recruiter calls, panel round-robins" target="60s" words={150} />
      <Card>
        <p>&quot;Hi, I&apos;m Arvind Sharma — a full-stack engineer with over five years&apos; experience, currently building fintech APIs at 1Finance through NeoSOFT Technologies.</p>
        <p>I work on the 1Finance website team — a Go and Fiber platform with around thirty feature namespaces. I own several end-to-end: Magazine registrations and exports, the In-the-News admin pipeline, HR Conclave, and the QFA advisor module.</p>
        <p>More recently I&apos;ve been contributing to India HR Conclave — a private, approval-based community for HR professionals, where members write blogs and answer each other&apos;s questions. It has a points feature for engagement, and points convert to vouchers at a rupee each — a growth mechanic that pays real money. That&apos;s where my distributed-systems exposure comes from.</p>
        <p>Before 1Finance I built WooCommerce platforms with payment integrations at Thinkbar, and WordPress sites at Visualytes.</p>
        <p>I&apos;m looking for a full-stack role with more Go and Next.js, and deeper ownership. Happy to go deeper on any of it.&quot;</p>
      </Card>

      <h2>The 90-Second Script (Senior / Detailed)</h2>
      <Script label="Engineering managers, senior IC screens" target="90s" words={241} />
      <Card>
        <p>&quot;Hi, I&apos;m Arvind — a full-stack engineer in Mumbai, five-plus years building production financial systems and APIs.</p>
        <p>I&apos;ve been at 1Finance through NeoSOFT since January 2023 — a Go/Fiber platform with around thirty feature modules. I don&apos;t own the platform, but several modules are mine end-to-end:</p>
        <ul>
          <li>Magazine — registrations, CSV export, and an idempotent encryption backfill for legacy rows</li>
          <li>In-the-News V3 — landing and archive endpoints, publish toggles, snapshot refresh</li>
          <li>HR Conclave — V2 speaker cards added alongside V1 without breaking the live event site</li>
          <li>Plus Master Class, QFA, App Reviews and header search</li>
        </ul>
        <p>The patterns are consistent — Fiber router groups per feature, a DB-backed JWT middleware with per-endpoint permission strings, and static-token auth for internal endpoints. I also did the SQL remapping that fixed broken WordPress media references post-migration.</p>
        <p>Alongside that I contribute to India HR Conclave — a gated community for HR professionals, where members are approved rather than just signing up, and they blog, answer each other&apos;s questions and refer peers in. Engagement runs on a points feature, and points convert to vouchers at a rupee each. I didn&apos;t design that system, but it&apos;s where I learned what a growth feature paying real money demands: an append-only ledger with the balance as a cache, idempotency keys on every movement, and credits applied by an event consumer, not on the request path.</p>
        <p>Before this, WooCommerce at Thinkbar and WordPress at Visualytes. I&apos;m looking for a role with significant Go and Next.js work and wider ownership.&quot;</p>
      </Card>

      <h2>The 2-Minute Script (Walkthrough Style)</h2>
      <Script label="Tech leads, founders, final rounds" target="2min" words={313}>
        <span className="block mt-1">Beats sum to <b>120s</b> — 15 + 30 + 30 + 20 + 15 + 10.</span>
      </Script>
      <details>
        <summary>Click to expand</summary>
        <p><b>Opening (15s):</b> &quot;Hi, I&apos;m Arvind Sharma — full-stack engineer, five-plus years, currently at 1Finance through NeoSOFT. Mostly Go on the backend and Next.js on the front.&quot;</p>
        <p><b>What I own (30s):</b> &quot;The 1Finance website runs on a Go/Fiber platform with around thirty namespaces. I&apos;m a team contributor, and several modules are mine end-to-end — Magazine with its CSV export and encryption backfill, the In-the-News V3 admin pipeline, HR Conclave, Master Class with OTP enrollment, and QFA. I also handle the sitemap generators and the CSV bulk imports. Magazine is the one I&apos;d point at — registrations, CSV export, and a one-time backfill that re-encrypted legacy plaintext rows, written to be idempotent so a re-run was safe.&quot;</p>
        <p><b>Where I&apos;ve gone deeper (35s):</b> &quot;More recently I&apos;ve been contributing to India HR Conclave — a gated community for HR professionals, where members are approved rather than just signing up, and they blog, answer each other&apos;s questions and refer peers in. Engagement runs on a points feature, and points are literally money — a rupee each, redeemable for vouchers. I didn&apos;t design it, but it changed how I think about correctness, because a growth feature that pays real money is a fraud surface. Balances are a cache over an append-only ledger, every movement carries a deterministic idempotency key, and credits are applied by an event consumer — so an approval and the money moving fail independently.&quot;</p>
        <p><b>How I work (20s):</b> &quot;Day to day the patterns are consistent — Fiber router groups per feature, a DB-backed JWT middleware with per-endpoint permission strings, static-token auth for internal endpoints, and running two API versions side by side during a migration. That&apos;s how the HR Conclave V2 speaker cards shipped while V1 still served the live event site.&quot;</p>
        <p><b>Before this (15s):</b> &quot;WooCommerce platforms with payment gateway integration at Thinkbar, and WordPress sites at Visualytes — where I worked directly with clients and learned to turn vague asks into shipped features.&quot;</p>
        <p><b>What I want next (10s):</b> &quot;A role with deeper architectural ownership, Go-native engineering, and enough Next.js scope to keep growing on the frontend.&quot;</p>
      </details>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Before you rehearse: name your own pieces</h3>
        <p>
          The HR-community paragraph above is deliberately written as <i>contribution</i>, not
          authorship — but it is still vague, and vague invites the follow-up &quot;so what did
          <i> you</i> do on it?&quot; Have two or three specifics ready and swap them in.
        </p>
        <p>
          Pick whichever are genuinely yours — an endpoint or service you wrote, a bug you traced, a
          review queue or dashboard page you shipped, a migration or backfill you ran, tests you
          added. Then the sentence becomes: <i>&quot;I worked on X and Y there&quot;</i> followed by
          the systems observation, which is far stronger than the observation alone.
        </p>
        <p className="text-slate-300">
          <b>If you did not design the ledger, do not narrate it as your design decision.</b> The
          honest version — &quot;that was the existing design and here is why I think it&apos;s
          right&quot; — still demonstrates the understanding, and it survives the follow-up. Claiming
          it does not.
        </p>
      </Card>

      <h2>Recording Your Intro Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h4>Setup checklist</h4>
          <ul>
            <li>Good lighting — face a window or use a ring light</li>
            <li>Eye level camera — books under the laptop</li>
            <li>Clean background — neutral wall or tidy bookshelf</li>
            <li>External mic if possible — phone earbuds beat laptop mic</li>
            <li>Wear a collared shirt or smart casual</li>
          </ul>
        </Card>
        <Card>
          <h4>Delivery tips</h4>
          <ul>
            <li>Smile when you say your name — sets warm tone</li>
            <li>Speak at ~150 words per minute, slightly slower than chat</li>
            <li>Pause 1 second between sentences — don&apos;t rush</li>
            <li>Look at the camera lens, not the screen</li>
            <li>Time yourself — if you overrun, cut a module from the list, not a sentence from the ending</li>
          </ul>
        </Card>
      </div>

      <h2>Variations by Interview Type</h2>
      <details><summary>HR / Recruiter screen</summary>
        <p>Use the 60s version. Skip deep tech — years of experience, current role, motivation for switching, one or two ownership highlights. Describe the community platform in plain product language (&quot;a private network for HR professionals, with a rewards feature that pays out vouchers&quot;) rather than naming Kafka or ledgers; a recruiter is screening for fit and clarity, not architecture.</p>
      </details>
      <details><summary>Technical / Engineering Manager</summary>
        <p>Use the 90s version. Lead with modules you own — Magazine&apos;s encryption backfill and the In-the-News V3 pipeline are the cleanest ownership stories you have. Bring the HR community platform in as where your systems thinking grew, explicitly as a contributor. EMs are calibrating scope of ownership, and overstating it is the fastest way to fail that calibration.</p>
      </details>
      <details><summary>Tech Lead / Senior IC interview</summary>
        <p>Use the 2-minute version. This is the audience for &quot;a growth feature whose currency is real money is a fraud surface&quot; — then idempotency, append-only ledgers, and why credits happen off the request path. Frame it as &quot;here is how the system I work in handles this, and here is why I think that&apos;s right,&quot; which shows judgment without claiming the design.</p>
      </details>
      <details><summary>Founder / CTO interview (smaller companies)</summary>
        <p>Lead with product impact and shipping speed. Mention working directly with clients at Visualytes. Emphasise that you own features end-to-end across the stack — smaller companies are buying breadth and autonomy more than depth in any one layer.</p>
      </details>

      <h2>Common Opening Questions &amp; How to Bridge</h2>
      <details><summary>&quot;Tell me about yourself&quot;</summary>
        <p>Use the 60–90s script. Don&apos;t recite your resume top-to-bottom — give the module-ownership highlight reel and stop. Silence after 60 seconds is fine; they will ask.</p>
      </details>
      <details><summary>&quot;Walk me through your resume&quot;</summary>
        <p>Reverse chronological. Spend 70% on the current role (1Finance through NeoSOFT). Group earlier roles briefly. Be precise about scope: &quot;I&apos;m a team contributor — here&apos;s what I personally own,&quot; and separately, &quot;here&apos;s a system I contribute to.&quot;</p>
      </details>
      <details><summary>&quot;Why are you looking to switch?&quot;</summary>
        <p>&quot;I&apos;ve grown a lot at 1Finance — from writing endpoints to owning whole modules. I&apos;m looking for deeper architectural ownership and a Go-native engineering culture, ideally with stronger Next.js scope so I keep growing on the frontend too.&quot; Never badmouth your current employer.</p>
      </details>
      <details><summary>&quot;What&apos;s a module or feature you&apos;re proud of?&quot;</summary>
        <p>Pick something you personally own, because this question always ends in a depth probe: Magazine&apos;s idempotent encryption backfill, the In-the-News V3 admin pipeline, or HR Conclave V2 speaker cards shipped alongside V1 without breaking the live site. Save the HR community platform for &quot;what&apos;s the most interesting system you&apos;ve worked in&quot; — a different question, and one you can answer honestly as a contributor.</p>
      </details>
    </>
  );
}
