export const metadata = { title: "Software Engineer + Technical PM — Capital Markets Fintech" };

export default function SoftwareEngineerPMPage() {
  return (
    <>
      <h1>Software Engineer (+ Technical PM Track) — Capital Formation Fintech</h1>
      <p>
        <strong>Location:</strong> Lower Parel, Mumbai · Full-time<br />
        <strong>Domain:</strong> Capital markets fintech for real estate, infrastructure, social infrastructure &amp; energy<br />
        <strong>Role shape:</strong> First in-house engineer — hands-on builder evolving into Technical PM<br />
        <strong>Core Tech Stack:</strong> Next.js 14 (App Router) + TypeScript, NestJS, Supabase (PostgreSQL, Auth, Storage), Prisma, Tailwind CSS, Railway<br />
        <strong className="text-amber-400">NON-NEGOTIABLE:</strong> Daily, fluent use of Claude Code / Codex for AI-assisted development. Speed of shipping is the #1 value.
      </p>

      <h2>What the Company Builds</h2>
      <p>
        The company is building the digital backbone for capital formation in four large but unorganized sectors —
        real estate, infrastructure, social infrastructure, and energy. Today these industries raise capital through
        personal contacts, spreadsheets, and opaque relationship-driven processes. The product brings structure,
        transparency, and speed via two platforms on a single intelligent matching engine:
      </p>
      <ul>
        <li><strong>The Deal Hub (Equity):</strong> An AI-powered marketplace that matches project owners/founders with investment bankers and investors based on sector, stage, deal size, and geography. It digitizes the whole deal lifecycle — valuation, secure data rooms, due diligence, and closure.</li>
        <li><strong>The Credit Hub (Debt):</strong> Mirrors offline lending — instead of connecting a borrower directly to a lender, it matches a borrower to the right debt syndicator (DSA), who then approaches the lender and runs the process end to end.</li>
        <li><strong>Admin &amp; Connection portals:</strong> Round out the platform. All four portals live in one Next.js app.</li>
      </ul>

      <h2>The Role &amp; Work Structure</h2>
      <p>
        This is the company&apos;s <strong>first in-house engineer</strong>. The core platform is built by an external
        development agency, but they need someone in-house who understands the product deeply, owns the project from
        their side, and builds key pieces (especially wireframes and MVPs) directly. It is a <strong>hybrid engineering +
        technical project management</strong> role — you start as a hands-on builder shoulder-to-shoulder with the
        Founder and grow into owning the technical roadmap and managing the agency relationship.
      </p>
      <table>
        <thead>
          <tr><th>Responsibility</th><th>What it looks like day-to-day</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Build in-house</strong></td><td>Wireframes, prototypes, and MVP components for fast iteration — using Claude Code to move at speed.</td></tr>
          <tr><td><strong>Translate vision</strong></td><td>Work directly with the Founder to turn product vision into clear, buildable specs.</td></tr>
          <tr><td><strong>Manage the agency</strong></td><td>Review the external agency&apos;s work for quality, timelines, and architecture.</td></tr>
          <tr><td><strong>Own delivery</strong></td><td>Scope, track progress, unblock, and ship the project end to end.</td></tr>
          <tr><td><strong>Hold the whole picture</strong></td><td>Understand both hubs deeply enough to make sound technical decisions across the platform.</td></tr>
        </tbody>
      </table>

      <h2>Job Description Breakdown &amp; Strategy</h2>
      <p>Here are the themes the Founder will probe and how to prepare for each:</p>
      <ol>
        <li>
          <strong>Claude Code / AI-assisted shipping (the gate):</strong>
          <ul>
            <li><strong>JD Expectation:</strong> &quot;If you don&apos;t already use Claude Code / Codex daily, this role isn&apos;t the right fit.&quot;</li>
            <li><strong>Preparation:</strong> Be ready to walk through your real Claude Code workflow — how you scope a feature, drive the agent with context (CLAUDE.md, plan mode, subagents), review its output critically, and keep velocity high without shipping slop. Bring concrete examples of things you shipped fast with it.</li>
          </ul>
        </li>
        <li>
          <strong>TypeScript + Next.js + NestJS full-stack depth:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Strong TypeScript; React/Next.js front end; Node.js backend (NestJS ideal).</li>
            <li><strong>Preparation:</strong> App Router server vs client components, NestJS module/provider/DI model, REST API design, and how the Next.js front end talks to the NestJS API.</li>
          </ul>
        </li>
        <li>
          <strong>PostgreSQL + Prisma + Supabase:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Comfort with PostgreSQL and an ORM (Prisma ideal); bonus for Supabase (Auth, Storage, Postgres).</li>
            <li><strong>Preparation:</strong> Prisma schema/migrations, relations and avoiding N+1, Supabase Auth JWTs, Row Level Security, Storage buckets + signed URLs, and pooled vs direct connections.</li>
          </ul>
        </li>
        <li>
          <strong>Wireframe → MVP → product:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Take a feature from wireframe to MVP to working product.</li>
            <li><strong>Preparation:</strong> Show a repeatable process: clarify the user problem, sketch the flow, build a thin vertical slice, validate with the Founder, then harden. Tailwind for rapid UI.</li>
          </ul>
        </li>
        <li>
          <strong>Technical project management:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Manage and review the agency, own scope/timeline/architecture, drive delivery.</li>
            <li><strong>Preparation:</strong> How you review external code, set architecture guardrails, track delivery, and communicate trade-offs to a non-technical Founder.</li>
          </ul>
        </li>
        <li>
          <strong>Domain &amp; ownership in ambiguity:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Self-starter who thrives on speed, ownership, and ambiguity; bonus for fintech / capital markets / lending / real estate exposure.</li>
            <li><strong>Preparation:</strong> Map your end-to-end ownership stories. Speak to financial data correctness, audit trails, and secure document handling — directly relevant to deal rooms and due diligence.</li>
          </ul>
        </li>
      </ol>

      <h2>Preparation Guide — Recommended 10-Day Sprint</h2>
      <table>
        <thead>
          <tr><th>Days</th><th>Focus</th><th>Outcome</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Claude Code workflow story + the company&apos;s product (Deal Hub / Credit Hub / matching engine)</td><td>Crisp AI-dev narrative; can explain both hubs in plain English</td></tr>
          <tr><td>2–3</td><td>TypeScript depth + Next.js 14 App Router (server/client components, data fetching, route handlers)</td><td>Front-end fluency on their exact stack</td></tr>
          <tr><td>4–5</td><td>NestJS (modules, providers, DI, guards, pipes) + REST API design</td><td>Backend architecture confidence</td></tr>
          <tr><td>6–7</td><td>Prisma + PostgreSQL (schema, migrations, relations, indexing) + Supabase (Auth, RLS, Storage)</td><td>Data layer mastery</td></tr>
          <tr><td>8</td><td>Financial data correctness, secure data rooms, RBAC across 4 portals, Railway deploy + env</td><td>Domain-aware system design</td></tr>
          <tr><td>9</td><td>Technical PM scenarios — reviewing agency work, roadmap, unblocking</td><td>PM-track readiness</td></tr>
          <tr><td>10</td><td>Behavioral / ownership / ambiguity stories (STAR) + mock with all questions below</td><td>Interview-ready</td></tr>
        </tbody>
      </table>

      <h2>Relevant Curriculum (map to your existing reading materials)</h2>
      <ul>
        <li><strong>TypeScript &amp; Next.js / React:</strong> see <a href="/nextjs">Next.js &amp; React</a> — focus on App Router, server components, and route handlers.</li>
        <li><strong>NestJS &amp; Node.js:</strong> see <a href="/nodejs">Node.js &amp; NestJS</a> — modules, dependency injection, guards.</li>
        <li><strong>PostgreSQL &amp; SQL:</strong> see <a href="/postgresql">PostgreSQL &amp; SQL</a> — indexing, transactions, query optimization (Prisma sits on top of this).</li>
        <li><strong>System Design:</strong> see <a href="/sysdesign">System Design</a> — for the matching engine, data rooms, and multi-portal architecture.</li>
        <li><strong>Fintech Domain:</strong> see <a href="/fintech">Fintech Domain</a> — money handling, audit trails, compliance.</li>
        <li><strong>Microservices &amp; APIs:</strong> see <a href="/microservices">Microservices &amp; APIs</a> — REST design, idempotency, integration reliability.</li>
        <li><strong>Behavioral &amp; STAR:</strong> see <a href="/behavioral">Behavioral &amp; STAR</a> — ownership and ambiguity stories.</li>
      </ul>

      <h2>Top Interview Questions &amp; Answers (27)</h2>

      <h3 className="text-cyan-400">AI-Assisted Development (Claude Code)</h3>

      <details><summary>1. Walk me through how you actually use Claude Code day-to-day to ship fast.</summary>
        <p><strong>Answer:</strong></p>
        <p>I treat Claude Code as a fast pair-programmer that I steer, not autopilot. My loop is:</p>
        <ul>
          <li><strong>Set context once:</strong> I keep a <code>CLAUDE.md</code> at the repo root documenting the stack, conventions, commands, and gotchas. That stops the agent from guessing and keeps output on-pattern.</li>
          <li><strong>Plan before code:</strong> For anything non-trivial I have it produce a plan first (files to touch, approach, trade-offs), correct the plan, then let it implement. Cheaper to fix a plan than a diff.</li>
          <li><strong>Thin vertical slices:</strong> I scope work to one buildable slice — e.g. &quot;create-deal form → NestJS endpoint → Prisma write → list view&quot; — so I can verify behavior, not just compilation.</li>
          <li><strong>Review critically:</strong> I read every diff. The risk with AI dev isn&apos;t that it can&apos;t write code, it&apos;s that it writes plausible-but-wrong code. I check edge cases, auth, and data correctness myself.</li>
          <li><strong>Parallelize:</strong> I delegate independent research/exploration to subagents so my main context stays focused on the change.</li>
        </ul>
        <p>The result is I take features from wireframe to working MVP in hours instead of days — which is exactly the speed this role is asking for.</p>
      </details>

      <details><summary>2. How do you keep AI-generated code from becoming unmaintainable slop?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Conventions as guardrails:</strong> Linting, formatting, and a documented file/module layout in <code>CLAUDE.md</code> mean generated code matches the existing patterns instead of inventing new ones.</li>
          <li><strong>Scope discipline:</strong> I instruct it to make the minimal change for the task — no speculative abstractions, no drive-by refactors. Three similar lines beat a premature abstraction.</li>
          <li><strong>Tests &amp; manual verification:</strong> I verify the feature actually works in the browser/API, not just that it compiles. For backend logic I have it write tests alongside.</li>
          <li><strong>I own the architecture:</strong> The agent implements; the design decisions (boundaries, data model, auth) are mine. That keeps the codebase coherent even at high velocity.</li>
        </ul>
      </details>

      <h3 className="text-cyan-400">TypeScript, Next.js &amp; NestJS</h3>

      <details><summary>3. In Next.js 14 App Router, when do you use a Server Component vs a Client Component?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Server Components (default):</strong> For anything that fetches data, touches secrets, or renders static/derived content. They run on the server, never ship their code to the browser, and can <code>await</code> data directly. For the Deal Hub I&apos;d render the deal list and detail pages as server components — fast first paint, no API keys exposed.</li>
          <li><strong>Client Components (<code>&quot;use client&quot;</code>):</strong> Only where I need interactivity, state, effects, or browser APIs — forms, filters, modals, the document-room viewer. I push the <code>&quot;use client&quot;</code> boundary as low as possible so most of the tree stays server-rendered.</li>
        </ul>
<pre><code>{`// app/deals/page.tsx  — Server Component
export default async function DealsPage() {
  const deals = await getDeals();           // runs on server
  return <DealList deals={deals} />;          // pass data down
}

// components/DealFilters.tsx — Client Component
"use client";
import { useState } from "react";
export function DealFilters({ onChange }) {
  const [sector, setSector] = useState("all");
  // interactive filtering lives here
}`}</code></pre>
      </details>

      <details><summary>4. How do you connect the Next.js front end to the NestJS API cleanly?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Typed contract:</strong> I share types between front end and back end (a shared package or generated types) so a NestJS DTO change surfaces as a TypeScript error in the UI, not a runtime bug.</li>
          <li><strong>Fetch on the server when possible:</strong> Server Components call the NestJS API with the user&apos;s token attached server-side, so I never leak credentials to the browser.</li>
          <li><strong>Single API client:</strong> One wrapper that attaches the Supabase JWT, sets base URL from env, and maps error shapes to friendly messages — instead of scattering <code>fetch</code> calls everywhere.</li>
          <li><strong>Route Handlers as a thin BFF:</strong> For browser-only mutations I expose Next.js route handlers that forward to NestJS, keeping the token handling in one place.</li>
        </ul>
      </details>

      <details><summary>5. Explain NestJS&apos;s module / provider / dependency-injection model.</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Modules</strong> group related features (e.g. <code>DealsModule</code>, <code>CreditModule</code>, <code>AuthModule</code>). Each declares its controllers and providers and what it exports.</li>
          <li><strong>Providers</strong> are injectable classes — services, repositories, the Prisma client. NestJS resolves them through its IoC container.</li>
          <li><strong>Dependency Injection:</strong> I depend on abstractions and let Nest wire them, which makes services testable (I can inject a mock Prisma in unit tests).</li>
        </ul>
<pre><code>{`@Module({
  controllers: [DealsController],
  providers: [DealsService, PrismaService],
  exports: [DealsService],
})
export class DealsModule {}

@Injectable()
export class DealsService {
  constructor(private readonly prisma: PrismaService) {}

  findForInvestor(investorId: string) {
    return this.prisma.deal.findMany({ where: { matchedInvestorId: investorId } });
  }
}`}</code></pre>
      </details>

      <details><summary>6. How would you design the REST API for creating and matching a deal?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Resource-oriented routes:</strong> <code>POST /deals</code>, <code>GET /deals/:id</code>, <code>GET /deals?sector=&amp;stage=&amp;minSize=</code>, <code>POST /deals/:id/matches</code>.</li>
          <li><strong>Validation at the edge:</strong> NestJS DTOs with <code>class-validator</code> so bad input is rejected with a 400 before it reaches business logic.</li>
          <li><strong>Consistent envelope &amp; status codes:</strong> 201 on create, 200 on read, 400/401/403/404/409 mapped by error category — never 200 for an error.</li>
          <li><strong>Idempotency on money-adjacent writes:</strong> Accept an idempotency key so a retried &quot;commit deal&quot; doesn&apos;t double-record.</li>
        </ul>
<pre><code>{`export class CreateDealDto {
  @IsString() @MaxLength(200) title: string;
  @IsEnum(Sector) sector: Sector;
  @IsEnum(Stage) stage: Stage;
  @IsInt() @Min(0) dealSize: number;     // store in smallest unit
  @IsString() geography: string;
}`}</code></pre>
      </details>

      <details><summary>7. Give a TypeScript example of modeling the two hubs with a discriminated union.</summary>
        <p><strong>Answer:</strong></p>
        <p>A discriminated union lets the compiler force me to handle each hub correctly — no &quot;forgot the debt case&quot; bugs.</p>
<pre><code>{`type EquityDeal = {
  kind: "equity";
  investorId: string;
  valuation: number;
};

type DebtDeal = {
  kind: "debt";
  syndicatorId: string;     // DSA, not a direct lender
  facilityType: "working_capital" | "project_finance" | "growth_debt";
};

type Deal = EquityDeal | DebtDeal;

function route(deal: Deal) {
  switch (deal.kind) {
    case "equity": return matchToInvestor(deal.investorId);
    case "debt":   return matchToSyndicator(deal.syndicatorId);
    // TS errors if a new kind is added and not handled
  }
}`}</code></pre>
      </details>

      <h3 className="text-cyan-400">PostgreSQL, Prisma &amp; Supabase</h3>

      <details><summary>8. Sketch a Prisma schema for the Deal Hub core.</summary>
        <p><strong>Answer:</strong></p>
        <p>I model the actors and the deal, with explicit enums for sector/stage and indexes on the columns the matching engine filters by.</p>
<pre><code>{`model Deal {
  id            String   @id @default(uuid())
  title         String
  sector        Sector
  stage         Stage
  dealSize      BigInt   // smallest currency unit — never float
  geography     String
  ownerId       String
  owner         User     @relation(fields: [ownerId], references: [id])
  status        DealStatus @default(DRAFT)
  createdAt     DateTime @default(now())

  @@index([sector, stage, geography])   // matching-engine filters
  @@index([ownerId])
}

enum Sector { REAL_ESTATE INFRA SOCIAL_INFRA ENERGY }
enum Stage  { SEED GROWTH LATE }
enum DealStatus { DRAFT OPEN IN_DILIGENCE CLOSED }`}</code></pre>
        <p>Note <code>BigInt</code> for money — I never store currency as a float.</p>
      </details>

      <details><summary>9. How do you avoid N+1 queries with Prisma?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Use <code>include</code> / <code>select</code></strong> to fetch relations in one round-trip instead of looping and querying per row.</li>
          <li><strong>Batch lookups</strong> with <code>findMany({"{"} where: {"{"} id: {"{"} in: ids {"}"} {"}"} {"}"})</code> rather than a query inside a <code>.map()</code>.</li>
          <li><strong>Verify</strong> with Prisma query logging — if I see one query per item, that&apos;s the smell.</li>
        </ul>
<pre><code>{`// Bad: N+1 — one query per deal
const deals = await prisma.deal.findMany();
for (const d of deals) {
  d.owner = await prisma.user.findUnique({ where: { id: d.ownerId } });
}

// Good: single query with the relation joined
const deals = await prisma.deal.findMany({
  include: { owner: true },
});`}</code></pre>
      </details>

      <details><summary>10. What is Supabase Row Level Security and why does it matter here?</summary>
        <p><strong>Answer:</strong></p>
        <p>RLS enforces access rules in the database itself, so even a bug in the API can&apos;t leak another tenant&apos;s data — critical when deal rooms contain confidential financials.</p>
        <ul>
          <li>Policies are SQL predicates checked on every row for every query, scoped to the authenticated user (<code>auth.uid()</code>).</li>
          <li>I&apos;d let only a deal&apos;s owner and explicitly invited investors read its documents.</li>
        </ul>
<pre><code>{`-- Only the owner or an invited participant can read a deal's documents
create policy "deal_docs_read"
on deal_documents for select
using (
  auth.uid() = owner_id
  or auth.uid() in (
    select investor_id from deal_invites where deal_id = deal_documents.deal_id
  )
);`}</code></pre>
        <p>The caveat: when I use Prisma with a service-role connection, RLS is bypassed — so authorization must then be enforced in NestJS guards. I&apos;m explicit about which path each query takes.</p>
      </details>

      <details><summary>11. How do you handle secure document uploads for data rooms with Supabase Storage?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Private buckets, never public:</strong> Due-diligence documents go in a private bucket. Nothing is world-readable.</li>
          <li><strong>Signed URLs with short TTLs:</strong> The backend generates a time-limited signed URL only after checking the requester is authorized for that deal. The link expires in minutes.</li>
          <li><strong>Authorize before signing:</strong> The NestJS guard confirms the user is the owner or an invited participant before issuing the URL.</li>
          <li><strong>Audit every access:</strong> I log who requested which document and when — diligence requires a paper trail.</li>
        </ul>
<pre><code>{`// NestJS: only sign after an auth check
async getDocumentUrl(userId: string, docId: string) {
  const doc = await this.deals.assertCanAccess(userId, docId); // throws 403 otherwise
  const { data } = await this.supabase
    .storage.from("deal-docs")
    .createSignedUrl(doc.path, 60 * 5); // 5-minute link
  await this.audit.record(userId, "doc.view", docId);
  return data.signedUrl;
}`}</code></pre>
      </details>

      <details><summary>12. Explain pooled vs direct Supabase Postgres connections and why it matters with Prisma.</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Pooled (PgBouncer, transaction mode):</strong> Use this for the serverless/runtime path — short-lived requests share a small pool, which prevents exhausting Postgres connections under load.</li>
          <li><strong>Direct connection:</strong> Use this for <code>prisma migrate</code> and any operation needing prepared statements / a session, which the transaction pooler doesn&apos;t support.</li>
          <li><strong>In practice:</strong> I set <code>DATABASE_URL</code> to the pooled connection (with <code>pgbouncer=true</code>) and <code>DIRECT_URL</code> to the direct connection in <code>schema.prisma</code> so migrations and runtime each use the right one.</li>
        </ul>
<pre><code>{`datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")     // pooled — runtime
  directUrl = env("DIRECT_URL")       // direct — migrations
}`}</code></pre>
      </details>

      <details><summary>13. How do you design indexes for the matching engine&apos;s filtered search?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li>The engine filters deals by <strong>sector, stage, deal size, and geography</strong>, so I add a composite index covering the common filter combination (respecting the left-most prefix rule).</li>
          <li>I run <code>EXPLAIN ANALYZE</code> on the real query to confirm it uses the index instead of a sequential scan.</li>
          <li>For range filters like deal size I order the composite index so equality columns come first, then the range column last.</li>
          <li>As data grows I&apos;d consider partial indexes (e.g. only <code>status = OPEN</code> deals, since closed ones are rarely searched).</li>
        </ul>
      </details>

      <details><summary>14. How do you run Prisma migrations safely against a live database?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Migrations in version control:</strong> <code>prisma migrate dev</code> locally generates a reviewable SQL migration; <code>prisma migrate deploy</code> applies it in CI/prod.</li>
          <li><strong>Expand/contract for breaking changes:</strong> Add the new column nullable, backfill, switch reads/writes, then drop the old column in a later migration — never a single destructive step on a live table.</li>
          <li><strong>Backfills are idempotent and batched</strong> so reruns are safe and a long migration doesn&apos;t lock the table.</li>
          <li><strong>Use the direct connection</strong> for migrations (not the transaction pooler).</li>
        </ul>
      </details>

      <h3 className="text-cyan-400">Auth, Security &amp; Financial Correctness</h3>

      <details><summary>15. How does Supabase Auth work and how do you protect a NestJS route with it?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li>Supabase Auth issues a signed JWT on email/password login. The front end sends it as <code>Authorization: Bearer &lt;token&gt;</code>.</li>
          <li>In NestJS I write a guard that verifies the JWT signature against Supabase&apos;s JWT secret/JWKS, extracts the user id and role from claims, and attaches the user to the request.</li>
          <li>Verification is stateless — no DB round-trip per request — and I layer an RBAC check on top for portal-specific permissions.</li>
        </ul>
<pre><code>{`@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new UnauthorizedException();
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    return true;
  }
}`}</code></pre>
      </details>

      <details><summary>16. There are four portals (Deal Hub, Credit Hub, Admin, Connection). How do you do role-based access cleanly?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>One identity, scoped roles:</strong> A user has a role plus the portals/permissions they&apos;re entitled to. I encode role in the JWT and keep fine-grained permissions in the DB.</li>
          <li><strong>Guard + decorator pattern in NestJS:</strong> A <code>@Roles(&apos;admin&apos;)</code> decorator with a <code>RolesGuard</code> declares the requirement at the route, applied at the controller level so it&apos;s auditable rather than copy-pasted per handler.</li>
          <li><strong>Defense in depth:</strong> RBAC in the API plus RLS in Postgres, so a misconfigured route still can&apos;t leak cross-portal data.</li>
          <li><strong>Never trust the front end</strong> for authorization — hiding a button is UX, not security.</li>
        </ul>
      </details>

      <details><summary>17. How do you handle money correctly in this platform?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Never use floats.</strong> Floating point can&apos;t represent decimal currency exactly. I store amounts as integers in the smallest unit (paise) using <code>BigInt</code>, or Postgres <code>NUMERIC</code> for fractional rates.</li>
          <li><strong>Compute in integer space</strong> and format to currency only at the display edge.</li>
          <li><strong>Wrap multi-step writes in a transaction</strong> so a partial failure (e.g. record deal closure + write ledger entry) never leaves inconsistent state.</li>
          <li><strong>Append-only audit ledger</strong> for anything money-related — corrections are new entries, not edits.</li>
        </ul>
      </details>

      <details><summary>18. Why is idempotency important here, and how do you implement it?</summary>
        <p><strong>Answer:</strong></p>
        <p>Network retries and double-clicks happen. For a financial action like committing a deal or recording a payment, processing the same request twice is dangerous.</p>
        <ul>
          <li>The client sends an <code>Idempotency-Key</code> header (a UUID) with the request.</li>
          <li>The server stores the key with the result on first processing; a repeat with the same key returns the stored result instead of re-executing.</li>
          <li>I make consumers of any queue/event idempotent the same way, keyed on a business id.</li>
        </ul>
      </details>

      <details><summary>19. How do you keep secrets and environment config safe across Railway, Supabase, and Vercel/Next.js?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>No secrets in code or git</strong> — only env vars, with <code>.env</code> gitignored.</li>
          <li><strong>Right scope:</strong> The Supabase service-role key lives only on the NestJS server (Railway) — never in the Next.js client bundle. Only the anon key and public URL are exposed client-side, and only via <code>NEXT_PUBLIC_</code>-prefixed vars.</li>
          <li><strong>Per-environment config:</strong> Separate Supabase projects / env values for dev, staging, prod so a test never touches production data.</li>
          <li><strong>Rotate on leak:</strong> If a key ever lands in a diff, rotate it immediately.</li>
        </ul>
      </details>

      <h3 className="text-cyan-400">Delivery, Process &amp; Technical PM</h3>

      <details><summary>20. Take a feature from wireframe to MVP to production — what&apos;s your process?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Clarify the problem:</strong> Confirm with the Founder what user pain we&apos;re solving and what &quot;done&quot; means.</li>
          <li><strong>Wireframe the flow:</strong> A low-fidelity sketch of the screens and the happy path — cheap to change, fast to align on.</li>
          <li><strong>Thin vertical slice (MVP):</strong> Build one real end-to-end path (UI → API → DB) with Tailwind for speed and Claude Code to move fast. Validate it live with the Founder.</li>
          <li><strong>Harden:</strong> Add validation, auth, edge cases, error states, and audit logging. Then ship behind a flag if risky.</li>
          <li><strong>Iterate on feedback</strong> rather than gold-plating up front — speed and learning beat perfection.</li>
        </ul>
      </details>

      <details><summary>21. How do you review and manage the external agency&apos;s work?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Set guardrails up front:</strong> An agreed architecture, conventions, and a definition-of-done so reviews aren&apos;t subjective.</li>
          <li><strong>Review for the things that bite later:</strong> data-model decisions, auth/authorization, money handling, migration safety, and security — not bikeshedding on style the linter already enforces.</li>
          <li><strong>Track delivery transparently:</strong> Clear scope, milestones, and a visible board so timelines slip loudly, not silently.</li>
          <li><strong>Unblock fast:</strong> My job is to remove ambiguity for them — sharp specs, quick answers, and decisions made and owned.</li>
          <li><strong>Verify, don&apos;t assume:</strong> I pull their branch and run it, rather than trusting a status update.</li>
        </ul>
      </details>

      <details><summary>22. How do you communicate a technical trade-off to a non-technical Founder?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li>Frame it in terms of <strong>outcomes</strong>: speed, cost, risk, and what the user feels — not jargon.</li>
          <li>Offer <strong>2–3 concrete options</strong> with the trade-off of each (&quot;Option A ships this week but we&apos;ll revisit search performance at 10k deals; Option B takes two more days but scales&quot;).</li>
          <li>Give a <strong>clear recommendation</strong> and the reasoning, so the Founder can decide quickly.</li>
          <li>Make the decision <strong>reversible where possible</strong> so we can move fast without betting the company on it.</li>
        </ul>
      </details>

      <details><summary>23. How do you decide what to build in-house vs leave to the agency?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>In-house:</strong> Fast-iterating, product-defining pieces — wireframes, MVPs, the matching-engine logic, anything the Founder and I need to learn from quickly.</li>
          <li><strong>Agency:</strong> Larger, well-specified build-out where the requirements are stable and parallel capacity helps.</li>
          <li>The deciding factor is <strong>iteration speed and ownership</strong>: if rapid back-and-forth with the Founder is the bottleneck, I keep it in-house so there&apos;s no agency round-trip.</li>
        </ul>
      </details>

      <h3 className="text-cyan-400">Testing &amp; Deployment</h3>

      <details><summary>24. What&apos;s your testing strategy for a NestJS + Prisma backend?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Unit tests</strong> for business logic with the Prisma client mocked, so I test the matching rules in isolation.</li>
          <li><strong>Integration tests</strong> against a real Postgres (a disposable test database or a container) so I exercise actual Prisma queries and migrations — mocking the DB hides query bugs.</li>
          <li><strong>E2E tests</strong> for critical flows (create deal → match → invite → view doc) hitting the booted Nest app.</li>
          <li><strong>Regression test on every bug:</strong> a test that fails before the fix and passes after.</li>
        </ul>
      </details>

      <details><summary>25. How do you deploy and operate the API on Railway?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Build from git:</strong> Railway builds the NestJS service on push; env vars are managed in the Railway dashboard, separated per environment.</li>
          <li><strong>Health checks &amp; migrations:</strong> Expose a health endpoint and run <code>prisma migrate deploy</code> as a release step so schema and code ship together.</li>
          <li><strong>Stateless service:</strong> No in-memory session state, so it scales horizontally; session/auth state lives in Supabase.</li>
          <li><strong>Observability:</strong> Structured logs and error tracking so I can debug production quickly with a small team.</li>
        </ul>
      </details>

      <details><summary>26. How would you add caching without risking stale financial data?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Cache the safe stuff:</strong> Reference data and read-heavy, slow-changing lists (sector taxonomies, public deal summaries) — not live balances or deal status.</li>
          <li><strong>Short TTLs + explicit invalidation</strong> on write, so a deal update busts its cache entry immediately.</li>
          <li><strong>Never cache authorization decisions</strong> across users — a cache key always includes the requesting user&apos;s scope.</li>
          <li>Measure first: I&apos;d only add caching where profiling shows a real hotspot, to avoid correctness risk for no benefit.</li>
        </ul>
      </details>

      <h3 className="text-cyan-400">Behavioral</h3>

      <details><summary>27. Tell me about a time you owned something end-to-end under ambiguity.</summary>
        <p><strong>Answer (STAR):</strong></p>
        <ul>
          <li><strong>Situation:</strong> At 1Finance I owned full modules (Magazine, In-the-News V3, HR Conclave admin) where requirements were loose and I was the sole engineer on them.</li>
          <li><strong>Task:</strong> Take each from a rough product ask to a shipped, production feature without a detailed spec handed to me.</li>
          <li><strong>Action:</strong> I clarified the actual user need, designed the schema and API, built the Fiber endpoints with DB-backed JWT + per-endpoint RBAC, wrote idempotent encryption backfills for legacy rows, and shipped iteratively — validating with stakeholders rather than guessing.</li>
          <li><strong>Result:</strong> Each module shipped end-to-end and is in production. That&apos;s exactly the &quot;own it, move fast, fill the ambiguity yourself&quot; posture this first-engineer role needs.</li>
        </ul>
      </details>

      <h2>Behavioral &amp; Values Preparation</h2>
      <p>This is a speed-and-ownership culture working shoulder-to-shoulder with the Founder. Map your stories to these:</p>
      <ul>
        <li><strong>Speed above all:</strong> Show how AI-assisted development and thin vertical slices let you ship working MVPs in hours, then iterate — not months of upfront design.</li>
        <li><strong>Ownership from day one:</strong> You&apos;re the first in-house engineer. Tell stories where you took something with no spec and drove it to production yourself.</li>
        <li><strong>Comfort with ambiguity:</strong> Demonstrate making reversible decisions quickly and adjusting on feedback rather than waiting for perfect clarity.</li>
        <li><strong>Founder-grade communication:</strong> Translate technical trade-offs into outcomes and clear recommendations a non-technical Founder can act on.</li>
        <li><strong>Domain credibility:</strong> Emphasize financial-data correctness, secure document handling, and audit trails — the things that matter in deal rooms and lending.</li>
      </ul>
    </>
  );
}
