// Go — diagram sources for the Golang topic and its question-bank entries.
const go = {
  "gmp-scheduler": {
    caption: "GMP: goroutines queue on a P, run on an M. Empty Ps steal work; a blocking syscall hands the P to a fresh M.",
    chart: `flowchart TB
  GRQ["Global run queue"]
  subgraph PA["P — logical processor (GOMAXPROCS of these)"]
    LA["Local run queue<br/>G G G G"]
  end
  subgraph PB["P — logical processor"]
    LB["Local run queue<br/>empty"]
  end
  MA["M — OS thread"]
  MB["M — OS thread"]
  LA --> MA
  LB --> MB
  GRQ -. "refill when local is empty" .-> LB
  LA -. "work stealing: takes half" .-> LB
  MA -- "blocking syscall" --> DET["P detaches<br/>a new M adopts it<br/>other Gs keep running"]`,
  },

  "goroutine-states": {
    caption: "A goroutine's lifecycle. Waiting costs nothing — the M is released to run other goroutines.",
    chart: `stateDiagram-v2
  [*] --> Runnable: go f()
  Runnable --> Running: scheduler picks it up
  Running --> Runnable: preempted after ~10ms
  Running --> Waiting: channel op / mutex / syscall / timer
  Waiting --> Runnable: the event it waited on fires
  Running --> Dead: function returns
  Waiting --> Leaked: nothing will ever fire
  Dead --> [*]`,
  },

  "channel-blocking": {
    caption: "Unbuffered is a rendezvous — the send completes only when a receiver arrives. Buffered decouples them until the buffer fills.",
    chart: `sequenceDiagram
  autonumber
  participant S as Sender
  participant U as Unbuffered chan
  participant R as Receiver
  S->>U: ch <- 1
  Note over S,U: sender BLOCKS<br/>no receiver yet
  R->>U: <-ch
  U-->>S: handoff completes
  U-->>R: value 1
  Note over S,R: both resume together
  S->>U: buffered chan, cap 2
  Note over S,U: send returns immediately<br/>blocks only when full`,
  },

  "select-multiplex": {
    caption: "select waits on several channels at once. If more than one is ready it picks at random — never in source order.",
    chart: `flowchart LR
  C1["ch1 ready"] --> SEL
  C2["ch2 ready"] --> SEL
  C3["ctx.Done"] --> SEL
  T["time.After timeout"] --> SEL
  SEL{"select"}
  SEL -- "exactly one runs" --> CASE["chosen case body"]
  SEL -. "if none ready and a default exists" .-> DEF["default: non-blocking"]
  SEL -. "if none ready and no default" .-> BLK["blocks until one is"]`,
  },

  "slice-header": {
    caption: "A slice is three words pointing into an array it does not own. len is what you can read; cap is how far append can grow before reallocating.",
    svg: `<svg viewBox="0 0 700 230" width="100%" role="img" aria-label="Slice header and backing array" font-family="ui-monospace, Menlo, monospace">
  <rect x="14" y="30" width="170" height="112" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="99" y="24" fill="#22d3ee" font-size="12" text-anchor="middle">slice header — 3 words</text>
  <g stroke="#475569" stroke-width="1.5" fill="#1e293b">
    <rect x="28" y="42" width="142" height="28" rx="4"/>
    <rect x="28" y="76" width="142" height="28" rx="4"/>
    <rect x="28" y="110" width="142" height="24" rx="4"/>
  </g>
  <g fill="#e2e8f0" font-size="12"><text x="40" y="61">ptr  ──────▶</text><text x="40" y="95">len = 3</text><text x="40" y="127">cap = 5</text></g>
  <text x="450" y="24" fill="#22d3ee" font-size="12" text-anchor="middle">backing array — the slice does not own it</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="250" y="42" width="80" height="42" rx="4" fill="#164e63"/>
    <rect x="330" y="42" width="80" height="42" rx="4" fill="#164e63"/>
    <rect x="410" y="42" width="80" height="42" rx="4" fill="#164e63"/>
    <rect x="490" y="42" width="80" height="42" rx="4" fill="#1e293b"/>
    <rect x="570" y="42" width="80" height="42" rx="4" fill="#1e293b"/>
  </g>
  <g fill="#e2e8f0" font-size="13" text-anchor="middle"><text x="290" y="68">"a"</text><text x="370" y="68">"b"</text><text x="450" y="68">"c"</text></g>
  <g fill="#64748b" font-size="11" text-anchor="middle"><text x="530" y="68">spare</text><text x="610" y="68">spare</text></g>
  <g fill="#94a3b8" font-size="10" text-anchor="middle"><text x="290" y="97">[0]</text><text x="370" y="97">[1]</text><text x="450" y="97">[2]</text><text x="530" y="97">[3]</text><text x="610" y="97">[4]</text></g>
  <path d="M172 56 L250 60" stroke="#22d3ee" stroke-width="2" fill="none" marker-end="url(#ar1)"/>
  <defs><marker id="ar1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#22d3ee"/></marker></defs>
  <path d="M250 112 L490 112" stroke="#34d399" stroke-width="1.5" fill="none"/>
  <path d="M250 108 L250 116 M490 108 L490 116" stroke="#34d399" stroke-width="1.5"/>
  <text x="370" y="127" fill="#34d399" font-size="11" text-anchor="middle">len — what you can read</text>
  <path d="M250 148 L650 148" stroke="#fde68a" stroke-width="1.5" fill="none"/>
  <path d="M250 144 L250 152 M650 144 L650 152" stroke="#fde68a" stroke-width="1.5"/>
  <text x="450" y="163" fill="#fde68a" font-size="11" text-anchor="middle">cap — how far append can grow before it reallocates</text>
  <rect x="14" y="180" width="672" height="42" rx="5" fill="#422006" fill-opacity="0.5" stroke="#a16207"/>
  <text x="350" y="197" fill="#fde68a" font-size="11" text-anchor="middle">b := a[0:2] shares this array. append writes INTO the spare capacity if there is any —</text>
  <text x="350" y="212" fill="#fde68a" font-size="11" text-anchor="middle">so whether it mutates the caller's data depends on cap. a[0:2:2] forces the copy.</text>
</svg>`,
  },

  "slice-append-alias": {
    caption: "Whether append mutates the caller's data depends on spare capacity — so behaviour can change with input size.",
    chart: `flowchart TB
  START["b := a[0:2]  — b shares a's array"]
  START --> Q{"does b have spare cap?"}
  Q -- "yes" --> SAME["append writes INTO the shared array<br/>a[2] silently changes"]
  Q -- "no" --> NEW["append allocates a new array<br/>copies, then writes<br/>a is untouched — they stop aliasing"]
  SAME --> FIX["Fix: three-index slice a[0:2:2]<br/>forces the copy every time"]
  NEW --> FIX`,
  },

  "string-bytes-runes": {
    caption: "len counts bytes, not characters. Indexing mid-character yields a fragment; range decodes runes and skips indexes.",
    svg: `<svg viewBox="0 0 700 210" width="100%" role="img" aria-label="UTF-8 bytes versus runes" font-family="ui-monospace, Menlo, monospace">
  <text x="14" y="20" fill="#22d3ee" font-size="12">s := "héllo"</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="14" y="32" width="84" height="40" rx="4" fill="#1e293b"/>
    <rect x="98" y="32" width="168" height="40" rx="4" fill="#7f1d1d" fill-opacity="0.55"/>
    <rect x="266" y="32" width="84" height="40" rx="4" fill="#1e293b"/>
    <rect x="350" y="32" width="84" height="40" rx="4" fill="#1e293b"/>
    <rect x="434" y="32" width="84" height="40" rx="4" fill="#1e293b"/>
  </g>
  <g fill="#e2e8f0" font-size="12" text-anchor="middle">
    <text x="56" y="50">0x68</text><text x="182" y="50">0xC3  0xA9</text><text x="308" y="50">0x6C</text><text x="392" y="50">0x6C</text><text x="476" y="50">0x6F</text>
  </g>
  <g fill="#94a3b8" font-size="10" text-anchor="middle">
    <text x="56" y="66">byte 0</text><text x="182" y="66">bytes 1-2 — ONE character</text><text x="308" y="66">byte 3</text><text x="392" y="66">byte 4</text><text x="476" y="66">byte 5</text>
  </g>
  <g fill="#34d399" font-size="13" text-anchor="middle">
    <text x="56" y="92">'h'</text><text x="182" y="92">'é'</text><text x="308" y="92">'l'</text><text x="392" y="92">'l'</text><text x="476" y="92">'o'</text>
  </g>
  <text x="540" y="50" fill="#e2e8f0" font-size="12">len(s) = 6</text>
  <text x="540" y="70" fill="#94a3b8" font-size="11">bytes, not chars</text>
  <text x="540" y="92" fill="#34d399" font-size="12">RuneCount = 5</text>
  <rect x="14" y="108" width="330" height="44" rx="5" fill="#7f1d1d" fill-opacity="0.35" stroke="#b91c1c"/>
  <text x="179" y="126" fill="#fecaca" font-size="11" text-anchor="middle">s[1] gives 0xC3 — half a character.</text>
  <text x="179" y="142" fill="#fecaca" font-size="11" text-anchor="middle">Indexing a string indexes BYTES.</text>
  <rect x="356" y="108" width="330" height="44" rx="5" fill="#064e3b" fill-opacity="0.45" stroke="#059669"/>
  <text x="521" y="126" fill="#a7f3d0" font-size="11" text-anchor="middle">for i, r := range s decodes runes —</text>
  <text x="521" y="142" fill="#a7f3d0" font-size="11" text-anchor="middle">i jumps 0, 1, 3, 4, 5</text>
  <text x="350" y="176" fill="#fde68a" font-size="11" text-anchor="middle">This is why a 280-character limit enforced with len() truncates non-ASCII input</text>
  <text x="350" y="192" fill="#94a3b8" font-size="10" text-anchor="middle">[]rune(s) makes it indexable by character — at the cost of an allocation</text>
</svg>`,
  },

  "interface-itab": {
    caption: "An interface value is two words. It is nil only when BOTH are nil — a nil *T stored in it is not a nil interface.",
    svg: `<svg viewBox="0 0 660 220" width="100%" role="img" aria-label="Interface value is two words" font-family="ui-monospace, Menlo, monospace">
  <text x="160" y="20" fill="#34d399" font-size="12" text-anchor="middle">var err error = nil</text>
  <g stroke="#475569" stroke-width="1.5" fill="#1e293b">
    <rect x="40" y="30" width="240" height="34" rx="4"/><rect x="40" y="64" width="240" height="34" rx="4"/>
  </g>
  <g fill="#e2e8f0" font-size="12"><text x="56" y="52">type  →  nil</text><text x="56" y="86">data  →  nil</text></g>
  <rect x="40" y="108" width="240" height="30" rx="5" fill="#064e3b" fill-opacity="0.5" stroke="#059669"/>
  <text x="160" y="128" fill="#a7f3d0" font-size="12" text-anchor="middle">err == nil  →  TRUE</text>

  <text x="500" y="20" fill="#f87171" font-size="12" text-anchor="middle">var p *MyErr = nil; var err error = p</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="380" y="30" width="240" height="34" rx="4" fill="#7f1d1d" fill-opacity="0.5"/>
    <rect x="380" y="64" width="240" height="34" rx="4" fill="#1e293b"/>
  </g>
  <g font-size="12"><text x="396" y="52" fill="#fecaca">type  →  *MyErr   ← SET</text><text x="396" y="86" fill="#e2e8f0">data  →  nil</text></g>
  <rect x="380" y="108" width="240" height="30" rx="5" fill="#7f1d1d" fill-opacity="0.5" stroke="#b91c1c"/>
  <text x="500" y="128" fill="#fecaca" font-size="12" text-anchor="middle">err == nil  →  FALSE</text>

  <text x="330" y="166" fill="#e2e8f0" font-size="12" text-anchor="middle">An interface is nil only when BOTH words are nil.</text>
  <rect x="90" y="178" width="480" height="32" rx="5" fill="#422006" fill-opacity="0.5" stroke="#a16207"/>
  <text x="330" y="198" fill="#fde68a" font-size="11" text-anchor="middle">Fix: return a bare nil, never a typed nil pointer, from a function returning error</text>
</svg>`,
  },

  "gc-cycle": {
    caption: "Concurrent mark-and-sweep. Only the two stop-the-world pauses block your code, and they are sub-millisecond.",
    chart: `flowchart LR
  A["Heap grows to<br/>GOGC target"] --> B["STW: enable<br/>write barrier"]
  B --> C["Concurrent mark<br/>runs alongside your goroutines"]
  C --> D["STW: mark<br/>termination"]
  D --> E["Concurrent sweep<br/>reclaims unmarked spans"]
  E --> A
  C -. "write barrier catches pointers<br/>your code changes mid-mark" .-> C
  style B fill:#7f1d1d,color:#fecaca
  style D fill:#7f1d1d,color:#fecaca`,
  },

  "stack-heap-escape": {
    caption: "Escape analysis decides allocation at compile time. Stack values are free to reclaim; heap values cost GC work.",
    chart: `flowchart TB
  V["a value in a function"] --> Q{"does it outlive the call?"}
  Q -- "no — used and dropped" --> ST["Stack<br/>freed on return, zero GC cost"]
  Q -- "yes — returned, stored in a<br/>global, captured by a closure,<br/>sent to a channel, or boxed in<br/>an interface" --> HP["Heap<br/>GC must trace and free it"]
  HP --> CHK["go build -gcflags=-m<br/>prints every escape decision"]`,
  },

  "context-tree": {
    caption: "Cancellation flows down, never up. Cancelling a parent cancels every descendant at once.",
    chart: `flowchart TB
  BG["context.Background"] --> REQ["WithTimeout 5s<br/>— one HTTP request"]
  REQ --> DB["WithCancel<br/>DB query"]
  REQ --> RPC["WithCancel<br/>upstream call"]
  RPC --> RETRY["retry attempt"]
  REQ -. "client disconnects<br/>or 5s elapses" .-> X["ALL descendants see<br/>ctx.Done and stop"]
  DB --> X
  RPC --> X
  RETRY --> X
  style X fill:#7f1d1d,color:#fecaca`,
  },

  "defer-lifo": {
    caption: "Defers run last-in-first-out as the function returns — which is why the close pairs with the open right next to it.",
    chart: `flowchart TB
  subgraph BODY["function body — pushes onto a stack"]
    D1["defer f.Close      pushed 1st"]
    D2["defer mu.Unlock    pushed 2nd"]
    D3["defer cancel       pushed 3rd"]
  end
  BODY --> RET["return / panic"]
  RET --> R3["cancel      runs 1st"]
  R3 --> R2["mu.Unlock   runs 2nd"]
  R2 --> R1["f.Close     runs 3rd"]
  R1 --> DONE["caller resumes"]`,
  },

  "panic-recover": {
    caption: "recover only works inside a deferred function, and only for the goroutine that panicked.",
    chart: `flowchart TB
  P["panic(v)"] --> U["unwind the stack,<br/>running each deferred call"]
  U --> Q{"a deferred func<br/>calls recover?"}
  Q -- "yes" --> R["unwinding STOPS<br/>that function returns normally<br/>convert v into an error"]
  Q -- "no" --> C["process crashes<br/>and prints the goroutine dump"]
  U -. "panic in a spawned goroutine<br/>cannot be recovered by its parent" .-> C
  R --> USE["Use at a boundary you own:<br/>HTTP middleware, worker loop"]`,
  },

  "error-wrapping": {
    caption: "%w keeps the chain intact. errors.Is compares against a sentinel; errors.As extracts a concrete type.",
    chart: `flowchart LR
  DB["sql.ErrNoRows"] --> S["repo: fmt.Errorf<br/>\\"load user %s: %w\\""]
  S --> H["service: fmt.Errorf<br/>\\"get profile: %w\\""]
  H --> CTRL["controller"]
  CTRL --> IS["errors.Is err, sql.ErrNoRows<br/>→ true → return 404"]
  CTRL --> AS["errors.As err, &pgErr<br/>→ read pgErr.Code"]
  S -. "using %v instead of %w<br/>breaks the chain here" .-> BREAK["errors.Is returns false"]
  style BREAK fill:#7f1d1d,color:#fecaca`,
  },

  "mutex-rwmutex": {
    caption: "RWMutex only wins on read-heavy contention — many readers run together, but a writer waits for all of them.",
    chart: `flowchart TB
  subgraph MU["sync.Mutex"]
    M1["reader 1"] --> ML["one holder at a time"]
    M2["reader 2"] --> ML
    M3["writer"] --> ML
  end
  subgraph RW["sync.RWMutex"]
    R1["RLock reader 1"] --> RL["many readers<br/>concurrently"]
    R2["RLock reader 2"] --> RL
    W1["Lock writer"] --> WL["exclusive —<br/>waits for every reader<br/>and blocks new ones"]
  end
  MU --> USE["Mutex is faster when writes<br/>are common or sections are tiny"]
  RW --> USE`,
  },

  "worker-pool": {
    caption: "Bounded fan-out: the jobs channel is the queue, N workers cap concurrency, WaitGroup closes results exactly once.",
    chart: `flowchart LR
  PROD["producer"] --> JOBS["jobs chan<br/>buffered"]
  JOBS --> W1["worker 1"]
  JOBS --> W2["worker 2"]
  JOBS --> W3["worker N"]
  W1 --> RES["results chan"]
  W2 --> RES
  W3 --> RES
  RES --> CONS["consumer ranges<br/>until closed"]
  WG["wg.Wait then close results<br/>— senders close, never receivers"] -.-> RES`,
  },

  "graceful-shutdown": {
    caption: "Stop accepting, let in-flight work finish, then exit — with a deadline so a stuck request cannot hang the deploy.",
    chart: `sequenceDiagram
  autonumber
  participant K as Orchestrator
  participant A as App
  participant H as In-flight requests
  K->>A: SIGTERM
  A->>A: stop accepting new connections
  A->>A: fail readiness probe
  Note over K,A: load balancer stops routing here
  A->>H: ctx cancelled, finish current work
  H-->>A: drained
  A->>A: close DB pool, flush logs
  A-->>K: exit 0
  Note over A,H: hard deadline — after N seconds<br/>force exit anyway`,
  },

  "goroutine-leak": {
    caption: "A goroutine blocked forever is never collected — it holds its stack and everything its closure captured.",
    chart: `flowchart TB
  G["go func() { ch <- result }()"] --> Q{"does anyone receive?"}
  Q -- "yes" --> OK["goroutine returns<br/>stack reclaimed"]
  Q -- "no — caller returned early,<br/>timed out, or hit an error" --> LEAK["blocked on send FOREVER<br/>stack + captured vars pinned"]
  LEAK --> SYMPT["symptom: memory and<br/>goroutine count climb, never fall"]
  SYMPT --> FIX["Fixes: buffer of 1,<br/>select with ctx.Done,<br/>or defer close and range"]
  style LEAK fill:#7f1d1d,color:#fecaca`,
  },

  "method-set": {
    caption: "Give a type a pointer receiver anywhere and only *T satisfies the interface — the single most common 'does not implement' error.",
    chart: `flowchart TB
  subgraph VR["func (t T) Read()  — value receiver"]
    V1["T satisfies it"]
    V2["*T satisfies it"]
  end
  subgraph PR["func (t *T) Write() — pointer receiver"]
    P1["*T satisfies it"]
    P2["T does NOT"]
  end
  PR --> ERR["var _ Writer = T{}<br/>→ compile error:<br/>method has pointer receiver"]
  ERR --> FIX["Fix: pass &T{},<br/>and keep receivers<br/>consistent per type"]
  style ERR fill:#7f1d1d,color:#fecaca`,
  },
};

export default go;
