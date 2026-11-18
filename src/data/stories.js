// STAR stories drawn from Arvind's real work (see /modules, /intro and the company pages).
// Anything in [brackets] is a fact only you can supply — fill it in before you use the story.
// Never replace a bracket with a number you cannot defend under three follow-up questions.

export const STORY_THEMES = [
  "Technical decision / trade-off",
  "Security & data protection",
  "Migration without breaking things",
  "Stakeholder / non-technical ask",
  "Performance",
  "Handling messy or ambiguous input",
  "Learning a complex system fast",
  "Failure / mistake",
];

export const STORIES = [
  {
    id: "latency",
    title: "Cutting API latency ~40% with query rewrites and a Redis layer",
    source: "1Finance platform APIs",
    themes: ["Performance", "Technical decision / trade-off"],
    answers: [
      "Tell me about a performance problem you solved.",
      "Your proudest technical achievement?",
      "Tell me about a time you used data to make a decision.",
    ],
    situation:
      "On the 1Finance Go/Fiber platform, [which endpoint / page] was slow — p95 around [X ms] — and it sat on a page users hit constantly.",
    task: "I was asked to bring the latency down without changing the response contract the frontend depended on.",
    action: [
      "Ran EXPLAIN ANALYZE on the hot queries and found [the specific problem: sequential scan / N+1 / missing composite index].",
      "Rewrote [the query] and added [the index], so the planner switched from [old plan] to [new plan].",
      "Added a Redis cache-aside layer keyed on [cache key] with a [TTL] TTL, because that data changes [how often].",
      "Decided what NOT to cache: [the data that must stay fresh, e.g. calculator output] — freshness beat speed there.",
    ],
    result:
      "p95 went from [X ms] to [Y ms], about 40%. [Any second-order effect: DB CPU, fewer timeouts.] I learned to measure before touching anything — the first thing I suspected was not the bottleneck.",
    ownership: "This is yours. Use 'I'. But you must be able to name the query, the plan change, the cache key and the TTL — otherwise the 40% reads as inflation.",
    followUps: [
      { q: "How did you measure 40%? Which percentile?", a: "Name the tool and the percentile. If it was average, say average — and say p95 is what you'd use now." },
      { q: "How do you invalidate that cache?", a: "TTL plus [explicit delete on admin write, if true]. Name the staleness you accepted and why it was acceptable." },
      { q: "What about a cache stampede when the key expires?", a: "Single-flight / lock-on-miss, or early background refresh. Say which you did — or that you would add it if traffic grew." },
    ],
  },
  {
    id: "trust-tiers",
    title: "Three auth modes on one module — matching trust to the caller",
    source: "Magazine module (/magazine/v1)",
    themes: ["Security & data protection", "Technical decision / trade-off"],
    answers: [
      "Tell me about a design decision you made and why.",
      "How do you approach security in an API you build?",
      "Tell me about a time you pushed back on a simpler approach.",
    ],
    situation:
      "The Magazine module had very different callers: anonymous website visitors registering, an editorial team that lists and exports registrations, cron jobs pulling yesterday's data, and a one-off encryption backfill.",
    task: "Design access so each caller gets exactly what it needs and nothing more — without forcing website visitors to log in.",
    action: [
      "Public registration: static-token gated, so only our website can call it — JWT would have forced a login for no benefit.",
      "Admin list and export: our DB-backed JWT middleware (CheckUserDataBase) with a permission string per endpoint, so editorial can export but not run destructive operations.",
      "Cron data pull: its own static token, so a leaked admin session can't be replayed against it.",
      "Encryption backfill: a separate token held only in the deployment secret store, because it rewrites every row.",
    ],
    result:
      "Each role got least privilege by default, and [outcome — e.g. editorial self-served exports without dev tickets]. The pattern became the template for the HR Conclave backfill too.",
    ownership: "Yours end to end.",
    followUps: [
      { q: "Isn't a static token on a public endpoint just security through obscurity?", a: "Partly — it stops casual abuse, not a determined attacker who reads the bundle. Name the other layers: rate limiting, validation, [CAPTCHA if any]." },
      { q: "How do you rotate those tokens?", a: "Say how it is actually done today. If it's manual, say so and how you'd improve it." },
    ],
  },
  {
    id: "backfill",
    title: "An idempotent encryption backfill on live data",
    source: "Magazine + HR Conclave",
    themes: ["Security & data protection", "Migration without breaking things"],
    answers: [
      "Tell me about a risky change you made in production.",
      "How do you migrate data safely?",
      "Tell me about a time you had to be very careful.",
    ],
    situation: "Legacy registration rows held PII in plaintext. New rows were being encrypted with AES-256-GCM, so the table was a mix of both.",
    task: "Encrypt every legacy row without downtime, without double-encrypting, and safely re-runnable if it died halfway.",
    action: [
      "Made it idempotent: the job checks each row's ciphertext header and skips anything already encrypted.",
      "Processed in batches of [N] so a failure loses one batch, not the whole run, and progress is resumable.",
      "Gated the endpoint behind a dedicated static token, separate from admin JWTs.",
      "[How you verified: dry run count, sample decrypt, row counts before and after.]",
    ],
    result: "[N] legacy rows encrypted with zero downtime; the run [was / could be] repeated safely. The same template was reused for HR Conclave.",
    ownership: "Yours. Be exact about which tables and how many rows.",
    followUps: [
      { q: "What if it crashed halfway?", a: "Re-run it. The ciphertext check makes already-done rows a no-op — that's the whole point of idempotency." },
      { q: "Where does the key live? How would you rotate it?", a: "Name the real location (env / secret store). Rotation: key ID in the header, re-encrypt in the background with the same backfill pattern." },
    ],
  },
  {
    id: "v3-migration",
    title: "Shipping In-the-News V3 alongside a V1 that still had consumers",
    source: "In-the-News V3",
    themes: ["Migration without breaking things", "Technical decision / trade-off"],
    answers: [
      "Tell me about a time you redesigned something.",
      "How do you handle breaking API changes?",
      "Tell me about a time you balanced speed against doing it right.",
    ],
    situation: "V1 of the press-mentions API had grown organically: flat endpoints, no body validation, and an internal consumer we did not control.",
    task: "Give editorial a cleaner admin flow without breaking that consumer.",
    action: [
      "Built V3 as a new route group instead of mutating V1 — public landing/archive reads plus a nested admin group behind one permission (ManageInTheNews).",
      "Added a body validator middleware (ValidateInNewsBody) so bad input dies at the edge.",
      "Made publish an explicit action, separate from update, because editors save drafts many times before going live.",
      "Kept snapshot refresh (OG metadata) as an explicit admin action so a flaky source site never blocks a save.",
      "Left V1 running until [the consumer] migrated, then [retired it / it is still scheduled for retirement].",
    ],
    result: "No consumer broke during the migration, and [outcome — e.g. no more accidental publishes].",
    ownership: "Yours.",
    followUps: [
      { q: "How did you stop V1 and V3 data drifting apart?", a: "Same underlying table / one write path — say which is true." },
      { q: "Why not version with a header instead of the URL?", a: "URL versioning is visible, cache-friendly and easy for consumers to grep. Header versioning is cleaner but harder to debug." },
    ],
  },
  {
    id: "speaker-v2",
    title: "Turning a marketing schema change into a non-event for admins",
    source: "HR Conclave speaker cards V2",
    themes: ["Stakeholder / non-technical ask", "Migration without breaking things"],
    answers: [
      "Tell me about working with a non-technical stakeholder.",
      "Tell me about a requirement that changed late.",
      "How do you make sure your change doesn't disrupt users?",
    ],
    situation: "Marketing wanted richer speaker pages — a flat schema with rich-text content — but the live event site was already reading V1's nested schema.",
    task: "Deliver the new format [before the event date] without breaking the live site or retraining the admin team.",
    action: [
      "Added V2 speaker routes side by side with V1 rather than changing V1 under the live site.",
      "Reused the existing ManageHrConclaveSpeakers permission, so every existing admin role worked on day one — no access requests, no role changes.",
      "Sanitised the rich-text fields against a tag allowlist, because admin input renders straight onto a public page.",
    ],
    result: "Marketing got the pages [by date], admins had zero onboarding, and the live site never noticed.",
    ownership: "Yours.",
    followUps: [
      { q: "Why trust admins less than that — they're internal?", a: "Admin accounts get phished. Stored XSS on a public page is the attacker's best outcome. Sanitise on write, escape on render." },
    ],
  },
  {
    id: "otp-pii",
    title: "Separating PII access from content access in Master Class",
    source: "Master Class events & OTP enrollment",
    themes: ["Security & data protection", "Technical decision / trade-off"],
    answers: [
      "How do you protect personal data?",
      "Walk me through a feature you built end to end.",
    ],
    situation: "Master Class had events, guests (with contact details) and OTP-gated enrollment that unlocked audio and video.",
    task: "Let content editors manage events without exposing the guest list, and stop enrollment from being brute-forced or bypassed.",
    action: [
      "Split admin RBAC into an events permission and a guests permission — guest data is PII, event copy is not.",
      "OTP: stored hashed with an attempt counter and expiry; [cap of N attempts] then the OTP rotates.",
      "Media delivered only after enrollment validation, via [short-TTL signed URLs — confirm this is how it actually works].",
    ],
    result: "[Outcome — e.g. editors self-serve event changes; no guest-data access outside the ops role.]",
    ownership: "Yours. Double-check the signed-URL detail before you say it.",
    followUps: [
      { q: "What stops someone sharing the video URL?", a: "Short TTL on the URL. Be honest: within the TTL it can be shared — full DRM was not worth the cost here." },
      { q: "Why hash an OTP that only lives for minutes?", a: "Because a DB read (backup, logs, SQL injection) shouldn't be enough to enroll as someone else." },
    ],
  },
  {
    id: "csv-imports",
    title: "Bulk CSV imports that fail loudly, not silently",
    source: "CSV bulk imports (MF overlap, insurance, credit cards, NPS)",
    themes: ["Handling messy or ambiguous input"],
    answers: [
      "Tell me about dealing with bad data.",
      "Tell me about a time requirements were unclear.",
    ],
    situation: "Analysts update financial product catalogues — mutual-fund overlap, health insurance, credit cards and weightages, NPS — by uploading CSVs that are often hand-edited.",
    task: "Make imports safe: no half-applied catalogues, and clear errors analysts can fix themselves.",
    action: [
      "[Validate every row before writing / write inside one transaction — say which you actually do.]",
      "Return row-level errors (row number + field + reason) instead of a generic 400.",
      "[How duplicates and re-imports are handled: upsert on natural key / replace-all.]",
    ],
    result: "[Outcome — e.g. analysts fix their own files without a dev ticket.]",
    ownership: "Yours — but fill in the transaction behaviour truthfully; it's the first follow-up.",
    followUps: [
      { q: "What happens with a 500k-row file?", a: "Move to async: upload to storage, background worker, a progress endpoint, chunked commits." },
      { q: "All-or-nothing, or partial success?", a: "Know which yours is, and argue for it: catalogues should be all-or-nothing, so the site never shows half a dataset." },
    ],
  },
  {
    id: "ledger-learning",
    title: "Getting productive on a complex money-moving system I didn't design",
    source: "India HR Conclave community platform (contributor)",
    themes: ["Learning a complex system fast"],
    answers: [
      "Tell me about a time you had to learn something quickly.",
      "How do you get up to speed on an unfamiliar codebase?",
      "Tell me about working in a distributed system.",
    ],
    situation: "I joined the India HR Conclave platform as a contributor: nine Go services, Kafka with a transactional outbox, and a points ledger where one point is one rupee.",
    task: "Ship [your specific piece of work] without being the person who double-credits money.",
    action: [
      "Read the one write path for money (ledger.Apply) first: row lock, idempotency key checked before the sufficiency check, relative balance update.",
      "Traced one event from outbox row to consumer to understand why consumers re-read the source row rather than trusting the event.",
      "Built [your piece] on those rules instead of around them.",
    ],
    result: "[What you shipped and how it behaved.] I can now explain why each piece of that design exists — which is the real proof of having learned it.",
    ownership: "CONTRIBUTOR, not designer. Say 'I worked on' and 'the design is X, and here's why I think it's right'. Never 'I built the ledger'.",
    followUps: [
      { q: "Why not just update a balance column?", a: "No audit trail, no safe retries, and corrections destroy history. Append-only ledger + reversing entries fixes all three." },
      { q: "What did you personally build?", a: "Have a one-sentence answer ready. This question decides whether the story counts." },
    ],
  },
  {
    id: "failure",
    title: "YOUR FAILURE STORY — write this one yourself",
    source: "Every loop asks for it",
    themes: ["Failure / mistake"],
    answers: [
      "Tell me about a time you failed.",
      "Tell me about a mistake you made in production.",
      "What's a piece of feedback that changed how you work?",
    ],
    situation: "[A real mistake: a bad deploy, a wrong estimate, a missed edge case, a misread requirement. It must be real and must have had a cost.]",
    task: "[What was at stake.]",
    action: [
      "[How you noticed — ideally you raised it yourself.]",
      "[What you did immediately to stop the damage.]",
      "[What you changed afterwards so it can't recur: a check, a test, a review step.]",
    ],
    result: "[The concrete process change, still in use today.]",
    ownership: "No blaming teammates, QA or 'unclear requirements'. Interviewers score self-awareness here, not the mistake.",
    followUps: [
      { q: "What would you do differently?", a: "One specific thing — not 'communicate more'." },
    ],
  },
];
