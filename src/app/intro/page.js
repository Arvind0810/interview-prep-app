import { Card, Pill } from "@/components/Card";

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

function Probe({ q, children }) {
  return (
    <li className="mb-2">
      <b className="text-slate-200">{q}</b>
      <br />
      <span className="text-slate-400">{children}</span>
    </li>
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
      <p>
        Everything below is built on <b>three real systems</b> you can talk about at architecture
        depth. The scripts name them; the <a href="#depth" className="text-cyan-400">depth ammunition</a>{" "}
        section is what you say when the interviewer stops you and asks for more.
      </p>

      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Framing note — knowing a system and owning it are two different claims.</b> You can
        explain all three of these end to end, and that is genuinely rare — lead with it. But keep
        the ownership line clean:
        <br /><br />
        <b>1Finance website + backend</b> — <i>team contributor across the platform.</i>{" "}
        Over three-plus years you have worked across product scoring and ranking, the financial
        calculators, and the admin dashboard. Lead with those surfaces, not a list of internal
        module names.
        <br />
        <b>India HR Conclave</b> — <i>contributor.</i> You did not design the ledger, the outbox or
        the saga. Say &quot;I worked on&quot; and &quot;the design is X, and here&apos;s why I think
        it&apos;s right&quot; — never &quot;I built&quot; or &quot;I designed.&quot;
        <br /><br />
        <b>And describe it correctly:</b> it is a <i>gated community platform for HR professionals</i>
        that happens to have a points feature — not &quot;a rewards platform.&quot; Leading with the
        rewards undersells the product and invites the wrong questions.
      </p>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Scope framing — name surfaces, not modules</h3>
        <p>
          Three-plus years is long enough that the interviewer is listening for <b>blast radius</b>,
          not activity. A list of four internal module names sounds like four small features — and
          worse, the names mean nothing outside the building, so nobody in the room can tell whether
          they were hard. Naming the product surfaces you have worked across — <b>product scoring
          and ranking</b>, <b>the financial calculators</b>, <b>the admin dashboard</b> — describes
          the same work at the scale it actually happened.
        </p>
        <p>
          It is also more honest in both directions. You are not claiming to have designed the
          scoring engine; you are saying you have worked across it. That is true, it matches the
          tenure, and it invites exactly the depth probe you can answer.
        </p>
        <p className="text-slate-300">
          <b>Then have one concrete artifact per surface ready.</b> Breadth with no specific behind
          it sounds like you were nearby while other people worked. The pattern that lands is:
          surface, then one thing you personally shipped inside it, then stop and let them pick which
          thread to pull.
        </p>
      </Card>

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
        <p className="text-slate-400 text-sm">
          Dense technical nouns cost more than 150 wpm suggests. &quot;Transactional outbox relayed
          to Kafka&quot; needs a beat after it or the listener falls behind. If a script feels rushed
          in rehearsal, cut a system rather than speeding up.
        </p>
      </Card>

      <h2>The 60-Second Script (Most Common)</h2>
      <Script label="HR screens, recruiter calls, panel round-robins" target="60s" words={161} />
      <Card>
        <p>&quot;Hi, I&apos;m Arvind Sharma — a full-stack engineer, five-plus years, currently building fintech systems at 1Finance through NeoSOFT.</p>
        <p>I work across three production systems. The public website is a Next.js 15 app that owns no datastore — every page composes a Go gateway, a WordPress CMS and our taxation services at request time, across fifty server-rendered routes. Behind it, four Go and Fiber services on two Postgres instances. Over three-plus years I&apos;ve worked across most of that platform — product scoring and ranking, the financial calculators, and the admin dashboard.</p>
        <p>And I contribute to India HR Conclave, a gated community for HR professionals — nine Go services behind a Fiber API gateway, loosely coupled via Kafka events and a transactional outbox, with an append-only ledger because its points are real money.</p>
        <p>Before that, WooCommerce with payment integrations at Thinkbar and WordPress at Visualytes.</p>
        <p>I&apos;m looking for a full-stack role with more Go and Next.js, and deeper ownership. Happy to go deeper on any of it.&quot;</p>
      </Card>
      <p className="text-xs text-slate-500">
        Recruiter variant: drop the third paragraph&apos;s architecture nouns entirely — &quot;a private
        network for HR professionals with a points feature that pays out vouchers&quot; is the whole
        sentence. A recruiter is screening for fit and clarity, not for Kafka.
      </p>

      <h2>The 90-Second Script (Senior / Detailed)</h2>
      <Script label="Engineering managers, senior IC screens" target="90s" words={241} />
      <Card>
        <p>&quot;Hi, I&apos;m Arvind — full-stack engineer, five-plus years, at 1Finance through NeoSOFT since January 2023. Three systems.</p>
        <p>The public website is a Next.js 15 Pages Router app that owns no datastore — every page composes the Go gateway, a WordPress CMS and our taxation services at request time. The edge middleware carries the weight: CSP and HSTS, origin-allowlist CORS, and 50/50 A/B bucketing that writes the cookie onto the inbound request, so the first server render already sees the variant.</p>
        <p>Behind it, four Go and Fiber services sharing database, auth and crypto packages behind a path-prefix gateway. I have worked across most of that platform over three-plus years — product scoring and ranking, the financial calculators, and the admin dashboard the analysts run it all from. Auth is HS256 plus mandatory TOTP, with scopes revalidated from the database on every request rather than trusted from the token.</p>
        <p>And I contribute to India HR Conclave — a gated community for HR professionals. Nine Go services behind a Fiber API gateway, loosely coupled via Kafka events and a transactional outbox, so emails and point credits run off the request path. Points are money, a rupee each, so they sit in an append-only ledger with idempotency keys and a trigger that blocks mutation. I didn&apos;t design that, but I can defend every piece of it.</p>
        <p>Before this, WooCommerce at Thinkbar and WordPress at Visualytes. I&apos;m looking for a role with significant Go and Next.js work and wider ownership.&quot;</p>
      </Card>

      <h2>The 2-Minute Script (Walkthrough Style)</h2>
      <Script label="Tech leads, founders, final rounds" target="2min" words={302}>
        <span className="block mt-1">Beats sum to <b>121s</b> — 14 + 31 + 32 + 32 + 6 + 6.</span>
      </Script>
      <details>
        <summary>Click to expand</summary>
        <p><b>Opening (14s):</b> &quot;Hi, I&apos;m Arvind Sharma — full-stack engineer, five-plus years, at 1Finance through NeoSOFT. Go on the backend, Next.js on the front. Three systems, and I can take you through any of them end to end.&quot;</p>
        <p><b>The website (31s):</b> &quot;The public website is a Next.js 15 Pages Router app that deliberately owns no datastore. Each of about fifty routes composes a Go gateway, a WordPress CMS and our taxation services inside getServerSideProps. The edge middleware is where the judgement is: CSP and HSTS, origin-allowlist CORS, regex 301s repairing legacy fund slugs still sitting in Google&apos;s index, and 50/50 A/B bucketing that writes the cookie onto the inbound request, so the first server render already reads the variant.&quot;</p>
        <p><b>The backend, and where I have worked (32s):</b> &quot;Behind it, four Go and Fiber services sharing database, auth and crypto packages through go.mod replace, behind a path-prefix reverse proxy. Two Postgres instances — our own store, plus a read-only vendor fund database whose absence degrades to stored values instead of failing boot. I have worked across most of that platform over three-plus years — product scoring and ranking, which runs as SQL window functions over a weights table, the financial calculators, and the admin dashboard the analysts run it all from.&quot;</p>
        <p><b>Where I&apos;ve gone deeper (32s):</b> &quot;Third is India HR Conclave, a gated community for HR professionals, where I&apos;m a contributor. Nine Go services behind a Fiber API gateway, loosely coupled via Kafka events and a transactional outbox, so emails and point credits run off the request path. Points are a rupee each, so balances are a cache over an append-only ledger with row locks, idempotency keys and a trigger that blocks mutation. I didn&apos;t design that, but I can defend every piece of it.&quot;</p>
        <p><b>Before this (6s):</b> &quot;WooCommerce with payment gateway integration at Thinkbar, and WordPress at Visualytes, working directly with clients.&quot;</p>
        <p><b>What I want next (6s):</b> &quot;Deeper architectural ownership, Go-native engineering, and enough Next.js scope to keep growing on the frontend.&quot;</p>
      </details>

      <h2 id="depth">The Three Systems — Your Depth Ammunition</h2>
      <p>
        The scripts are the surface. This is the layer underneath: the sentence you say, and the
        follow-up it invites. If you can answer the probes below without hedging, &quot;I can explain
        any of it&quot; is a claim you can actually make.
      </p>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">1 · 1Finance public website</h3>
        <p className="my-2">
          <Pill>Next.js 15.5.18</Pill><Pill>Pages Router</Pill><Pill>React 18</Pill>
          <Pill color="purple">SSR</Pill><Pill color="purple">Edge middleware</Pill>
        </p>
        <p>
          Server-rendered marketing and financial-tools site — calculators and mutual-fund product
          scoring. It owns <b>no datastore</b>: it composes the Go gateway, a WordPress wp-json CMS
          and ITR/taxation services through <code>getServerSideProps</code> across ~50 routes, plus
          eight request-time sitemap XML endpoints, all under global <code>no-store</code>. Edge
          middleware emits CSP and HSTS, applies origin-allowlist CORS, 301-repairs legacy indexed
          fund slugs by regex, and does 50/50 A/B bucketing. No user session — OTP enrollment and
          static bearer tokens. Jest/Testing-Library; Jenkins runs SonarQube then deploys over SSH to
          PM2 per branch. CSS Modules, Bootstrap 5, MUI, Framer Motion, Highcharts, react-three-fiber.
        </p>
        <h4>What they will pull on</h4>
        <ul>
          <Probe q="Why own no datastore?">
            It is a composition layer — data ownership stays with the Go services and the CMS, so
            there is one source of truth per domain and no sync problem. The cost is real: every
            page pays request-time fan-out, and an upstream outage is a page outage.
          </Probe>
          <Probe q="Global no-store on a marketing site? That's expensive.">
            Deliberate: calculator output and fund scores must never render stale. Freshness beat
            cacheability. The honest answer is that the marketing pages don&apos;t need it and are
            the obvious candidate for per-route caching — say that before they do.
          </Probe>
          <Probe q="Why write the A/B cookie onto the inbound request, not just the response?">
            A response-only cookie isn&apos;t visible to the render that set it, so first paint shows
            the default variant and flips on the next navigation. Mutating the inbound request makes
            the same SSR pass read it — no flash of the wrong variant, no client-side rerender.
          </Probe>
          <Probe q="Why regex 301s in middleware instead of next.config redirects?">
            The legacy fund slugs were already indexed. A regex at the edge repairs a whole slug
            family and preserves link equity, instead of shipping and maintaining hundreds of static
            redirect entries.
          </Probe>
          <Probe q="CSP with Highcharts and react-three-fiber?">
            Those are the awkward ones — inline style and shader-source pressure. Be ready to say
            exactly which directives you had to relax and that it was scoped, not a blanket
            unsafe-inline.
          </Probe>
          <Probe q="No session — so what is actually protected?">
            Nothing user-facing to log into. OTP gates enrollment flows; internal endpoints use
            static bearer tokens. That is a smaller attack surface, not an absent one.
          </Probe>
        </ul>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">2 · 1Finance Go backend</h3>
        <p className="my-2">
          <Pill>Go 1.23</Pill><Pill>Fiber v2</Pill><Pill color="green">GORM</Pill>
          <Pill color="green">PostgreSQL</Pill><Pill color="purple">Docker Compose</Pill>
        </p>
        <p>
          Four Fiber v2 services — separate modules sharing database/auth/crypto packages via{" "}
          <code>go.mod replace</code> — behind a path-prefix reverse-proxy gateway, with a Next.js 14
          / MUI admin console. Two GORM PostgreSQL instances: the app store, plus a read-only vendor
          fund database whose absence <b>degrades to stored values instead of failing boot</b>. Fund
          catalogues load from analyst Excel workbooks: reflection-mapped, ISIN-upserted in batches,
          transactional with their audit row. Credit-card ranking is SQL window functions over a
          weights table. Type-ahead search fans nine goroutines under a 200 ms deadline and returns
          partial results. HS256 JWTs plus mandatory TOTP, revalidated per request against DB-held
          scopes. Token-keyed sliding-window rate limits behind trusted-proxy checks; in-memory
          SQLite integration tests; golangci-lint at pre-commit.
        </p>
        <h4>What they will pull on</h4>
        <ul>
          <Probe q="Why does a missing vendor DB degrade instead of failing boot?">
            It is third-party read-only data. A vendor outage should cost freshness, not
            availability — so we serve last-known stored values. The risk is silently stale prices,
            which is why staleness has to be visible rather than swallowed.
          </Probe>
          <Probe q="Reflection-mapped Excel import — why not just index columns?">
            Analyst workbooks change column order between releases. Mapping by header via struct
            tags survives that; index-based parsing corrupts silently. ISIN is the natural key, so
            rows upsert in batches, and the audit row is written in the same transaction — an import
            can never be recorded as having happened when it didn&apos;t.
          </Probe>
          <Probe q="Nine goroutines, 200 ms, partial results — what's the contract?">
            The deadline belongs to the user, not to the slowest source. A shared context deadline
            with <code>errgroup</code>; each fan-out writes to its own slot so there is no shared-map
            race; a source that misses the deadline simply loses its section of the results.
          </Probe>
          <Probe q="Why revalidate scopes per request instead of trusting the JWT?">
            A signed token cannot be un-issued, and access lists change mid-session. One indexed read
            per request is cheaper to reason about than a revocation list, and it makes an admin
            demotion take effect on the next call.
          </Probe>
          <Probe q="Sliding-window limits keyed by token, behind a trusted-proxy check — why both?">
            Keying on IP alone punishes everyone behind a shared NAT; keying on token alone lets an
            unauthenticated flood through. The trusted-proxy check is what stops a spoofed
            X-Forwarded-For from choosing its own bucket.
          </Probe>
          <Probe q="In-memory SQLite for integration tests — name the gap yourself.">
            SQLite does not faithfully reproduce PostgreSQL window functions, so the credit-card
            ranking is exactly the code those tests cover least. Say it first; it reads as
            engineering judgement rather than a hole they found.
          </Probe>
        </ul>
      </Card>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">3 · India HR Conclave — contributor, not author</h3>
        <p className="my-2">
          <Pill>Go</Pill><Pill>Fiber v3</Pill><Pill color="purple">Kafka</Pill>
          <Pill color="green">PostgreSQL</Pill><Pill color="green">Redis</Pill><Pill color="green">S3</Pill>
          <Pill color="red">Next.js 16 / React 19</Pill>
        </p>
        <p>
          A community website for HR professionals: a Go monorepo whose Fiber v3 API gateway
          reverse-proxies nine microservices, with a Next.js 16 / React 19 / Tailwind admin
          dashboard, PostgreSQL (GORM), Kafka, Redis, Docker and S3. Event-driven by design —
          services are loosely coupled via Kafka events and a <b>transactional outbox</b> rather than
          direct calls, so emails and point credits run off the request path. Secured with
          audience-separated JWTs, Google OAuth for members, TOTP two-factor for admins, and
          role-based permission middleware. Money flows through an <b>append-only ledger</b> with row
          locks, idempotency keys and a mutation-blocking DB trigger, plus a <b>saga with
          compensating transactions</b> for third-party redemptions. Member PII is deterministically
          encrypted at rest so unique indexes still work. Rate limiting, circuit breakers, metrics
          and audit logging throughout; integration tests against Testcontainers PostgreSQL.
        </p>
        <h4>What they will pull on</h4>
        <ul>
          <Probe q="Why an outbox instead of publishing to Kafka directly?">
            A direct publish can succeed while the transaction rolls back — you have then invented an
            event for state that does not exist. Writing the event into the same transaction as the
            state change makes them one atomic fact; the relay&apos;s only job is delivery.
          </Probe>
          <Probe q="At-least-once delivery means duplicates. What actually protects the money?">
            Not the consumer — the ledger. Every movement carries a deterministic idempotency key
            with a unique constraint behind it, so a replayed event is a no-op at the database, not a
            second credit.
          </Probe>
          <Probe q="Why append-only with a trigger, rather than just updating a balance?">
            The balance is a cache over the ledger, so history is reconstructible and auditable. The
            trigger blocking UPDATE and DELETE is defence against the non-code paths — a future
            migration, a console session, a well-meaning script.
          </Probe>
          <Probe q="What does the saga compensate when the voucher is already delivered?">
            You cannot un-send a voucher, so compensation is financial, not physical: debit back and
            flag for reconciliation. Worth saying plainly — it shows you know a saga does not
            actually give you rollback.
          </Probe>
          <Probe q="Deterministic encryption leaks equality. Why accept that?">
            It is the point: identical plaintext must produce identical ciphertext or a unique index
            on encrypted email cannot exist. Accepted for high-cardinality PII; it would be the wrong
            call for a low-cardinality column where equality leakage reveals the value.
          </Probe>
          <Probe q="Why audience-separated JWTs?">
            An admin token must not be replayable against the member API. Separate audiences make
            that a validation failure rather than a policy question. Members authenticate through
            Google OAuth; admins carry mandatory TOTP on top.
          </Probe>
          <Probe q="Testcontainers here, SQLite on the other system — why the difference?">
            Because this system&apos;s correctness lives in triggers, row locks and constraints, and
            those simply do not exist in a SQLite stand-in. Contrast the two out loud; it shows you
            pick the test strategy from what the code depends on.
          </Probe>
        </ul>
      </Card>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Before you rehearse: two rules</h3>
        <p>
          <b>1 · Name your own pieces on the HR platform.</b> &quot;I contribute&quot; is vague, and
          vague invites &quot;so what did <i>you</i> do?&quot; Have two or three specifics ready — an
          endpoint or service you wrote, a bug you traced, a review queue or dashboard page you
          shipped, a migration you ran, tests you added. Then the sentence becomes &quot;I worked on
          X and Y there,&quot; followed by the systems observation, which is far stronger than the
          observation alone.
        </p>
        <p>
          <b>2 · Explaining a design is not claiming it.</b> Knowing why the ledger is append-only is
          worth saying — you should say it. But say it as &quot;that is the existing design, and here
          is why I think it&apos;s right,&quot; not as your decision. The honest version demonstrates
          exactly the same understanding and survives the follow-up. The claim does not.
        </p>
        <p className="text-slate-300">
          If a probe goes past what you know, say where your knowledge stops and what you would check
          — &quot;I know the relay is at-least-once; I haven&apos;t traced how it handles a partition
          mid-batch, I&apos;d read the relay loop.&quot; That answer costs you nothing. A confident
          guess that unravels costs you the round.
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
            <li>Pause after each system name, not mid-sentence — three systems in 60s only works if the seams are audible</li>
            <li>Look at the camera lens, not the screen</li>
            <li>Time yourself — if you overrun, cut a system, not a sentence from the ending</li>
          </ul>
        </Card>
      </div>

      <h2>Variations by Interview Type</h2>
      <details><summary>HR / Recruiter screen</summary>
        <p>Use the 60s version with the recruiter variant. Years of experience, current role, motivation for switching, one or two ownership highlights. Say &quot;a website, the APIs behind it, and a community platform&quot; rather than naming Kafka, outboxes or ledgers — a recruiter is screening for fit and clarity, not architecture.</p>
      </details>
      <details><summary>Technical / Engineering Manager</summary>
        <p>Use the 90s version. Lead with breadth across the platform — scoring and ranking, the calculators, the admin dashboard — and then let them choose which one to open up. Bring the HR community platform in as where your systems thinking grew, explicitly as a contributor. EMs are calibrating scope, and after three-plus years breadth across product surfaces is the answer that matches the tenure; a list of small modules is the answer that undercuts it.</p>
      </details>
      <details><summary>Tech Lead / Senior IC interview</summary>
        <p>Use the 2-minute version, and expect them to stop you inside it — that is the goal. The three richest stopping points are the A/B cookie written onto the inbound request, the vendor DB that degrades instead of failing boot, and the outbox-plus-idempotency-key pairing. Each has a real trade-off you can name, which is what separates &quot;I read about this&quot; from &quot;I work in this.&quot;</p>
      </details>
      <details><summary>Founder / CTO interview (smaller companies)</summary>
        <p>Lead with product impact and shipping speed. Mention working directly with clients at Visualytes. Emphasise that you own features end-to-end across the stack and can move between a Next.js render path and a Go service in the same day — smaller companies are buying breadth and autonomy more than depth in any one layer.</p>
      </details>

      <h2>Common Opening Questions &amp; How to Bridge</h2>
      <details><summary>&quot;Tell me about yourself&quot;</summary>
        <p>Use the 60–90s script. Don&apos;t recite your resume top-to-bottom — give the three-systems highlight reel and stop. Silence after 60 seconds is fine; they will ask.</p>
      </details>
      <details><summary>&quot;Walk me through your resume&quot;</summary>
        <p>Reverse chronological. Spend 70% on the current role (1Finance through NeoSOFT). Group earlier roles briefly. Be precise about scope: &quot;I&apos;m a team contributor — here&apos;s what I personally own,&quot; and separately, &quot;here&apos;s a system I contribute to and can explain end to end.&quot;</p>
      </details>
      <details><summary>&quot;Why are you looking to switch?&quot;</summary>
        <p>&quot;I&apos;ve grown a lot at 1Finance — from writing endpoints to owning whole modules. I&apos;m looking for deeper architectural ownership and a Go-native engineering culture, ideally with stronger Next.js scope so I keep growing on the frontend too.&quot; Never badmouth your current employer.</p>
      </details>
      <details><summary>&quot;What&apos;s a feature you&apos;re proud of?&quot;</summary>
        <p>Answer with one concrete thing inside a surface, not the surface itself — this question always ends in a depth probe, and &quot;the scoring engine&quot; is too big to defend while &quot;the ranking query and why it is a window function rather than application-side sorting&quot; is exactly the right size. Pick something you personally wrote or fixed, say what was hard about it, and stop. Save the HR community platform for &quot;what&apos;s the most interesting system you&apos;ve worked in&quot; — a different question, and one you answer honestly as a contributor.</p>
      </details>
      <details><summary>&quot;What&apos;s the most interesting system you&apos;ve worked in?&quot;</summary>
        <p>This is the HR Conclave question, and the one your depth ammunition is built for. Open with the product — a gated community for HR professionals — then the one design fact that makes it interesting: nine services loosely coupled via Kafka events and a transactional outbox, so every cross-service effect is published rather than called. Then let them pick which thread to pull.</p>
      </details>
      <details><summary>&quot;Which of these did you actually build?&quot;</summary>
        <p>The question you want. Answer it directly and without discomfort: on the 1Finance platform you have shipped across scoring and ranking, the calculators and the admin dashboard over three-plus years; the HR platform is one you contribute to and understand thoroughly. Then add what the understanding gave you — &quot;working in a system where the currency is real money changed how I think about idempotency&quot; — which is a truthful claim about your growth, not about your authorship.</p>
      </details>
    </>
  );
}
