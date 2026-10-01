import { Card, Pill } from "@/components/Card";

export const metadata = { title: "Emerger Tech — Golang Developer | Interview Prep" };

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

export default function EmergerTechGolangPage() {
  return (
    <>
      <h1>Emerger Tech: Golang Developer</h1>
      <p>
        <strong>Client:</strong> Emerger Tech &nbsp;·&nbsp; <strong>Payroll:</strong> TalentCafe
        Solutions &nbsp;·&nbsp; <strong>Mode:</strong> Hybrid, Chennai<br />
        <strong>Stated experience:</strong> 6+ years overall, 4+ years hands-on Go preferred<br />
        <strong>Core stack:</strong> Go, REST microservices, goroutines/channels,
        PostgreSQL/MySQL, Git, Linux, unit testing<br />
        <strong>Good-to-have:</strong> gRPC, Kafka/RabbitMQ/NATS, Docker, Kubernetes,
        AWS/Azure/GCP, CI/CD, MongoDB/Redis, observability, Agile
      </p>

      {/* ────────── HONEST POSITIONING ────────── */}
      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Read this first — where you actually stand</h3>
        <p>
          This is a <b>mainstream Go backend seat</b>, and unlike the Virtusa JD it is mostly
          inside your lane. Total experience clears the bar (~6 years). Go experience does not:
          <b> ~3.5 years (Jan 2023 → now) against &quot;4+ preferred&quot;</b>. &quot;Preferred&quot;
          is negotiable; a stretched number is not. Say 3.5. If you say four and they ask what
          you were writing in Go in 2022, the answer is WooCommerce, and the interview is over.
        </p>
        <p>
          The blunt risks, in order of how likely they are to sink you:
        </p>
        <ol>
          <li>
            <b>DSA round.</b> It is a must-have, and you have no evidence of formal practice. A
            WordPress → Go path is exactly the profile interviewers expect to be weak here. This is
            your single biggest exposure.
          </li>
          <li>
            <b>Concurrency depth.</b> You have one real story (async WhatsApp notifications). Good,
            but one story gets exhausted in two follow-ups. They will push into worker pools,
            cancellation, leaks, races, <code>sync</code> primitives.
          </li>
          <li>
            <b>Stdlib Go vs Fiber Go.</b> Fiber sits on fasthttp, not <code>net/http</code>. If they
            ask about <code>http.Handler</code>, middleware chaining, <code>context</code>{" "}
            propagation or server timeouts in the standard library, Fiber muscle memory won&apos;t
            carry you.
          </li>
          <li>
            <b>The 40% latency claim.</b> It is your best number. It is also the first thing a good
            interviewer will dig into. If you can&apos;t name the query, the plan change, the cache
            key and the TTL, it reads as resume inflation even though it&apos;s true.
          </li>
        </ol>
        <p className="text-amber-200">
          Kubernetes, gRPC, MongoDB and GCP are <b>good-to-have only</b>. Not having them is not
          disqualifying. Bluffing them is.
        </p>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">Your opening for this JD</h3>
        <p className="text-slate-200">
          &quot;I have about six years in software, the last three and a half as a Go backend
          engineer at 1Finance, a fintech platform. Before that I did PHP and WooCommerce work,
          which is where I learned to ship for real users. In Go I&apos;ve built REST services on
          Fiber — I designed 28 production endpoints with JWT auth — and I&apos;ve done the
          performance side: I cut API latency by around 40% by rewriting PostgreSQL queries and
          adding a Redis cache layer. I&apos;ve used goroutines and channels in production for an
          asynchronous WhatsApp Business notification pipeline so the request path never blocked
          on a third-party API. I write unit tests for my Go code and deploy on Linux with Docker.
          Kubernetes and gRPC I understand conceptually but haven&apos;t run in production — happy
          to talk about how I&apos;d ramp on them.&quot;
        </p>
        <p className="text-slate-400 text-sm">
          Note what this does: states 3.5 years before they compute it, and names the gaps before
          they find them. Everything you say afterwards gets believed.
        </p>
      </Card>

      {/* ────────── 1. CHECKLIST ────────── */}
      <h2>1. Skill checklist — blunt ratings</h2>
      <p className="text-slate-400 text-sm">
        Strong = you can go three follow-ups deep with real production detail. Adequate = real
        experience, but thin or narrow; expect to be pushed. Needs Review = you will be exposed
        if asked today.
      </p>

      <h3>Must-have</h3>
      <table>
        <thead>
          <tr><th>Skill</th><th>Rating</th><th>Why</th></tr>
        </thead>
        <tbody>
          <Row skill="Strong hands-on Go" rating="Adequate" evidence="Real, production, ~3.5 yrs. Below the 4+ preference, and Fiber-centric — not yet broad across the ecosystem." />
          <Row skill="Go fundamentals (interfaces, errors, packages, stdlib)" rating="Needs Review" evidence="Fiber hides net/http. Expect errors.Is/As/%w, small-interface design, embedding, nil-interface gotcha, package layout, context." />
          <Row skill="Goroutines / channels / concurrency" rating="Needs Review" evidence="One real use case. Patterns (worker pool, fan-out/in, errgroup, cancellation, leaks, mutex vs channel, -race) are what gets probed." />
          <Row skill="REST APIs & microservices" rating="Strong" evidence="28 production endpoints, JWT auth, gateway + services topology. Your home turf." />
          <Row skill="Data Structures & Algorithms" rating="Needs Review" evidence="No evidence of formal practice. Highest risk item on this JD." />
          <Row skill="PostgreSQL / MySQL" rating="Strong" evidence="Postgres query rewrites + 40% latency win. MySQL: you know it from WordPress days — say so, don't overstate InnoDB depth." />
          <Row skill="Git" rating="Strong" evidence="Daily use, branching, PR workflow. Know rebase vs merge, cherry-pick, bisect." />
          <Row skill="Unit testing & debugging" rating="Adequate" evidence="You write tests. Review table-driven tests, httptest, interface mocks, -race, -cover, pprof, delve." />
          <Row skill="Linux / Unix" rating="Adequate" evidence="Deploys on Linux. Be fluent with ps/top, ss/netstat, lsof, journalctl, grep/awk, file permissions, signals." />
          <Row skill="Problem-solving" rating="Adequate" evidence="Strong in production debugging stories; unproven under a live coding timer." />
        </tbody>
      </table>

      <h3>Good-to-have</h3>
      <table>
        <thead>
          <tr><th>Skill</th><th>Rating</th><th>Why</th></tr>
        </thead>
        <tbody>
          <Row skill="gRPC" rating="Needs Review" evidence="Confirmed gap. Conceptual fluency only — do not claim use." />
          <Row skill="Kafka / RabbitMQ / NATS" rating="Needs Review" evidence="Depth unclear. Your goroutine pipeline is in-process, not a broker — don't conflate them." />
          <Row skill="Docker" rating="Adequate" evidence="Containerized Node services. Go-specific multi-stage / distroless builds need a quick refresh." />
          <Row skill="Kubernetes" rating="Needs Review" evidence="Confirmed gap. Conceptual fluency only." />
          <Row skill="AWS / Azure / GCP" rating="Needs Review" evidence="Basic S3/EC2 only. No GCP. Azure DevOps as a user, not cloud infra." />
          <Row skill="CI/CD / DevOps" rating="Needs Review" evidence="Uses pipelines; unclear whether you've authored them. Know what a Go pipeline should contain." />
          <Row skill="Redis" rating="Adequate" evidence="Used as cache for the latency win. Review invalidation, TTLs, stampede, eviction." />
          <Row skill="MongoDB" rating="Needs Review" evidence="Confirmed gap." />
          <Row skill="Distributed systems / cloud-native" rating="Needs Review" evidence="Microservices yes; idempotency, retries, circuit breakers, consistency trade-offs need articulating." />
          <Row skill="Monitoring / observability" rating="Needs Review" evidence="No stated metrics/tracing work. Expect 'how do you know it's slow in prod?'" />
          <Row skill="Agile / Scrum" rating="Adequate" evidence="Azure DevOps user stories. Fine — just don't claim Scrum Master-level process ownership." />
        </tbody>
      </table>

      <p>
        <b>Scorecard:</b> 3 Strong, 6 Adequate, 12 Needs Review. Of the Needs Review items, only
        <b> three are must-haves</b> — DSA, concurrency patterns, Go fundamentals. Those are where
        your next few days go. Everything else is a 30-minute conceptual brief.
      </p>

      {/* ────────── 2. STUDY PLAN ────────── */}
      <h2>2. What to study — Needs Review items</h2>

      <h3>Must-have gaps (spend ~75% of your time here)</h3>

      <Card className="border-red-800">
        <h4 className="m-0 text-red-300">DSA <Pill color="red">Highest risk</Pill></h4>
        <ol>
          <li>
            <b>Drill these six patterns, ~4 problems each, in Go, timed at 25 min:</b> hash map
            (two-sum, group anagrams, top-K frequent), two pointers / sliding window (longest
            substring without repeat, min window substring), BFS/DFS on grids and graphs (number of
            islands, course schedule), heap (k-th largest, merge k sorted lists), binary search on
            answer (search rotated array, koko eating bananas), and intervals (merge, insert,
            meeting rooms). These cover the bulk of service-company Go screens.
          </li>
          <li>
            <b>Learn Go&apos;s DSA toolbox cold</b> — the language punishes you here:{" "}
            <code>container/heap</code> (implement the 5-method interface from memory),{" "}
            <code>sort.Slice</code>, <code>slices</code> / <code>maps</code> packages, using{" "}
            <code>map[T]struct{"{}"}</code> as a set, a slice as a stack/queue, and the
            append-aliasing trap when you slice a slice.
          </li>
          <li>
            <b>Practise saying complexity out loud</b> before coding. &quot;Brute force is O(n²);
            with a map it&apos;s O(n) time, O(n) space.&quot; Interviewers grade the narration as much
            as the code. Skip DP beyond climbing stairs / house robber — low ROI for this JD.
          </li>
        </ol>
      </Card>

      <Card className="border-red-800">
        <h4 className="m-0 text-red-300">Concurrency patterns</h4>
        <ol>
          <li>
            <b>Write these from scratch, no reference, until each takes &lt;10 min:</b> a bounded
            worker pool with results channel; fan-out/fan-in; a pipeline with{" "}
            <code>context</code> cancellation; <code>errgroup.WithContext</code> calling three APIs
            in parallel and failing fast; a rate limiter with <code>time.Ticker</code> or{" "}
            <code>golang.org/x/time/rate</code>.
          </li>
          <li>
            <b>Know the failure modes:</b> goroutine leak (blocked send with no receiver — fix with
            buffered channel or <code>select</code> on <code>ctx.Done()</code>), closing a channel
            twice / sending on closed (panic), who closes (the sender), nil channel blocks forever
            (useful in <code>select</code>), data race vs deadlock, and running{" "}
            <code>go test -race</code>.
          </li>
          <li>
            <b>Deepen your WhatsApp story.</b> Answer now: Was the channel buffered, what size? What
            happened when it was full? How many workers? What happened to queued messages on
            deploy/restart (lost — in-process)? How did you retry failed sends? If the honest answer
            is &quot;we lost them on restart&quot;, say so and say you&apos;d move it to a durable queue.
            That&apos;s a senior answer.
          </li>
        </ol>
      </Card>

      <Card className="border-red-800">
        <h4 className="m-0 text-red-300">Go fundamentals / stdlib</h4>
        <ol>
          <li>
            <b>Build one tiny service on <code>net/http</code> only</b> (Go 1.22+ routing:{" "}
            <code>mux.HandleFunc(&quot;GET /users/{"{id}"}&quot;, ...)</code>), with a logging middleware
            as <code>func(http.Handler) http.Handler</code>, server timeouts, and graceful shutdown
            via <code>signal.NotifyContext</code> + <code>srv.Shutdown</code>. Then be able to say
            how Fiber/fasthttp differs (pooled contexts — don&apos;t retain <code>*fiber.Ctx</code>{" "}
            past the handler).
          </li>
          <li>
            <b>Errors:</b> <code>fmt.Errorf(&quot;...: %w&quot;, err)</code>, <code>errors.Is</code> vs{" "}
            <code>errors.As</code>, sentinel vs typed errors, <code>errors.Join</code>, and why
            panics don&apos;t belong in request paths.
          </li>
          <li>
            <b>Interfaces:</b> implicit satisfaction, &quot;accept interfaces, return structs&quot;,
            defining interfaces at the consumer for mocking, the typed-nil-in-interface trap,
            value vs pointer receivers and method sets, embedding. Also: slices vs arrays
            (len/cap/backing array), maps aren&apos;t safe for concurrent writes, <code>defer</code>{" "}
            evaluation order.
          </li>
        </ol>
      </Card>

      <h3>Good-to-have gaps (conceptual fluency, ~25% of time)</h3>

      <Card>
        <h4 className="m-0">Kubernetes — minimum to talk intelligently</h4>
        <ol>
          <li>
            Know the objects and what each solves: <b>Pod</b> (unit), <b>Deployment</b> (replicas +
            rolling updates), <b>Service</b> (stable DNS/VIP), <b>Ingress</b> (HTTP routing),{" "}
            <b>ConfigMap/Secret</b>, <b>HPA</b> (scale on CPU/custom metrics).
          </li>
          <li>
            Know what <b>your Go service must do</b> to be a good K8s citizen — this is where you
            can sound credible: liveness vs readiness endpoints, handle <code>SIGTERM</code> with
            graceful shutdown, read config from env, log to stdout, set resource requests/limits
            (and <code>GOMAXPROCS</code>/<code>GOMEMLIMIT</code> under cgroup limits).
          </li>
          <li>
            Spend one evening with <code>kind</code> or <code>minikube</code>: deploy a Go container,
            expose it, scale it, break the readiness probe and watch traffic stop. Then you can
            honestly say &quot;I&apos;ve labbed it, not run it in production.&quot;
          </li>
        </ol>
      </Card>

      <Card>
        <h4 className="m-0">gRPC</h4>
        <ol>
          <li>
            Why: HTTP/2, Protobuf binary encoding, generated typed clients, streaming (unary,
            server, client, bidi). Typically internal service-to-service; REST stays at the edge.
          </li>
          <li>
            Write one <code>.proto</code>, generate with <code>protoc-gen-go</code> /{" "}
            <code>protoc-gen-go-grpc</code>, run a unary server + client. ~2 hours.
          </li>
          <li>
            Know: deadlines via <code>context</code>, status codes (<code>codes.NotFound</code>{" "}
            etc.) vs HTTP codes, interceptors as the gRPC equivalent of middleware, backward-
            compatible proto changes (never reuse field numbers).
          </li>
        </ol>
      </Card>

      <Card>
        <h4 className="m-0">Messaging (Kafka / RabbitMQ / NATS)</h4>
        <ol>
          <li>
            The distinction: Kafka = durable partitioned log, consumer groups, replay; RabbitMQ =
            broker with queues/exchanges, per-message ack; NATS = lightweight pub/sub (JetStream
            adds persistence).
          </li>
          <li>
            Delivery semantics: at-least-once is the default reality → consumers must be{" "}
            <b>idempotent</b> (dedupe key, upsert). Ordering is per-partition only.
          </li>
          <li>
            Bridge to your story: &quot;My notification pipeline was in-process goroutines. Its
            weakness is durability across restarts — that&apos;s exactly what a broker solves.
            I&apos;d put RabbitMQ or Kafka in front with idempotent consumers.&quot;
          </li>
        </ol>
      </Card>

      <Card>
        <h4 className="m-0">Cloud (AWS / GCP), CI/CD, observability, MongoDB, distributed systems</h4>
        <ul>
          <li>
            <b>Cloud:</b> map the concepts once — compute (EC2 / GCE, Lambda / Cloud Run), managed
            Postgres (RDS / Cloud SQL), object storage (S3 / GCS), managed K8s (EKS / GKE). Don&apos;t
            go deeper than that for this JD.
          </li>
          <li>
            <b>CI/CD:</b> be able to describe a Go pipeline: <code>go vet</code> →{" "}
            <code>golangci-lint</code> → <code>go test -race -cover</code> → multi-stage Docker
            build → push → deploy. Know what you have actually configured vs only used.
          </li>
          <li>
            <b>Observability:</b> RED metrics (rate, errors, duration) via Prometheus, p95/p99 not
            averages, structured logs with request IDs (<code>log/slog</code>), traces via
            OpenTelemetry, <code>net/http/pprof</code> for CPU/heap/goroutine profiles.
          </li>
          <li>
            <b>MongoDB:</b> document model, when it beats Postgres (flexible schema, nested reads)
            and when it doesn&apos;t (relational integrity, multi-row transactions — your fintech
            context is a natural &quot;why we chose Postgres&quot;).
          </li>
          <li>
            <b>Distributed systems:</b> timeouts on every outbound call, retries with exponential
            backoff + jitter, idempotency keys on POSTs, circuit breakers, outbox pattern.
          </li>
        </ul>
      </Card>

      {/* ────────── 3. TECHNICAL QUESTIONS ────────── */}
      <h2>3. Likely technical questions</h2>
      <p className="text-slate-400 text-sm">Weighted to the must-haves. Click to expand what a strong answer hits.</p>

      <Q n={1} q="Design a worker pool that processes jobs concurrently with a max of N workers, and stops cleanly on shutdown.">
        <ul>
          <li>Jobs channel, N goroutines ranging over it, <code>sync.WaitGroup</code>, results/errors channel.</li>
          <li>Sender closes the jobs channel; workers exit on range end; a separate goroutine closes results after <code>wg.Wait()</code>.</li>
          <li><code>select</code> on <code>ctx.Done()</code> so cancellation stops in-flight work.</li>
          <li>Mentions backpressure (buffered vs unbuffered), how to pick N (I/O vs CPU bound), and testing with <code>-race</code>.</li>
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

      <Q n={2} q="What causes a goroutine leak? How would you find one in production?">
        <ul>
          <li>Blocked on send/receive with no counterpart; missing <code>ctx</code> cancellation; HTTP calls without timeouts.</li>
          <li>Detect: rising <code>runtime.NumGoroutine()</code> metric, <code>/debug/pprof/goroutine?debug=2</code> to see stacks; <code>goleak</code> in tests.</li>
          <li>Fix: every goroutine needs a defined exit path — usually <code>ctx.Done()</code>.</li>
        </ul>
      </Q>

      <Q n={3} q="Channels vs mutex — when do you use which?">
        <ul>
          <li>Channels for transferring ownership / coordinating work between goroutines; mutex for protecting shared state (a cache map, a counter).</li>
          <li><code>sync.RWMutex</code> for read-heavy; <code>sync/atomic</code> for simple counters; <code>sync.Once</code> for lazy init.</li>
          <li>Strong answers avoid dogma: &quot;share memory by communicating&quot; is a guideline, a mutex around a map is often clearer.</li>
        </ul>
      </Q>

      <Q n={4} q="Walk me through how you cut API latency by 40%.">
        <ul>
          <li>How it was measured (p95 before/after, which endpoint, what tool).</li>
          <li>The query problem: N+1? missing index? seq scan? Show you used <code>EXPLAIN ANALYZE</code> and what changed in the plan.</li>
          <li>Redis: what was cached, key design, TTL, invalidation on write, what happens on cache miss storm.</li>
          <li>The trade-off you accepted (staleness window). <b>Prepare this with real numbers before the interview.</b></li>
        </ul>
      </Q>

      <Q n={5} q="A query is slow in production. How do you diagnose and fix it?">
        <ul>
          <li><code>pg_stat_statements</code> to find it; <code>EXPLAIN (ANALYZE, BUFFERS)</code> to read it.</li>
          <li>Seq scan vs index scan, composite index column order, covering indexes (<code>INCLUDE</code>), partial indexes.</li>
          <li>Avoid <code>SELECT *</code>, functions on indexed columns, OFFSET pagination on big tables (use keyset).</li>
          <li>Go side: connection pool sizing (<code>SetMaxOpenConns</code>), N+1 from ORM loops, context timeouts on queries.</li>
        </ul>
      </Q>

      <Q n={6} q="Design a REST API for orders with idempotent creation and pagination.">
        <ul>
          <li>Resource naming, correct verbs and status codes (201 + Location, 400, 404, 409, 422).</li>
          <li><code>Idempotency-Key</code> header stored with the response so retries don&apos;t double-create.</li>
          <li>Cursor/keyset pagination, filtering, versioning (<code>/v1</code>), consistent error envelope.</li>
          <li>Auth (JWT — you&apos;ve done this: validation, expiry, refresh), rate limiting, input validation at the edge.</li>
        </ul>
      </Q>

      <Q n={7} q="How do you structure error handling in a Go service?">
        <ul>
          <li>Wrap with context using <code>%w</code>; inspect with <code>errors.Is/As</code>; sentinel errors for domain cases (<code>ErrNotFound</code>).</li>
          <li>Map domain errors to HTTP status in one place (handler/middleware), not throughout services.</li>
          <li>Never leak internal error text to clients; log with request ID. No panics in request paths.</li>
        </ul>
      </Q>

      <Q n={8} q="How do you unit test a handler that depends on a database and a third-party API?">
        <ul>
          <li>Depend on small interfaces defined by the consumer; inject fakes/mocks (gomock or hand-written).</li>
          <li>Table-driven tests with <code>t.Run</code>; <code>httptest.NewRecorder</code> / <code>httptest.NewServer</code> for the third-party.</li>
          <li>For DB: real Postgres in a container (testcontainers) for integration tests rather than mocking SQL.</li>
          <li><code>-race</code>, <code>-cover</code>, and testing error paths, not just happy paths.</li>
        </ul>
      </Q>

      <Q n={9} q="Your service calls an internal API that sometimes hangs. What do you do?">
        <ul>
          <li>Never use the default <code>http.Client</code> (no timeout). Set client timeout + per-request <code>context.WithTimeout</code>.</li>
          <li>Retries with exponential backoff + jitter, only on idempotent operations; circuit breaker to fail fast.</li>
          <li>Always <code>defer resp.Body.Close()</code> and drain it so connections are reused.</li>
          <li>Metrics on latency/error rate of the dependency so you can prove it&apos;s them, not you.</li>
        </ul>
      </Q>

      <Q n={10} q="Live coding: given a list of transactions, return the top K merchants by total spend.">
        <ul>
          <li>Aggregate in <code>map[string]int64</code>, then either sort (O(n log n)) or a min-heap of size K (O(n log K)).</li>
          <li>Implement <code>container/heap</code> correctly; handle ties and K &gt; distinct merchants.</li>
          <li>Narrate complexity; mention money as integer minor units, not float64. (Your fintech background — use it.)</li>
        </ul>
      </Q>

      {/* ────────── 4. GAP PROBES ────────── */}
      <h2>4. Follow-ups probing your gaps — honest framings</h2>

      <Q n={1} q="The JD says 4+ years of Go. You have about three and a half. Why should we consider you?">
        <p className="text-slate-200">
          &quot;That&apos;s right — three and a half years of Go, all in production at a fintech
          company, on top of about six years total. What I&apos;d point to is the density: I&apos;ve
          owned API design end to end, done the performance work on Postgres and Redis, and used
          Go&apos;s concurrency for a real async workflow. I&apos;d rather you test me on depth than
          count months — happy to go deep on any of it.&quot;
        </p>
        <p className="text-slate-400 text-sm">Don&apos;t apologise, don&apos;t pad with PHP years. Then make sure your concurrency and SQL answers earn it.</p>
      </Q>

      <Q n={2} q="Have you deployed to Kubernetes? How would you get our service running on it?">
        <p className="text-slate-200">
          &quot;Not in production — I&apos;ve deployed containerised services with Docker on Linux.
          I&apos;ve labbed Kubernetes locally. For a Go service I&apos;d make sure it has separate
          liveness and readiness endpoints, shuts down gracefully on SIGTERM, reads config from
          env, and has sensible resource limits; then a Deployment, a Service, and an HPA. The
          cluster-level operations I&apos;d expect to learn from your DevOps team in the first few
          weeks.&quot;
        </p>
      </Q>

      <Q n={3} q="We use gRPC between services. Have you worked with it?">
        <p className="text-slate-200">
          &quot;Not in production — our services talk REST through a gateway. I understand the
          model: Protobuf contracts, generated clients, HTTP/2, deadlines via context, interceptors
          for auth and logging. I&apos;ve built a small server and client to get hands-on. Since
          the contract-first approach is close to how I already think about API design, I&apos;d
          expect to be productive quickly.&quot;
        </p>
      </Q>

      <Q n={4} q="What about MongoDB, or GCP?">
        <p className="text-slate-200">
          &quot;Neither in production. My database depth is PostgreSQL plus Redis — and in fintech
          we deliberately leaned on relational integrity and transactions. I understand when a
          document store fits better. On cloud, I&apos;ve used basic AWS S3 and EC2; GCP I&apos;d
          map across — Cloud SQL, GKE, Cloud Run — and learn on the job. If either is core to
          this team, I&apos;d want to know so I can prioritise it before joining.&quot;
        </p>
      </Q>

      {/* ────────── 5. QUESTIONS TO ASK ────────── */}
      <h2>5. Questions to ask them</h2>
      <ol>
        <li>
          <b>&quot;Is Kubernetes and gRPC already core to the stack, or something you&apos;re moving
          toward?&quot;</b> — tells you whether your gaps are day-one blockers or growth areas.
        </li>
        <li>
          <b>&quot;What does the service landscape look like — how many Go services, and what do they
          talk to (Postgres, MySQL, Mongo, a message broker)?&quot;</b>
        </li>
        <li>
          <b>&quot;Who owns deployments and on-call — developers or a separate DevOps team?&quot;</b>{" "}
          — the JD says &quot;support&quot; Docker/K8s; find out what that means in practice.
        </li>
        <li>
          <b>&quot;What&apos;s the testing culture — coverage expectations, integration tests in CI,
          code review process?&quot;</b>
        </li>
        <li>
          <b>&quot;What would a strong first 90 days look like for this role?&quot;</b>
        </li>
        <li>
          <b>For TalentCafe, separately:</b> contract vs permanent, conversion path to Emerger,
          hybrid days per week in Chennai, and who handles appraisals. Payroll-through-vendor
          setups vary a lot — ask before the offer stage, not after.
        </li>
      </ol>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">If you only have three days</h3>
        <ul>
          <li><b>Day 1:</b> DSA — hash map, sliding window, heap (8–10 problems in Go). Evening: write the worker pool + errgroup from memory.</li>
          <li><b>Day 2:</b> DSA — BFS/DFS, binary search, intervals. Evening: net/http mini-service with middleware + graceful shutdown; errors and interface review.</li>
          <li><b>Day 3:</b> Write out the 40% latency story and WhatsApp story with real numbers. One hour each on K8s (kind) and gRPC (hello-world). Rehearse section 4 out loud.</li>
        </ul>
      </Card>
    </>
  );
}
