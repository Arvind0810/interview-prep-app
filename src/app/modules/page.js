import { Card } from "@/components/Card";

export const metadata = { title: "My OneHub Modules — Interview Prep" };

function Module({ title, route, perm, summary, owns, gotchas, talkingPoints }) {
  return (
    <Card>
      <h3 className="m-0 text-violet-400">{title}</h3>
      <p className="text-xs text-slate-400 mt-1 mb-2">
        Routes: <code>{route}</code>
        {perm ? <> • RBAC: <code>{perm}</code></> : null}
      </p>
      <p><b>Summary:</b> {summary}</p>
      <p><b>What you own:</b></p>
      <ul>{owns.map((o, i) => <li key={i}>{o}</li>)}</ul>
      {gotchas && gotchas.length > 0 && (
        <>
          <p><b>Likely interview questions on this module:</b></p>
          <ul>{gotchas.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </>
      )}
      {talkingPoints && (
        <>
          <p><b>What to say if asked &quot;walk me through this&quot;:</b></p>
          <p className="text-slate-300 italic">{talkingPoints}</p>
        </>
      )}
    </Card>
  );
}

export default function ModulesPage() {
  return (
    <>
      <h1>My OneHub Modules</h1>
      <p>
        These are the modules you actually contribute to and own end-to-end in the 1Finance OneHub
        Go/Fiber backend. Use these as your concrete reference when interviewers ask &quot;what did
        you build?&quot; or &quot;walk me through a feature you own.&quot;
      </p>
      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Important framing:</b> The full OneHub backend has ~30 feature namespaces. You are a team
        contributor. The list below is the subset you have <i>specifically owned</i> end-to-end. Be
        precise about scope — interviewers will probe.
      </p>

      <h2>Big Picture — Context to Set First</h2>
      <Card>
        <p>
          &quot;1Finance has two API ecosystems. The older one is a WordPress backend with ~141
          custom REST routes across a custom theme and roughly 30 plugins — credit-card,
          mutual-fund, debt, events, masterclass, sitemap, product-scoring all live there. We&apos;re
          progressively migrating capabilities to a newer Go/Fiber backend, which is where most of
          my work happens.
        </p>
        <p>
          On the Go side, we have around 30 feature namespaces. I&apos;m a team contributor — I own
          several modules end-to-end and contribute to others. The platform patterns we use across
          modules are consistent: Fiber router groups for namespacing, a DB-backed JWT middleware
          (<code>CheckUserDataBase</code>) that takes a permission string for endpoint-level RBAC,
          a separate static-token middleware (<code>StaticTokenAuth</code>) for internal /
          server-to-server endpoints, and per-resource body validator middleware.&quot;
        </p>
      </Card>

      <h2>Modules You Own End-to-End</h2>

      <Module
        title="1. Magazine"
        route="/magazine/v1/*"
        perm="ExportMagazineRegistrations / GetAllMagazineRegistrations / Static tokens"
        summary="Public registration endpoint plus admin tooling for the 1Finance print magazine."
        owns={[
          "Public POST register (static-token-gated so only our website can call it)",
          "Admin GET list of registrations (JWT + permission gated)",
          "Admin CSV export (JWT + permission gated)",
          "Admin GET filtered registrations (yesterday's data — for cron jobs, static-token gated)",
          "One-time encryption backfill endpoint to re-encrypt legacy plaintext rows (JWT + permission gated)",
        ]}
        gotchas={[
          "Why three different auth modes (JWT, JWT+permission, static-token) on one module?",
          "How do you ensure the encryption backfill is idempotent and safe to re-run?",
          "How would you scale CSV export if registrations grew to millions?",
          "What happens if the backfill runs partially and fails halfway?",
        ]}
        talkingPoints={'"The Magazine module has three trust tiers. The public registration endpoint accepts a static token because only our website should call it — JWT is overkill and would force users to log in. Admin endpoints use our DB-backed JWT with an explicit permission string per endpoint, so I can give the editorial team a role that can list and export but not encrypt. The encryption backfill is gated by a different static token kept only in our deployment secret store — it mutates every row, so even an admin with the right JWT permission could ruin data with one misclick. The backfill itself is idempotent: it checks each row\'s ciphertext header before re-encrypting."'}
      />

      <Module
        title="2. In-the-News V3"
        route="/in-the-news/v3/* + /news-authors + /news-publications"
        perm="ManageInTheNews"
        summary="Admin pipeline for press mentions of 1Finance, plus related Authors and Publications."
        owns={[
          "Public read endpoints: GET /v3/landing, GET /v3/archive",
          "Admin nested under /v3/admin — list, get, create, patch, delete (all JWT-gated)",
          "Admin actions: toggle type, toggle publish, refresh snapshot (open-graph metadata from source URL)",
          "Body validator middleware (ValidateInNewsBody) for create/update",
          "Related resources: news-authors and news-publications CRUD (same RBAC permission)",
          "Kept V1 routes alive for a separate internal consumer until they migrated",
        ]}
        gotchas={[
          "Why did you create V3 instead of evolving V1?",
          "Why is publish a separate PATCH endpoint instead of being part of the update body?",
          "What does 'refresh-snapshot' do — and how do you avoid blocking the admin request on an external fetch?",
          "How do you maintain V1 and V3 in parallel without divergence?",
        ]}
        talkingPoints='"V3 was a clean redesign because V1 had grown organically with flat endpoints and no body validation. I introduced separate public read endpoints (landing and archive) and a nested admin group behind one RBAC permission. Publish is a separate action because in practice editorial wants to update content multiple times before going live — making publish explicit avoids accidental releases. Snapshot refresh fetches OG metadata from the source URL; I keep it as an explicit admin action rather than auto-refreshing because the source can be flaky and I do not want to block admin save flows. V1 stayed live with its old consumers; we sunset it next quarter."'
      />

      <Module
        title="3. HR Conclave"
        route="/hr-conclave/* (V1 + V2 speaker cards)"
        perm="GetAllHrRegistrations / ManageHrConclaveSpeakers / ManageHrConclaveLogos / ManageHrConclaveNominees"
        summary="Event microsite — registrations, speakers (V1 nested schema + V2 flat rich-text), logos, nominees."
        owns={[
          "Public POST register",
          "Public GETs for speakers (V1 + V2), logos, nominees",
          "Mail send endpoint",
          "Admin CRUD for V1 speakers (nested schema)",
          "Admin CRUD for V2 speaker cards (flat schema with rich-text short_about + content) — reuses V1 RBAC permission",
          "Admin CRUD for logos and nominees with body validators",
          "Internal/dev-only encryption backfill (static-token gated) for legacy plaintext rows",
        ]}
        gotchas={[
          "Why introduce V2 speakers instead of modifying V1?",
          "Why reuse the V1 RBAC permission for V2 endpoints?",
          "How do you handle rich-text content storage and sanitization?",
          "How is the encryption backfill different from Magazine's? Why?",
        ]}
        talkingPoints='"HR Conclave V2 speakers came up because marketing wanted a flat schema with rich-text content for richer landing pages. V1 was already consumed by the live event site, so I added V2 routes side-by-side. Crucially I reused the same ManageHrConclaveSpeakers RBAC permission so existing admin roles worked immediately — that turned a schema migration into a non-event for the admin team. Body validation for V2 sanitizes the rich-text against an allowlist of tags. The encryption backfill pattern is the same template I used for Magazine — static-token-gated, idempotent."'
      />

      <Module
        title="4. Master Class"
        route="/master-class/v1/*"
        perm="MasterClassAdminEvents / MasterClassAdmin"
        summary="Educational events platform — admin event CRUD, guest CRUD, public OTP-based enrollment, audio/video delivery."
        owns={[
          "Admin event CRUD + soft delete (events permission)",
          "Admin guest CRUD + soft delete (guests permission — separate from events)",
          "Admin enrollment lists (both filtered and full)",
          "Public POST get-otp + POST enrollment + POST enrollment-validation",
          "Public GET event audio by slug + event video by slug (gated content delivery)",
          "Public POST masterclass questions + POST add-feedback",
          "Public POST get-all-events with filtering",
        ]}
        gotchas={[
          "Why are there two separate admin permissions (events vs guests)?",
          "How does the OTP flow work — where is it stored, how do you prevent brute-force?",
          "Why is content delivery (audio/video) by slug and not by ID?",
          "How would you protect audio/video URLs from being shared publicly?",
        ]}
        talkingPoints='"Two admin permissions because event ops and guest data have different sensitivity — guest contact info is PII, event content is not, so I want to give content editors event-write without exposing the guest list. The OTP flow stores hashed OTP + attempt count + expiry; we cap attempts at 5 and rotate the OTP after the cap. Audio/video delivery is slug-based because that is what marketing wants in URLs; the actual media URL we return is a short-TTL signed S3 URL so it cannot be casually shared. The enrollment-validation endpoint is what protects the actual content delivery — we check the user has a valid enrollment before returning the signed URL."'
      />

      <Module
        title="5. QFA (Qualified Financial Advisor)"
        route="/qfa/v1/*"
        perm="ManageQfa / DeleteQfa"
        summary="QFA content management — articles, full data lookups, key questions, and search."
        owns={[
          "Public POST get-all-qfa (filtered), POST get-all-data (full payload)",
          "Public GET by ID, GET search",
          "Admin CRUD with separate Manage and Delete permissions",
          "Admin CRUD for key questions (linked to QFA records)",
        ]}
        gotchas={[
          "Why is search a GET (with query params) but get-all is a POST?",
          "Why split Manage and Delete into different RBAC permissions?",
          "How does the search work — full-text, prefix, fuzzy?",
        ]}
        talkingPoints='"Get-all is a POST because the filter payload can get large enough to bump up against URL length limits and we wanted clean cacheability boundaries. Search stays GET because it is short, single-string, and CDN-cacheable. Manage and Delete are separate because delete is irreversible in our setup — I want a senior reviewer role that can edit but not destroy. Search currently runs as a Postgres ILIKE on title + body with a GIN trigram index; the next iteration moves it to a managed full-text or a dedicated search service if precision becomes an issue."'
      />

      <Module
        title="6. App Reviews + MoneySigns"
        route="/app-reviews/v1 + /admin/app-reviews/v1/*"
        perm="ManageReviews / DeleteReviews / ManageMoneySigns"
        summary="App review content and the 'money signs' personality categorization that appears alongside reviews."
        owns={[
          "Public GET app reviews",
          "Admin Review CRUD (full CRUD with separate Manage and Delete RBAC)",
          "Admin MoneySigns CRUD (separate permission)",
        ]}
        gotchas={[
          "Why is the bulk reviews endpoint a POST (get-reviews) instead of a GET?",
          "How are reviews + MoneySigns related in your data model?",
          "How would you support different MoneySigns per market / locale?",
        ]}
      />

      <Module
        title="7. App FAQ"
        route="/app-faq + /admin/app-faq"
        perm="CreateFaq / UpdateFaq / DeleteFaq / CreateFaqCategory / UpdateFaqCategory / DeleteFaqCategory"
        summary="App-facing FAQ with categories — public access via static token, admin CRUD with granular RBAC."
        owns={[
          "Public GET (static-token gated) — category-wise listing + by-slug lookup",
          "An obscured public GET /qYuvFcIbUGUczDyg endpoint (obscure-by-path pattern for legacy app versions)",
          "Admin item CRUD with separate Create/Update/Delete permissions",
          "Admin category CRUD with separate Create/Update/Delete permissions",
        ]}
        gotchas={[
          "Why split FAQ Create / Update / Delete into three separate RBAC permissions?",
          "What is the obscured-path endpoint and why does it exist?",
          "How do you handle FAQ versioning when the underlying product changes?",
        ]}
        talkingPoints='"Granular RBAC because the FAQ team is bigger than the dev team — junior content editors get Create+Update, only the team lead gets Delete. The obscure-path endpoint is a legacy access pattern for an older app version that did not support headers; we accept that it is security-through-obscurity and have it on a roadmap to retire when that app version drops below threshold. FAQ versioning is currently editorial responsibility — they soft-edit and we let the latest content win."'
      />

      <Module
        title="8. Header Search"
        route="/api/search + /api/search/click + /api/search/abandon + /api/search/add-blog-popular"
        perm="Static-token (GA4_STATIC_TOKEN) for popular blog ingestion"
        summary="Type-ahead search for the website header, with click and abandon analytics."
        owns={[
          "Public GET /search (type-ahead)",
          "Public POST /search/click (analytics)",
          "Public POST /search/abandon (analytics)",
          "Static-token-gated POST /search/add-blog-popular (called by analytics pipeline to bump popular blogs)",
        ]}
        gotchas={[
          "How do you make type-ahead search fast?",
          "What do you do with click vs abandon data?",
          "How is 'popular blogs' computed and what feeds the add-blog-popular endpoint?",
          "How do you handle multiple content types (blog, masterclass, QFA, products) in one search?",
        ]}
        talkingPoints='"Type-ahead is hit-or-miss without ranking, so we score results across content types — blog, masterclass, QFA, and products. Click and abandon events are forwarded to GA4 and also written to a sorted set in Redis so we can boost recently-clicked items. The add-blog-popular endpoint is hit by an external GA4 pipeline on a schedule with a static token — it feeds an editorial signal into the search ranker."'
      />

      <Module
        title="9. Ticker (landing page settings)"
        route="/landing-page/settings + /v1/ticker/*"
        perm="GetAllTickerInfo / CreateTickerInfo / UpdateTickerInfo / DeleteTickerInfo"
        summary="The ticker that appears at the top of the landing page — admin tooling + a public settings endpoint."
        owns={[
          "Public GET landing-page/settings (returns currently published ticker)",
          "Admin CRUD with status toggle (separate endpoint for status — same Update permission)",
        ]}
        gotchas={[
          "Why is the public endpoint named landing-page/settings instead of ticker/published?",
          "How do you ensure the landing page caches the ticker safely?",
          "What happens if two admins toggle status concurrently?",
        ]}
      />

      <Module
        title="10. Sitemap Generators"
        route="/sitemap/v1/*"
        summary="XML and JSON sitemaps for each financial product category, plus a combined site-wide XML."
        owns={[
          "Mutual Funds sitemap (JSON + XML)",
          "Health Insurance sitemap (JSON + XML)",
          "Term Insurance sitemap (JSON + XML)",
          "Credit Card sitemap (JSON + XML)",
          "Home Loan sitemap (XML)",
          "Static pages sitemap (XML)",
          "Combined all-sitemap XML",
          "NPS sitemap XML",
        ]}
        gotchas={[
          "Why expose JSON and XML for the same data?",
          "How do you avoid regenerating the full sitemap on every request?",
          "How do you handle URL counts above the 50K-per-file XML sitemap limit?",
        ]}
        talkingPoints='"JSON variants exist for our own admin UI to preview what would be included. XML is served to search engines via the sitemap index. We cache the XML output in Redis with a 6-hour TTL and a background job refreshes earlier than expiry to avoid stampedes. If any single category grows above ~40K URLs we will split it into paginated sitemap files referenced from the index."'
      />

      <Module
        title="11. CSV Bulk Imports"
        route="/csv-upload/v1/* + /credit-card/v1/import-* + /health-insurance/v1/import-* + /nps/v1/import"
        perm="ImportEquity / manageHealthInsurance / manageCC"
        summary="Admin endpoints for importing financial product catalogs from CSV."
        owns={[
          "MF Overlap import",
          "Health Insurance import + Insurance Companies import",
          "Credit Card import + Credit Card Weightages import",
          "NPS import",
        ]}
        gotchas={[
          "How do you process a large CSV upload — sync or async?",
          "How do you handle partial failures inside a CSV?",
          "How do you prevent duplicate or stale data after multiple imports?",
        ]}
        talkingPoints={'"Imports are synchronous for our current row counts but I built them so the controller is a thin wrapper over a service that takes an io.Reader — that means moving to S3-upload + background worker later is mechanical. Partial failures: we stream-parse, validate row by row, and write to a staging table inside a transaction; on success we swap the staging table\'s rows into production with an UPSERT. That gives us atomic semantics from the consumer\'s perspective."'}
      />

      <Module
        title="12. Activity Dashboard / Media Converter / Bulk Mailer / Feedback / Options"
        route="various"
        summary="Smaller utility endpoints scattered through the platform."
        owns={[
          "/activity/login + /activity/logo — internal dashboard analytics for login + logo events",
          "/media/v1/media-converter — JWT-gated media uploader that converts to WebP",
          "/mailer/v1/send-bulk-mail — admin bulk mailer",
          "/feedback/v1 — public feedback submission + admin listing",
          "/options/v1 — generic key-value options store",
          "/landing/v1/landing-sequence/:category — landing page module sequencing",
        ]}
      />

      <h2>How to Use This List in an Interview</h2>
      <Card>
        <p>
          When asked &quot;what do you work on?&quot;, do not just rattle off names. Pick one or two
          modules where you can go deepest, and lead with them. The strongest combinations are:
        </p>
        <ul>
          <li><b>Magazine</b> — best for showing auth-tier design + idempotent migrations</li>
          <li><b>In-the-News V3</b> — best for showing API-versioning and clean redesign</li>
          <li><b>HR Conclave V2 speakers</b> — best for showing backward-compatible schema evolution</li>
          <li><b>Master Class</b> — best for showing OTP/auth + signed-URL content delivery</li>
        </ul>
        <p>
          For depth questions, lean on the actual patterns you use: Fiber router groups,
          CheckUserDataBase permission-keyed RBAC, StaticTokenAuth for internal endpoints,
          per-resource body validators, and the V1↔V3 coexistence pattern during migrations.
        </p>
      </Card>
    </>
  );
}
