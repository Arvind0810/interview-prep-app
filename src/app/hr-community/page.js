import { Card, Pill } from "@/components/Card";

export const metadata = { title: "HR Community Platform (India HR Conclave) — Interview Prep" };

function Q({ q, children }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default function HrCommunityPage() {
  return (
    <>
      <h1>India HR Conclave — Gated HR Community Platform</h1>
      <p>
        A private professional community for HR practitioners. Members join by invitation and
        approval, keep a real professional profile, write blogs, ask and answer each other&apos;s
        questions, request workshops, and refer peers into the network. It is deliberately a
        <b> curated</b> community — membership is reviewed, not open signup.
      </p>
      <p>
        Layered on top of that is a <b>points and rewards feature</b>: members earn points for
        completing high-value actions — finishing their profile, following the LinkedIn page,
        inviting peers, publishing a blog — and redeem them in a voucher storefront where
        <b> 1 point = ₹1</b>. It is an engagement and growth mechanic, and its currency is real money.
      </p>

      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Framing note — two things to keep straight.</b> First: <i>you contributed to this system,
        you did not architect it.</i> Say &quot;the platform does X&quot; or &quot;the approach here
        is X and here&apos;s why I think it&apos;s right&quot; — not &quot;I designed X.&quot;
        Second: <i>points are a feature, not the product.</i> The product is the community. Leading
        with &quot;I worked on a rewards platform&quot; undersells it and invites the wrong questions.
      </p>

      <h2>The Reframe That Makes This Interesting</h2>
      <Card className="border-emerald-700">
        <p className="text-emerald-300">
          <b>A growth feature whose currency is real money is a fraud surface.</b>
        </p>
        <p>
          That single sentence is the best thing you can say about this system. Most gamification —
          badges, streaks, leaderboard points — can be sloppy, because the worst case of a
          double-credit is a wrong number on a profile. Here the worst case is that someone converts
          a duplicated credit into a voucher, and the company is out real rupees.
        </p>
        <p>
          So a mechanic that <i>looks</i> like gamification is built with financial-grade discipline:
          an append-only ledger, deterministic idempotency keys, credits applied off the request path
          by a worker that re-reads the source row, and no admin endpoint that can adjust a balance at
          all. When an interviewer asks &quot;isn&apos;t that over-engineered for a community site?&quot;
          — that is the answer, and it is a strong one.
        </p>
        <p className="text-slate-400 text-sm">
          The secondary point, worth having ready: the incentives point the wrong way by design. You
          are paying people to invite more people and to produce content, which is exactly the shape
          of a system that attracts abuse. The approval gate on membership and the review gate on
          every paid submission exist because of that, not in spite of it.
        </p>
      </Card>

      <h2>The 60-Second Pitch</h2>
      <Card>
        <p className="italic text-slate-300">
          &quot;The system I&apos;ve been contributing to most recently is India HR Conclave — a
          private community platform for HR professionals. It&apos;s invite-and-approval based rather
          than open signup, so members are verified practitioners; they keep a professional profile,
          publish blogs, ask and answer each other&apos;s questions, and request workshops.
        </p>
        <p className="italic text-slate-300">
          To drive engagement there&apos;s a points feature — you earn points for completing your
          profile, following the LinkedIn page, referring peers, publishing a blog — and you redeem
          them for vouchers at one rupee per point. That last part is what makes it technically
          interesting: it&apos;s a growth mechanic that pays out real money, so it&apos;s built with
          financial-grade discipline. Balances are a cache over an append-only ledger, every movement
          carries a deterministic idempotency key, and points are only ever credited by a background
          worker consuming an event — never on a request path, and there&apos;s deliberately no admin
          endpoint that can adjust a balance.
        </p>
        <p className="italic text-slate-300">
          Architecturally it&apos;s Go microservices behind a Fiber v3 gateway, Postgres, Kafka, and a
          Next.js admin dashboard.&quot;
        </p>
      </Card>

      <h2>Product Surface</h2>
      <Card>
        <table>
          <thead><tr><th>Feature</th><th>What it does</th><th>Earns points?</th></tr></thead>
          <tbody>
            <tr><td><b>Membership &amp; approval</b></td><td>Google sign-in, then a second onboarding step (company, designation, phone) and an admin review before the member is approved</td><td>—</td></tr>
            <tr><td><b>Member profile</b></td><td>Name, company, designation, bio, photo, LinkedIn, areas of expertise, years of experience</td><td>Yes — profile completion</td></tr>
            <tr><td><b>Blogs</b></td><td>Members draft and submit; an admin reviews; approval publishes to a public feed</td><td>Yes — on approval</td></tr>
            <tr><td><b>Q&amp;A</b></td><td>Members post queries and answer each other — the core community interaction</td><td>—</td></tr>
            <tr><td><b>Workshops</b></td><td>Members request a workshop; admins do the scheduling follow-up and then approve</td><td>Yes — on approval</td></tr>
            <tr><td><b>Referrals</b></td><td>Invite a peer by email; the referrer earns once the referee joins <i>and</i> is approved</td><td>Yes</td></tr>
            <tr><td><b>Social tasks</b></td><td>Follow the LinkedIn page and similar admin-defined actions</td><td>Yes</td></tr>
            <tr><td><b>Redemption</b></td><td>SSO into a Xoxoday voucher storefront; points debited, refunds credited back</td><td>Spends</td></tr>
            <tr><td><b>Admin dashboard</b></td><td>Review queues (members, blogs, workshops, referrals), member directory, task definitions, settings, audit log</td><td>—</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-2">
          Tasks are <b>admin-authored data</b>, not hardcoded features — an admin defines a task with
          its reward, card copy, prerequisite and whether it repeats. That is why &quot;and many
          more&quot; is accurate: adding a new way to earn is a data change, not a deploy.
        </p>
      </Card>

      <h2>Architecture at a Glance</h2>
      <Card>
        <p>
          <b>One Go module</b> (<code>hrbackend/v2</code>, Go 1.26) — services are separate binaries,
          not separate modules, so shared code is imported as <code>hrbackend/v2/internal/...</code>.
          The gateway is a <b>Fiber v3</b> reverse proxy on <code>:8000</code> that does no business
          logic: it maps a URL prefix to a service and forwards.
        </p>
        <table>
          <thead><tr><th>Service</th><th>Port</th><th>Owns</th></tr></thead>
          <tbody>
            <tr><td>auth-service</td><td>8001</td><td>Google OAuth, member tokens, onboarding, email workers</td></tr>
            <tr><td>user-service</td><td>8002</td><td>Member surface (profile, task board, blogs, referrals), public blog feed</td></tr>
            <tr><td>points-service</td><td>8003</td><td>Ledger credits, storefront SSO and balance callbacks, reconciliation</td></tr>
            <tr><td>redemption-service</td><td>8004</td><td>Redemption lifecycle, saga compensation, refunds</td></tr>
            <tr><td>admin-service</td><td>8006</td><td>Admin auth (password + TOTP), review queues, settings, outbox viewer</td></tr>
            <tr><td>rbac-service</td><td>8007</td><td>Role/permission catalog and assignment (net/http, not Fiber)</td></tr>
            <tr><td>audit-log-service</td><td>8008</td><td>Audit events over HTTP plus a Kafka consumer</td></tr>
            <tr><td>notification-service</td><td>8009</td><td>Stub</td></tr>
            <tr><td>reward-catalog-service</td><td>8010</td><td>Stub</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-2">
          Say <b>&quot;seven built, two stubs&quot;</b> rather than &quot;nine microservices.&quot; The
          precision costs nothing and it reads as someone who actually works in the codebase.
        </p>
      </Card>

      <h2>The Gated Membership Model</h2>
      <Card>
        <p>
          This is the part that makes it a <i>community</i> rather than an app with logins, and it is
          under-discussed in most interviews — bring it up.
        </p>
        <ul>
          <li>
            <b>Sign-in and membership are separate things.</b> Google OAuth gets you an account
            immediately; you are created active but <b>not approved</b>. Approval is an admin decision,
            gated on onboarding being complete — company, designation and phone. So the community
            stays curated without blocking anyone at the door.
          </li>
          <li>
            <b>A blocked account never receives a token.</b> Rejected and suspended members are turned
            away at the callback with a distinct reason each, rather than being handed a token that the
            next request rejects. Rejected is checked first, so a turned-down applicant is never told
            they are &quot;suspended.&quot;
          </li>
          <li>
            <b>Members are suspended, never deleted.</b> A member is referenced by id from their tasks,
            referrals and every ledger row; a soft delete would leave all of that pointing at an
            invisible row. Suspension carries a required reason that is emailed, and it takes effect on
            the member&apos;s next request because the middleware re-reads the row every time.
          </li>
          <li>
            <b>Two rejection texts, deliberately separate.</b> The reason is emailed to the applicant;
            an optional internal note only ever reaches the admin activity log — which is what lets a
            reviewer be candid without the applicant reading it.
          </li>
        </ul>
        <h4>Why a curated community changes the engineering</h4>
        <p>
          Real identities mean real PII — name, company, designation, phone, email — held for people
          whose professional reputation is the point of the network. That is why email and phone are
          encrypted at rest, why the admin surface that decrypts them sits behind a higher permission
          than the one that renders dashboards, and why a manager role can see queues but not member
          contact details.
        </p>
      </Card>

      <h2>The Growth Loop</h2>
      <Card>
        <p>
          Tasks are the engagement engine: each is an admin-authored definition with a reward, card
          copy, an optional prerequisite and a repeatable flag. A member sees a board of cards, and the
          board is the product surface for growth.
        </p>
        <h4>The referral loop, and where it pays</h4>
        <p>
          A member invites a peer by email. The referrer earns <b>only when the referee actually joins
          and is approved</b> — not when the invite is sent, and not when the referee signs in. That
          ordering is the whole anti-abuse design: paying on invite would pay for typing addresses,
          and paying on signup would pay for creating accounts. Paying on <i>approval</i> means a human
          reviewed a real practitioner before any money moved.
        </p>
        <ul>
          <li>Referral count is capped per member by a runtime setting, not a constant.</li>
          <li>The referee&apos;s address is checked for deliverability before the row is written, and a permanently-refused invitation auto-rejects the referral and returns the slot — while the bad address itself stays blocked.</li>
          <li>Several members may refer the same person; each of them earns, because each did the work.</li>
          <li>The reward still goes through review — it lands as a submitted task an admin approves, not as an automatic credit.</li>
        </ul>
        <h4>Prerequisites as a funnel</h4>
        <p>
          A definition can be gated behind completing another type — blogs are gated behind profile
          completion, for instance. That is a product funnel expressed as a data field: it sequences
          members through the actions the community wants, without any of it being hardcoded.
        </p>
        <p className="text-slate-400 text-sm">
          Worth knowing as a trap: because a definition is identified by its type string, anything
          gated behind &quot;workshop&quot; unlocks on the <i>first</i> approved workshop of any kind.
          Fine for a funnel, wrong if you ever want &quot;attend <i>this specific</i> workshop first.&quot;
        </p>
      </Card>

      <h2>Points &amp; Redemption — the money invariants</h2>
      <Card>
        <p><b>The invariant:</b> <code>members.balance == SUM(point_transactions.amount)</code> per member.</p>
        <ul>
          <li><b>The log is the truth; the balance column is a cache.</b> Never written directly.</li>
          <li>
            <b>One write path.</b> <code>ledger.Apply</code> in one transaction: lock the member row
            <code> FOR UPDATE</code> → check the idempotency key <i>before</i> the sufficiency check →
            refuse a debit that would go negative → insert the signed row with its resulting balance →
            apply a <i>relative</i> <code>balance = balance + ?</code> update.
          </li>
          <li>
            <b>Deterministic idempotency keys</b> — built from source type, source id and action
            (<code>task:&lt;uuid&gt;:completed</code>), never random or client-supplied. A cross-process
            race that collides on the unique index is returned as <i>already applied</i>, not an error.
          </li>
          <li>
            <b>Append-only at the database level</b> — a trigger rejects UPDATE and DELETE on the
            ledger. Corrections are new reversing rows, themselves idempotent.
          </li>
          <li><b>Reconciliation</b> recomputes the sum per member daily and <i>reports</i> drift rather than silently fixing it.</li>
        </ul>
        <h4>The two ordering details worth knowing</h4>
        <p>
          <b>Idempotency before sufficiency.</b> Check the balance first and a replayed debit for a
          member who has since spent down reports &quot;insufficient balance&quot; — a wrong, confusing
          answer for an operation that already succeeded. Checking the key first makes a replay report
          &quot;already applied.&quot;
        </p>
        <p>
          <b>Relative update, not absolute.</b> <code>balance + ?</code> is computed by the database
          from the current row, so combined with the lock a concurrent writer can never clobber the
          other&apos;s arithmetic.
        </p>
      </Card>

      <Card>
        <h3 className="m-0 text-amber-300">The deliberate absence: no manual adjustment endpoint</h3>
        <p>
          There <i>was</i> an admin-only points-adjustment endpoint behind an <code>adjust_points</code>
          permission. It was removed — route, request type, and the permission itself. Consequence:
          <b> nothing writes the ledger on an admin&apos;s request path.</b> Every credit originates
          from an approved item flowing through the event pipeline; every debit from the redemption
          family.
        </p>
        <p>
          It is a strong &quot;design decision to defend&quot; answer <i>because</i> the cost is real:
          correcting a balance now needs a deliberate change rather than a form. Defensible at this
          size, and a bad trade for a product with a large support operation.
        </p>
      </Card>

      <Card>
        <h3 className="m-0">The one exception — and its cost</h3>
        <p>
          Every credit requires an approving admin on the row, except <b>profile completion</b>, which
          has no reviewer by design: the member&apos;s own save mints a task already completed with no
          approver and enqueues the event.
        </p>
        <p>
          <b>Name the cost before they find it:</b> the task type is admin-authored free text, so an
          admin who can rename a definition&apos;s type to <code>profile</code> makes every task on it
          self-payable. The guard matches that one string exactly to keep the blast radius small — it
          does not remove the risk. Saying that out loud is what separates a senior answer from a
          defensive one.
        </p>
      </Card>

      <h2>Transactional Outbox + Kafka</h2>
      <Card>
        <p>
          <b>The problem:</b> change state and publish an event, across two systems with no shared
          transaction. Publish first and the commit fails — you announced something that did not
          happen. Commit first and the publish fails — the credit silently never happens.
        </p>
        <p>
          <b>The pattern:</b> the event row is written in the <i>same transaction</i> as the state
          change; a relay polls pending rows and publishes them, with bounded retries before parking
          a row as failed.
        </p>
        <p>
          <b>Delivery semantics:</b> at-least-once, not exactly-once — and that is fine precisely
          <i>because</i> the ledger is idempotent. The outbox and the ledger are two halves of one
          design, and that is the answer to &quot;how do you guarantee exactly-once?&quot; You
          don&apos;t. You make delivery at-least-once and the effect idempotent.
        </p>
        <h4>The event is a trigger, never the authority</h4>
        <p>
          The worker consuming a completion event does not trust it: it re-reads the source row and
          refuses to credit unless that row is genuinely approved. A replay, a stale pre-fix event, or
          one published by hand pays nothing. This is the single most reusable idea in the codebase.
        </p>
        <h4>The deploy trap that shipped broken twice</h4>
        <p>
          Topics are not auto-created, so adding one in code requires provisioning it per environment.
          Miss that and every publish fails, the outbox row exhausts its retries and parks as failed,
          and the credit never happens — <i>silently</i>. Six topics shipped that way.
        </p>
      </Card>

      <h2>Redemption &amp; Saga</h2>
      <Card>
        <p>Redemption debits up front — reserve-then-confirm — then calls the provider.</p>
        <ul>
          <li><Pill color="cyan">pending</Pill> reserved, provider not yet confirmed</li>
          <li><Pill color="green">completed</Pill> provider confirmed success</li>
          <li><Pill color="amber">restored</Pill> provider failed <i>definitively</i> — compensated with a reversing credit</li>
          <li><Pill color="red">pending_reconciliation</Pill> the provider&apos;s answer was <b>ambiguous</b> (timeout / 5xx)</li>
          <li><Pill color="purple">cancelled</Pill> member cancelled before fulfilment</li>
        </ul>
        <p>
          <b>The ambiguous state is the answer to &quot;what do you do when you don&apos;t know?&quot;</b>
          A timeout is not a failure — the provider may have issued the voucher. Auto-restoring
          double-pays; auto-confirming may hand out something that does not exist. So the saga stops
          and a human checks the provider&apos;s records. Naming a state for &quot;genuinely
          unknown&quot; instead of guessing is a senior instinct.
        </p>
        <h4>Double-deduct protection</h4>
        <p>
          Unique indexes on the provider order id and a shared idempotency key. Concurrent retries
          collide <i>in the database</i>, the transaction rolls back, and the original success envelope
          is returned. The database is the concurrency control, not application-level checking.
        </p>
        <h4>Rate limit keyed on the member, not the IP</h4>
        <p>
          Redemption routes are limited per member id, because many members share one corporate egress
          IP — an IP-keyed limit would throttle a whole company because one person was active.
        </p>
      </Card>

      <h2>PII at Rest — deterministic encryption</h2>
      <Card>
        <p>
          Member email and phone (and referee contact details) are encrypted with AES-256-GCM using a
          <b> synthetic nonce derived as an HMAC of the plaintext</b>. Same plaintext, same ciphertext.
        </p>
        <p>
          <b>Why determinism is the point:</b> the ciphertext still backs a unique index and an equality
          lookup, so sign-in, duplicate detection and the &quot;phone already registered&quot; conflict
          all keep working on encrypted columns.
        </p>
        <p>
          <b>The trade-off, stated honestly:</b> equality is observable. Anyone with database access can
          see that two rows hold the same value and can confirm a guessed address by encrypting it.
          Randomised encryption removes that leak and every lookup that makes the system work.
        </p>
        <h4>Two hazards</h4>
        <ul>
          <li>
            <b>Never rotate the key in place.</b> Under a new key the same address encrypts differently,
            the unique index cannot see the existing row, and sign-in creates a <i>second</i> member for
            one person — not reversible once points and referrals hang off both. A pinned key
            fingerprint makes a mismatch fatal at boot instead of corrupting quietly.
          </li>
          <li>
            <b>Mixed plaintext and ciphertext is worse than either.</b> A pod running with encryption off
            breaks the equality lookups and the unique index behind duplicate detection, so a flag makes
            those services refuse to boot without keys rather than degrade silently.
          </li>
        </ul>
      </Card>

      <h2>Auth, Sessions &amp; RBAC</h2>
      <Card>
        <h4>Three audiences, three separate signing keys</h4>
        <table>
          <thead><tr><th>Audience</th><th>TTL</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Member (Google OAuth only)</td><td>24h</td><td>Re-checks the member row exists and is active on every request</td></tr>
            <tr><td>Admin (password → TOTP)</td><td>15 min</td><td>Carries a session id; role read live from the database</td></tr>
            <tr><td>Storefront</td><td>24h</td><td>Handed to the voucher provider and echoed back on callbacks</td></tr>
          </tbody>
        </table>
        <p>
          Separate keys mean a leaked storefront token cannot be replayed as an admin token — the
          signature simply does not verify. <b>The live gotcha:</b> keys are read at package init and an
          unset variable is silently the empty string, so tokens still sign and verify with no security.
          One key is genuinely unset in this system, and knowing that is more impressive than pretending
          it is clean.
        </p>
        <h4>Role is read live, not from the token</h4>
        <p>
          The middleware validates the token then re-reads the admin row, so a demotion or suspension
          takes effect on the next request rather than at token expiry. With a 15-minute token,
          trusting the claim would leave a demoted admin holding their old powers for a quarter of an hour.
        </p>
        <h4>One live admin session, newest login wins</h4>
        <p>
          The token carries a session id validated against a session row on every request; a new login
          revokes live sessions in one locked transaction. Two distinct 401 codes — one only ever
          meaning a genuine take-over, one for everything else — because telling an admin who merely
          signed out that their account signed in elsewhere would be worse than saying nothing.
        </p>
        <h4>Permissions are compiled in</h4>
        <p>
          The RBAC service enumerates the same grant table the middleware enforces, so the catalog
          cannot drift from what is enforced — and creating a custom role honestly returns
          <b> 405 &quot;roles are fixed&quot;</b> rather than faking success. Three permissions are
          super-only, and they are the entire difference between super and admin.
        </p>
      </Card>

      <h2>Schema Ownership &amp; Boot Order</h2>
      <Card>
        <p>
          The gateway does real work before it listens: connect, backfill blank statuses, de-duplicate
          rows so a new partial unique index can be created, migrate every model, seed opening-balance
          ledger rows, and install the append-only trigger. All idempotent, all re-run every boot, any
          failure fatal. <b>No service migrates anything</b> — one list, no drift.
        </p>
        <h4>The check-constraint trap</h4>
        <p>
          GORM creates a check constraint on a table that lacks one and <b>never alters an existing
          one</b>. So a new enum value passes on a fresh database and is rejected on every older one —
          which is how a &quot;send back for rework&quot; status shipped broken: 500s in every live
          environment while passing every test, <i>because test databases are always fresh</i>. The fix
          is an idempotent constraint re-assertion on boot.
        </p>
        <p className="text-amber-300 text-sm">
          Even as a contributor this is worth citing — not as your bug, but as the lesson: a test suite
          that always starts from a fresh schema is structurally blind to migration bugs.
        </p>
        <h4>The boot-order window</h4>
        <p>
          The gateway starts last, so against an empty database there is a window where services query
          tables that do not exist. Ordinary queries recover. What does not: a Kafka message consumed
          in that window is lost, because the consumer commits its offset on read.
        </p>
      </Card>

      <h2>Gateway Lessons (fasthttp / proxying)</h2>
      <Card>
        <h4>Connection pooling, and why POST is not retried</h4>
        <p>
          Symptom: an admin clicks Approve, gets a 5xx, clicks again, and it works. Cause: the client
          hands out a pooled connection <i>without</i> checking how long it has been idle, so a
          connection the upstream already closed gets reused and the write fails. Fix: cut the idle
          connection lifetime below the upstream&apos;s.
        </p>
        <p>
          <b>Why it only hit mutations:</b> fasthttp replays a failed request only when it judges it
          idempotent, and the test is literally GET, HEAD or PUT. GETs were retried transparently —
          every page load looked fine — while POSTs surfaced the error.
        </p>
        <p className="text-red-300">
          <b>And why adding a POST retry would be wrong:</b> &quot;closed before reading the
          request&quot; and &quot;read the request then died before answering&quot; surface as the
          <i> same</i> error, so a retry cannot tell a request that never arrived from one already
          applied. Replaying an approve would approve twice — and here, pay twice.
        </p>
        <h4>X-Forwarded-For is set, never appended</h4>
        <p>
          On an untrusted hop an inbound XFF is attacker input, so the gateway replaces it rather than
          appending a chain whose left-hand entries are forged. Downstream services only believe the
          header when the peer is a configured trusted proxy — which is why a spoofed header can never
          win a rate-limit exemption. The flip side: put any proxy or tunnel in front and every caller
          starts looking like that proxy, so the fix is naming the front proxy, not widening the
          whitelist.
        </p>
        <h4>Two smaller ones</h4>
        <ul>
          <li><b>A rate-limit max of 0 is deliberately not honoured</b> — Fiber reads it as &quot;skip the limiter&quot;, so an env-var typo would silently open the gateway.</li>
          <li><b>Fiber v3&apos;s proxy blocks private IPs by default</b> as an SSRF guard, but every upstream here is a Docker hostname on a private range. Allowing them is safe only because the upstream host always comes from a fixed map and never from the request.</li>
        </ul>
      </Card>

      <h2>The Next.js 16 Admin Dashboard</h2>
      <Card>
        <h4>Token rotation has to happen in two places</h4>
        <p>
          The auth callback rotates the 15-minute token into the session cookie — but that lands on the
          <i> response</i>, too late for a request already in flight. So the fetch layer rotates too:
          decode, refresh if lapsed, retry once on a 401, write the cookie back. The symptom was that
          the first mutation attempted more than fifteen minutes after the cookie was written failed,
          and the retry &quot;worked&quot; only because the failed attempt had healed the cookie.
        </p>
        <p>
          Consequence: <b>anything passed to that fetch must be replayable</b> — a string or FormData,
          never a request stream, because a 401 replays it.
        </p>
        <h4>A dead session must be cleared server-side</h4>
        <p>
          Redirecting a 401 straight to the home page loops: a render cannot clear a cookie, so the
          proxy still reads the dead session as live and re-renders into another 401. And non-GET
          requests get a 401 JSON body rather than a redirect, because <code>fetch</code> follows a 302
          as a GET and a client checking <code>res.ok</code> would read the login page as success.
        </p>
        <h4>The hydration bug that was really a timezone bug</h4>
        <p>
          The container renders in UTC and the reviewer&apos;s browser in IST, so any row timestamped
          after 18:30 UTC was written by the server as one date and re-rendered by the client as the
          next — a hydration error, and a row whose date depended on who drew it. Fix: pin both locale
          and time zone at format time.
        </p>
        <h4>Counting rows is not fetching them</h4>
        <p>
          The approvals page used to fetch several queues at a hundred rows each — fully-joined rows
          carrying decrypted PII — purely to render a few integers for tab labels, and reported a queue
          of 101 as 100. Counts now come from each list&apos;s own pagination total, and only the
          visible page is fetched.
        </p>
      </Card>

      <h2>Design Decisions You Should Be Able to Discuss</h2>
      <Card>
        <p className="text-slate-400 text-sm">
          Frame these as &quot;here is how the platform handles it and why I think that&apos;s
          right&quot; — the understanding is what is being tested, and it survives a follow-up in a way
          that claiming the design does not.
        </p>
        <Q q="Why is the balance a column at all if the ledger is the truth?">
          <p>
            Read performance. Summing every transaction on every read is fine at a thousand members and
            not fine later, and almost every read wants only the current number. The column is a cache
            with three protections: it is only ever written by a relative update inside the same locked
            transaction as the row that justifies it, the trigger makes the log un-rewritable, and a
            daily job recomputes the sum and reports drift. If they disagree, the log wins.
          </p>
        </Q>
        <Q q="Why not just credit the points in the approval request?">
          <p>
            So the two fail independently. The approval is a decision that must be recorded whether or
            not the credit succeeds; the credit must eventually happen whether or not the admin&apos;s
            connection survived. The outbox makes the second durable and retryable without holding the
            first open.
          </p>
          <p>
            <b>The cost, worth naming:</b> the response cannot report the new balance, so the card flips
            to completed while the balance catches up on the next poll — and a permanently failed event
            means an approved-but-unpaid item, visible only in a super-only operator view.
          </p>
        </Q>
        <Q q="Why does the referrer earn on approval rather than on signup?">
          <p>
            Because you are paying for a member, not for an email address. Paying on invite pays for
            typing addresses; paying on signup pays for creating accounts. Paying when the referee is
            <i> approved</i> means a human reviewed a real practitioner before money moved. In a
            community that is curated by design, the approval was going to happen anyway — so tying the
            reward to it costs nothing and removes the obvious abuse.
          </p>
        </Q>
        <Q q="Why can a blog be sent back for changes but never rejected?">
          <p>
            Rejected is not an editable state, so rejecting would strand the member&apos;s work with no
            way to fix it. Redo is the only way back, unlimited cycles, and it requires a reviewer
            comment because the member is emailed it. It is enforced at the endpoint, not just hidden in
            the dashboard — a button removed from one client is not a rule.
          </p>
        </Q>
        <Q q="Why is the workshop follow-up status independent from the approval decision?">
          <p>
            They used to interlock, which let an admin approve from &quot;scheduling in progress&quot;
            and meant the two could deadlock if either were tightened. They are separate concerns: one
            is the admin&apos;s record of scheduling work, the other is a decision. Both gates were
            removed rather than reordered, and tests pin the independence in both directions.
          </p>
        </Q>
        <Q q="Why are members suspended and never deleted?">
          <p>
            A member is referenced by id from their tasks, referrals and every ledger row. A soft delete
            drops them from default queries while all of that keeps pointing at them — dangling
            references and an invisible row nothing can undo. Suspension is a status the middleware
            re-checks every request, so it takes effect immediately, and it carries a required reason
            that is emailed.
          </p>
        </Q>
      </Card>

      <h2>Failure Modes Worth Understanding</h2>
      <Card>
        <p className="text-amber-300 text-sm">
          <b>Attribution rule:</b> if you personally worked on one of these, tell it as your story. If
          you did not, tell it as &quot;a problem the team hit and what I took from it&quot; — that is
          still a strong answer, and it is the honest one. Do not narrate someone else&apos;s debugging
          in the first person.
        </p>
        <h4>1. Approve fails, second click works</h4>
        <p>
          Intermittent 5xx on mutations only, never on page loads. Stale pooled connections plus a
          client that silently retries GET but not POST. Lesson: know your HTTP client&apos;s retry
          policy, because it decides which of your bugs are visible.
        </p>
        <h4>2. Redo works on every fresh database and nowhere else</h4>
        <p>
          A new enum value existed only where the check constraint had been created fresh. Lesson: a
          test suite that always starts from a clean schema cannot see migration bugs.
        </p>
        <h4>3. Everyone shares one rate-limit bucket</h4>
        <p>
          A tunnel in front of the gateway made every caller look like the tunnel. Lesson: &quot;trust
          nothing&quot; and &quot;sits behind a proxy&quot; are configurations that must change together.
        </p>
        <h4>4. Sign-in returns a duplicate key error</h4>
        <p>
          A soft-deleted member is invisible to a default query but a plain unique index still holds
          their email, so the lookup missed and the insert collided. Lesson: soft delete and unique
          indexes disagree unless the index is partial.
        </p>
        <h4>5. A list filter 500s with &quot;column reference is ambiguous&quot;</h4>
        <p>
          A shared query scope grew a join, and an unqualified column both tables have became ambiguous.
          Lesson: qualify predicates in any reusable scope, even when it looks redundant.
        </p>
      </Card>

      <h2>Traps to Prepare For</h2>
      <Card>
        <ul>
          <li><b>&quot;Isn&apos;t a ledger over-engineered for a community site?&quot;</b> — The community does not need one; the <i>points feature</i> does, because a point is a rupee and redeemable. A growth mechanic that pays real money is a fraud surface. Note also what deliberately did <i>not</i> get its own machinery: blogs and workshops reuse the plain task pipeline rather than growing separate state machines.</li>
          <li><b>&quot;Why nine services?&quot;</b> — Be honest: the split follows team and deploy boundaries more than load, two are stubs, and the gateway holds no business logic. The genuine benefit is isolating the money path from everything else.</li>
          <li><b>&quot;What did you personally do?&quot;</b> — Have two or three specifics ready and lead with them. Then the systems observations land as understanding rather than as borrowed credit.</li>
          <li><b>&quot;How is this tested?&quot;</b> — A central test tree mirroring the packages, black-box test packages, and a throwaway <b>Postgres container</b> rather than SQLite, because the code relies on Postgres-only semantics like <code>SELECT … FOR UPDATE</code> and multi-NULL unique indexes. Substituting SQLite would make the tests agree with each other and disagree with production.</li>
          <li><b>&quot;What&apos;s still broken?&quot;</b> — One signing key is unset, two services are stubs, there are no dashboard tests, and asynchronous email bounces are not handled. Volunteering known gaps reads as ownership.</li>
        </ul>
      </Card>
    </>
  );
}
