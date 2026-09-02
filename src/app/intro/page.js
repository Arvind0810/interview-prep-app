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
        Your opening sixty seconds set the tone for the entire interview. Pick the script length
        that matches the format, rehearse it out loud, and record yourself on your phone to refine
        your pace and energy.
      </p>
      <p>
        Everything below is built on <b>three real systems</b> you can discuss at architectural
        depth. The scripts introduce them; the{" "}
        <a href="#reference" className="text-cyan-400">deep-dive reference</a> is what you say when
        the interviewer stops you and asks for more.
      </p>

      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Framing note — understanding a system and owning it are two different claims.</b> You can
        explain all three of these end to end, which is genuinely rare, so lead with it. But keep the
        ownership line clean:
        <br /><br />
        <b>The 1Finance website and platform APIs</b> — <i>team contributor across the platform.</i>{" "}
        Over three-plus years you have worked across product scoring and ranking, the financial
        calculators and the admin dashboard. Lead with those surfaces rather than a list of internal
        module names.
        <br />
        <b>India HR Conclave</b> — <i>contributor.</i> You did not design the ledger, the outbox or
        the saga. Say &quot;I worked on&quot; and &quot;the design is X, and here is why I think it
        is right&quot; — never &quot;I built&quot; or &quot;I designed.&quot;
        <br /><br />
        <b>Describe it accurately, too:</b> it is a{" "}
        <i>gated community platform for HR professionals</i> that happens to have a points feature,
        not &quot;a rewards platform.&quot; Leading with the rewards undersells the product and
        invites the wrong questions.
      </p>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Scope framing — name surfaces, not modules</h3>
        <p>
          Three-plus years is long enough that the interviewer is listening for <b>blast radius</b>
          rather than activity. A list of four internal module names sounds like four small features,
          and worse, those names mean nothing outside the building, so nobody in the room can tell
          whether they were hard. Naming the product surfaces you have worked across — <b>product
          scoring and ranking</b>, <b>the financial calculators</b> and <b>the admin dashboard</b> —
          describes the same work at the scale it actually happened.
        </p>
        <p>
          It is also more honest in both directions. You are not claiming to have designed the
          scoring engine; you are saying you have worked across it. That is true, it matches your
          tenure, and it invites exactly the follow-up you can answer.
        </p>
        <p className="text-slate-300">
          <b>Then have one concrete example ready for each surface.</b> Breadth with nothing specific
          behind it sounds like you were nearby while other people worked. The pattern that lands is
          simple: name the surface, name one thing you personally shipped inside it, then stop and
          let them choose which thread to pull.
        </p>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">Timing maths — why these scripts are the length they are</h3>
        <p>
          Interview pace is roughly <b>150 words per minute</b>, slower than casual conversation
          because you are pausing between sentences. So <b>60s ≈ 150 words</b>,{" "}
          <b>90s ≈ 225 words</b> and <b>2min ≈ 300 words</b>. Every script below shows its real word
          count and the duration that implies, so you can confirm you are not overrunning before you
          are in the room.
        </p>
        <p className="text-slate-400 text-sm">
          Running long is the most common self-introduction failure. You spend two minutes on a
          question that wanted forty-five seconds, the interviewer stops listening around the
          ninety-second mark, and your best material lands in the part they tuned out. When in doubt,
          use the shorter script and let them ask for more — being asked a follow-up is a far better
          outcome than filling the silence yourself.
        </p>
        <p className="text-slate-400 text-sm">
          Dense technical phrases cost more time than 150 wpm suggests. &quot;Loosely coupled via
          Kafka events and a transactional outbox&quot; needs a beat after it, or the listener falls
          behind. If a script feels rushed in rehearsal, cut a system rather than speaking faster.
        </p>
      </Card>

      <h2>The 60-Second Script (Most Common)</h2>
      <Script label="HR screens, recruiter calls, panel round-robins" target="60s" words={131} />
      <Card>
        <p>&quot;Hi, I&apos;m Arvind Sharma. I&apos;m a Full-Stack Engineer with around six years of experience, currently working with NeoSOFT on fintech products for 1Finance.</p>
        <p>My experience spans both frontend and backend development, primarily with Next.js, React, Go, PHP, WordPress, PostgreSQL, and REST APIs. In my current role, I&apos;ve worked across different parts of the platform, including financial calculators, product scoring and ranking, backend APIs, CMS integrations, and admin dashboards.</p>
        <p>I&apos;ve also contributed to the India HR Conclave platform, working with Go-based microservices and event-driven architecture using Kafka and PostgreSQL.</p>
        <p>Earlier, I worked extensively with WordPress and WooCommerce, including custom development and payment integrations.</p>
        <p>Now, I&apos;m looking for a role where I can take greater ownership, contribute to architecture and technical decisions, and work more deeply with Go, Next.js, and scalable backend systems.&quot;</p>
      </Card>
      <p className="text-xs text-slate-500">
        <b>Recruiter variant:</b> drop the architectural detail from the third paragraph entirely.
        &quot;A private network for HR professionals, with a points feature that pays out
        vouchers&quot; is the whole sentence. A recruiter is screening for fit and clarity, not for
        Kafka.
      </p>

      <h2>The 90-Second Script (Senior / Detailed)</h2>
      <Script label="Engineering managers, senior IC screens" target="90s" words={217} />
      <Card>
        <p>&quot;Hi, I&apos;m Arvind. I&apos;m a Full-Stack Engineer with around six years of experience, and I&apos;ve been working with NeoSOFT on 1Finance since January 2023.</p>
        <p>In my current role, I work across multiple production systems, with a strong focus on Go, Next.js, PostgreSQL, WordPress, and REST APIs. One of our main platforms is a server-rendered Next.js application that integrates Go APIs, WordPress, and taxation services. I&apos;ve worked across most of the platform, including product scoring and ranking, financial calculators, APIs, and the admin dashboard.</p>
        <p>From an engineering perspective, I&apos;ve also been involved in areas like security, authentication, authorization, A/B testing, and backend architecture. Our backend consists of multiple Go and Fiber services behind an API gateway, with shared infrastructure and database components.</p>
        <p>I also contribute to the India HR Conclave platform, which uses nine Go services, Kafka, and a transactional outbox for asynchronous workflows. Since its points represent real monetary value, we use an append-only ledger and idempotency to maintain consistency and prevent duplicate transactions.</p>
        <p>Earlier in my career, I worked extensively with WordPress and WooCommerce, including custom development and payment integrations.</p>
        <p>At this stage, I&apos;m looking for a Senior Engineer or Tech Lead opportunity where I can take broader ownership of architecture, technical decisions, implementation, and production reliability, while continuing to work deeply with Go and Next.js.&quot;</p>
      </Card>

      <h2>The 2-Minute Script (Walkthrough Style)</h2>
      <Script label="Tech leads, founders, final rounds" target="2min" words={319}>
        <span className="block mt-1">Beats sum to <b>127s</b> — 17 + 35 + 30 + 32 + 7 + 6.</span>
      </Script>
      <details>
        <summary>Click to expand</summary>
        <p><b>Opening (17s):</b> &quot;Hi, I&apos;m Arvind Sharma — a full-stack engineer with six years&apos; experience, currently at 1Finance through NeoSOFT. Mostly Go on the backend and Next.js on the front. There are three systems, and I can take you through any of them end to end.&quot;</p>
        <p><b>The website (35s):</b> &quot;The public website is a server-rendered Next.js app that holds no data of its own — each of roughly fifty routes assembles its page at request time from our Go APIs, a WordPress CMS and the taxation services, inside getServerSideProps. The edge middleware is where most of the judgement sits: CSP and HSTS headers, origin-allowlist CORS, regex 301s that repair legacy fund slugs still sitting in Google&apos;s index, and 50/50 A/B bucketing that writes the cookie onto the inbound request, so the first server render already reads the variant.&quot;</p>
        <p><b>The platform APIs, and where I fit (30s):</b> &quot;Behind it sit four Go and Fiber services that share database, auth and crypto packages through go.mod replace, all fronted by a path-prefix reverse proxy. There are two Postgres databases — our own store, plus a read-only vendor fund database whose absence degrades to stored values instead of failing at boot. Over three-plus years I have worked across most of that platform: product scoring and ranking, the financial calculators, and the admin dashboard our analysts work in.&quot;</p>
        <p><b>The community platform (32s):</b> &quot;The third is India HR Conclave, a gated community for HR professionals, where I am a contributor. Nine Go services behind a Fiber API gateway, loosely coupled via Kafka events and a transactional outbox, so emails and point credits run off the request path. Points are a rupee each, so balances are a cache over an append-only ledger with row locks, idempotency keys and a trigger that blocks mutation. I didn&apos;t design that, but I can defend every piece of it.&quot;</p>
        <p><b>Before this (7s):</b> &quot;Before 1Finance, WooCommerce with payment gateway integration at Thinkbar, and WordPress at Visualytes, working directly with clients.&quot;</p>
        <p><b>What I want next (6s):</b> &quot;Deeper architectural ownership, Go-native engineering, and enough Next.js scope to keep growing on the frontend.&quot;</p>
      </details>

      <h2 id="reference">The Three Systems — Deep-Dive Reference</h2>
      <p>
        The scripts are the surface. This is the layer underneath: the sentence you say, and the
        follow-up it invites. If you can answer the questions below without hedging, then &quot;I can
        explain any of it&quot; is a claim you can genuinely make.
      </p>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">1 · The 1Finance website</h3>
        <p className="my-2">
          <Pill>Next.js</Pill><Pill>Pages Router</Pill><Pill>React</Pill>
          <Pill color="purple">Server-side rendering</Pill><Pill color="purple">Edge middleware</Pill>
        </p>
        <p>
          A server-rendered marketing and financial-tools site covering the calculators and
          mutual-fund product scoring. It <b>holds no data of its own</b>: every route assembles its
          page at request time from the Go gateway, a WordPress <code>wp-json</code> CMS and the
          taxation services inside <code>getServerSideProps</code>, across roughly fifty routes plus eight sitemap endpoints
          generated at request time, all under a global <code>no-store</code> policy. The edge
          middleware emits CSP and HSTS headers, applies origin-allowlist CORS, repairs legacy
          indexed fund slugs with regex 301s, and performs 50/50 A/B bucketing. There is no user
          session — OTP gates enrollment, and internal endpoints use static bearer tokens. Tests run
          on Jest and Testing Library; Jenkins runs SonarQube and then deploys over SSH to PM2, one
          target per branch. The interface is built with CSS Modules, Bootstrap, MUI, Framer Motion,
          Highcharts and react-three-fiber.
        </p>
        <h4>Likely follow-up questions</h4>
        <ul>
          <Probe q="Why does the site hold no data of its own?">
            It is a composition layer. Data ownership stays with the Go services and the CMS, so
            there is one source of truth per domain and no synchronisation problem. The cost is real,
            though: every page pays for request-time fan-out, and an upstream outage becomes a page
            outage.
          </Probe>
          <Probe q="A global no-store policy on a marketing site is expensive. Why?">
            It is deliberate — calculator output and fund scores must never render stale. Freshness
            beats cacheability here. The honest addition is that the marketing pages do not need it
            and are the obvious candidate for per-route caching; say that before they do.
          </Probe>
          <Probe q="Why write the A/B cookie onto the inbound request rather than just the response?">
            A cookie set only on the response is invisible to the render that set it, so the first
            paint shows the default variant and only flips on the next navigation. Mutating the
            inbound request lets the same server render read it, which removes both the flash of the
            wrong variant and any client-side re-render.
          </Probe>
          <Probe q="Why regex 301s in middleware instead of static redirects in the config?">
            The legacy fund slugs were already indexed by Google. One regex at the edge repairs an
            entire slug family and preserves the link equity, instead of shipping and maintaining
            hundreds of individual redirect entries.
          </Probe>
          <Probe q="How does CSP survive Highcharts and react-three-fiber?">
            Those are the two awkward ones — inline styles from the charts, shader source from the
            3D layer. Be ready to name exactly which directives you had to relax, and to say the
            relaxation was scoped rather than a blanket unsafe-inline.
          </Probe>
          <Probe q="With no session, what is actually protected?">
            There is nothing user-facing to log in to. OTP gates the enrollment flows, and internal
            endpoints use static bearer tokens. That is a smaller attack surface, not an absent one.
          </Probe>
        </ul>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">2 · The 1Finance platform APIs</h3>
        <p className="my-2">
          <Pill>Go</Pill><Pill>Fiber</Pill><Pill color="green">GORM</Pill>
          <Pill color="green">PostgreSQL</Pill><Pill color="purple">Docker Compose</Pill>
        </p>
        <p>
          Four Fiber services sit behind a path-prefix reverse-proxy gateway, each a separate module
          sharing the database, auth and crypto packages through <code>go.mod replace</code>, with a
          Next.js and MUI admin console alongside them. There are two GORM PostgreSQL databases: the
          application store, plus a read-only vendor fund database whose absence{" "}
          <b>degrades to stored values instead of failing at boot</b>. Fund catalogues load from
          analyst Excel workbooks — mapped by reflection, upserted by ISIN in batches, and written in
          the same transaction as their audit row. Credit-card ranking runs as SQL window functions
          over a weights table. Type-ahead search fans out nine goroutines under a 200 ms deadline
          and returns partial results. Auth is HS256 JWTs with mandatory TOTP, and scopes are
          revalidated against the database on every request. Rate limiting is a token-keyed sliding
          window behind trusted-proxy checks; integration tests run against in-memory SQLite; and
          golangci-lint runs at pre-commit.
        </p>
        <h4>Likely follow-up questions</h4>
        <ul>
          <Probe q="Why does a missing vendor database degrade rather than fail at boot?">
            It holds third-party read-only data. A vendor outage should cost freshness, not
            availability, so we serve the last known stored values. The risk is silently stale
            prices, which is why the staleness has to be visible rather than swallowed.
          </Probe>
          <Probe q="Why map the Excel import by reflection instead of by column index?">
            Analyst workbooks change column order between releases. Mapping by header through struct
            tags survives that, whereas index-based parsing corrupts data silently. ISIN is the
            natural key, so rows upsert in batches, and the audit row is written in the same
            transaction — an import can never be recorded as having happened when it did not.
          </Probe>
          <Probe q="Nine goroutines, a 200 ms deadline, partial results — what is the contract?">
            The deadline belongs to the user, not to the slowest source. One shared context deadline
            drives an errgroup, each fan-out writes into its own slot so there is no shared-map race,
            and any source that misses the deadline simply loses its section of the results.
          </Probe>
          <Probe q="Why revalidate scopes on every request instead of trusting the JWT?">
            A signed token cannot be un-issued, and access lists change mid-session. One indexed read
            per request is easier to reason about than a revocation list, and it means an admin
            demotion takes effect on the very next call.
          </Probe>
          <Probe q="Why key the rate limiter on the token and also check for a trusted proxy?">
            Keying on IP alone punishes everyone behind a shared NAT, while keying on the token alone
            lets an unauthenticated flood straight through. The trusted-proxy check is what stops a
            spoofed X-Forwarded-For header from choosing its own bucket.
          </Probe>
          <Probe q="In-memory SQLite for integration tests — name the gap before they do.">
            SQLite does not faithfully reproduce PostgreSQL window functions, so the credit-card
            ranking is precisely the code those tests cover least. Raising it yourself reads as
            engineering judgement; letting them find it reads as a hole.
          </Probe>
        </ul>
      </Card>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">3 · India HR Conclave <span className="text-sm font-normal">(contributor, not author)</span></h3>
        <p className="my-2">
          <Pill>Go</Pill><Pill>Fiber</Pill><Pill color="purple">Kafka</Pill>
          <Pill color="green">PostgreSQL</Pill><Pill color="green">Redis</Pill><Pill color="green">S3</Pill>
          <Pill color="red">Next.js / React</Pill>
        </p>
        <p>
          A community platform for HR professionals, built as a Go monorepo whose Fiber API gateway
          reverse-proxies nine microservices, with a Next.js, React and Tailwind admin dashboard over
          PostgreSQL and GORM, plus Kafka, Redis, Docker and S3. It is event-driven by design:
          services are loosely coupled through Kafka events and a <b>transactional outbox</b> rather
          than direct calls, so emails and point credits run off the request path. It is secured with
          audience-separated JWTs, Google OAuth for members, TOTP two-factor authentication for
          admins, and role-based permission middleware. Money moves through an{" "}
          <b>append-only ledger</b> with row locks, idempotency keys and a mutation-blocking database
          trigger, alongside a <b>saga with compensating transactions</b> for third-party
          redemptions. Member PII is deterministically encrypted at rest so that unique indexes still
          work. Rate limiting, circuit breakers, metrics and audit logging run throughout, and
          integration tests execute against a Testcontainers PostgreSQL instance.
        </p>
        <h4>Likely follow-up questions</h4>
        <ul>
          <Probe q="Why use an outbox instead of publishing to Kafka directly?">
            A direct publish can succeed while the surrounding transaction rolls back, at which point
            you have invented an event for state that does not exist. Writing the event inside the
            same transaction as the state change makes them a single atomic fact, and the relay is
            then responsible only for delivery.
          </Probe>
          <Probe q="At-least-once delivery means duplicates. What actually protects the money?">
            Not the consumer — the ledger. Every movement carries a deterministic idempotency key
            with a unique constraint behind it, so a replayed event becomes a no-op at the database
            rather than a second credit.
          </Probe>
          <Probe q="Why append-only with a trigger, rather than simply updating a balance?">
            The balance is a cache over the ledger, so the history stays reconstructible and
            auditable. The trigger that blocks UPDATE and DELETE defends the paths that are not code
            — a future migration, a console session, a well-meaning script.
          </Probe>
          <Probe q="What does the saga compensate once the voucher has already been delivered?">
            You cannot un-send a voucher, so the compensation is financial rather than physical:
            debit the amount back and flag the case for reconciliation. Say that plainly — it shows
            you understand that a saga does not actually give you rollback.
          </Probe>
          <Probe q="Deterministic encryption leaks equality. Why accept that?">
            Because that is the point: identical plaintext must produce identical ciphertext, or a
            unique index on an encrypted email address cannot exist. It is an acceptable trade for
            high-cardinality PII, and the wrong call for a low-cardinality column where equality
            leakage would reveal the value itself.
          </Probe>
          <Probe q="Why separate the JWT audiences?">
            An admin token must not be replayable against the member API. Separate audiences turn
            that into a validation failure rather than a policy question. Members authenticate
            through Google OAuth, and admins carry mandatory TOTP on top.
          </Probe>
          <Probe q="Testcontainers here but SQLite on the other system — why the difference?">
            Because this system&apos;s correctness lives in triggers, row locks and constraints, and
            none of those exist in a SQLite stand-in. Draw the contrast out loud; it shows you choose
            a test strategy from what the code actually depends on.
          </Probe>
        </ul>
      </Card>

      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Before you rehearse: two rules</h3>
        <p>
          <b>1 · Name your own contributions on the community platform.</b> &quot;I contribute&quot;
          is vague, and vague invites &quot;so what did <i>you</i> do?&quot; Have two or three
          specifics ready — an endpoint or service you wrote, a bug you traced, a review queue or
          dashboard page you shipped, a migration you ran, tests you added. The sentence then becomes
          &quot;I worked on X and Y there,&quot; followed by the observation about the system, which
          is far stronger than the observation on its own.
        </p>
        <p>
          <b>2 · Explaining a design is not the same as claiming it.</b> Knowing why the ledger is
          append-only is worth saying, and you should say it. But say it as &quot;that is the
          existing design, and here is why I think it is right,&quot; not as your own decision. The
          honest version demonstrates exactly the same understanding and survives the follow-up. The
          claim does not.
        </p>
        <p className="text-slate-300">
          If a question goes past what you know, say where your knowledge stops and what you would
          check: &quot;I know the relay is at-least-once. I haven&apos;t traced how it handles a
          partition mid-batch — I would read the relay loop.&quot; That answer costs you nothing. A
          confident guess that unravels costs you the round.
        </p>
      </Card>

      <h2>Recording Your Intro Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h4>Setup checklist</h4>
          <ul>
            <li>Good lighting — face a window, or use a ring light</li>
            <li>Camera at eye level — stack books under the laptop</li>
            <li>Clean background — a neutral wall or a tidy bookshelf</li>
            <li>An external mic if possible — phone earbuds beat a laptop mic</li>
            <li>Wear a collared shirt or smart casual</li>
          </ul>
        </Card>
        <Card>
          <h4>Delivery tips</h4>
          <ul>
            <li>Smile as you say your name — it sets a warm tone</li>
            <li>Speak at around 150 words per minute, slightly slower than conversation</li>
            <li>Pause for a second between sentences rather than rushing</li>
            <li>Pause after each system name, not mid-sentence — three systems in sixty seconds only works if the seams are audible</li>
            <li>Look at the camera lens, not at the screen</li>
            <li>Time yourself, and if you overrun, cut a system rather than a sentence from the ending</li>
          </ul>
        </Card>
      </div>

      <h2>Variations by Interview Type</h2>
      <details><summary>HR / recruiter screen</summary>
        <p>Use the 60-second script with the recruiter variant. Cover years of experience, current role, motivation for moving, and one or two highlights. Say &quot;a website, the APIs behind it, and a community platform&quot; rather than naming Kafka, outboxes or ledgers — a recruiter is screening for fit and clarity, not architecture.</p>
      </details>
      <details><summary>Technical screen / engineering manager</summary>
        <p>Use the 90-second script. Lead with breadth across the platform — scoring and ranking, the calculators, the admin dashboard — and then let them choose which one to open up. Introduce the community platform as where your systems thinking grew, explicitly as a contributor. Engineering managers are calibrating scope, and after three-plus years, breadth across product surfaces is the answer that matches the tenure; a list of small modules is the answer that undercuts it.</p>
      </details>
      <details><summary>Tech lead / senior IC interview</summary>
        <p>Use the two-minute script, and expect them to interrupt you partway through — that is the goal. The three richest stopping points are the A/B cookie written onto the inbound request, the vendor database that degrades instead of failing at boot, and the pairing of the outbox with idempotency keys. Each carries a real trade-off you can name, and naming trade-offs is what separates &quot;I have read about this&quot; from &quot;I work in this.&quot;</p>
      </details>
      <details><summary>Founder / CTO interview (smaller companies)</summary>
        <p>Lead with product impact and shipping speed, and mention working directly with clients at Visualytes. Emphasise that you work end to end across the stack and can move between a Next.js render path and a Go service in the same day — smaller companies are buying breadth and autonomy more than depth in any single layer.</p>
      </details>

      <h2>Common Opening Questions &amp; How to Bridge</h2>
      <details><summary>&quot;Tell me about yourself&quot;</summary>
        <p>Use the 60- or 90-second script. Don&apos;t recite your resume from top to bottom — give the three-system highlight reel and stop. Silence after sixty seconds is fine; they will ask.</p>
      </details>
      <details><summary>&quot;Walk me through your resume&quot;</summary>
        <p>Go in reverse chronological order and spend about seventy percent of the time on your current role at 1Finance through NeoSOFT, grouping the earlier roles briefly. Be precise about scope: &quot;I am a team contributor — here is what I have personally shipped,&quot; and separately, &quot;here is a system I contribute to and can explain end to end.&quot;</p>
      </details>
      <details><summary>&quot;Why are you looking to switch?&quot;</summary>
        <p>&quot;I have grown a lot at 1Finance — from writing endpoints to working across whole product surfaces. I am looking for deeper architectural ownership and a Go-native engineering culture, ideally with stronger Next.js scope so I keep growing on the frontend too.&quot; Never criticise your current employer.</p>
      </details>
      <details><summary>&quot;What is a feature you are proud of?&quot;</summary>
        <p>Answer with one concrete thing inside a surface rather than the surface itself. This question always ends in a depth probe, and &quot;the scoring engine&quot; is too big to defend, whereas &quot;the ranking query, and why it is a window function rather than application-side sorting&quot; is exactly the right size. Pick something you personally wrote or fixed, say what was hard about it, and stop. Save the community platform for &quot;what is the most interesting system you have worked in&quot; — a different question, and one you can answer honestly as a contributor.</p>
      </details>
      <details><summary>&quot;What is the most interesting system you have worked in?&quot;</summary>
        <p>This is the India HR Conclave question, and the one the deep-dive reference is built for. Open with the product — a gated community for HR professionals — and then give the single design fact that makes it interesting: nine services loosely coupled through Kafka events and a transactional outbox, so every cross-service effect is published rather than called. Then let them pick which thread to pull.</p>
      </details>
      <details><summary>&quot;Which of these did you actually build?&quot;</summary>
        <p>This is the question you want. Answer it directly and without discomfort: on the 1Finance platform you have shipped across scoring and ranking, the calculators and the admin dashboard over three-plus years, and the community platform is one you contribute to and understand thoroughly. Then add what that understanding gave you — &quot;working in a system where the currency is real money changed how I think about idempotency&quot; — which is a truthful claim about your growth rather than your authorship.</p>
      </details>
    </>
  );
}
