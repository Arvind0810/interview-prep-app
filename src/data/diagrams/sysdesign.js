// System design — diagram sources.
const sysdesign = {
  "latency-numbers": {
    caption: "Orders of magnitude are what matter. A cross-continent round trip costs as much as 1,500 SSD reads — which is why chatty APIs and N+1 queries hurt.",
    svg: `<svg viewBox="0 0 700 268" width="100%" role="img" aria-label="Latency numbers every programmer should know" font-family="ui-monospace, Menlo, monospace">
  <text x="14" y="18" fill="#22d3ee" font-size="12">Latency numbers — log scale, each gridline is 10x</text>
  <g stroke="#334155" stroke-width="1">
    <path d="M200 28 L200 240"/><path d="M290 28 L290 240"/><path d="M380 28 L380 240"/><path d="M470 28 L470 240"/><path d="M560 28 L560 240"/><path d="M650 28 L650 240"/>
  </g>
  <g font-size="9" fill="#64748b" text-anchor="middle">
    <text x="200" y="252">1ns</text><text x="290" y="252">100ns</text><text x="380" y="252">10us</text><text x="470" y="252">1ms</text><text x="560" y="252">100ms</text><text x="650" y="252">10s</text>
  </g>
  <g font-size="11">
    <text x="14" y="46" fill="#e2e8f0">L1 cache ref</text><rect x="200" y="36" width="18" height="13" fill="#34d399"/><text x="226" y="46" fill="#94a3b8">0.5 ns</text>
    <text x="14" y="70" fill="#e2e8f0">Branch mispredict</text><rect x="200" y="60" width="32" height="13" fill="#34d399"/><text x="240" y="70" fill="#94a3b8">5 ns</text>
    <text x="14" y="94" fill="#e2e8f0">Mutex lock/unlock</text><rect x="200" y="84" width="52" height="13" fill="#34d399"/><text x="260" y="94" fill="#94a3b8">25 ns</text>
    <text x="14" y="118" fill="#e2e8f0">Main memory ref</text><rect x="200" y="108" width="62" height="13" fill="#34d399"/><text x="270" y="118" fill="#94a3b8">100 ns</text>
    <text x="14" y="142" fill="#e2e8f0">SSD random read</text><rect x="200" y="132" width="178" height="13" fill="#22d3ee"/><text x="386" y="142" fill="#94a3b8">150 us</text>
    <text x="14" y="166" fill="#e2e8f0">Read 1MB from SSD</text><rect x="200" y="156" width="212" height="13" fill="#22d3ee"/><text x="420" y="166" fill="#94a3b8">1 ms</text>
    <text x="14" y="190" fill="#e2e8f0">Disk seek</text><rect x="200" y="180" width="290" height="13" fill="#fde68a"/><text x="498" y="190" fill="#94a3b8">10 ms</text>
    <text x="14" y="214" fill="#e2e8f0">Same-datacenter RTT</text><rect x="200" y="204" width="196" height="13" fill="#22d3ee"/><text x="404" y="214" fill="#94a3b8">0.5 ms</text>
    <text x="14" y="238" fill="#e2e8f0">CA to Netherlands RTT</text><rect x="200" y="228" width="352" height="13" fill="#f87171"/><text x="560" y="238" fill="#94a3b8">150 ms</text>
  </g>
</svg>`,
  },
  "caching-strategies": {
    caption: "Who writes the cache, and when. Cache-aside is the default; write-through trades write latency for read freshness.",
    chart: `flowchart TB
  subgraph CA["Cache-aside — lazy loading"]
    A1["read: miss → load from DB → populate"]
    A2["write: update DB, INVALIDATE the key"]
    A3["default choice; first read is always a miss"]
  end
  subgraph WT["Write-through"]
    B1["write: cache AND DB together"]
    B2["cache never stale; writes are slower"]
  end
  subgraph WB["Write-behind"]
    C1["write: cache now, DB asynchronously"]
    C2["fastest writes; data loss if the cache dies"]
  end
  CA --> INV["Invalidate rather than update on write —<br/>two concurrent writers updating a cache<br/>can leave it holding the older value"]`,
  },

  "cache-stampede": {
    caption: "A hot key expiring sends every concurrent request to the database at once. Jitter spreads it; a lock lets one rebuild.",
    chart: `flowchart TB
  EXP["hot key TTL expires"] --> ALL["1,000 concurrent requests<br/>all miss at the same instant"]
  ALL --> DB["all 1,000 hit the database"]
  DB --> DOWN["DB saturates — the cache<br/>was the only thing protecting it"]
  DOWN --> FIX["Fixes"]
  FIX --> F1["TTL jitter — randomise expiry<br/>so keys do not expire together"]
  FIX --> F2["single-flight lock — one request<br/>rebuilds, the rest wait or serve stale"]
  FIX --> F3["refresh ahead — rebuild<br/>just before expiry"]
  style DOWN fill:#7f1d1d,color:#fecaca`,
  },

  "db-scaling": {
    caption: "Scale reads with replicas, writes with sharding. Reach for the cheap option first — most systems never need to shard.",
    chart: `flowchart TB
  S["single primary" ] --> R1["1. Indexes + query tuning<br/>— cheapest, do this first"]
  R1 --> R2["2. Read replicas<br/>scales READS only<br/>→ replication lag"]
  R2 --> R3["3. Vertical scale<br/>simple, has a ceiling"]
  R3 --> R4["4. Partitioning<br/>one DB, many tables by range/list"]
  R4 --> R5["5. Sharding<br/>scales WRITES<br/>→ cross-shard joins and<br/>transactions become your problem"]
  R5 --> KEY["Shard key choice is permanent<br/>in practice — pick one that spreads<br/>load and keeps related rows together"]
  style R5 fill:#422006,color:#fde68a`,
  },

  "replica-lag": {
    caption: "Read-your-writes breaks the moment you send reads to a replica. Route the read after a write back to the primary.",
    chart: `sequenceDiagram
  autonumber
  participant U as User
  participant P as Primary
  participant R as Replica
  U->>P: POST /profile — write committed
  P-->>R: replicating... (10-500ms)
  U->>R: GET /profile — immediately after
  R-->>U: the OLD value
  Note over U,R: user sees their edit vanish
  Note over U,P: Fixes: read from primary for N seconds<br/>after a write, pin the session,<br/>or return the written value directly`,
  },

  "consistent-hashing": {
    caption: "Plain modulo remaps almost every key when the node count changes. A hash ring moves only the keys owned by the node that left.",
    svg: `<svg viewBox="0 0 700 300" width="100%" role="img" aria-label="Consistent hashing ring" font-family="ui-monospace, Menlo, monospace">
  <circle cx="200" cy="150" r="108" fill="none" stroke="#334155" stroke-width="18"/>
  <circle cx="200" cy="150" r="108" fill="none" stroke="#475569" stroke-width="1"/>
  <g>
    <circle cx="200" cy="42" r="9" fill="#22d3ee"/><text x="200" y="26" fill="#22d3ee" font-size="11" text-anchor="middle">Node A</text>
    <circle cx="294" cy="204" r="9" fill="#22d3ee"/><text x="322" y="222" fill="#22d3ee" font-size="11" text-anchor="middle">Node B</text>
    <circle cx="106" cy="204" r="9" fill="#f87171"/><text x="72" y="222" fill="#f87171" font-size="11" text-anchor="middle">Node C</text>
  </g>
  <g fill="#fde68a">
    <circle cx="272" cy="94" r="5"/><text x="292" y="88" font-size="10">k1</text>
    <circle cx="250" cy="248" r="5"/><text x="256" y="266" font-size="10">k2</text>
    <circle cx="126" cy="72" r="5"/><text x="106" y="62" font-size="10">k3</text>
  </g>
  <path d="M236 66 A 108 108 0 0 1 284 130" fill="none" stroke="#fde68a" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#ar2)"/>
  <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#fde68a"/></marker></defs>
  <text x="200" y="146" fill="#e2e8f0" font-size="11" text-anchor="middle">a key belongs to the</text>
  <text x="200" y="162" fill="#e2e8f0" font-size="11" text-anchor="middle">next node clockwise</text>

  <rect x="352" y="30" width="332" height="106" rx="6" fill="#7f1d1d" fill-opacity="0.3" stroke="#b91c1c"/>
  <text x="518" y="52" fill="#fecaca" font-size="12" text-anchor="middle">hash(key) % N</text>
  <text x="518" y="74" fill="#fecaca" font-size="11" text-anchor="middle">N goes 4 → 5</text>
  <text x="518" y="94" fill="#fecaca" font-size="11" text-anchor="middle">~80% of keys map somewhere new</text>
  <text x="518" y="118" fill="#fecaca" font-size="11" text-anchor="middle">the cache is effectively wiped</text>

  <rect x="352" y="150" width="332" height="118" rx="6" fill="#064e3b" fill-opacity="0.4" stroke="#059669"/>
  <text x="518" y="172" fill="#a7f3d0" font-size="12" text-anchor="middle">consistent hashing ring</text>
  <text x="518" y="194" fill="#a7f3d0" font-size="11" text-anchor="middle">Node C leaves → only ITS keys move</text>
  <text x="518" y="212" fill="#a7f3d0" font-size="11" text-anchor="middle">to the next node clockwise</text>
  <text x="518" y="234" fill="#a7f3d0" font-size="11" text-anchor="middle">everything else stays put</text>
  <text x="518" y="256" fill="#94a3b8" font-size="10" text-anchor="middle">virtual nodes spread each node over many ring points</text>
  <text x="350" y="288" fill="#a78bfa" font-size="11" text-anchor="middle">Used by Redis Cluster, Cassandra, DynamoDB, CDN and shard routing</text>
</svg>`,
  },

  "cap-theorem": {
    caption: "Partitions are not optional, so the real choice is C or A during one. PACELC adds: even when healthy, you trade latency against consistency.",
    svg: `<svg viewBox="0 0 620 250" width="100%" role="img" aria-label="CAP theorem triangle" font-family="ui-monospace, Menlo, monospace">
  <polygon points="310,26 92,204 528,204" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <circle cx="310" cy="26" r="6" fill="#22d3ee"/><circle cx="92" cy="204" r="6" fill="#22d3ee"/><circle cx="528" cy="204" r="6" fill="#22d3ee"/>
  <text x="310" y="16" fill="#22d3ee" font-size="13" text-anchor="middle">P — Partition tolerance</text>
  <text x="70" y="224" fill="#22d3ee" font-size="13" text-anchor="start">C — Consistency</text>
  <text x="550" y="224" fill="#22d3ee" font-size="13" text-anchor="end">A — Availability</text>
  <text x="310" y="104" fill="#fde68a" font-size="12" text-anchor="middle">P is not a choice on a real network</text>
  <text x="310" y="122" fill="#e2e8f0" font-size="12" text-anchor="middle">so the real decision is CP or AP</text>
  <text x="310" y="140" fill="#94a3b8" font-size="11" text-anchor="middle">during a partition</text>
  <rect x="20" y="234" width="270" height="0" fill="none"/>
  <text x="180" y="176" fill="#94a3b8" font-size="10" text-anchor="middle">CP: refuse writes</text>
  <text x="180" y="189" fill="#94a3b8" font-size="10" text-anchor="middle">ledgers, inventory, auth</text>
  <text x="440" y="176" fill="#94a3b8" font-size="10" text-anchor="middle">AP: keep serving</text>
  <text x="440" y="189" fill="#94a3b8" font-size="10" text-anchor="middle">feeds, carts, analytics</text>
  <text x="310" y="243" fill="#a78bfa" font-size="11" text-anchor="middle">PACELC adds: Else, with no partition — trade Latency against Consistency</text>
</svg>`,
  },

  "message-queue": {
    caption: "At-least-once delivery is the norm, so consumers must be idempotent. A message that keeps failing belongs in a dead-letter queue.",
    chart: `flowchart LR
  PROD["producer"] --> BR["broker<br/>durable log / queue"]
  BR --> C1["consumer 1"]
  BR --> C2["consumer 2"]
  C1 --> ACK{"processed ok?"}
  ACK -- "yes" --> COMMIT["ack / commit offset"]
  ACK -- "no" --> RETRY["redeliver with backoff"]
  RETRY --> N{"retried N times?"}
  N -- "yes" --> DLQ["dead-letter queue<br/>— alert a human"]
  COMMIT --> IDEM["ack AFTER the work,<br/>so a crash redelivers<br/>→ consumer must be idempotent"]
  style DLQ fill:#422006,color:#fde68a`,
  },

  "transactional-outbox": {
    caption: "You cannot atomically write to a database and publish to a broker. Write the event in the same transaction and relay it after.",
    chart: `flowchart TB
  subgraph BAD["dual write — broken"]
    B1["BEGIN; UPDATE order; COMMIT"]
    B2["publish to broker"]
    B3["broker down → DB says paid,<br/>nobody was told"]
  end
  subgraph GOOD["transactional outbox"]
    G1["BEGIN<br/>UPDATE order<br/>INSERT INTO outbox<br/>COMMIT — one atomic write"]
    G2["relay polls or tails the WAL"]
    G3["publishes, then marks sent"]
    G4["crash mid-publish → republished<br/>→ at-least-once, so consumers<br/>stay idempotent"]
  end
  BAD --> GOOD
  style B3 fill:#7f1d1d,color:#fecaca`,
  },

  "idempotency-key": {
    caption: "A retry must not charge twice. The key is supplied by the caller and enforced by a unique constraint, not by a check-then-act.",
    chart: `sequenceDiagram
  autonumber
  participant C as Client
  participant A as API
  participant D as DB
  C->>A: POST /payments  Idempotency-Key: k1
  A->>D: INSERT (k1, ...) — unique index on key
  D-->>A: inserted → do the work
  A-->>C: 201 + result
  Note over C,A: network drops the response
  C->>A: RETRY same key k1
  A->>D: INSERT (k1, ...) 
  D-->>A: unique violation → already done
  A-->>C: 200 + the SAME stored result
  Note over A,D: The constraint is the guarantee —<br/>SELECT-then-INSERT races under concurrency`,
  },

  "rate-limiter": {
    caption: "Token bucket allows a controlled burst and then a steady rate. Fixed windows let double the limit through at a boundary.",
    svg: `<svg viewBox="0 0 700 250" width="100%" role="img" aria-label="Token bucket rate limiter" font-family="ui-monospace, Menlo, monospace">
  <text x="120" y="20" fill="#22d3ee" font-size="12" text-anchor="middle">token bucket</text>
  <path d="M60 40 L60 150 Q60 168 78 168 L162 168 Q180 168 180 150 L180 40" fill="#0f172a" stroke="#475569" stroke-width="2"/>
  <rect x="62" y="104" width="116" height="62" fill="#22d3ee" fill-opacity="0.25"/>
  <g fill="#22d3ee">
    <circle cx="86" cy="122" r="7"/><circle cx="110" cy="122" r="7"/><circle cx="134" cy="122" r="7"/><circle cx="158" cy="122" r="7"/>
    <circle cx="98" cy="146" r="7"/><circle cx="122" cy="146" r="7"/><circle cx="146" cy="146" r="7"/>
  </g>
  <path d="M120 6 L120 36" stroke="#34d399" stroke-width="2" marker-end="url(#ar3)"/>
  <defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker></defs>
  <text x="196" y="60" fill="#34d399" font-size="11">refill at a steady rate</text>
  <text x="196" y="76" fill="#94a3b8" font-size="10">e.g. 10 tokens / second</text>
  <text x="196" y="112" fill="#e2e8f0" font-size="11">capacity = the burst you allow</text>
  <text x="196" y="140" fill="#e2e8f0" font-size="11">1 request costs 1 token</text>
  <text x="196" y="164" fill="#f87171" font-size="11">empty → 429 + Retry-After</text>
  <text x="120" y="192" fill="#94a3b8" font-size="10" text-anchor="middle">allows a burst, then a steady rate</text>

  <rect x="392" y="30" width="292" height="86" rx="6" fill="#7f1d1d" fill-opacity="0.3" stroke="#b91c1c"/>
  <text x="538" y="50" fill="#fecaca" font-size="12" text-anchor="middle">fixed window — the boundary bug</text>
  <g stroke="#b91c1c" stroke-width="1.5" fill="none"><path d="M420 62 L520 62"/><path d="M540 62 L656 62"/><path d="M530 54 L530 74" stroke-dasharray="3 3"/></g>
  <text x="470" y="80" fill="#fecaca" font-size="10" text-anchor="middle">100 at 11:59:59</text>
  <text x="598" y="80" fill="#fecaca" font-size="10" text-anchor="middle">100 at 12:00:00</text>
  <text x="538" y="103" fill="#fecaca" font-size="11" text-anchor="middle">= 200 requests in one second</text>

  <rect x="392" y="130" width="292" height="62" rx="6" fill="#422006" fill-opacity="0.5" stroke="#a16207"/>
  <text x="538" y="150" fill="#fde68a" font-size="11" text-anchor="middle">Distributed: keep counters in Redis</text>
  <text x="538" y="168" fill="#fde68a" font-size="11" text-anchor="middle">so every instance shares one limit —</text>
  <text x="538" y="184" fill="#fde68a" font-size="11" text-anchor="middle">per-instance limits multiply by N</text>
  <text x="350" y="222" fill="#94a3b8" font-size="10" text-anchor="middle">Sliding window smooths the boundary at the cost of more state per key</text>
</svg>`,
  },

  "circuit-breaker": {
    caption: "Stop calling a dependency that is already failing. Half-open probes with a single request before restoring traffic.",
    chart: `stateDiagram-v2
  [*] --> Closed
  Closed --> Open: failure rate crosses the threshold
  Open --> HalfOpen: after a cooldown
  HalfOpen --> Closed: probe succeeds
  HalfOpen --> Open: probe fails
  note right of Closed
    traffic flows, failures counted
  end note
  note right of Open
    fail fast, no calls made
    serve a fallback or cached value
  end note
  note right of HalfOpen
    let ONE request through
  end note`,
  },

  "load-balancing": {
    caption: "Least-connections beats round-robin when request cost varies. Sticky sessions are a smell — push session state out instead.",
    chart: `flowchart TB
  CL["clients"] --> LB["load balancer<br/>+ health checks"]
  LB --> S1["app 1"]
  LB --> S2["app 2"]
  LB --> S3["app 3 — FAILING"]
  LB -. "health check fails" .-> OUT["taken out of rotation"]
  LB --> ALG["Algorithms"]
  ALG --> A1["round robin — uniform requests"]
  ALG --> A2["least connections — variable cost"]
  ALG --> A3["hash on key — cache affinity"]
  ALG --> A4["sticky sessions — avoid;<br/>put session in Redis so any<br/>instance can serve any user"]`,
  },

  "cdn-flow": {
    caption: "Push static bytes to the edge and only let dynamic requests reach your origin. Cache-Control is what actually decides.",
    chart: `flowchart LR
  U["user"] --> E["CDN edge — nearest PoP"]
  E --> H{"cache hit?"}
  H -- "yes" --> FAST["served in ~10-30ms<br/>origin never touched"]
  H -- "no" --> O["origin"]
  O --> STORE["store per Cache-Control<br/>then serve"]
  STORE --> FAST
  O --> HDR["immutable assets: max-age=31536000<br/>+ a content hash in the filename"]
  HDR --> SWR["HTML: short max-age +<br/>stale-while-revalidate<br/>so users never wait on a refresh"]`,
  },

  "url-shortener": {
    caption: "A worked example: the read path is the whole design. Reads outnumber writes by orders of magnitude, so the redirect must never touch a cold path.",
    chart: `flowchart TB
  W["POST /shorten"] --> GEN["generate id —<br/>base62 of a counter or snowflake,<br/>NOT a hash (collisions)"]
  GEN --> DB[("key-value store<br/>short → long")]
  R["GET /abc123"] --> CACHE{"in Redis?"}
  CACHE -- "hit ~95%" --> RED["301/302 redirect"]
  CACHE -- "miss" --> DB
  DB --> FILL["populate cache"] --> RED
  RED --> NOTE["302 not 301 if you want<br/>click analytics — a 301 is<br/>cached by the browser forever"]`,
  },
};

export default sysdesign;
