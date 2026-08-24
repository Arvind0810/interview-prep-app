// JavaScript — diagram sources.
const js = {
  "event-loop": {
    caption: "One macrotask, then the ENTIRE microtask queue, then paint. That ordering is why a resolved promise logs before a setTimeout(fn, 0) registered earlier.",
    svg: `<svg viewBox="0 0 700 290" width="100%" role="img" aria-label="JavaScript event loop queues" font-family="ui-monospace, Menlo, monospace">
  <rect x="14" y="30" width="180" height="150" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
  <text x="104" y="24" fill="#22d3ee" font-size="12" text-anchor="middle">Call stack</text>
  <g stroke="#475569" stroke-width="1.2" fill="#1e293b">
    <rect x="28" y="140" width="152" height="30" rx="3"/><rect x="28" y="108" width="152" height="30" rx="3"/><rect x="28" y="76" width="152" height="30" rx="3"/>
  </g>
  <g fill="#e2e8f0" font-size="11" text-anchor="middle"><text x="104" y="160">main script</text><text x="104" y="128">outer()</text><text x="104" y="96">inner()</text></g>
  <text x="104" y="196" fill="#94a3b8" font-size="10" text-anchor="middle">must be EMPTY before anything runs</text>

  <rect x="214" y="30" width="220" height="86" rx="6" fill="#064e3b" fill-opacity="0.35" stroke="#059669" stroke-width="1.5"/>
  <text x="324" y="24" fill="#34d399" font-size="12" text-anchor="middle">Microtask queue — HIGH priority</text>
  <g fill="#a7f3d0" font-size="10"><text x="228" y="52">promise.then / catch / finally</text><text x="228" y="72">await continuations</text><text x="228" y="92">queueMicrotask, MutationObserver</text></g>
  <text x="324" y="110" fill="#34d399" font-size="10" text-anchor="middle">drained COMPLETELY every tick</text>

  <rect x="214" y="132" width="220" height="86" rx="6" fill="#312e81" fill-opacity="0.45" stroke="#6366f1" stroke-width="1.5"/>
  <text x="324" y="128" fill="#a5b4fc" font-size="12" text-anchor="middle">Macrotask queue</text>
  <g fill="#c7d2fe" font-size="11"><text x="228" y="154">setTimeout / setInterval</text><text x="228" y="174">DOM events — click, input</text><text x="228" y="194">I/O, script evaluation</text></g>
  <text x="324" y="212" fill="#a5b4fc" font-size="10" text-anchor="middle">exactly ONE per tick</text>

  <rect x="454" y="70" width="232" height="110" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="570" y="60" fill="#22d3ee" font-size="12" text-anchor="middle">one tick of the loop</text>
  <g fill="#e2e8f0" font-size="11"><text x="470" y="94">1. take ONE macrotask</text><text x="470" y="116">2. run it to completion</text><text x="470" y="138">3. drain ALL microtasks</text><text x="470" y="160">4. render / paint</text></g>
  <path d="M434 72 L454 100" stroke="#34d399" stroke-width="1.5" fill="none"/>
  <path d="M434 172 L454 148" stroke="#6366f1" stroke-width="1.5" fill="none"/>
  <rect x="14" y="232" width="672" height="46" rx="5" fill="#7f1d1d" fill-opacity="0.3" stroke="#b91c1c"/>
  <text x="350" y="250" fill="#fecaca" font-size="11" text-anchor="middle">A microtask that keeps scheduling microtasks STARVES the loop — the page freezes and never paints.</text>
  <text x="350" y="268" fill="#fecaca" font-size="11" text-anchor="middle">A runaway setTimeout chain does not: rendering gets a turn between each one.</text>
</svg>`,
  },

  "prototype-chain": {
    caption: "Property lookup walks the chain until it hits null. Writes always land on the instance and shadow the prototype rather than modifying it.",
    chart: `flowchart TB
  I["dog — the instance<br/>own props: name"] -- "__proto__" --> DP["Dog.prototype<br/>bark()"]
  DP -- "__proto__" --> AP["Animal.prototype<br/>eat()"]
  AP -- "__proto__" --> OP["Object.prototype<br/>toString, hasOwnProperty"]
  OP -- "__proto__" --> N["null — end of chain"]
  I -.-> R1["dog.name → found on the instance"]
  DP -.-> R2["dog.bark() → found one hop up"]
  OP -.-> R3["dog.toString() → three hops"]
  N -.-> R4["dog.nope → undefined"]
  R2 --> W["dog.bark = f  does NOT change the prototype —<br/>it adds an own property that SHADOWS it"]
  N --> NULLP["Object.create(null) has no chain at all —<br/>the safe way to build a dictionary"]`,
  },

  "closure-scope": {
    caption: "The inner function keeps a reference to the environment it was created in — not a copy. That is what keeps counter alive after makeCounter returns.",
    svg: `<svg viewBox="0 0 700 250" width="100%" role="img" aria-label="Closure scope chain" font-family="ui-monospace, Menlo, monospace">
  <rect x="14" y="26" width="330" height="200" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
  <text x="179" y="20" fill="#22d3ee" font-size="12" text-anchor="middle">at creation time</text>
  <rect x="28" y="40" width="302" height="172" rx="5" fill="#1e293b" stroke="#334155"/>
  <text x="40" y="60" fill="#94a3b8" font-size="10">Global scope</text>
  <rect x="42" y="70" width="274" height="130" rx="5" fill="#0f172a" stroke="#22d3ee"/>
  <text x="54" y="90" fill="#22d3ee" font-size="11">makeCounter() scope</text>
  <rect x="56" y="98" width="246" height="26" rx="3" fill="#164e63"/>
  <text x="68" y="116" fill="#e2e8f0" font-size="11">let count = 0</text>
  <rect x="56" y="132" width="246" height="60" rx="5" fill="#1e293b" stroke="#a78bfa"/>
  <text x="68" y="152" fill="#a78bfa" font-size="11">inner function</text>
  <text x="68" y="172" fill="#e2e8f0" font-size="11">() =&gt; ++count</text>
  <text x="68" y="186" fill="#94a3b8" font-size="10">captures count BY REFERENCE</text>

  <path d="M352 126 L392 126" stroke="#64748b" stroke-width="2" marker-end="url(#arc)"/>
  <defs><marker id="arc" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#64748b"/></marker></defs>
  <text x="372" y="116" fill="#94a3b8" font-size="9" text-anchor="middle">returns</text>

  <rect x="400" y="26" width="286" height="200" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
  <text x="543" y="20" fill="#22d3ee" font-size="12" text-anchor="middle">after makeCounter returns</text>
  <rect x="414" y="52" width="258" height="34" rx="4" fill="#1e293b" stroke="#a78bfa"/>
  <text x="543" y="74" fill="#a78bfa" font-size="11" text-anchor="middle">const c = makeCounter()</text>
  <rect x="414" y="96" width="258" height="40" rx="4" fill="#164e63" stroke="#22d3ee"/>
  <text x="543" y="112" fill="#e2e8f0" font-size="11" text-anchor="middle">count still alive — the closure</text>
  <text x="543" y="128" fill="#e2e8f0" font-size="11" text-anchor="middle">holds the whole environment</text>
  <g fill="#a7f3d0" font-size="11"><text x="426" y="158">c() → 1</text><text x="426" y="176">c() → 2</text><text x="426" y="194">c() → 3</text></g>
  <text x="600" y="176" fill="#94a3b8" font-size="10" text-anchor="middle">nothing outside</text>
  <text x="600" y="190" fill="#94a3b8" font-size="10" text-anchor="middle">can reach count</text>
  <text x="350" y="244" fill="#fde68a" font-size="11" text-anchor="middle">Cost: a closure pins everything it captured — capturing a large object is a real memory leak.</text>
</svg>`,
  },

  "this-binding": {
    caption: "For a normal function `this` is decided at CALL time, by these rules in order. Arrow functions ignore all four and inherit lexically.",
    chart: `flowchart TB
  C["a function is called"] --> A{"is it an arrow function?"}
  A -- "yes" --> LEX["this from the ENCLOSING scope —<br/>fixed at definition, cannot be rebound"]
  A -- "no" --> R1{"called with new?"}
  R1 -- "yes" --> B1["this = the new object"]
  R1 -- "no" --> R2{"call / apply / bind?"}
  R2 -- "yes" --> B2["this = what you passed"]
  R2 -- "no" --> R3{"called as obj.method()?"}
  R3 -- "yes" --> B3["this = obj"]
  R3 -- "no" --> B4["default: undefined in strict mode<br/>and modules, globalThis otherwise"]
  B3 --> TRAP["const f = obj.method; f()<br/>loses the binding → falls to default"]
  style TRAP fill:#7f1d1d,color:#fecaca`,
  },

  "promise-states": {
    caption: "A promise settles once and cannot change again. A rejection with no catch anywhere becomes an unhandled rejection.",
    chart: `stateDiagram-v2
  [*] --> Pending: new Promise
  Pending --> Fulfilled: resolve(value)
  Pending --> Rejected: reject(reason) or throw
  Fulfilled --> [*]: .then(onFulfilled)
  Rejected --> [*]: .catch(onRejected)
  note right of Pending
    settling is FINAL —
    a second resolve is ignored
  end note
  note right of Rejected
    no catch anywhere?
    unhandledrejection
  end note`,
  },

  "hoisting-tdz": {
    caption: "All three are hoisted. Only var is initialised — let and const exist but throw until their declaration is evaluated.",
    svg: `<svg viewBox="0 0 700 220" width="100%" role="img" aria-label="Hoisting and the temporal dead zone" font-family="ui-monospace, Menlo, monospace">
  <text x="14" y="20" fill="#22d3ee" font-size="12">scope entered  ────────────────────────────────────▶  declaration evaluated  ────────▶</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="14" y="34" width="330" height="38" rx="4" fill="#064e3b" fill-opacity="0.4"/>
    <rect x="344" y="34" width="342" height="38" rx="4" fill="#064e3b" fill-opacity="0.6"/>
    <rect x="14" y="82" width="330" height="38" rx="4" fill="#7f1d1d" fill-opacity="0.45"/>
    <rect x="344" y="82" width="342" height="38" rx="4" fill="#064e3b" fill-opacity="0.6"/>
    <rect x="14" y="130" width="330" height="38" rx="4" fill="#064e3b" fill-opacity="0.6"/>
    <rect x="344" y="130" width="342" height="38" rx="4" fill="#064e3b" fill-opacity="0.6"/>
  </g>
  <g font-size="11">
    <text x="28" y="58" fill="#a7f3d0">var x  → undefined  (no error)</text>
    <text x="358" y="58" fill="#a7f3d0">var x  → the assigned value</text>
    <text x="28" y="106" fill="#fecaca">let / const  → TEMPORAL DEAD ZONE</text>
    <text x="358" y="106" fill="#a7f3d0">let / const  → the assigned value</text>
    <text x="28" y="154" fill="#a7f3d0">function f() {}  → fully callable</text>
    <text x="358" y="154" fill="#a7f3d0">function f() {}  → fully callable</text>
  </g>
  <text x="179" y="184" fill="#f87171" font-size="11" text-anchor="middle">ReferenceError: Cannot access before initialization</text>
  <text x="350" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">The TDZ exists so const can be enforced, and so typeof stops silently</text>
  <text x="350" y="214" fill="#94a3b8" font-size="10" text-anchor="middle">returning 'undefined' for a typo. class declarations are in it too.</text>
</svg>`,
  },

  "event-propagation": {
    caption: "Capture down, fire on the target, bubble back up. Delegation exploits the bubble — one listener on the container handles every current and future child.",
    svg: `<svg viewBox="0 0 700 250" width="100%" role="img" aria-label="DOM event capture, target and bubble phases" font-family="ui-monospace, Menlo, monospace">
  <g stroke="#475569" stroke-width="1.5" fill="none">
    <rect x="150" y="20" width="400" height="180" rx="6" fill="#0f172a"/>
    <rect x="190" y="52" width="320" height="132" rx="5" fill="#1e293b"/>
    <rect x="230" y="84" width="240" height="84" rx="5" fill="#0f172a"/>
    <rect x="270" y="112" width="160" height="42" rx="5" fill="#164e63"/>
  </g>
  <g font-size="11" fill="#94a3b8"><text x="160" y="38">document</text><text x="200" y="70">div#list</text><text x="240" y="102">li</text></g>
  <text x="350" y="138" fill="#22d3ee" font-size="12" text-anchor="middle">button — the TARGET</text>
  <g stroke="#a78bfa" stroke-width="2" fill="none" marker-end="url(#ard)">
    <path d="M110 30 L110 130 L262 130"/>
  </g>
  <g stroke="#34d399" stroke-width="2" fill="none" marker-end="url(#aru)">
    <path d="M438 130 L590 130 L590 30"/>
  </g>
  <defs>
    <marker id="ard" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#a78bfa"/></marker>
    <marker id="aru" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
  </defs>
  <text x="60" y="80" fill="#a78bfa" font-size="11">1. CAPTURE</text>
  <text x="60" y="96" fill="#94a3b8" font-size="10">{capture:true}</text>
  <text x="640" y="80" fill="#34d399" font-size="11" text-anchor="end">3. BUBBLE</text>
  <text x="640" y="96" fill="#94a3b8" font-size="10" text-anchor="end">the default</text>
  <text x="350" y="220" fill="#e2e8f0" font-size="11" text-anchor="middle">preventDefault cancels the browser action but propagation CONTINUES.</text>
  <text x="350" y="238" fill="#e2e8f0" font-size="11" text-anchor="middle">stopPropagation halts propagation but the default action STILL HAPPENS.</text>
</svg>`,
  },

  "shallow-deep-copy": {
    caption: "A spread duplicates the top level only. The nested object is still one object with two owners — mutate it through either and both see it.",
    svg: `<svg viewBox="0 0 700 230" width="100%" role="img" aria-label="Shallow versus deep copy" font-family="ui-monospace, Menlo, monospace">
  <text x="175" y="18" fill="#f87171" font-size="12" text-anchor="middle">shallow — { ...obj }</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="20" y="30" width="120" height="46" rx="4" fill="#1e293b"/>
    <rect x="210" y="30" width="120" height="46" rx="4" fill="#1e293b"/>
    <rect x="112" y="118" width="130" height="52" rx="4" fill="#7f1d1d" fill-opacity="0.55"/>
  </g>
  <text x="80" y="50" fill="#e2e8f0" font-size="11" text-anchor="middle">original</text>
  <text x="80" y="66" fill="#94a3b8" font-size="10" text-anchor="middle">name: "a"</text>
  <text x="270" y="50" fill="#e2e8f0" font-size="11" text-anchor="middle">copy</text>
  <text x="270" y="66" fill="#94a3b8" font-size="10" text-anchor="middle">name: "a"</text>
  <text x="177" y="140" fill="#fecaca" font-size="11" text-anchor="middle">nested: { n: 1 }</text>
  <text x="177" y="158" fill="#fecaca" font-size="10" text-anchor="middle">ONE object, TWO owners</text>
  <g stroke="#f87171" stroke-width="1.5" fill="none"><path d="M80 76 L150 118"/><path d="M270 76 L205 118"/></g>
  <text x="177" y="192" fill="#fecaca" font-size="10" text-anchor="middle">copy.nested.n = 2 also changes original.nested.n</text>

  <text x="520" y="18" fill="#34d399" font-size="12" text-anchor="middle">deep — structuredClone(obj)</text>
  <g stroke="#475569" stroke-width="1.5">
    <rect x="380" y="30" width="120" height="46" rx="4" fill="#1e293b"/>
    <rect x="560" y="30" width="120" height="46" rx="4" fill="#1e293b"/>
    <rect x="374" y="118" width="132" height="42" rx="4" fill="#064e3b" fill-opacity="0.6"/>
    <rect x="554" y="118" width="132" height="42" rx="4" fill="#064e3b" fill-opacity="0.6"/>
  </g>
  <text x="440" y="56" fill="#e2e8f0" font-size="11" text-anchor="middle">original</text>
  <text x="620" y="56" fill="#e2e8f0" font-size="11" text-anchor="middle">clone</text>
  <text x="440" y="144" fill="#a7f3d0" font-size="10" text-anchor="middle">nested { n: 1 }</text>
  <text x="620" y="144" fill="#a7f3d0" font-size="10" text-anchor="middle">nested { n: 1 }</text>
  <g stroke="#34d399" stroke-width="1.5" fill="none"><path d="M440 76 L440 118"/><path d="M620 76 L620 118"/></g>
  <text x="530" y="192" fill="#a7f3d0" font-size="10" text-anchor="middle">fully independent — handles Date, Map, Set, cycles</text>
  <text x="350" y="220" fill="#fde68a" font-size="10" text-anchor="middle">JSON.parse(JSON.stringify(x)) drops undefined, functions and symbols, turns Dates into strings, and throws on cycles</text>
</svg>`,
  },

  "script-loading": {
    caption: "defer is the right default for app code: it downloads in parallel, runs in order, and never blocks parsing. async is only for independent third-party scripts.",
    svg: `<svg viewBox="0 0 700 230" width="100%" role="img" aria-label="Script tag versus defer versus async" font-family="ui-monospace, Menlo, monospace">
  <g font-size="11" fill="#e2e8f0">
    <text x="14" y="34">&lt;script&gt;</text><text x="14" y="98">defer</text><text x="14" y="162">async</text>
  </g>
  <g font-size="9" fill="#64748b"><text x="120" y="18">HTML parsing</text><text x="330" y="18">download</text><text x="500" y="18">execute</text></g>
  <g stroke="#475569" stroke-width="1">
    <rect x="110" y="22" width="120" height="18" rx="2" fill="#334155"/>
    <rect x="230" y="22" width="150" height="18" rx="2" fill="#22d3ee" fill-opacity="0.5"/>
    <rect x="380" y="22" width="90" height="18" rx="2" fill="#a78bfa" fill-opacity="0.7"/>
    <rect x="470" y="22" width="120" height="18" rx="2" fill="#334155"/>
  </g>
  <text x="305" y="56" fill="#f87171" font-size="10" text-anchor="middle">parsing BLOCKED while it downloads and runs</text>

  <g stroke="#475569" stroke-width="1">
    <rect x="110" y="86" width="360" height="18" rx="2" fill="#334155"/>
    <rect x="230" y="66" width="150" height="16" rx="2" fill="#22d3ee" fill-opacity="0.5"/>
    <rect x="470" y="86" width="90" height="18" rx="2" fill="#a78bfa" fill-opacity="0.7"/>
  </g>
  <text x="305" y="122" fill="#34d399" font-size="10" text-anchor="middle">downloads in parallel, runs AFTER parsing, IN DOCUMENT ORDER</text>

  <g stroke="#475569" stroke-width="1">
    <rect x="110" y="150" width="130" height="18" rx="2" fill="#334155"/>
    <rect x="240" y="150" width="80" height="18" rx="2" fill="#a78bfa" fill-opacity="0.7"/>
    <rect x="320" y="150" width="150" height="18" rx="2" fill="#334155"/>
    <rect x="230" y="130" width="90" height="16" rx="2" fill="#22d3ee" fill-opacity="0.5"/>
  </g>
  <text x="305" y="186" fill="#fde68a" font-size="10" text-anchor="middle">downloads in parallel but INTERRUPTS parsing the moment it arrives — order NOT guaranteed</text>
  <text x="350" y="214" fill="#94a3b8" font-size="10" text-anchor="middle">type="module" is deferred by default. Both attributes are ignored on inline scripts.</text>
</svg>`,
  },

  "web-storage": {
    caption: "The security point: a token in localStorage is readable by any XSS on the page. An HttpOnly cookie is not reachable from JavaScript at all.",
    svg: `<svg viewBox="0 0 700 220" width="100%" role="img" aria-label="localStorage versus sessionStorage versus cookies" font-family="ui-monospace, Menlo, monospace">
  <g stroke="#475569" stroke-width="1.5" fill="#0f172a">
    <rect x="14" y="26" width="216" height="150" rx="6"/><rect x="242" y="26" width="216" height="150" rx="6"/><rect x="470" y="26" width="216" height="150" rx="6"/>
  </g>
  <text x="122" y="48" fill="#22d3ee" font-size="12" text-anchor="middle">localStorage</text>
  <text x="350" y="48" fill="#22d3ee" font-size="12" text-anchor="middle">sessionStorage</text>
  <text x="578" y="48" fill="#22d3ee" font-size="12" text-anchor="middle">cookie</text>
  <g font-size="10" fill="#e2e8f0">
    <text x="28" y="72">~5-10 MB</text><text x="28" y="92">until cleared</text><text x="28" y="112">shared: ALL tabs</text><text x="28" y="132">never sent to server</text>
    <text x="256" y="72">~5-10 MB</text><text x="256" y="92">until the tab closes</text><text x="256" y="112">ONE tab only</text><text x="256" y="132">never sent to server</text>
    <text x="484" y="72">~4 KB</text><text x="484" y="92">explicit Expires</text><text x="484" y="112">shared: all tabs</text><text x="484" y="132">SENT ON EVERY REQUEST</text>
  </g>
  <rect x="24" y="142" width="196" height="24" rx="3" fill="#7f1d1d" fill-opacity="0.5"/>
  <text x="122" y="158" fill="#fecaca" font-size="10" text-anchor="middle">readable by any JS — XSS</text>
  <rect x="252" y="142" width="196" height="24" rx="3" fill="#7f1d1d" fill-opacity="0.5"/>
  <text x="350" y="158" fill="#fecaca" font-size="10" text-anchor="middle">readable by any JS — XSS</text>
  <rect x="480" y="142" width="196" height="24" rx="3" fill="#064e3b" fill-opacity="0.6"/>
  <text x="578" y="158" fill="#a7f3d0" font-size="10" text-anchor="middle">HttpOnly → invisible to JS</text>
  <text x="350" y="198" fill="#fde68a" font-size="11" text-anchor="middle">Session tokens → HttpOnly, Secure, SameSite cookie. Web Storage → non-sensitive UI preferences only.</text>
  <text x="350" y="214" fill="#94a3b8" font-size="10" text-anchor="middle">Both Storage APIs are synchronous and string-only, so a large read blocks the main thread.</text>
</svg>`,
  },

  "array-mutation": {
    caption: "Mutating in place does not change the array's identity, so React and Redux see no change and skip the re-render.",
    svg: `<svg viewBox="0 0 700 200" width="100%" role="img" aria-label="Mutating versus non-mutating array methods" font-family="ui-monospace, Menlo, monospace">
  <rect x="14" y="26" width="330" height="120" rx="6" fill="#7f1d1d" fill-opacity="0.28" stroke="#b91c1c" stroke-width="1.5"/>
  <text x="179" y="46" fill="#fecaca" font-size="12" text-anchor="middle">MUTATES — same reference</text>
  <g font-size="11" fill="#fecaca">
    <text x="30" y="70">push  pop  shift  unshift</text>
    <text x="30" y="90">splice  sort  reverse</text>
    <text x="30" y="110">fill  copyWithin</text>
  </g>
  <text x="179" y="132" fill="#f87171" font-size="10" text-anchor="middle">React sees the same array → NO re-render</text>

  <rect x="356" y="26" width="330" height="120" rx="6" fill="#064e3b" fill-opacity="0.35" stroke="#059669" stroke-width="1.5"/>
  <text x="521" y="46" fill="#a7f3d0" font-size="12" text-anchor="middle">RETURNS A NEW ARRAY</text>
  <g font-size="11" fill="#a7f3d0">
    <text x="372" y="70">slice  concat  map  filter</text>
    <text x="372" y="90">flat  flatMap  reduce</text>
    <text x="372" y="110">toSorted  toReversed  with   (ES2023)</text>
  </g>
  <text x="521" y="132" fill="#34d399" font-size="10" text-anchor="middle">new reference → re-render happens</text>
  <text x="350" y="168" fill="#fde68a" font-size="11" text-anchor="middle">[...arr].sort() or arr.toSorted() — never arr.sort() on state.</text>
  <text x="350" y="188" fill="#94a3b8" font-size="10" text-anchor="middle">sort compares as STRINGS by default: [10, 9, 1].sort() gives [1, 10, 9]. Pass (a, b) =&gt; a - b.</text>
</svg>`,
  },

  "coercion": {
    caption: "+ is the only operator overloaded for strings; every other arithmetic operator coerces to number. This is why the two expressions differ.",
    svg: `<svg viewBox="0 0 700 200" width="100%" role="img" aria-label="JavaScript type coercion with the plus operator" font-family="ui-monospace, Menlo, monospace">
  <text x="175" y="24" fill="#22d3ee" font-size="12" text-anchor="middle">4 + 2 + "8"</text>
  <g stroke="#475569" stroke-width="1.5" fill="#1e293b">
    <rect x="30" y="36" width="290" height="30" rx="4"/><rect x="30" y="74" width="290" height="30" rx="4"/>
  </g>
  <text x="175" y="56" fill="#e2e8f0" font-size="11" text-anchor="middle">4 + 2  →  6        (both numbers)</text>
  <text x="175" y="94" fill="#e2e8f0" font-size="11" text-anchor="middle">6 + "8"  →  "68"   (string wins)</text>
  <rect x="30" y="112" width="290" height="28" rx="4" fill="#164e63"/>
  <text x="175" y="131" fill="#22d3ee" font-size="12" text-anchor="middle">result: the STRING "68"</text>

  <text x="525" y="24" fill="#22d3ee" font-size="12" text-anchor="middle">"8" + 4 + 2</text>
  <g stroke="#475569" stroke-width="1.5" fill="#1e293b">
    <rect x="380" y="36" width="290" height="30" rx="4"/><rect x="380" y="74" width="290" height="30" rx="4"/>
  </g>
  <text x="525" y="56" fill="#e2e8f0" font-size="11" text-anchor="middle">"8" + 4  →  "84"</text>
  <text x="525" y="94" fill="#e2e8f0" font-size="11" text-anchor="middle">"84" + 2  →  "842"</text>
  <rect x="380" y="112" width="290" height="28" rx="4" fill="#164e63"/>
  <text x="525" y="131" fill="#22d3ee" font-size="12" text-anchor="middle">result: "842"</text>

  <text x="350" y="164" fill="#fde68a" font-size="11" text-anchor="middle">Every other operator coerces to number: "8" - 4 is 4, "8" * "2" is 16, "8" / 2 is 4.</text>
  <text x="350" y="184" fill="#94a3b8" font-size="10" text-anchor="middle">Do not rely on any of it — convert explicitly with Number(), String() or a template literal.</text>
</svg>`,
  },
};

export default js;
