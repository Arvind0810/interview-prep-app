// SQL / PostgreSQL — diagram sources.
const sql = {
  "join-types": {
    caption: "Which rows survive. LEFT keeps every left row and pads the right with NULLs — which is why a filter on the right table in WHERE silently turns it back into an INNER join.",
    svg: `<svg viewBox="0 0 700 210" width="100%" role="img" aria-label="Venn diagrams of SQL join types" font-family="ui-monospace, Menlo, monospace">
  <defs>
    <clipPath id="jL"><circle cx="52" cy="72" r="38"/></clipPath>
    <clipPath id="jR"><circle cx="88" cy="72" r="38"/></clipPath>
  </defs>
  <g fill="none" stroke="#475569" stroke-width="1.5">
    <g transform="translate(0,0)">
      <circle cx="52" cy="72" r="38" fill="#1e293b"/><circle cx="88" cy="72" r="38" fill="#1e293b"/>
      <g clip-path="url(#jL)"><circle cx="88" cy="72" r="38" fill="#22d3ee" stroke="none"/></g>
      <circle cx="52" cy="72" r="38"/><circle cx="88" cy="72" r="38"/>
      <text x="70" y="130" fill="#e2e8f0" font-size="12" text-anchor="middle" stroke="none">INNER</text>
      <text x="70" y="146" fill="#94a3b8" font-size="10" text-anchor="middle" stroke="none">matches only</text>
    </g>
    <g transform="translate(140,0)">
      <circle cx="52" cy="72" r="38" fill="#22d3ee"/><circle cx="88" cy="72" r="38" fill="#1e293b" fill-opacity="0.55"/>
      <circle cx="52" cy="72" r="38"/><circle cx="88" cy="72" r="38"/>
      <text x="70" y="130" fill="#e2e8f0" font-size="12" text-anchor="middle" stroke="none">LEFT</text>
      <text x="70" y="146" fill="#94a3b8" font-size="10" text-anchor="middle" stroke="none">all left + NULLs</text>
    </g>
    <g transform="translate(280,0)">
      <circle cx="52" cy="72" r="38" fill="#1e293b"/><circle cx="88" cy="72" r="38" fill="#22d3ee" fill-opacity="0.9"/>
      <circle cx="52" cy="72" r="38"/><circle cx="88" cy="72" r="38"/>
      <text x="70" y="130" fill="#e2e8f0" font-size="12" text-anchor="middle" stroke="none">RIGHT</text>
      <text x="70" y="146" fill="#94a3b8" font-size="10" text-anchor="middle" stroke="none">all right + NULLs</text>
    </g>
    <g transform="translate(420,0)">
      <circle cx="52" cy="72" r="38" fill="#22d3ee"/><circle cx="88" cy="72" r="38" fill="#22d3ee"/>
      <circle cx="52" cy="72" r="38"/><circle cx="88" cy="72" r="38"/>
      <text x="70" y="130" fill="#e2e8f0" font-size="12" text-anchor="middle" stroke="none">FULL OUTER</text>
      <text x="70" y="146" fill="#94a3b8" font-size="10" text-anchor="middle" stroke="none">everything</text>
    </g>
    <g transform="translate(560,0)">
      <rect x="18" y="40" width="46" height="64" rx="4" fill="#1e293b"/>
      <rect x="76" y="40" width="46" height="64" rx="4" fill="#1e293b"/>
      <path d="M64 56 L76 72 M64 72 L76 56 M64 88 L76 72" stroke="#a78bfa"/>
      <text x="70" y="130" fill="#e2e8f0" font-size="12" text-anchor="middle" stroke="none">CROSS</text>
      <text x="70" y="146" fill="#94a3b8" font-size="10" text-anchor="middle" stroke="none">every pairing</text>
    </g>
  </g>
  <rect x="8" y="164" width="684" height="36" rx="5" fill="#7f1d1d" fill-opacity="0.35" stroke="#b91c1c"/>
  <text x="350" y="181" fill="#fecaca" font-size="11" text-anchor="middle">Trap: a WHERE filter on the right table turns a LEFT JOIN back into an INNER join —</text>
  <text x="350" y="194" fill="#fecaca" font-size="11" text-anchor="middle">it discards the NULL-padded rows. Put the predicate in ON, or test IS NULL.</text>
</svg>`,
  },

  "btree-index": {
    caption: "A B-tree seek is a few page reads instead of a full scan. Only a left-anchored prefix can use it.",
    svg: `<svg viewBox="0 0 660 260" width="100%" role="img" aria-label="B-tree index structure" font-family="ui-monospace, Menlo, monospace">
  <g stroke="#475569" stroke-width="1.5" fill="#1e293b">
    <rect x="250" y="14" width="160" height="34" rx="5"/>
    <rect x="60" y="94" width="150" height="34" rx="5"/>
    <rect x="450" y="94" width="150" height="34" rx="5"/>
    <rect x="20" y="174" width="120" height="46" rx="5"/>
    <rect x="170" y="174" width="120" height="46" rx="5"/>
    <rect x="330" y="174" width="120" height="46" rx="5"/>
    <rect x="480" y="174" width="150" height="46" rx="5"/>
  </g>
  <g fill="#e2e8f0" font-size="11" text-anchor="middle">
    <text x="330" y="35">| m | t |  root</text>
    <text x="135" y="115">| a | f | j |</text>
    <text x="525" y="115">| n | q |</text>
    <text x="80" y="194">alice</text><text x="80" y="209">bob</text>
    <text x="230" y="194">frank</text><text x="230" y="209">grace</text>
    <text x="390" y="194">nina</text><text x="390" y="209">omar</text>
    <text x="555" y="194">quinn</text><text x="555" y="209">zoe</text>
  </g>
  <g stroke="#64748b" stroke-width="1.2" fill="none">
    <path d="M300 48 L150 94"/><path d="M360 48 L510 94"/>
    <path d="M100 128 L80 174"/><path d="M140 128 L230 174"/>
    <path d="M500 128 L390 174"/><path d="M560 128 L555 174"/>
  </g>
  <g stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4 3" fill="none">
    <path d="M140 200 L170 200"/><path d="M290 200 L330 200"/><path d="M450 200 L480 200"/>
  </g>
  <text x="330" y="243" fill="#a78bfa" font-size="11" text-anchor="middle">leaves are a linked list — this is what makes range scans and ORDER BY cheap</text>
  <text x="330" y="256" fill="#94a3b8" font-size="10" text-anchor="middle">a lookup is 3 page reads, not a full table scan</text>
</svg>`,
  },

  "index-scan-types": {
    caption: "The planner picks by selectivity. Reading many rows through an index costs more than just scanning the table.",
    chart: `flowchart TB
  Q["query with a filter"] --> SEL{"how many rows match?"}
  SEL -- "most of the table" --> SEQ["Seq Scan<br/>read every page, sequential I/O"]
  SEL -- "a few" --> IDX{"are all needed columns<br/>in the index?"}
  SEL -- "a moderate share" --> BMP["Bitmap Heap Scan<br/>collect matches, then read<br/>the heap in physical order"]
  IDX -- "yes" --> IOS["Index Only Scan<br/>never touches the heap<br/>— needs a current visibility map"]
  IDX -- "no" --> ISC["Index Scan<br/>walk the tree, then one<br/>random heap fetch per row"]`,
  },

  "sargable": {
    caption: "Wrapping the column in a function hides it from the index. Move the transformation to the constant, or index the expression.",
    chart: `flowchart LR
  subgraph NO["NOT sargable — forces a Seq Scan"]
    N1["WHERE lower(email) = ?"]
    N2["WHERE created_at::date = ?"]
    N3["WHERE amount + 1 = 10"]
    N4["WHERE name LIKE '%abc'"]
  end
  subgraph YES["sargable — index usable"]
    Y1["WHERE email = ?"]
    Y2["WHERE created_at >= ? AND < ?"]
    Y3["WHERE amount = 9"]
    Y4["WHERE name LIKE 'abc%'"]
  end
  NO --> FIX["Fixes: expression index on lower(email),<br/>half-open range instead of a cast,<br/>pg_trgm GIN index for '%abc%'"]`,
  },

  "mvcc-versions": {
    caption: "Writers never block readers: an UPDATE writes a new row version and marks the old one dead. VACUUM reclaims the corpses.",
    chart: `flowchart TB
  T1["Txn 100 INSERT"] --> V1["row v1<br/>xmin=100 xmax=null"]
  T2["Txn 150 UPDATE"] --> V2["row v2<br/>xmin=150 xmax=null"]
  T2 --> DEAD["row v1 now<br/>xmin=100 xmax=150"]
  READER["Txn 120 started before 150<br/>— its snapshot still sees v1"] --> DEAD
  DEAD --> VAC["VACUUM reclaims v1 once<br/>no snapshot can still need it"]
  VAC --> BLOAT["A long-running txn holds<br/>the xmin horizon back<br/>→ dead tuples pile up → bloat"]
  style BLOAT fill:#7f1d1d,color:#fecaca`,
  },

  "isolation-anomalies": {
    caption: "Each level forbids more. Postgres has no dirty reads at any level, and its REPEATABLE READ also blocks phantoms.",
    chart: `flowchart TB
  subgraph RC["READ COMMITTED — Postgres default"]
    A1["no dirty reads"]
    A2["non-repeatable reads POSSIBLE"]
    A3["phantoms POSSIBLE"]
  end
  subgraph RR["REPEATABLE READ"]
    B1["snapshot fixed at first read"]
    B2["no non-repeatable reads"]
    B3["no phantoms in Postgres"]
    B4["can abort: could not serialize"]
  end
  subgraph SER["SERIALIZABLE"]
    C1["as if txns ran one at a time"]
    C2["detects write skew"]
    C3["you MUST be ready to retry"]
  end
  RC --> RR --> SER
  SER --> COST["stricter = more aborts<br/>and more retry logic"]`,
  },

  "deadlock": {
    caption: "Two transactions taking the same locks in opposite order. Postgres detects the cycle and kills one — always take locks in a consistent order.",
    chart: `sequenceDiagram
  autonumber
  participant A as Txn A
  participant R1 as Row 1
  participant R2 as Row 2
  participant B as Txn B
  A->>R1: UPDATE — lock acquired
  B->>R2: UPDATE — lock acquired
  A->>R2: UPDATE — WAITS on B
  B->>R1: UPDATE — WAITS on A
  Note over A,B: cycle — neither can proceed
  Note over A,B: Postgres detects it after deadlock_timeout<br/>and aborts one with error 40P01
  Note over A,B: Fix — always lock in the same order,<br/>e.g. ascending primary key`,
  },

  "n-plus-one": {
    caption: "One query for the list, then one per row. Fix by fetching the children in a single round trip and joining in memory.",
    chart: `flowchart TB
  BAD["SELECT * FROM posts LIMIT 50"] --> LOOP["for each post:<br/>SELECT * FROM users<br/>WHERE id = ?"]
  LOOP --> COUNT["1 + 50 = 51 round trips"]
  COUNT --> GOOD["Fixes"]
  GOOD --> F1["JOIN users in the same query"]
  GOOD --> F2["SELECT ... WHERE user_id = ANY($1)<br/>then map in code"]
  GOOD --> F3["ORM eager load / Preload"]
  style COUNT fill:#7f1d1d,color:#fecaca`,
  },

  "clause-eval-order": {
    caption: "Logical evaluation order — not the order you write it. This is why a SELECT alias works in ORDER BY but not in WHERE.",
    chart: `flowchart LR
  F["1. FROM / JOIN"] --> W["2. WHERE<br/>filters rows"]
  W --> G["3. GROUP BY"]
  G --> H["4. HAVING<br/>filters groups"]
  H --> S["5. SELECT<br/>aliases + window fns<br/>exist from here"]
  S --> D["6. DISTINCT"]
  D --> O["7. ORDER BY<br/>can use aliases"]
  O --> L["8. LIMIT / OFFSET"]
  W -. "alias not defined yet<br/>window fn not computed yet" .-> ERR["cannot filter on either here —<br/>wrap in a subquery or CTE"]
  style ERR fill:#7f1d1d,color:#fecaca`,
  },

  "null-logic": {
    caption: "NULL means unknown, so comparisons return unknown — and only TRUE rows survive a WHERE.",
    chart: `flowchart TB
  N["NULL = anything"] --> U["UNKNOWN<br/>not true, not false"]
  U --> W["WHERE keeps only TRUE<br/>→ the row disappears"]
  W --> T1["status <> 'active'<br/>silently drops NULL rows"]
  W --> T2["NOT IN (subquery with one NULL)<br/>returns ZERO rows"]
  W --> T3["count(col) skips NULLs<br/>count(*) does not"]
  T2 --> FIX["Use IS NULL / IS NOT NULL,<br/>NOT EXISTS instead of NOT IN,<br/>COALESCE for defaults,<br/>IS DISTINCT FROM for null-safe ="]
  style T2 fill:#7f1d1d,color:#fecaca`,
  },

  "keyset-pagination": {
    caption: "OFFSET counts past every skipped row and shifts under concurrent inserts. Keyset seeks straight to the page.",
    chart: `flowchart TB
  subgraph OFF["OFFSET 10000 LIMIT 20"]
    O1["reads and discards<br/>10,000 rows first"]
    O2["gets slower the deeper you go"]
    O3["a row inserted above the cursor<br/>repeats or skips an item"]
  end
  subgraph KEY["Keyset / cursor"]
    K1["WHERE (created_at, id) < (?, ?)<br/>ORDER BY created_at DESC, id DESC<br/>LIMIT 20"]
    K2["index seek — constant cost<br/>at any depth"]
    K3["stable under concurrent writes"]
  end
  OFF --> KEY
  KEY --> TIE["the id tiebreaker matters —<br/>two rows in the same instant<br/>can straddle a page boundary"]`,
  },

  "wal-replication": {
    caption: "Every change is written to the WAL first. Replicas replay that stream — which is also what CDC and PITR read.",
    chart: `flowchart LR
  TXN["COMMIT"] --> WAL["WAL — write-ahead log<br/>flushed to disk first"]
  WAL --> HEAP["data pages<br/>written later"]
  WAL --> PHYS["Physical replication<br/>byte-for-byte standby<br/>read replica / failover"]
  WAL --> LOGI["Logical replication<br/>decoded row changes<br/>selective, cross-version"]
  LOGI --> CDC["CDC — Debezium,<br/>search index, warehouse"]
  WAL --> PITR["archive → point-in-time restore"]
  PHYS --> LAG["replica lag — a read right after<br/>a write may not see it"]
  style LAG fill:#7f1d1d,color:#fecaca`,
  },

  "connection-pool": {
    caption: "Postgres forks a process per connection, so thousands of app connections need a pooler in front.",
    chart: `flowchart LR
  A1["app instance 1<br/>pool of 20"] --> PGB["PgBouncer<br/>transaction pooling"]
  A2["app instance 2<br/>pool of 20"] --> PGB
  A3["app instance N"] --> PGB
  PGB --> PG["Postgres<br/>max_connections 100<br/>one backend process each"]
  PGB --> NOTE["transaction mode reuses a backend<br/>per transaction, not per client"]
  NOTE --> WARN["so session state breaks:<br/>prepared statements, SET,<br/>advisory locks, LISTEN/NOTIFY"]
  style WARN fill:#7f1d1d,color:#fecaca`,
  },

  "normalization": {
    caption: "Each step removes a way the same fact can be stored twice — and therefore a way two copies can disagree.",
    chart: `flowchart TB
  U["Unnormalized<br/>phone1, phone2, tags='a,b,c'"] --> N1["1NF<br/>one atomic value per column<br/>repeating groups → rows"]
  N1 --> N2["2NF<br/>no partial dependency on<br/>part of a composite key"]
  N2 --> N3["3NF<br/>no non-key column depends<br/>on another non-key column"]
  N3 --> BC["BCNF<br/>handles overlapping<br/>candidate keys"]
  N3 --> DEN["Deliberate denormalization<br/>— a counter or cached aggregate —<br/>needs a stated plan for<br/>keeping it correct"]`,
  },

  "covering-index": {
    caption: "INCLUDE stores extra columns in the leaf only, so the query is answered from the index with no heap fetch.",
    chart: `flowchart TB
  Q["SELECT total FROM orders<br/>WHERE customer_id = ?"] --> A{"index shape?"}
  A -- "(customer_id)" --> P1["Index Scan<br/>+ one heap fetch PER ROW<br/>for total"]
  A -- "(customer_id) INCLUDE (total)" --> P2["Index Only Scan<br/>total is in the leaf —<br/>heap never read"]
  P2 --> VM["still consults the visibility map —<br/>a recently updated table falls back<br/>to heap fetches until VACUUM"]
  P2 --> COST["cost: wider index,<br/>fewer entries per page,<br/>more write amplification"]`,
  },

  "transaction-control": {
    caption: "SAVEPOINT lets one step fail without discarding the whole transaction — which is how a driver implements nested transactions.",
    chart: `stateDiagram-v2
  [*] --> Active: BEGIN
  Active --> Saved: SAVEPOINT sp1
  Saved --> Active: RELEASE sp1
  Saved --> Active: ROLLBACK TO sp1
  Active --> Aborted: any error
  Aborted --> [*]: ROLLBACK required
  Active --> Committed: COMMIT
  Committed --> [*]
  note right of Aborted
    In Postgres every later statement
    fails until you roll back
  end note`,
  },
};

export default sql;
