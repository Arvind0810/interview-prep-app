// Node, Docker, API, PHP/Laravel and Fintech — diagram sources.
const platform = {
  "node-event-loop-phases": {
    caption: "Node's loop has ordered phases. process.nextTick and promises drain BETWEEN every phase, which is why nextTick can starve the loop.",
    chart: `flowchart TB
  T["timers<br/>setTimeout / setInterval callbacks"] --> P["pending callbacks<br/>deferred system errors"]
  P --> I["idle / prepare — internal"]
  I --> PO["poll<br/>retrieve I/O events, execute their callbacks<br/>— blocks here if nothing else is queued"]
  PO --> C["check<br/>setImmediate callbacks"]
  C --> CL["close callbacks<br/>socket.on('close')"]
  CL --> T
  PO -. "between EVERY phase" .-> MT["process.nextTick queue drains FIRST,<br/>then the promise microtask queue"]
  MT --> WARN["a recursive nextTick starves the loop —<br/>I/O never gets a turn"]
  style WARN fill:#7f1d1d,color:#fecaca`,
  },

  "node-blocking": {
    caption: "One thread runs your JavaScript. A CPU-bound function blocks every other request on that process — the answer is a worker, not more async.",
    svg: `<svg viewBox="0 0 700 210" width="100%" role="img" aria-label="Node single thread blocking" font-family="ui-monospace, Menlo, monospace">
  <text x="14" y="20" fill="#f87171" font-size="12">CPU-bound work on the event loop</text>
  <g stroke="#475569" stroke-width="1">
    <rect x="14" y="30" width="60" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="74" y="30" width="300" height="22" rx="3" fill="#7f1d1d" fill-opacity="0.75"/>
    <rect x="374" y="30" width="60" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="434" y="30" width="60" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
  </g>
  <text x="224" y="46" fill="#fecaca" font-size="11" text-anchor="middle">JSON.parse of 50MB / bcrypt / image resize</text>
  <text x="44" y="46" fill="#0f172a" font-size="9" text-anchor="middle">req</text>
  <text x="224" y="68" fill="#f87171" font-size="10" text-anchor="middle">every other request waits — throughput collapses, health checks time out</text>

  <text x="14" y="104" fill="#34d399" font-size="12">offloaded</text>
  <g stroke="#475569" stroke-width="1">
    <rect x="14" y="114" width="60" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="74" y="114" width="52" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="126" y="114" width="52" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="178" y="114" width="52" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="230" y="114" width="52" height="22" rx="3" fill="#34d399" fill-opacity="0.6"/>
    <rect x="74" y="146" width="300" height="22" rx="3" fill="#312e81" fill-opacity="0.8"/>
  </g>
  <text x="148" y="106" fill="#34d399" font-size="9" text-anchor="middle">requests keep flowing</text>
  <text x="224" y="162" fill="#c7d2fe" font-size="11" text-anchor="middle">worker_threads / child process / job queue</text>
  <text x="446" y="130" fill="#94a3b8" font-size="10">worker_threads for CPU work,</text>
  <text x="446" y="146" fill="#94a3b8" font-size="10">a queue + worker for long jobs,</text>
  <text x="446" y="162" fill="#94a3b8" font-size="10">cluster / PM2 for all cores.</text>
  <text x="350" y="196" fill="#fde68a" font-size="11" text-anchor="middle">async/await does NOT help here — it only yields on I/O, and this work never waits on I/O.</text>
</svg>`,
  },

  "docker-layers": {
    caption: "Each instruction is a cached layer. Copying source before installing dependencies invalidates the install on every code change.",
    svg: `<svg viewBox="0 0 700 246" width="100%" role="img" aria-label="Docker image layer caching" font-family="ui-monospace, Menlo, monospace">
  <text x="170" y="20" fill="#f87171" font-size="12" text-anchor="middle">COPY . . before install</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="30" y="30" width="280" height="28" rx="3" fill="#1e293b"/>
    <rect x="30" y="62" width="280" height="28" rx="3" fill="#7f1d1d" fill-opacity="0.6"/>
    <rect x="30" y="94" width="280" height="28" rx="3" fill="#7f1d1d" fill-opacity="0.6"/>
    <rect x="30" y="126" width="280" height="28" rx="3" fill="#7f1d1d" fill-opacity="0.6"/>
  </g>
  <g font-size="11"><text x="44" y="49" fill="#a7f3d0">FROM node:20        CACHED</text>
  <text x="44" y="81" fill="#fecaca">COPY . .            INVALIDATED</text>
  <text x="44" y="113" fill="#fecaca">RUN npm install     REBUILT — 90s</text>
  <text x="44" y="145" fill="#fecaca">RUN npm run build   REBUILT</text></g>
  <text x="170" y="172" fill="#f87171" font-size="10" text-anchor="middle">one character changed → dependencies reinstalled</text>

  <text x="530" y="20" fill="#34d399" font-size="12" text-anchor="middle">manifest first</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="390" y="30" width="280" height="28" rx="3" fill="#1e293b"/>
    <rect x="390" y="62" width="280" height="28" rx="3" fill="#064e3b" fill-opacity="0.55"/>
    <rect x="390" y="94" width="280" height="28" rx="3" fill="#064e3b" fill-opacity="0.55"/>
    <rect x="390" y="126" width="280" height="28" rx="3" fill="#7f1d1d" fill-opacity="0.6"/>
  </g>
  <g font-size="11"><text x="404" y="49" fill="#a7f3d0">FROM node:20        CACHED</text>
  <text x="404" y="81" fill="#a7f3d0">COPY package*.json  CACHED</text>
  <text x="404" y="113" fill="#a7f3d0">RUN npm ci          CACHED — 0s</text>
  <text x="404" y="145" fill="#fecaca">COPY . .            rebuilt only</text></g>
  <text x="530" y="172" fill="#34d399" font-size="10" text-anchor="middle">dependencies reinstall only when the manifest changes</text>
  <text x="350" y="204" fill="#fde68a" font-size="11" text-anchor="middle">Order layers from least to most frequently changing. A layer invalidates every layer below it.</text>
  <text x="350" y="222" fill="#94a3b8" font-size="10" text-anchor="middle">A deleted file still lives in the layer that added it — so a secret is not</text>
  <text x="350" y="234" fill="#94a3b8" font-size="10" text-anchor="middle">removed by a later RUN rm.</text>
  <text x="350" y="242" fill="#94a3b8" font-size="10" text-anchor="middle">Multi-stage builds fix image size: build in a fat stage, COPY --from into a slim runtime.</text>
</svg>`,
  },

  "container-vs-vm": {
    caption: "Containers share the host kernel and isolate with namespaces and cgroups. A VM ships an entire guest OS, which is where the size and boot time go.",
    svg: `<svg viewBox="0 0 700 220" width="100%" role="img" aria-label="Containers versus virtual machines" font-family="ui-monospace, Menlo, monospace">
  <text x="170" y="18" fill="#22d3ee" font-size="12" text-anchor="middle">Containers</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="20" y="28" width="90" height="52" rx="4" fill="#164e63"/><rect x="125" y="28" width="90" height="52" rx="4" fill="#164e63"/><rect x="230" y="28" width="90" height="52" rx="4" fill="#164e63"/>
    <rect x="20" y="86" width="300" height="26" rx="4" fill="#1e293b"/>
    <rect x="20" y="118" width="300" height="26" rx="4" fill="#0f172a"/>
    <rect x="20" y="150" width="300" height="26" rx="4" fill="#0f172a"/>
  </g>
  <g font-size="10" fill="#e2e8f0" text-anchor="middle">
    <text x="65" y="50">app + libs</text><text x="65" y="66">~50 MB</text>
    <text x="170" y="50">app + libs</text><text x="170" y="66">~50 MB</text>
    <text x="275" y="50">app + libs</text><text x="275" y="66">~50 MB</text>
    <text x="170" y="104">container runtime</text><text x="170" y="136">HOST KERNEL — shared</text><text x="170" y="168">hardware</text>
  </g>
  <text x="170" y="194" fill="#34d399" font-size="10" text-anchor="middle">starts in ms · MBs · namespaces + cgroups</text>

  <text x="530" y="18" fill="#22d3ee" font-size="12" text-anchor="middle">Virtual machines</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="380" y="28" width="90" height="52" rx="4" fill="#312e81" fill-opacity="0.6"/><rect x="485" y="28" width="90" height="52" rx="4" fill="#312e81" fill-opacity="0.6"/><rect x="590" y="28" width="90" height="52" rx="4" fill="#312e81" fill-opacity="0.6"/>
    <rect x="380" y="86" width="300" height="26" rx="4" fill="#1e293b"/>
    <rect x="380" y="118" width="300" height="26" rx="4" fill="#0f172a"/>
    <rect x="380" y="150" width="300" height="26" rx="4" fill="#0f172a"/>
  </g>
  <g font-size="10" fill="#e2e8f0" text-anchor="middle">
    <text x="425" y="46">app</text><text x="425" y="62">GUEST OS</text><text x="425" y="74">~1 GB</text>
    <text x="530" y="46">app</text><text x="530" y="62">GUEST OS</text><text x="530" y="74">~1 GB</text>
    <text x="635" y="46">app</text><text x="635" y="62">GUEST OS</text><text x="635" y="74">~1 GB</text>
    <text x="530" y="104">hypervisor</text><text x="530" y="136">host OS</text><text x="530" y="168">hardware</text>
  </g>
  <text x="530" y="194" fill="#fde68a" font-size="10" text-anchor="middle">starts in seconds · GBs · full hardware isolation</text>
  <text x="350" y="214" fill="#94a3b8" font-size="10" text-anchor="middle">Sharing the kernel is the trade: cheaper and faster, but a weaker isolation boundary than a VM.</text>
</svg>`,
  },

  "http-status-map": {
    caption: "Map errors by category, not by guess. The two most common review findings are 200 on a failure and 500 for bad user input.",
    svg: `<svg viewBox="0 0 700 238" width="100%" role="img" aria-label="HTTP status code selection" font-family="ui-monospace, Menlo, monospace">
  <g stroke="#475569" stroke-width="1.5">
    <rect x="14" y="26" width="160" height="150" rx="6" fill="#064e3b" fill-opacity="0.35"/>
    <rect x="184" y="26" width="240" height="150" rx="6" fill="#422006" fill-opacity="0.45"/>
    <rect x="434" y="26" width="252" height="150" rx="6" fill="#7f1d1d" fill-opacity="0.35"/>
  </g>
  <text x="94" y="46" fill="#a7f3d0" font-size="12" text-anchor="middle">2xx — it worked</text>
  <text x="304" y="46" fill="#fde68a" font-size="12" text-anchor="middle">4xx — the CALLER is wrong</text>
  <text x="560" y="46" fill="#fecaca" font-size="12" text-anchor="middle">5xx — YOU are wrong</text>
  <g font-size="11">
    <text x="28" y="70" fill="#a7f3d0">200 OK</text>
    <text x="28" y="92" fill="#a7f3d0">201 Created — POST</text>
    <text x="28" y="114" fill="#a7f3d0">202 Accepted — async</text>
    <text x="28" y="136" fill="#a7f3d0">204 No Content</text>
    <text x="198" y="70" fill="#fde68a">400 malformed body / bad input</text>
    <text x="198" y="92" fill="#fde68a">401 not authenticated</text>
    <text x="198" y="114" fill="#fde68a">403 authenticated, not allowed</text>
    <text x="198" y="136" fill="#fde68a">404 not found</text>
    <text x="198" y="158" fill="#fde68a">409 conflict — unique violation</text>
    <text x="448" y="70" fill="#fecaca">500 unhandled — a bug</text>
    <text x="448" y="92" fill="#fecaca">502 bad upstream response</text>
    <text x="448" y="114" fill="#fecaca">503 overloaded / shutting down</text>
    <text x="448" y="136" fill="#fecaca">504 upstream timeout</text>
    <text x="448" y="158" fill="#94a3b8">429 rate limited (a 4xx)</text>
  </g>
  <text x="350" y="198" fill="#f87171" font-size="11" text-anchor="middle">Never 200 with {"error": ...} — clients, proxies and monitoring all key off the status line.</text>
  <text x="350" y="216" fill="#94a3b8" font-size="10" text-anchor="middle">4xx means do not retry unchanged; 5xx and 429 mean retry with backoff —</text>
  <text x="350" y="228" fill="#94a3b8" font-size="10" text-anchor="middle">that distinction drives every client's behaviour.</text>
</svg>`,
  },

  "jwt-vs-session": {
    caption: "The real difference is revocation. A session is revoked by deleting a row; a stateless JWT is valid until it expires, which is why lifetimes are short.",
    chart: `sequenceDiagram
  autonumber
  participant C as Client
  participant A as API
  participant S as Store
  C->>A: POST /login
  A->>S: session: write row / JWT: nothing to write
  A-->>C: session id in HttpOnly cookie  OR  signed JWT
  C->>A: request + credential
  A->>A: session: LOOK UP the row<br/>JWT: verify the signature only
  Note over A,S: session = stateful, one DB hit, instantly revocable
  Note over A,S: JWT = stateless, no lookup, CANNOT be revoked early
  Note over A,S: Hence short-lived access token + refresh token,<br/>and a denylist if you truly need instant logout`,
  },

  "laravel-lifecycle": {
    caption: "One entry point, then a middleware pipeline in and out. Understanding the pipeline is what makes middleware ordering and 'before vs after' obvious.",
    chart: `flowchart TB
  R["HTTP request"] --> IDX["public/index.php<br/>the single entry point"]
  IDX --> BOOT["bootstrap: container,<br/>service providers register then boot"]
  BOOT --> KERN["HTTP Kernel"]
  KERN --> GM["global middleware<br/>trim strings, maintenance mode"]
  GM --> ROUTE["router matches the route"]
  ROUTE --> RM["route / group middleware<br/>auth, throttle, verified"]
  RM --> CTRL["controller<br/>— FormRequest validates first"]
  CTRL --> RESP["response travels back OUT<br/>through the same middleware in reverse"]
  RESP --> TERM["terminable middleware<br/>runs after the response is sent"]
  CTRL -. "Eloquent" .-> DB[("database")]`,
  },

  "middleware-pipeline": {
    caption: "Middleware is an onion, not a list: code before $next runs on the way in, code after it runs on the way out — in reverse order.",
    svg: `<svg viewBox="0 0 700 230" width="100%" role="img" aria-label="Middleware onion pipeline" font-family="ui-monospace, Menlo, monospace">
  <g stroke="#475569" stroke-width="1.5" fill="none">
    <rect x="90" y="30" width="520" height="150" rx="8" fill="#0f172a"/>
    <rect x="140" y="52" width="420" height="106" rx="8" fill="#1e293b"/>
    <rect x="190" y="74" width="320" height="62" rx="8" fill="#164e63"/>
  </g>
  <g font-size="11" fill="#94a3b8"><text x="100" y="46">1. auth</text><text x="150" y="68">2. throttle</text><text x="200" y="90">3. logging</text></g>
  <text x="350" y="112" fill="#22d3ee" font-size="12" text-anchor="middle">controller</text>
  <path d="M14 105 L86 105" stroke="#34d399" stroke-width="2" marker-end="url(#mw1)"/>
  <path d="M614 105 L686 105" stroke="#a78bfa" stroke-width="2" marker-end="url(#mw2)"/>
  <defs>
    <marker id="mw1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
    <marker id="mw2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#a78bfa"/></marker>
  </defs>
  <text x="46" y="96" fill="#34d399" font-size="10" text-anchor="middle">request</text>
  <text x="650" y="96" fill="#a78bfa" font-size="10" text-anchor="middle">response</text>
  <text x="350" y="150" fill="#94a3b8" font-size="10" text-anchor="middle">on the way out: 3 → 2 → 1</text>
  <text x="350" y="204" fill="#e2e8f0" font-size="11" text-anchor="middle">Code before $next($request) runs inbound. Code after it runs outbound, in REVERSE order.</text>
  <text x="350" y="222" fill="#94a3b8" font-size="10" text-anchor="middle">So auth runs first on the way in and last on the way out — which is why it can inspect the final response.</text>
</svg>`,
  },

  "double-entry-ledger": {
    caption: "Every movement is two rows summing to zero, and nothing is ever updated. The balance is derived, so it cannot silently disagree with its history.",
    svg: `<svg viewBox="0 0 700 250" width="100%" role="img" aria-label="Double-entry ledger versus a mutable balance" font-family="ui-monospace, Menlo, monospace">
  <text x="160" y="20" fill="#f87171" font-size="12" text-anchor="middle">mutable balance column</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="20" y="30" width="280" height="30" rx="4" fill="#7f1d1d" fill-opacity="0.5"/>
    <rect x="20" y="66" width="280" height="30" rx="4" fill="#7f1d1d" fill-opacity="0.5"/>
  </g>
  <text x="160" y="50" fill="#fecaca" font-size="11" text-anchor="middle">UPDATE users SET balance = 900</text>
  <text x="160" y="86" fill="#fecaca" font-size="11" text-anchor="middle">UPDATE users SET balance = 700</text>
  <text x="160" y="118" fill="#f87171" font-size="10" text-anchor="middle">the previous value is GONE.</text>
  <text x="160" y="134" fill="#f87171" font-size="10" text-anchor="middle">A double-credit is undetectable</text>
  <text x="160" y="150" fill="#f87171" font-size="10" text-anchor="middle">and unrecoverable.</text>

  <text x="500" y="20" fill="#34d399" font-size="12" text-anchor="middle">append-only double-entry ledger</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="340" y="30" width="340" height="24" rx="3" fill="#0f172a"/>
    <rect x="340" y="56" width="340" height="24" rx="3" fill="#064e3b" fill-opacity="0.45"/>
    <rect x="340" y="82" width="340" height="24" rx="3" fill="#064e3b" fill-opacity="0.45"/>
    <rect x="340" y="108" width="340" height="24" rx="3" fill="#064e3b" fill-opacity="0.45"/>
    <rect x="340" y="134" width="340" height="24" rx="3" fill="#064e3b" fill-opacity="0.45"/>
  </g>
  <g font-size="10">
    <text x="352" y="46" fill="#22d3ee">entry     account        debit    credit</text>
    <text x="352" y="72" fill="#a7f3d0">e1        user:42                 1000</text>
    <text x="352" y="98" fill="#a7f3d0">e1        revenue        1000</text>
    <text x="352" y="124" fill="#a7f3d0">e2        user:42        300</text>
    <text x="352" y="150" fill="#a7f3d0">e2        payouts                 300</text>
  </g>
  <text x="510" y="172" fill="#34d399" font-size="10" text-anchor="middle">each entry sums to zero — an unbalanced row is a detectable bug</text>
  <text x="510" y="188" fill="#e2e8f0" font-size="11" text-anchor="middle">balance = SUM(credit) - SUM(debit) = 700</text>
  <rect x="20" y="204" width="660" height="40" rx="5" fill="#422006" fill-opacity="0.5" stroke="#a16207"/>
  <text x="350" y="221" fill="#fde68a" font-size="11" text-anchor="middle">A retry writes the same idempotency key twice — the unique index rejects it.</text>
  <text x="350" y="237" fill="#fde68a" font-size="11" text-anchor="middle">A correction is a new reversing entry, never an UPDATE. History is the audit trail.</text>
</svg>`,
  },

  "redis-structures": {
    caption: "Picking the right structure is most of Redis. Each one exists because a specific access pattern is O(1) or O(log n) on it.",
    svg: `<svg viewBox="0 0 700 240" width="100%" role="img" aria-label="Redis data structures and their uses" font-family="ui-monospace, Menlo, monospace">
  <g stroke="#475569" stroke-width="1.5" fill="#1e293b">
    <rect x="14" y="26" width="216" height="62" rx="5"/><rect x="242" y="26" width="216" height="62" rx="5"/><rect x="470" y="26" width="216" height="62" rx="5"/>
    <rect x="14" y="98" width="216" height="62" rx="5"/><rect x="242" y="98" width="216" height="62" rx="5"/><rect x="470" y="98" width="216" height="62" rx="5"/>
  </g>
  <g font-size="12" fill="#22d3ee">
    <text x="28" y="46">String</text><text x="256" y="46">Hash</text><text x="484" y="46">List</text>
    <text x="28" y="118">Set</text><text x="256" y="118">Sorted Set</text><text x="484" y="118">Stream</text>
  </g>
  <g font-size="10" fill="#e2e8f0">
    <text x="28" y="64">cache, counters, flags</text><text x="28" y="80" fill="#94a3b8">INCR is atomic — rate limits</text>
    <text x="256" y="64">an object by field</text><text x="256" y="80" fill="#94a3b8">update one field, no re-serialise</text>
    <text x="484" y="64">queue / stack</text><text x="484" y="80" fill="#94a3b8">LPUSH + BRPOP = blocking queue</text>
    <text x="28" y="136">unique membership</text><text x="28" y="152" fill="#94a3b8">SINTER for mutual follows</text>
    <text x="256" y="136">LEADERBOARDS</text><text x="256" y="152" fill="#94a3b8">ZADD / ZREVRANGE — O(log n) rank</text>
    <text x="484" y="136">append-only log</text><text x="484" y="152" fill="#94a3b8">consumer groups, replayable</text>
  </g>
  <text x="350" y="188" fill="#fde68a" font-size="11" text-anchor="middle">Redis runs commands on one thread — every op is atomic, and one O(n) call blocks all.</text>
  <text x="350" y="208" fill="#f87171" font-size="11" text-anchor="middle">Never run KEYS * in production. Use SCAN — it is cursor-based and does not block.</text>
  <text x="350" y="228" fill="#94a3b8" font-size="10" text-anchor="middle">Same rule for large DEL, FLUSHALL, and any O(n) range over a huge collection.</text>
</svg>`,
  },
};

export default platform;
