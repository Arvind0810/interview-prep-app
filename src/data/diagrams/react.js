// React / Next.js — diagram sources.
const react = {
  "render-cycle": {
    caption: "A re-render is React calling your function and diffing the result. The DOM is touched only where the output actually differs.",
    chart: `flowchart LR
  T["trigger:<br/>setState / parent render /<br/>context change / store notify"] --> R["Render phase<br/>call the component,<br/>build the element tree"]
  R --> D["Reconcile<br/>diff against the previous tree"]
  D --> C["Commit phase<br/>apply the minimal DOM changes"]
  C --> L["useLayoutEffect<br/>— before paint"]
  L --> P["browser paints"]
  P --> E["useEffect<br/>— after paint"]
  D -. "output identical?" .-> SKIP["no DOM work at all"]`,
  },

  "fiber-phases": {
    caption: "Render is interruptible and may run twice or be thrown away — which is why side effects there are forbidden. Commit is synchronous.",
    chart: `flowchart TB
  subgraph RP["Render phase — INTERRUPTIBLE"]
    R1["call components"]
    R2["may be paused for urgent input"]
    R3["may be discarded and restarted"]
    R4["may run twice in StrictMode"]
  end
  subgraph CP["Commit phase — SYNCHRONOUS"]
    C1["mutate the DOM"]
    C2["run layout effects"]
    C3["cannot be interrupted"]
  end
  RP --> CP
  RP --> RULE["→ no side effects, no mutation,<br/>no subscriptions during render"]
  style RULE fill:#422006,color:#fde68a`,
  },

  "keys-reconciliation": {
    caption: "With an index key, inserting at the top makes React match the wrong old element to the new one — state lands on the wrong row.",
    chart: `flowchart TB
  subgraph IDX["key = array index — insert at top"]
    I1["before: 0:Ann 1:Bob"]
    I2["after:  0:Zoe 1:Ann 2:Bob"]
    I3["React sees key 0 changed Ann→Zoe<br/>and PATCHES it in place"]
    I4["typed text, checked boxes and<br/>focus stay on the wrong row"]
  end
  subgraph STB["key = stable id"]
    S1["before: a:Ann b:Bob"]
    S2["after:  z:Zoe a:Ann b:Bob"]
    S3["React sees z is NEW,<br/>a and b just MOVED"]
    S4["state follows the right item"]
  end
  style I4 fill:#7f1d1d,color:#fecaca`,
  },

  "hooks-order": {
    caption: "Hooks are matched between renders by call index, not by name. A conditional hook shifts every hook after it.",
    chart: `flowchart TB
  subgraph OK["every render calls the same hooks in order"]
    O1["0: useState count"]
    O2["1: useState name"]
    O3["2: useEffect"]
  end
  subgraph BAD["if (cond) useState(...) — cond now false"]
    B1["0: useState count"]
    B2["1: useEffect<br/>reads slot 1 = name's state"]
    B3["state silently corrupted"]
  end
  OK --> RULE["Rule: top level only.<br/>Never in a condition, loop,<br/>nested function, or after an early return"]
  BAD --> RULE
  style B3 fill:#7f1d1d,color:#fecaca`,
  },

  "useeffect-lifecycle": {
    caption: "Cleanup runs before every re-run and on unmount. StrictMode mounts twice in dev to prove your cleanup exists.",
    chart: `flowchart TB
  M["mount"] --> E["run effect"]
  E --> DEP{"a dependency changed?"}
  DEP -- "yes" --> CL["run CLEANUP first"]
  CL --> E
  DEP -- "no" --> IDLE["do nothing"]
  M --> UM["unmount"] --> CL2["run cleanup"]
  E -. "StrictMode dev only" .-> SM["mount → cleanup → mount again<br/>a double fetch here means<br/>your effect is not idempotent"]
  style SM fill:#422006,color:#fde68a`,
  },

  "state-vs-ref": {
    caption: "Both survive re-renders. Only state schedules one — which is exactly why refs must not be read or written during render.",
    chart: `flowchart LR
  subgraph ST["useState"]
    S1["persists across renders"]
    S2["setting it SCHEDULES a render"]
    S3["value is a snapshot of this render"]
  end
  subgraph RF["useRef"]
    R1["persists across renders"]
    R2["mutating .current renders NOTHING"]
    R3["always the latest value"]
  end
  ST --> Q["Does it belong on screen when it changes?"]
  RF --> Q
  Q -- "yes" --> USES["state"]
  Q -- "no — timer id, DOM node,<br/>previous value, a flag" --> USER["ref"]`,
  },

  "context-rerender": {
    caption: "Every consumer re-renders when the provider value changes by reference — there is no selector. An inline object changes every render.",
    chart: `flowchart TB
  P["Provider value={{ user, theme }}<br/>— NEW object each render"] --> C1["consumer reads theme<br/>RE-RENDERS"]
  P --> C2["consumer reads user<br/>RE-RENDERS"]
  P --> C3["consumer reads theme only<br/>RE-RENDERS anyway"]
  P --> FIX["Fixes"]
  FIX --> F1["useMemo the value"]
  FIX --> F2["split by change frequency —<br/>theme and user in separate contexts"]
  FIX --> F3["state and dispatch in two providers<br/>— dispatch is stable"]
  FIX --> F4["need selectors? use a store,<br/>not Context"]
  style C3 fill:#7f1d1d,color:#fecaca`,
  },

  "hydration-timeline": {
    caption: "Server HTML paints first but is inert. A mismatch means the client render disagreed with the server's markup.",
    chart: `sequenceDiagram
  autonumber
  participant S as Server
  participant B as Browser
  S->>B: HTML — visible, NOT interactive
  Note over B: user can see it, clicks do nothing
  B->>B: download JS bundle
  B->>B: render the same tree in memory
  B->>B: attach listeners — hydration
  Note over B: interactive from here
  Note over S,B: Mismatch if the two renders differ:<br/>Date.now, Math.random, window,<br/>localStorage, or locale formatting`,
  },

  "rsc-boundary": {
    caption: "'use client' marks a boundary, not a file. Everything imported below it ships to the browser — so push the boundary down.",
    chart: `flowchart TB
  L["layout.js — Server"] --> P["page.js — Server<br/>reads the DB directly,<br/>ships zero JS"]
  P --> SC["ProductList — Server"]
  SC --> CB["AddToCart — 'use client'<br/>BOUNDARY"]
  CB --> C1["Button — client"]
  CB --> C2["useCart hook — client"]
  P -. "pass a Server Component<br/>through children" .-> CB
  CB --> RULE["Props crossing the boundary<br/>must be serialisable —<br/>no functions, no class instances"]
  style CB fill:#312e81,color:#e0e7ff`,
  },

  "suspense-boundary": {
    caption: "Placement is a design decision: one boundary high up makes the whole page wait; several narrow ones let regions appear independently.",
    chart: `flowchart TB
  subgraph ONE["one boundary at the top"]
    A["everything waits for<br/>the SLOWEST query"]
  end
  subgraph MANY["a boundary per region"]
    B1["header — instant"]
    B2["feed — 200ms"]
    B3["recommendations — 2s<br/>own skeleton"]
  end
  ONE --> BAD["blank page for 2s"]
  MANY --> GOOD["shell paints immediately,<br/>each region streams in"]
  GOOD --> PAIR["Pair with an ErrorBoundary —<br/>Suspense handles pending,<br/>not failure"]
  style BAD fill:#7f1d1d,color:#fecaca`,
  },

  "concurrent-lanes": {
    caption: "Keep the input urgent so typing never stalls; mark the expensive list a transition so React can abandon a stale render.",
    chart: `flowchart TB
  K["keystroke"] --> URG["URGENT lane<br/>setQuery — input updates<br/>in this frame"]
  K --> TR["TRANSITION lane<br/>startTransition or useDeferredValue<br/>— the big filtered list"]
  URG --> PAINT["input feels instant"]
  TR --> INT{"another keystroke<br/>arrives mid-render?"}
  INT -- "yes" --> DROP["abandon that render,<br/>start again with the new value"]
  INT -- "no" --> DONE["commit the list"]
  DONE --> NOTE["isPending lets you dim<br/>the stale list meanwhile"]`,
  },

  "error-boundary": {
    caption: "Boundaries catch rendering errors only. Handlers, async code and SSR need their own try/catch.",
    chart: `flowchart TB
  EB["ErrorBoundary<br/>class component"] --> CATCH["CATCHES"]
  CATCH --> C1["errors thrown while rendering"]
  CATCH --> C2["errors in lifecycle methods"]
  CATCH --> C3["errors in child constructors"]
  EB --> MISS["does NOT catch"]
  MISS --> M1["event handlers → try/catch"]
  MISS --> M2["setTimeout / promises → .catch"]
  MISS --> M3["errors in the boundary itself"]
  MISS --> M4["server-side rendering"]
  EB --> PLACE["Place one at the root plus<br/>narrow ones per widget or route,<br/>so one failure degrades one panel"]
  style MISS fill:#7f1d1d,color:#fecaca`,
  },

  "memo-props": {
    caption: "memo compares props shallowly. Anything created inline in the parent is a new reference, so the memo never hits.",
    chart: `flowchart TB
  PR["parent re-renders"] --> M{"child wrapped in React.memo?"}
  M -- "no" --> RE["child re-renders — always"]
  M -- "yes" --> CMP{"props shallowly equal?"}
  CMP -- "yes" --> SKIP["render SKIPPED"]
  CMP -- "no" --> RE
  RE --> WHY["new reference every render:<br/>style={{...}}  onClick={() => ...}<br/>items={[...]}  render={<Icon/>}"]
  WHY --> FIX["useCallback / useMemo exist to keep<br/>a memoized child's props stable —<br/>not to speed up the parent"]
  FIX --> RC["React 19 Compiler does<br/>this automatically"]`,
  },

  "rendering-strategies": {
    caption: "The axis is when the HTML is produced. ISR is SSG that re-builds a page in the background after it goes stale.",
    chart: `flowchart TB
  subgraph B["at BUILD time — SSG"]
    B1["fastest, cacheable at the edge"]
    B2["stale until the next deploy"]
  end
  subgraph I["build + revalidate — ISR"]
    I1["serves the cached page"]
    I2["regenerates in the background<br/>after revalidate seconds"]
  end
  subgraph R["per REQUEST — SSR"]
    R1["always fresh, personalised"]
    R2["TTFB depends on your data"]
  end
  subgraph C["in the BROWSER — CSR"]
    C1["no HTML content for crawlers"]
    C2["loading spinner on first paint"]
  end
  B --> PICK["Pick by how often it changes<br/>and whether it is per-user"]
  I --> PICK
  R --> PICK
  C --> PICK`,
  },

  "data-fetch-race": {
    caption: "Two requests in flight can resolve out of order, so the stale one overwrites the fresh one. The cleanup function is the fix.",
    chart: `sequenceDiagram
  autonumber
  participant U as User
  participant E as Effect
  participant S as Server
  U->>E: types "a" — fetch A
  U->>E: types "ab" — fetch B
  S-->>E: B resolves — setState(B)
  S-->>E: A resolves LATE — setState(A)
  Note over E: screen now shows results for "a"<br/>while the box says "ab"
  Note over E: Fix: cleanup sets ignore = true,<br/>or AbortController.abort,<br/>or use React Query / SWR`,
  },
};

export default react;
