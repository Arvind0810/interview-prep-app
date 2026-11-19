import CompanyBrief from "@/components/CompanyBrief";
import { Card, Pill } from "@/components/Card";

export const metadata = { title: "Capgemini · Connectivity & Network Engineer (Go) | Interview Prep" };

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

export default function CapgeminiConnectivityGolangPage() {
  return (
    <>
      <h1>Capgemini: Connectivity &amp; Network Engineer (Golang L1)</h1>
      <CompanyBrief slug="capgemini-connectivity-golang" />
      <p>
        <strong>Round:</strong> L1 Discussion, &quot;Golang Developer&quot;, one interviewer, 30
        minutes on Microsoft Teams &nbsp;·&nbsp; <strong>When:</strong> Fri 20 Nov 2026, 4:00 to
        4:30 PM IST<br />
        <strong>Position on the invite:</strong> Connectivity &amp; Network Engineer &nbsp;·&nbsp;{" "}
        <strong>JD:</strong> not shared, so this guide covers both readings of the role
      </p>

      {/* ────────── HONEST POSITIONING ────────── */}
      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Read this first: the title mismatch</h3>
        <p>
          The invite names the position <b>Connectivity &amp; Network Engineer</b>, but the round
          is titled <b>L1 Discussion: Golang Developer</b>. At Capgemini, &quot;Connectivity&quot;
          is usually a practice name: teams that build software for telecom and networking
          clients (network automation, 5G and edge platforms, connected devices). In those teams,
          a &quot;network engineer&quot; who writes Go is a <b>software engineer building networked
          systems</b>, not someone configuring routers. Treat that as the likely reading, but
          confirm it in the first two minutes.
        </p>
        <ol>
          <li>
            <b>Expect Go first.</b> The round title is the best signal you have. Go fundamentals
            and concurrency are the core of a 30-minute L1.
          </li>
          <li>
            <b>Expect networking as the second half.</b> TCP vs UDP, the handshake, what happens
            when you hit a URL, DNS, TLS, HTTP/2 and gRPC, timeouts and retries. Answer these
            <i> through Go</i>: <code>net.Dial</code>, <code>http.Client</code>, deadlines,
            connection reuse.
          </li>
          <li>
            <b>Be honest about classic network engineering.</b> If they ask about BGP, OSPF,
            VLAN configuration or Cisco CLI, say you know the concepts and have not run them in
            production. Offer what you <i>have</i> done: services that talk over the network,
            and the timeouts, retries and caching that keep them reliable.
          </li>
          <li>
            <b>Clarify the role early.</b> Ask: &quot;The invite says Connectivity &amp; Network
            Engineer and the round says Golang Developer. Is this mainly Go service development,
            or closer to network automation?&quot; That question sounds senior, not lost.
          </li>
        </ol>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">Your opening for this round (about 60 seconds)</h3>
        <p className="text-slate-200">
          &quot;I&apos;m a backend engineer with about six years of experience, and for the last
          three and a half I&apos;ve worked mainly in Go, deployed through NeoSOFT to 1Finance, a
          fintech platform. I build Go microservices on Fiber behind an API gateway, with
          PostgreSQL and Redis. I cut API latency by around 40% with query rewrites and a Redis
          cache layer, and I&apos;ve contributed to a Kafka-based platform with a transactional
          outbox and idempotent consumers. A lot of my work is about how services talk to each
          other over the network: timeouts, retries, caching and making failures safe to retry.
          Outside work I&apos;ve written Go networking tools, like a concurrent file downloader
          and a concurrent web scraper. That&apos;s why a Go role in a connectivity team
          interests me.&quot;
        </p>
        <p className="text-slate-400 text-sm">
          Only mention the side projects if you can open the code and explain it. Say
          &quot;contributed to&quot; for the Kafka platform, not &quot;designed&quot;.
        </p>
      </Card>

      {/* ────────── 1. SHAPE OF THE 30 MINUTES ────────── */}
      <h2>1. How the 30 minutes will probably go</h2>
      <table>
        <thead><tr><th>Minutes</th><th>What happens</th><th>Your goal</th></tr></thead>
        <tbody>
          <tr><td>0–3</td><td>Introductions, &quot;tell me about yourself&quot;</td><td>The 60-second opening above, then stop talking</td></tr>
          <tr><td>3–8</td><td>Project deep-dive: &quot;walk me through a recent service&quot;</td><td>One project, with a diagram in words: gateway → service → Postgres/Redis</td></tr>
          <tr><td>8–22</td><td>Go and networking questions, maybe a small live-coding task</td><td>Short, correct answers; think aloud while coding</td></tr>
          <tr><td>22–27</td><td>Role fit, notice period, location</td><td>Have the answers ready (section 6)</td></tr>
          <tr><td>27–30</td><td>&quot;Any questions for me?&quot;</td><td>Two questions from section 7</td></tr>
        </tbody>
      </table>

      {/* ────────── 2. SKILL RATINGS ────────── */}
      <h2>2. Skill checklist: blunt ratings</h2>
      <table>
        <thead><tr><th>Skill</th><th>Rating</th><th>Evidence or gap</th></tr></thead>
        <tbody>
          <Row skill="Go fundamentals (types, interfaces, errors, slices, maps)" rating="Strong" evidence="3.5 years of production Go services" />
          <Row skill="Go concurrency (goroutines, channels, select, sync, context)" rating="Adequate" evidence="Used daily, but be ready to write a worker pool and explain races and leaks without notes" />
          <Row skill="HTTP APIs and microservices" rating="Strong" evidence="Fiber services behind a gateway, REST design, auth tiers, versioned APIs" />
          <Row skill="TCP/IP model, TCP vs UDP, handshake" rating="Needs Review" evidence="Known conceptually; rehearse the handshake, TIME_WAIT and when to pick UDP" />
          <Row skill="DNS, TLS, HTTP/1.1 vs HTTP/2, gRPC" rating="Needs Review" evidence="Used indirectly; rehearse the TLS handshake steps and why gRPC needs HTTP/2" />
          <Row skill="Go net and net/http internals (Dial, deadlines, Transport)" rating="Needs Review" evidence="Likely the deciding topic for a connectivity team; see questions 9–12" />
          <Row skill="Reliability patterns (timeouts, retries, backoff, idempotency)" rating="Strong" evidence="Outbox, idempotency keys, Redis caching, the latency work" />
          <Row skill="Linux network debugging (curl, dig, ss/netstat, tcpdump)" rating="Adequate" evidence="Know what each tool answers; see question 15" />
          <Row skill="Routing protocols, VLANs, device configuration" rating="Needs Review" evidence="Not your background. Concepts only, said honestly" />
        </tbody>
      </table>

      {/* ────────── 3. CRASH PLAN ────────── */}
      <h2>3. Crash plan: tonight and tomorrow</h2>
      <p>You have one evening and a morning. Do these in order and stop when time runs out.</p>
      <table>
        <thead><tr><th>Block</th><th>Time</th><th>What to do</th></tr></thead>
        <tbody>
          <tr><td>Tonight 1</td><td>45 min</td><td>Write the worker pool (Q3) and the TCP echo server (Q9) from memory in a scratch file. Run them. Run <code>go test -race</code> on the pool.</td></tr>
          <tr><td>Tonight 2</td><td>45 min</td><td>Say the answers to Q7, Q8, Q10 and Q11 out loud: TCP handshake, URL-to-page, TLS, timeouts. Out loud matters; reading is not practice.</td></tr>
          <tr><td>Tonight 3</td><td>30 min</td><td>Pick your one deep-dive project and rehearse it in 3 minutes: the problem, your design, one trade-off, the result.</td></tr>
          <tr><td>Tonight 4</td><td>15 min</td><td>Read section 5 (gap framings) and section 6 (logistics answers). Decide your notice-period and location answers.</td></tr>
          <tr><td>Tomorrow AM</td><td>45 min</td><td>Skim all the questions on this page. Run the AI mock interviewer once on a technical round.</td></tr>
          <tr><td>Tomorrow 3:30</td><td>15 min</td><td>Test Teams audio and camera, close other apps, keep water and a notepad ready.</td></tr>
        </tbody>
      </table>

      {/* ────────── 4. QUESTIONS ────────── */}
      <h2>4. Likely technical questions</h2>

      <h3>Go</h3>
      <Q n={1} q="Goroutines vs OS threads: why are goroutines cheap?">
        <ul>
          <li>A goroutine starts with a small stack (a few KB) that grows and shrinks; an OS thread reserves around 1 MB or more.</li>
          <li>The Go runtime schedules goroutines onto a few OS threads (the G-M-P model). A blocked goroutine parks without blocking its thread, so 100k goroutines is normal.</li>
          <li>Network I/O uses the netpoller (epoll on Linux): a goroutine waiting on a socket is parked, not holding a thread. This is why Go suits connection-heavy servers.</li>
        </ul>
      </Q>
      <Q n={2} q="Buffered vs unbuffered channels, and what select does.">
        <ul>
          <li>Unbuffered: send blocks until a receiver takes it. It is a handoff and a synchronisation point.</li>
          <li>Buffered: send blocks only when the buffer is full. Use it to absorb bursts, not to hide a slow consumer.</li>
          <li><code>select</code> waits on several channel operations and runs whichever is ready first. Add <code>case &lt;-ctx.Done()</code> or <code>time.After</code> for cancellation and timeouts, and <code>default</code> for a non-blocking attempt.</li>
          <li>Closing: only the sender closes. Receiving from a closed channel returns the zero value with <code>ok == false</code>. Sending on a closed channel panics.</li>
        </ul>
      </Q>
      <Q n={3} q="Write a worker pool with at most N goroutines that stops on cancellation.">
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
        <ul>
          <li>The producer closes <code>jobs</code>; workers exit when it drains or the context is cancelled.</li>
          <li>One goroutine closes <code>out</code> after every worker is done, so the consumer&apos;s <code>range</code> ends.</li>
          <li>For network-bound work (HTTP calls, dialling devices), N can be well above the CPU count; for CPU-bound work, keep it near <code>GOMAXPROCS</code>.</li>
          <li>Mention <code>errgroup.WithContext</code> as the production version: it cancels the rest when one task fails.</li>
        </ul>
      </Q>
      <Q n={4} q="How do you use context, and what goes wrong without it?">
        <ul>
          <li><code>context.Context</code> carries cancellation, deadlines and request-scoped values down the call chain. Pass it as the first argument; never store it in a struct.</li>
          <li>Every outbound call (DB query, HTTP request, dial) should take the context, so a cancelled request stops its downstream work.</li>
          <li>Without it you get goroutine leaks: work keeps running for a client that has already gone away.</li>
          <li>Always <code>defer cancel()</code> after <code>WithTimeout</code> or <code>WithCancel</code>, or the timer leaks until it fires.</li>
        </ul>
      </Q>
      <Q n={5} q="What is a data race, how do you find one, and how do you fix it?">
        <ul>
          <li>Two goroutines access the same memory at the same time, and at least one writes, with no synchronisation.</li>
          <li>Find it with <code>go test -race</code> or <code>go run -race</code>. Run it in CI.</li>
          <li>Fix it with a <code>sync.Mutex</code> or <code>RWMutex</code> around the shared state, <code>sync/atomic</code> for counters, or by giving the state a single owner goroutine that others talk to over channels.</li>
          <li>A classic example: concurrent writes to a map are a fatal runtime error. Use a mutex, or <code>sync.Map</code> for read-heavy caches.</li>
        </ul>
      </Q>
      <Q n={6} q="Interfaces and error handling: how do you design them in Go?">
        <ul>
          <li>Interfaces are satisfied implicitly. Keep them small and define them where they are <i>used</i>, not where they are implemented (for example a <code>Store</code> interface in the service package, so tests can fake it).</li>
          <li>Errors are values. Wrap with context: <code>fmt.Errorf(&quot;dial %s: %w&quot;, addr, err)</code>. Check with <code>errors.Is</code> for sentinels and <code>errors.As</code> for types.</li>
          <li>For network code: <code>errors.Is(err, context.DeadlineExceeded)</code>, or check <code>net.Error</code>&apos;s <code>Timeout()</code> to decide whether a retry makes sense.</li>
          <li>Gotcha: an interface holding a nil pointer is not equal to nil. Return a literal <code>nil</code> for &quot;no error&quot;.</li>
        </ul>
      </Q>

      <h3>Networking</h3>
      <Q n={7} q="TCP vs UDP. Walk me through the TCP handshake and connection close.">
        <ul>
          <li><b>TCP:</b> connection-oriented, reliable, ordered, with flow control and congestion control. Use it for HTTP, databases, gRPC.</li>
          <li><b>UDP:</b> connectionless datagrams with no delivery or order guarantee, but low overhead. Use it for DNS, video and voice, gaming, telemetry, and QUIC (HTTP/3 runs over UDP).</li>
          <li><b>Handshake:</b> client SYN → server SYN-ACK → client ACK. Sequence numbers are agreed here. That is one round trip before any data, which is why connection reuse matters.</li>
          <li><b>Close:</b> FIN/ACK in each direction (four segments). The side that closes first sits in <b>TIME_WAIT</b> for 2×MSL so late packets don&apos;t corrupt a new connection. Too many short-lived outbound connections can exhaust ephemeral ports; the fix is keep-alive and connection pooling.</li>
        </ul>
      </Q>
      <Q n={8} q="What happens when you type a URL in the browser and press Enter?">
        <ol>
          <li><b>DNS:</b> browser cache → OS resolver → recursive resolver → root → TLD → authoritative server, which returns an A/AAAA record (or a CNAME to follow).</li>
          <li><b>TCP:</b> three-way handshake to the IP on port 443.</li>
          <li><b>TLS:</b> negotiate the version and cipher, verify the server certificate chain, agree session keys (TLS 1.3 needs one round trip).</li>
          <li><b>HTTP:</b> send the request (HTTP/2 multiplexes many requests on one connection). Often through a CDN or load balancer first.</li>
          <li><b>Server side:</b> load balancer → API gateway → service → cache or database → response.</li>
          <li><b>Browser:</b> parse HTML, fetch CSS/JS/images (reusing the connection), render.</li>
        </ol>
        <p>Tie it to your work: &quot;In our stack, the request hits the gateway on one port, which routes to the right Go service; that service checks Redis before Postgres.&quot;</p>
      </Q>
      <Q n={9} q="Write a TCP server in Go that handles many clients.">
        <pre><code>{`func main() {
    ln, err := net.Listen("tcp", ":9000")
    if err != nil { log.Fatal(err) }
    defer ln.Close()
    for {
        conn, err := ln.Accept()
        if err != nil { log.Println("accept:", err); continue }
        go handle(conn) // one goroutine per connection
    }
}

func handle(conn net.Conn) {
    defer conn.Close()
    scanner := bufio.NewScanner(conn)
    for {
        // Without a deadline, a silent client holds this goroutine forever.
        conn.SetReadDeadline(time.Now().Add(30 * time.Second))
        if !scanner.Scan() { return } // EOF, timeout or error
        fmt.Fprintf(conn, "echo: %s\\n", scanner.Text())
    }
}`}</code></pre>
        <ul>
          <li>Goroutine per connection is idiomatic because the netpoller parks idle connections cheaply (Q1).</li>
          <li>Talking points: read deadlines, message framing (TCP is a byte stream, so you need delimiters or length prefixes), graceful shutdown (stop accepting, then let active connections finish), and limiting concurrent connections with a semaphore.</li>
        </ul>
      </Q>
      <Q n={10} q="Explain the TLS handshake and what the certificate proves.">
        <ul>
          <li>Client Hello: supported versions, cipher suites and a key share. Server Hello: the chosen cipher, its key share, then its <b>certificate</b> and a signature proving it holds the private key.</li>
          <li>The client checks the certificate chain up to a trusted CA, plus the hostname and expiry. Both sides derive symmetric session keys (ECDHE), and application data is then encrypted with them.</li>
          <li>TLS 1.3: one round trip, forward secrecy by default, insecure ciphers removed.</li>
          <li><b>mTLS:</b> the client also presents a certificate. It is common for service-to-service and device-to-cloud traffic, which is very relevant in a connectivity or IoT team.</li>
          <li>In Go: <code>tls.Config</code> with <code>MinVersion: tls.VersionTLS12</code>, a custom <code>RootCAs</code> for internal CAs, and never <code>InsecureSkipVerify</code> in production.</li>
        </ul>
      </Q>
      <Q n={11} q="How do you set timeouts on Go HTTP clients and servers?">
        <ul>
          <li><b>Never use <code>http.DefaultClient</code> for production calls:</b> it has no timeout, so a hung server hangs your goroutine forever.</li>
          <li>Client: <code>&amp;http.Client&#123;Timeout: 5 * time.Second&#125;</code> for the whole request, plus a per-request <code>context.WithTimeout</code>. For finer control, the <code>Transport</code> has <code>DialContext</code> timeouts, <code>TLSHandshakeTimeout</code> and <code>ResponseHeaderTimeout</code>.</li>
          <li><b>Reuse one client:</b> its Transport keeps a keep-alive connection pool (<code>MaxIdleConnsPerHost</code>). Always <code>defer resp.Body.Close()</code> and read the body to the end, or the connection can&apos;t be reused.</li>
          <li>Server: set <code>ReadHeaderTimeout</code>, <code>ReadTimeout</code>, <code>WriteTimeout</code> and <code>IdleTimeout</code> on <code>http.Server</code>. The zero values mean no timeout, which leaves you open to slowloris-style attacks.</li>
        </ul>
      </Q>
      <Q n={12} q="A downstream service is flaky. How do you make calls to it reliable?">
        <ul>
          <li><b>Timeouts</b> on every call (Q11), shorter than your own caller&apos;s deadline.</li>
          <li><b>Retry only what is safe:</b> idempotent requests (GET, PUT, or POST with an idempotency key), and only on retryable failures (timeouts, connection resets, 502/503/504), never on 4xx.</li>
          <li><b>Exponential backoff with jitter</b> and a cap, so retries don&apos;t become a thundering herd.</li>
          <li><b>Circuit breaker:</b> after repeated failures, fail fast for a while instead of piling up waiting goroutines.</li>
          <li><b>Fallbacks:</b> serve from cache (your Redis layer) or degrade the feature.</li>
          <li>Your evidence: the outbox and idempotency keys on the Kafka platform make redelivery safe, and that is the same principle.</li>
        </ul>
      </Q>
      <Q n={13} q="REST vs gRPC: when would you choose gRPC?">
        <ul>
          <li>gRPC uses Protocol Buffers over <b>HTTP/2</b>: a binary format, a strict contract from the <code>.proto</code> file, generated clients, and multiplexed streams on one connection.</li>
          <li>It supports streaming (server, client, bidirectional), which suits telemetry, device updates and long-lived connections.</li>
          <li>Choose it for internal service-to-service calls with high volume or streaming. Keep REST/JSON for browsers and public APIs; grpc-gateway can expose both.</li>
          <li>Honest line: &quot;Our services use REST; I know gRPC&apos;s model and would pick it for internal streaming.&quot; Don&apos;t claim production gRPC.</li>
        </ul>
      </Q>
      <Q n={14} q="L4 vs L7 load balancing, NAT, and subnets in one minute.">
        <ul>
          <li><b>L4</b> balances TCP/UDP connections by IP and port; fast and protocol-agnostic. <b>L7</b> understands HTTP: routing by path or header, TLS termination, retries. An API gateway is an L7 component.</li>
          <li><b>NAT:</b> maps private addresses to a public one. Many clients share one public IP, which is why servers behind NAT need port forwarding or an outbound connection to receive traffic. This matters for devices in the field.</li>
          <li><b>CIDR:</b> <code>10.0.0.0/24</code> means the first 24 bits are the network, giving 256 addresses (254 usable hosts). <code>/16</code> gives 65,536. Private ranges are 10/8, 172.16/12 and 192.168/16.</li>
          <li><b>Layers:</b> application (HTTP, DNS) → transport (TCP, UDP) → network (IP, routing) → link (Ethernet, MAC, ARP).</li>
        </ul>
      </Q>
      <Q n={15} q="A service can't reach another service. How do you debug it?">
        <ol>
          <li><b>Name resolution:</b> <code>dig</code> or <code>nslookup</code>. Does the name resolve to the address you expect?</li>
          <li><b>Reachability:</b> <code>nc -vz host port</code> or <code>telnet</code>. &quot;Connection refused&quot; means the host answered but nothing listens on that port. A <b>timeout</b> usually means a firewall, security group or routing drop.</li>
          <li><b>Listening side:</b> <code>ss -tlnp</code> (or <code>netstat</code>). Is the process bound to <code>0.0.0.0</code> or only <code>127.0.0.1</code>?</li>
          <li><b>Protocol:</b> <code>curl -v</code> shows DNS, connect, the TLS handshake and headers, so certificate and hostname errors become visible.</li>
          <li><b>Packets:</b> <code>tcpdump -i any port 443</code>. SYNs with no SYN-ACK point to a network drop.</li>
          <li><b>Application:</b> logs and metrics, timeout settings, and connection-pool exhaustion.</li>
        </ol>
      </Q>
      <Q n={16} q="How would you use Go for network automation?">
        <ul>
          <li>Go is common here: a single static binary, easy concurrency for talking to hundreds of devices at once, and strong <code>net</code> and <code>crypto</code> libraries.</li>
          <li>Typical shape: a worker pool (Q3) that connects to many devices over SSH (<code>golang.org/x/crypto/ssh</code>), NETCONF or gNMI/gRPC, collects state or pushes config with a per-device timeout, and reports partial failures rather than aborting.</li>
          <li>Honest line: &quot;I haven&apos;t automated network devices, but the pattern is the one I use for service calls: bounded concurrency, deadlines, retries and idempotent changes.&quot;</li>
        </ul>
      </Q>

      {/* ────────── 5. GAP FRAMINGS ────────── */}
      <h2>5. Follow-ups that probe your gaps: honest framings</h2>
      <Card>
        <p><b>&quot;Have you worked as a network engineer?&quot;</b></p>
        <p className="text-slate-300">
          &quot;Not in the sense of configuring routers and switches. I&apos;m a software engineer
          whose services live on the network, so I deal with timeouts, retries, connection
          reuse, TLS and debugging connectivity between services. If the role leans toward
          network automation in Go, I&apos;d be building on that directly.&quot;
        </p>
        <p><b>&quot;Do you know BGP, OSPF or VLANs?&quot;</b></p>
        <p className="text-slate-300">
          &quot;At the concept level: BGP exchanges routes between autonomous systems, OSPF is a
          link-state protocol inside one network, and VLANs split one physical network into
          separate broadcast domains. I haven&apos;t configured them in production.&quot; Then
          stop. Don&apos;t go deeper than you know.
        </p>
        <p><b>&quot;Have you used gRPC, Kubernetes or a cloud provider in production?&quot;</b></p>
        <p className="text-slate-300">
          Say exactly what is true: what you have used, what you have only labbed, and what
          you would need to learn. A precise &quot;not yet&quot; beats a vague &quot;yes&quot; in an
          L1.
        </p>
      </Card>

      {/* ────────── 6. LOGISTICS ────────── */}
      <h2>6. Fit and logistics answers to decide tonight</h2>
      <ul>
        <li><b>Why Capgemini?</b> Scale and variety of client work, and a Go role where networking is the core problem, not a side detail.</li>
        <li><b>Why move now?</b> Keep it forward-looking: you want deeper systems and networking work in Go.</li>
        <li><b>Notice period</b> and earliest joining date: give the exact number.</li>
        <li><b>Location and work mode:</b> know which Capgemini offices you can work from and how many office days you accept.</li>
        <li><b>Expected CTC:</b> usually the recruiter&apos;s question, not the L1 interviewer&apos;s. If asked, give a researched range.</li>
      </ul>

      {/* ────────── 7. QUESTIONS TO ASK ────────── */}
      <h2>7. Questions to ask the interviewer</h2>
      <ol>
        <li>&quot;The invite says Connectivity &amp; Network Engineer and the round says Golang Developer. What does the day-to-day split look like?&quot; (Ask early if it wasn&apos;t already clear.)</li>
        <li>&quot;Is the team building services for a telecom or networking client, or internal platforms?&quot;</li>
        <li>&quot;What do the Go services talk to: other services over REST or gRPC, network devices, or message queues?&quot;</li>
        <li>&quot;What are the next rounds after this one?&quot;</li>
      </ol>

      {/* ────────── LAST HOUR ────────── */}
      <Card className="border-emerald-800">
        <h3 className="m-0 text-emerald-400">Last 15 minutes before 4:00 PM</h3>
        <ul>
          <li>Teams is tested: camera, microphone, screen sharing. Have a code editor open for live coding.</li>
          <li>Notifications off, phone silent, water within reach.</li>
          <li>Three phrases ready: the 60-second opening, the role-clarifying question, and &quot;let me think out loud for a second&quot;.</li>
          <li>For live coding, say the plan before typing: inputs, outputs, edge cases, then the code.</li>
        </ul>
      </Card>
    </>
  );
}
