import CompanyBrief from "@/components/CompanyBrief";
import { Card, Pill } from "@/components/Card";

export const metadata = { title: "Go + React Full Stack (Thane) | Interview Prep" };

function Q({ n, q, children }) {
  return (
    <details>
      <summary>{n}. {q}</summary>
      {children}
    </details>
  );
}

function Row({ skill, rating, evidence }) {
  const color = { Strong: "green", Adequate: "amber", "Needs Review": "red" }[rating] || "cyan";
  return (
    <tr>
      <td>{skill}</td>
      <td><Pill color={color}>{rating}</Pill></td>
      <td>{evidence}</td>
    </tr>
  );
}

export default function GolangReactFullstackThanePage() {
  return (
    <>
      <h1>Go + React Full Stack Developer (Thane)</h1>
      <CompanyBrief slug="golang-react-fullstack-thane" />
      <p>
        <strong>Mode:</strong> Full-time, on-site, Thane (Mumbai) &nbsp;·&nbsp;{" "}
        <strong>Stated experience:</strong> 3+ years<br />
        <strong>Mandatory:</strong> Go (goroutines, channels, interfaces, structs, errors,
        concurrency), REST APIs and microservices, React (hooks, props/state, Context, lifecycle),
        JavaScript/TypeScript, HTML5/CSS3, SQL<br />
        <strong>Good-to-have:</strong> Docker, AWS/Azure/GCP, Kafka/RabbitMQ, Kubernetes, Redis,
        GraphQL, automated testing, OWASP, Agile, BFSI/fintech experience
      </p>

      {/* ────────── HONEST POSITIONING ────────── */}
      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Read this first: where you actually stand</h3>
        <p>
          This JD is <b>closer to your real profile than any other on the list</b>. It asks for 3+
          years; you have ~3.5 years of production Go and ~6 total. It asks for Go plus React;
          you ship Go/Fiber services and a Next.js/React frontend on the same fintech platform. It
          lists Kafka, Redis, Docker and BFSI as pluses; you have all four in some form. The
          screening table says <i>Strong / Mandatory</i> for Go, concurrency, REST and React, and
          those are exactly the rounds you can win.
        </p>
        <p>The risks are not about whether you qualify. They are these:</p>
        <ol>
          <li>
            <b>Over-qualification and the salary band.</b> A &quot;3+ years&quot; seat is usually
            budgeted for 3–5 years. With 6 years you may be above the band. Get the budget range in
            the recruiter call, before you spend a day on technical rounds.
          </li>
          <li>
            <b>React fundamentals, not Next.js habits.</b> They list &quot;component
            lifecycle&quot; and &quot;Context API&quot; by name. That signals questions on
            re-render rules, <code>useEffect</code> cleanup and dependency arrays, stale closures,
            memoisation and class-component lifecycle mapping. Next.js page work does not
            automatically prepare you for these.
          </li>
          <li>
            <b>TypeScript.</b> If your frontend work is mostly plain JS, say so. Then make sure
            you can type props, generics, discriminated unions and an API response without
            hesitating.
          </li>
          <li>
            <b>Concurrency depth beyond one story.</b> Goroutines and channels are listed twice
            (fundamentals and the screening table). Expect worker pools, <code>context</code>{" "}
            cancellation, leaks, races, <code>sync</code> primitives and possibly live coding.
          </li>
          <li>
            <b>Stdlib Go vs Fiber Go.</b> They name Gin, Echo and Fiber, so Fiber is fine. But
            questions on <code>http.Handler</code>, middleware chains, timeouts and graceful
            shutdown come up whatever framework they use.
          </li>
          <li>
            <b>On-site in Thane.</b> Five days a week, and the commute is real. Decide your
            answer before the recruiter asks.
          </li>
        </ol>
        <p className="text-amber-200">
          Kubernetes, GraphQL and cloud are <b>good-to-have only</b>. Saying &quot;labbed, not
          production&quot; is fine. Bluffing is not.
        </p>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">Your opening for this JD (about 60 seconds)</h3>
        <p className="text-slate-200">
          &quot;I&apos;m a full-stack engineer with about six years of experience. For the last
          three and a half I&apos;ve worked mainly in Go, deployed through NeoSOFT to 1Finance, a
          fintech platform. On the backend I build REST services on Go and Fiber, with
          PostgreSQL and Redis. I&apos;ve owned modules end to end, like the Magazine module with
          three auth tiers and an encrypted-data backfill, and an events module with OTP
          enrollment. I cut API latency by around 40% with query rewrites and a Redis cache
          layer. On the frontend I build the matching screens in React and Next.js, so I&apos;m
          used to designing an API and then consuming it myself. I&apos;ve also contributed to a
          Kafka-based microservices platform with an outbox and idempotency keys. That full
          loop, from table design to API to UI, in a BFSI setting, is why this role fits.&quot;
        </p>
        <p className="text-slate-400 text-sm">
          Say &quot;contributed to&quot; for the HR Conclave platform, not &quot;architected&quot;.
          The interviewer will ask what you personally built, and the answer has to match.
        </p>
      </Card>

      {/* ────────── 1. CHECKLIST ────────── */}
      <h2>1. Skill checklist: blunt ratings</h2>
      <p className="text-slate-400 text-sm">
        Strong = you can handle three follow-ups with production detail. Adequate = real
        experience, but thin; expect to be pushed. Needs Review = you will be exposed if asked
        today.
      </p>

      <h3>Mandatory: backend (Go)</h3>
      <table>
        <thead>
          <tr><th>Skill</th><th>Rating</th><th>Why</th></tr>
        </thead>
        <tbody>
          <Row skill="Go fundamentals: structs, interfaces, methods" rating="Adequate" evidence="You use them daily. Review method sets (value vs pointer receivers), embedding, the typed-nil-in-interface trap, and why to accept interfaces and return structs." />
          <Row skill="Error handling" rating="Adequate" evidence="Know %w wrapping, errors.Is/As, sentinel vs typed errors, errors.Join, and where errors map to HTTP status codes." />
          <Row skill="Goroutines, channels, concurrency" rating="Needs Review" evidence="Listed twice as mandatory. Worker pool, fan-out/fan-in, errgroup, select with ctx.Done(), leaks, -race, mutex vs channel." />
          <Row skill="REST APIs and microservices" rating="Strong" evidence="Production Fiber services behind a gateway, JWT auth, many endpoints owned end to end." />
          <Row skill="HTTP, JSON, API design, service-to-service" rating="Adequate" evidence="Strong on REST design. Review timeouts on http.Client, retries with backoff, idempotency keys, status codes, JSON struct tags and omitempty." />
          <Row skill="Gin / Echo / Fiber" rating="Strong" evidence="Fiber in production. Know how Gin and Echo differ (net/http based) and the Fiber ctx-reuse gotcha." />
          <Row skill="JWT / OAuth2" rating="Adequate" evidence="JWT in production. OAuth2 flows (auth code + PKCE, client credentials) and refresh-token rotation need a refresh." />
        </tbody>
      </table>

      <h3>Mandatory: frontend (React)</h3>
      <table>
        <thead>
          <tr><th>Skill</th><th>Rating</th><th>Why</th></tr>
        </thead>
        <tbody>
          <Row skill="Functional components, props, state" rating="Strong" evidence="Daily work on the Next.js frontend." />
          <Row skill="Hooks (useEffect, useMemo, useCallback, useRef, custom hooks)" rating="Adequate" evidence="You use them. Expect questions on dependency arrays, cleanup, stale closures, and when memoisation actually helps." />
          <Row skill="Context API" rating="Adequate" evidence="Know when Context causes re-renders of every consumer, and how to split contexts or move to Zustand/Redux." />
          <Row skill="Component lifecycle" rating="Needs Review" evidence="Named explicitly. Map mount/update/unmount to useEffect; know class lifecycle methods and StrictMode double-invoke in dev." />
          <Row skill="REST integration in React" rating="Strong" evidence="You consume your own Go APIs. Add: AbortController, loading/error states, race conditions, React Query/SWR." />
          <Row skill="Redux Toolkit / Zustand" rating="Adequate" evidence="Know RTK slices, createAsyncThunk, RTK Query, and when local state is enough." />
          <Row skill="TypeScript" rating="Needs Review" evidence="Typing props, generics, unions, utility types (Partial, Pick, Omit, Record), typing API responses." />
          <Row skill="HTML5 / CSS3, responsive UI" rating="Adequate" evidence="Flexbox, grid, media queries, semantic HTML, basic accessibility (labels, aria, focus)." />
        </tbody>
      </table>

      <h3>Database, DevOps and good-to-have</h3>
      <table>
        <thead>
          <tr><th>Skill</th><th>Rating</th><th>Why</th></tr>
        </thead>
        <tbody>
          <Row skill="PostgreSQL: design, SQL, indexing, tuning" rating="Strong" evidence="Query rewrites behind the 40% claim. Have EXPLAIN ANALYZE output and index details ready." />
          <Row skill="MySQL" rating="Adequate" evidence="WordPress-era experience. Know InnoDB clustered index and the default REPEATABLE READ isolation level." />
          <Row skill="MongoDB" rating="Needs Review" evidence="Gap. Know the document model and when it fits; don't claim it." />
          <Row skill="Git workflows" rating="Strong" evidence="Daily PR workflow. Know rebase vs merge, cherry-pick, bisect, resolving conflicts." />
          <Row skill="Docker" rating="Adequate" evidence="Used. Know a multi-stage Go Dockerfile and a static React build behind nginx." />
          <Row skill="CI/CD" rating="Adequate" evidence="Know what you configured vs only used. Describe a full-stack pipeline." />
          <Row skill="Logging, monitoring, troubleshooting" rating="Needs Review" evidence="Structured logs with request IDs, p95/p99, Prometheus/Grafana, pprof." />
          <Row skill="Kafka / RabbitMQ" rating="Adequate" evidence="Contributor on Kafka + outbox. Know consumer groups, at-least-once delivery, idempotent consumers." />
          <Row skill="Redis" rating="Strong" evidence="Cache layer in production. Review invalidation, TTLs, stampede protection." />
          <Row skill="Kubernetes / GraphQL / cloud" rating="Needs Review" evidence="Conceptual fluency only. Not required." />
          <Row skill="OWASP / secure coding" rating="Adequate" evidence="AES-GCM encryption backfill and RBAC are real stories. Add OWASP Top 10, XSS in React, CSRF, SQL injection." />
          <Row skill="BFSI / fintech" rating="Strong" evidence="1Finance. This is listed as an advantage, so use it in every answer where it fits." />
        </tbody>
      </table>

      <p>
        <b>Scorecard:</b> 8 Strong, 13 Adequate, 6 Needs Review. Three of the Needs Review items
        are mandatory: <b>concurrency patterns, React lifecycle/hooks depth, and TypeScript</b>. Those
        get most of your time.
      </p>

      {/* ────────── 2. 14-DAY PLAN ────────── */}
      <h2>2. 14-day preparation plan</h2>
      <p className="text-slate-400 text-sm">
        About 2.5 hours on weekdays and 5 on weekends. Each day has one Go block and one React
        block, because the interview loop will test both.
      </p>
      <table>
        <thead>
          <tr><th>Day</th><th>Go / backend</th><th>React / frontend</th><th>Output</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Structs, interfaces, method sets, embedding, nil-interface trap</td><td>Render cycle: what triggers a re-render, reconciliation, keys</td><td>One-page notes per topic</td></tr>
          <tr><td>2</td><td>Errors: %w, Is/As, sentinel vs typed, error-to-HTTP mapping</td><td>useEffect: deps, cleanup, StrictMode, lifecycle mapping</td><td>Explain both out loud in 2 min each</td></tr>
          <tr><td>3</td><td>Goroutines, channels, select, buffered vs unbuffered, closing rules</td><td>useMemo, useCallback, React.memo, stale closures</td><td>Write a debounced search hook</td></tr>
          <tr><td>4</td><td>Worker pool + errgroup + context cancellation, from memory</td><td>Context API: provider, re-render cost, splitting contexts</td><td>Both coded without reference</td></tr>
          <tr><td>5</td><td>Race detector, mutex vs channel, sync.Once, atomic, leaks + pprof</td><td>TypeScript: props, generics, unions, utility types</td><td>Typed fetch wrapper in TS</td></tr>
          <tr><td>6–7</td><td colSpan={2}><b>Weekend build:</b> a mini &quot;loan application&quot; app. Go (Gin or net/http) API with JWT login, validation, Postgres, table-driven tests. React + TS frontend with a form, list, protected route and Zustand or RTK. Dockerfile for each, docker-compose.</td><td>Repo you can talk through and screen-share</td></tr>
          <tr><td>8</td><td>net/http: Handler, middleware chain, server timeouts, graceful shutdown</td><td>API integration: AbortController, races, React Query/SWR caching</td><td>Add both to the mini app</td></tr>
          <tr><td>9</td><td>Auth: JWT validation, refresh rotation, OAuth2 code + PKCE, RBAC middleware</td><td>Token storage (httpOnly cookie vs localStorage), protected routes</td><td>Draw the full auth sequence</td></tr>
          <tr><td>10</td><td>SQL: indexes, EXPLAIN ANALYZE, N+1, transactions, isolation, keyset pagination</td><td>Forms: controlled vs uncontrolled, validation, react-hook-form</td><td>40% latency story with real numbers</td></tr>
          <tr><td>11</td><td>Microservices: timeouts, retries, circuit breaker, idempotency, Kafka + outbox</td><td>Performance: code splitting, lazy, virtualised lists, profiler</td><td>One design answer rehearsed</td></tr>
          <tr><td>12</td><td>Testing: httptest, interface mocks, testcontainers, -race -cover</td><td>Testing: Jest + React Testing Library, mocking fetch/MSW</td><td>Tests added to mini app</td></tr>
          <tr><td>13</td><td colSpan={2}>Docker multi-stage builds, CI pipeline stages, logging/metrics, OWASP Top 10 for both layers, one hour of K8s concepts</td><td>Pipeline diagram</td></tr>
          <tr><td>14</td><td colSpan={2}>Full mock: 45-min technical (use the <b>Mock Interview</b> page), 30-min live coding (one Go concurrency + one React component), STAR stories out loud</td><td>Gap list for final review</td></tr>
        </tbody>
      </table>

      {/* ────────── 3. STUDY NOTES ────────── */}
      <h2>3. What to study for the Needs Review items</h2>

      <Card className="border-red-800">
        <h4 className="m-0 text-red-300">Go concurrency <Pill color="red">Mandatory, highest weight</Pill></h4>
        <ol>
          <li>
            <b>Write from scratch until each takes under 10 minutes:</b> bounded worker pool with
            a results channel; fan-out/fan-in; pipeline with <code>context</code> cancellation;{" "}
            <code>errgroup.WithContext</code> calling three services in parallel and failing fast;
            rate limiter with <code>time.Ticker</code> or <code>x/time/rate</code>.
          </li>
          <li>
            <b>Know the failure modes:</b> goroutine leak (blocked send, no receiver), sending on a
            closed channel (panic), only the sender closes, nil channel blocks forever, concurrent
            map writes (fatal), deadlock vs data race, <code>go test -race</code>.
          </li>
          <li>
            <b>Know the sync toolbox:</b> <code>WaitGroup</code>, <code>Mutex</code>/
            <code>RWMutex</code>, <code>Once</code>, <code>atomic</code>, <code>sync.Map</code>{" "}
            (and why it is rarely the right choice), and loop-variable capture (fixed in Go 1.22).
          </li>
        </ol>
      </Card>

      <Card className="border-red-800">
        <h4 className="m-0 text-red-300">React lifecycle and hooks</h4>
        <ol>
          <li>
            <b>Lifecycle mapping:</b> <code>componentDidMount</code> → <code>useEffect(fn, [])</code>;{" "}
            <code>componentDidUpdate</code> → effect with deps; <code>componentWillUnmount</code>{" "}
            → the cleanup function. <code>useLayoutEffect</code> runs before paint. StrictMode
            mounts, unmounts and remounts in dev to expose missing cleanup.
          </li>
          <li>
            <b>Re-renders:</b> a component re-renders when its state changes, its parent
            re-renders, or a consumed context changes. Props changing is not the trigger; the
            parent rendering is. <code>React.memo</code> + stable props (<code>useCallback</code>,{" "}
            <code>useMemo</code>) skip that.
          </li>
          <li>
            <b>Stale closures:</b> an effect or interval that reads state captured at the first
            render. Fix with correct deps, a functional update <code>setX(x =&gt; x + 1)</code>, or a
            ref.
          </li>
          <li>
            <b>Context:</b> every consumer re-renders when the value changes, so memoise the value
            object and split contexts by update frequency. For frequent global updates, Zustand or
            Redux with selectors is a better fit.
          </li>
          <li>
            <b>Keys:</b> why array index as key breaks state on reorder/insert.
          </li>
        </ol>
      </Card>

      <Card className="border-red-800">
        <h4 className="m-0 text-red-300">TypeScript</h4>
        <ol>
          <li>
            Type props and children, optional props, default values; <code>interface</code> vs{" "}
            <code>type</code>.
          </li>
          <li>
            Generics: a typed <code>fetchJson&lt;T&gt;(url): Promise&lt;T&gt;</code>, a generic{" "}
            <code>Table&lt;T&gt;</code> component.
          </li>
          <li>
            Discriminated unions for API state:{" "}
            <code>{`{ status: "loading" } | { status: "error"; error: string } | { status: "ok"; data: T }`}</code>.
          </li>
          <li>
            Utility types: <code>Partial</code>, <code>Pick</code>, <code>Omit</code>,{" "}
            <code>Record</code>, <code>ReturnType</code>; <code>unknown</code> vs <code>any</code>;
            narrowing with type guards. Keep Go structs and TS types in sync (or generate TS
            from OpenAPI).
          </li>
        </ol>
      </Card>

      <Card>
        <h4 className="m-0">Observability and troubleshooting</h4>
        <ul>
          <li>Structured logs (<code>log/slog</code>) with a request ID passed from the React app through the gateway to every service.</li>
          <li>RED metrics (rate, errors, duration) in Prometheus; alert on p95/p99, not averages.</li>
          <li><code>net/http/pprof</code> for CPU, heap and goroutine profiles. Frontend: browser DevTools, React Profiler, Sentry for JS errors.</li>
          <li>Have one real production-incident story ready: symptom, how you found it, fix, what you changed afterwards.</li>
        </ul>
      </Card>

      <Card>
        <h4 className="m-0">Secure coding (OWASP), relevant for BFSI</h4>
        <ul>
          <li><b>Injection:</b> parameterised queries only. <b>Broken access control:</b> check ownership on every resource (IDOR), RBAC middleware.</li>
          <li><b>XSS:</b> React escapes by default; the risk is <code>dangerouslySetInnerHTML</code>. Sanitise with DOMPurify. Add a CSP header.</li>
          <li><b>Tokens:</b> short-lived access token, refresh token in an httpOnly, Secure, SameSite cookie; CSRF protection if you use cookies.</li>
          <li><b>Data:</b> encrypt PII at rest (your AES-GCM backfill story), mask in logs, TLS everywhere, rate limiting on login and OTP.</li>
        </ul>
      </Card>

      {/* ────────── 4. TECHNICAL QUESTIONS ────────── */}
      <h2>4. Likely technical questions</h2>

      <h3>Go</h3>
      <Q n={1} q="Write a worker pool that processes jobs with at most N goroutines and stops cleanly on cancellation.">
        <ul>
          <li>Jobs channel, N workers ranging over it, <code>WaitGroup</code>, a goroutine that closes results after <code>wg.Wait()</code>.</li>
          <li><code>select</code> on <code>ctx.Done()</code> so cancellation stops the work; the producer closes the jobs channel.</li>
          <li>Pick N by workload: I/O-bound can go higher, CPU-bound around <code>GOMAXPROCS</code>.</li>
        </ul>
        <pre><code>{`func run(ctx context.Context, jobs <-chan Job, n int) <-chan Result {
    out := make(chan Result)
    var wg sync.WaitGroup
    for i := 0; i < n; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                select {
                case out <- process(j):
                case <-ctx.Done():
                    return
                }
            }
        }()
    }
    go func() { wg.Wait(); close(out) }()
    return out
}`}</code></pre>
      </Q>

      <Q n={2} q="Call three downstream services in parallel and return as soon as one fails.">
        <pre><code>{`g, ctx := errgroup.WithContext(ctx)
var user User; var acct Account; var kyc KYC
g.Go(func() (err error) { user, err = users.Get(ctx, id); return })
g.Go(func() (err error) { acct, err = accounts.Get(ctx, id); return })
g.Go(func() (err error) { kyc, err = kycSvc.Get(ctx, id); return })
if err := g.Wait(); err != nil { return nil, err }`}</code></pre>
        <p>The first error cancels <code>ctx</code>, so the other calls stop early if they respect it. Each goroutine writes to its own variable, so there is no race.</p>
      </Q>

      <Q n={3} q="What is an interface in Go, and what is the nil-interface gotcha?">
        <ul>
          <li>Implicit satisfaction; small interfaces defined where they are consumed; makes mocking easy.</li>
          <li>An interface value holds (type, value). A nil <code>*MyErr</code> returned as <code>error</code> is <b>not</b> nil, because the type is set. Return a literal <code>nil</code> instead.</li>
        </ul>
      </Q>

      <Q n={4} q="How do you structure error handling in a Go REST service?">
        <ul>
          <li>Wrap with context using <code>%w</code>; check with <code>errors.Is/As</code>; domain sentinels like <code>ErrNotFound</code>.</li>
          <li>Map errors to HTTP status in one place (error middleware), with a consistent JSON error envelope.</li>
          <li>Never leak internal messages to the client; log them with the request ID. No panics in request paths; add recover middleware.</li>
        </ul>
      </Q>

      <Q n={5} q="Your service calls a slow third-party API (for example, credit bureau or KYC). How do you protect it?">
        <ul>
          <li>Custom <code>http.Client</code> with a timeout, plus a per-request <code>context.WithTimeout</code>. Never the default client.</li>
          <li>Retries with exponential backoff and jitter, only for idempotent calls; circuit breaker; bulkhead (limit concurrent calls).</li>
          <li><code>defer resp.Body.Close()</code>; cache stable responses; return a clear degraded response to the UI.</li>
        </ul>
      </Q>

      <Q n={6} q="Explain JWT authentication end to end, including refresh.">
        <ul>
          <li>Login → short-lived access token (5–15 min) + refresh token. Verify signature, <code>exp</code>, <code>iss</code>, <code>aud</code>; pin the algorithm (reject <code>none</code>).</li>
          <li>Refresh token stored server-side (hashed) and rotated on use; reuse detection revokes the whole family.</li>
          <li>Authorisation is separate: roles/permissions checked in middleware, plus ownership checks per resource.</li>
          <li>OAuth2: authorisation code + PKCE for user login via a provider; client credentials for service-to-service.</li>
        </ul>
      </Q>

      <h3>React / TypeScript</h3>
      <Q n={7} q="What happens when state changes in React? When does a child re-render?">
        <ul>
          <li>setState schedules a re-render of that component and, by default, all its children. React diffs the new tree against the old one and commits the minimum DOM changes.</li>
          <li>Children skip re-rendering only with <code>React.memo</code> and referentially stable props. React 18 batches updates automatically.</li>
        </ul>
      </Q>

      <Q n={8} q="Fetch data in useEffect. What can go wrong?">
        <pre><code>{`useEffect(() => {
  const ctrl = new AbortController();
  setState({ status: "loading" });
  fetch(\`/api/loans?q=\${query}\`, { signal: ctrl.signal })
    .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
    .then((data) => setState({ status: "ok", data }))
    .catch((e) => { if (e.name !== "AbortError") setState({ status: "error", error: e.message }); });
  return () => ctrl.abort();
}, [query]);`}</code></pre>
        <ul>
          <li>Race condition: an older response arrives after a newer one. The abort in cleanup fixes it.</li>
          <li>Missing deps produce stale data; object deps that change every render cause loops.</li>
          <li>In a real app use React Query or SWR (caching, dedupe, retries) or RTK Query.</li>
        </ul>
      </Q>

      <Q n={9} q="Context API vs Redux Toolkit vs Zustand: when would you choose each?">
        <ul>
          <li><b>Context:</b> low-frequency global values (theme, auth user, locale). Every consumer re-renders on change.</li>
          <li><b>Redux Toolkit:</b> large shared state, strict update flow, DevTools, RTK Query for server cache.</li>
          <li><b>Zustand:</b> small API, selector-based subscriptions, no provider. Good for medium apps.</li>
          <li>Server data belongs in a server-cache tool (React Query/RTK Query), not hand-rolled global state.</li>
        </ul>
      </Q>

      <Q n={10} q="Build a reusable, typed Table component (live coding).">
        <pre><code>{`type Column<T> = { key: keyof T; header: string; render?: (row: T) => React.ReactNode };

function Table<T extends { id: string }>({ rows, columns }: { rows: T[]; columns: Column<T>[] }) {
  return (
    <table>
      <thead><tr>{columns.map((c) => <th key={String(c.key)}>{c.header}</th>)}</tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            {columns.map((c) => <td key={String(c.key)}>{c.render ? c.render(r) : String(r[c.key])}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}</code></pre>
        <p>Then expect follow-ups: sorting, pagination, empty and loading states, and accessibility.</p>
      </Q>

      <Q n={11} q="How do you optimise a slow React page?">
        <ul>
          <li>Measure first with the React Profiler and Lighthouse.</li>
          <li>Avoid unnecessary re-renders (memo, stable callbacks, split context), virtualise long lists, debounce inputs.</li>
          <li>Code-split routes with <code>React.lazy</code>/dynamic import, shrink the bundle, optimise images, cache API responses.</li>
        </ul>
      </Q>

      <h3>Database and full stack</h3>
      <Q n={12} q="Walk me through the 40% latency improvement.">
        <ul>
          <li>Which endpoint, which percentile, measured how, before and after numbers.</li>
          <li>The query problem (N+1, missing composite index, seq scan) and the plan change you saw in <code>EXPLAIN ANALYZE</code>.</li>
          <li>Redis: what was cached, key design, TTL, invalidation on write, and the staleness you accepted.</li>
          <li><b>Write this down with real numbers before the interview.</b> It will be asked.</li>
        </ul>
      </Q>

      <Q n={13} q="Transfer money between two accounts safely.">
        <ul>
          <li>One transaction; lock rows in a consistent order (<code>SELECT ... FOR UPDATE</code> ordered by id) to avoid deadlocks.</li>
          <li>Amounts as integer paise (<code>BIGINT</code>) or <code>NUMERIC</code>, never float.</li>
          <li>Idempotency key on the API so a retried request does not double-debit; append-only ledger entries (link to the HR Conclave points ledger, as a contributor).</li>
          <li>Isolation level choice and what anomalies it prevents.</li>
        </ul>
      </Q>

      <Q n={14} q="Design: a loan application flow, from the React form to the Go service to Postgres.">
        <ul>
          <li><b>UI:</b> multi-step form, client-side validation, draft auto-save, file upload via pre-signed URL, status page.</li>
          <li><b>API:</b> <code>POST /applications</code> (idempotency key), <code>PATCH</code> for steps, <code>GET /applications/:id</code>; validation repeated server-side; JWT + ownership check.</li>
          <li><b>Data:</b> applications table with a status state machine, audit table, encrypted PII columns.</li>
          <li><b>Async:</b> KYC and credit checks via a queue (Kafka + outbox), status pushed to the UI by polling or SSE.</li>
          <li><b>Ops:</b> request IDs end to end, metrics per step, Docker + CI pipeline.</li>
        </ul>
      </Q>

      <Q n={15} q="Describe a CI/CD pipeline for this Go + React app.">
        <ul>
          <li>Go: <code>go vet</code>, <code>golangci-lint</code>, <code>go test -race -cover</code>, multi-stage build to a distroless image.</li>
          <li>React: <code>tsc --noEmit</code>, ESLint, Jest/RTL, production build served by nginx or a CDN.</li>
          <li>Image scan, push to registry, deploy to staging, smoke tests, manual approval to production, rollback plan.</li>
        </ul>
      </Q>

      {/* ────────── 5. GAP PROBES ────────── */}
      <h2>5. Follow-ups that probe your gaps: honest framings</h2>

      <Q n={1} q="You have 6 years. This role asks for 3+. Why this role, and will you be happy here?">
        <p className="text-slate-200">
          &quot;The number matters less to me than the shape of the work. I want a role where I
          own features across Go and React, in a BFSI product, and that&apos;s exactly what this
          is. The extra years mean I&apos;ll ramp quickly and can help with reviews and
          production issues early.&quot;
        </p>
        <p className="text-slate-400 text-sm">Then settle the salary band in the same call. If it is well below your expectation, it is better to find out now.</p>
      </Q>

      <Q n={2} q="How strong is your TypeScript?">
        <p className="text-slate-200">
          &quot;Most of my production frontend has been JavaScript in Next.js. I use TypeScript for
          typed props, API response types, generics and discriminated unions for request state,
          and I&apos;ve built a project in it end to end. I&apos;m comfortable moving a codebase
          to strict mode.&quot;
        </p>
        <p className="text-slate-400 text-sm">Only say the last sentence once the Day 6–7 mini app is done in TS.</p>
      </Q>

      <Q n={3} q="Have you used Kubernetes or a cloud platform in production?">
        <p className="text-slate-200">
          &quot;Not in production. I deploy Docker containers on Linux, and I&apos;ve labbed
          Kubernetes locally. I know what a Go service needs to run well there: liveness and
          readiness probes, graceful shutdown on SIGTERM, config from env, resource limits.
          I&apos;d expect to learn the cluster side with the DevOps team.&quot;
        </p>
      </Q>

      <Q n={4} q="Are you comfortable working on-site in Thane five days a week?">
        <p className="text-slate-400 text-sm">
          Decide before the call. If yes, say yes plainly. If you need a condition (for example,
          relocation time), say it now. Do not hedge in round one and negotiate it at the offer.
        </p>
      </Q>

      {/* ────────── 6. BEHAVIORAL ────────── */}
      <h2>6. Behavioral prompts mapped to the JD</h2>
      <table>
        <thead>
          <tr><th>JD line</th><th>Story to use</th></tr>
        </thead>
        <tbody>
          <tr><td>Work independently</td><td>Magazine module, owned end to end (auth tiers + encryption backfill)</td></tr>
          <tr><td>Troubleshoot production issues</td><td>The latency fix: symptom, diagnosis, measured result</td></tr>
          <tr><td>Collaborate with QA, product, BA</td><td>In-the-News V3 shipped alongside a live V1 without breaking it</td></tr>
          <tr><td>Reusable components / architecture decisions</td><td>HR Conclave V2 speaker cards reusing the V1 RBAC permission</td></tr>
          <tr><td>Secure, reliable applications</td><td>Idempotent AES-GCM encryption backfill</td></tr>
          <tr><td>Agile ceremonies and estimation</td><td>A sprint where scope changed, and how you re-estimated</td></tr>
        </tbody>
      </table>
      <p>Full STAR versions are on the <b>Behavioral</b> page.</p>

      {/* ────────── 7. QUESTIONS TO ASK ────────── */}
      <h2>7. Questions to ask them</h2>
      <ol>
        <li><b>&quot;What is the split between Go and React work in a typical sprint?&quot;</b> Tells you whether this is really full stack.</li>
        <li><b>&quot;Which Go framework and which state-management library do you use today?&quot;</b></li>
        <li><b>&quot;Is the product an internal BFSI platform or a client-facing app, and what does a release look like?&quot;</b></li>
        <li><b>&quot;Who owns deployments and on-call: developers or a DevOps team?&quot;</b></li>
        <li><b>&quot;What does good look like in the first 90 days?&quot;</b></li>
        <li><b>To the recruiter:</b> salary band, notice-period buyout, working hours and days on-site, and the interview rounds (count, live coding or take-home).</li>
      </ol>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">If you only have three days</h3>
        <ul>
          <li><b>Day 1:</b> Go concurrency: worker pool, errgroup, cancellation, leaks, from memory. Evening: React re-render rules, useEffect cleanup, lifecycle mapping.</li>
          <li><b>Day 2:</b> TypeScript basics plus the typed Table and the fetch-with-abort hook. Evening: JWT/OAuth2 flow and OWASP points for both layers.</li>
          <li><b>Day 3:</b> Write the 40% latency story and one end-to-end feature story with real numbers. Rehearse the loan-application design and section 5 out loud.</li>
        </ul>
      </Card>
    </>
  );
}
