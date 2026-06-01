import { Card } from "@/components/Card";

export const metadata = { title: "Self-Introduction — Interview Prep" };

export default function IntroPage() {
  return (
    <>
      <h1>Self-Introduction &amp; Intro Video</h1>
      <p>
        Your opening 60 seconds set the entire interview&apos;s tone. Pick the script length
        that matches the format, rehearse out loud, and record yourself on your phone to refine
        pace and energy.
      </p>
      <p className="text-amber-300 text-sm bg-amber-900/20 border border-amber-700 rounded p-3 my-3">
        <b>Framing note:</b> These scripts position you as a <i>team contributor</i> with concrete <i>module ownership</i> at 1Finance — not as the architect of the whole OneHub backend. That keeps your story honest and resilient under technical depth questioning.
      </p>

      <h2>The 60-Second Script (Most Common)</h2>
      <Card>
        <p>&quot;Hi, I&apos;m Arvind Sharma, a backend-focused full-stack engineer with over five years of experience, currently building fintech APIs at 1Finance through NeoSOFT Technologies.</p>
        <p>I work as part of the OneHub backend team. We have a Go-and-Fiber API layer with around 30 feature namespaces, and I own several of them end-to-end — Magazine registrations and exports, the In-the-News V3 admin pipeline with publish toggles and snapshot refresh, HR Conclave registrations and the V2 speaker cards, Master Class events with OTP-based enrollment, and the QFA financial-advisor module.</p>
        <p>Before 1Finance I built WooCommerce platforms with Razorpay at Thinkbar, and responsive WordPress sites at Visualytes — so I&apos;ve worked across the stack from PHP plugins to modern Go services to Next.js frontends.</p>
        <p>I&apos;m looking for a full-stack role where I can keep working on Go and Next.js, ideally somewhere that values clean architecture and gives me deeper ownership of larger systems. Happy to dive into any of these modules in detail.&quot;</p>
      </Card>

      <h2>The 90-Second Script (Senior / Detailed)</h2>
      <Card>
        <p>&quot;Hi, I&apos;m Arvind. I&apos;m a backend-focused full-stack engineer based in Mumbai, with five-plus years building production-grade financial systems and scalable APIs.</p>
        <p>I&apos;ve been at 1Finance through NeoSOFT since January 2023. I&apos;m a contributor on the OneHub backend — it&apos;s a Go/Fiber API platform with around 30 feature modules powering the 1Finance product. I don&apos;t own the whole platform, but I do own several modules end-to-end:</p>
        <ul>
          <li>The Magazine registration + CSV export feature with encryption backfill for legacy plaintext rows</li>
          <li>The In-the-News V3 admin pipeline — landing/archive endpoints, publish toggles, snapshot refresh</li>
          <li>The HR Conclave module — registrations, V1 nested + V2 flat-schema speaker cards with rich text, logos, nominees admin</li>
          <li>The Master Class event flow including OTP-based enrollment and audio/video delivery by slug</li>
          <li>The QFA module — full CRUD plus key questions and search</li>
          <li>App Reviews + MoneySigns admin, App FAQ with categories, plus the header search with click/abandon tracking</li>
        </ul>
        <p>The patterns are pretty consistent across my work — Fiber router groups for namespacing, a DB-backed JWT middleware with per-endpoint RBAC permission strings, static-token auth for internal endpoints, and validator middleware per resource. I also did the SQL remapping work to fix broken WordPress media references after a migration, and helped tune Postgres queries with composite indexes plus Redis caching on hot read paths.</p>
        <p>Before 1Finance I built WooCommerce platforms with Razorpay at Thinkbar, and WordPress sites at Visualytes. I&apos;m looking for a full-stack role with significant Go and Next.js work where I can grow into wider architectural ownership.&quot;</p>
      </Card>

      <h2>The 2-Minute Script (Walkthrough Style)</h2>
      <details>
        <summary>Click to expand</summary>
        <p><b>Opening (15s):</b> &quot;Hi, I&apos;m Arvind Sharma — backend-focused full-stack engineer with 5+ years, currently at 1Finance through NeoSOFT.&quot;</p>
        <p><b>Current scope (50s):</b> &quot;I&apos;m a team contributor on the OneHub Go/Fiber backend. The platform has ~30 namespaces; I personally own several modules end-to-end. The biggest are Magazine (registrations, CSV export, encryption backfill of legacy data), In-the-News V3 (landing, archive, admin publish/snapshot pipeline), HR Conclave (registrations + V2 speaker cards with rich text + nominees), Master Class (events, OTP enrollment, audio/video delivery), QFA (qualified financial advisor CRUD + search), and App Reviews. I also work on header search with click/abandon tracking, sitemap generators for our financial product pages, and CSV bulk imports for mutual funds, health insurance, credit cards, and NPS data.&quot;</p>
        <p><b>Technical patterns (25s):</b> &quot;The Fiber patterns I work with daily — router groups for namespacing, a DB-backed JWT middleware with per-endpoint RBAC permission strings, static-token auth for internal endpoints, body validator middleware per resource, V1 and V3 routes coexisting during migrations.&quot;</p>
        <p><b>Past experience (20s):</b> &quot;Before this I built WooCommerce platforms with Razorpay at Thinkbar, and WordPress sites at Visualytes. Early work taught me to talk to clients directly and translate vague needs into shipped features.&quot;</p>
        <p><b>Why I&apos;m looking (10s):</b> &quot;Looking for a role with deeper architectural ownership, more Go-native engineering, and stronger Next.js scope so I can keep growing on the frontend side.&quot;</p>
      </details>

      <h2>Recording Your Intro Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h4>Setup checklist</h4>
          <ul>
            <li>Good lighting — face a window or use a ring light</li>
            <li>Eye level camera — books under the laptop</li>
            <li>Clean background — neutral wall or tidy bookshelf</li>
            <li>External mic if possible — phone earbuds beat laptop mic</li>
            <li>Wear a collared shirt or smart casual</li>
          </ul>
        </Card>
        <Card>
          <h4>Delivery tips</h4>
          <ul>
            <li>Smile when you say your name — sets warm tone</li>
            <li>Speak at ~140–160 words per minute, slightly slower than chat</li>
            <li>Pause 1 second between sentences — don&apos;t rush</li>
            <li>Look at the camera lens, not the screen</li>
            <li>End with a question or invitation: &quot;Happy to dive deeper into any of this&quot;</li>
          </ul>
        </Card>
      </div>

      <h2>Variations by Interview Type</h2>
      <details><summary>HR / Recruiter screen</summary>
        <p>Use the 60s version. Skip deep tech details — emphasize years of experience, current role, motivation for switching, and 1–2 module ownership highlights. End with what you&apos;re looking for next.</p>
      </details>
      <details><summary>Technical / Engineering Manager</summary>
        <p>Use the 90s version. Lead with concrete module wins (Magazine encryption backfill, In-the-News V3 pipeline). EMs care about scope of ownership and how you reason about systems.</p>
      </details>
      <details><summary>Tech Lead / Senior IC interview</summary>
        <p>Use the 2-minute version. Add patterns you actually use (CheckUserDataBase RBAC, V1+V3 coexistence). Show judgment about trade-offs, not just facts.</p>
      </details>
      <details><summary>Founder / CTO interview (smaller companies)</summary>
        <p>Lead with product impact and what you ship. Mention you&apos;ve worked directly with clients (Visualytes). Show you can own features end-to-end across backend, infra, and frontend.</p>
      </details>

      <h2>Common Opening Questions &amp; How to Bridge</h2>
      <details><summary>&quot;Tell me about yourself&quot;</summary>
        <p>Use the 60–90s script. Don&apos;t recite your resume top-to-bottom — give the module-ownership highlight reel.</p>
      </details>
      <details><summary>&quot;Walk me through your resume&quot;</summary>
        <p>Reverse chronological. Spend 70% on most recent role (1Finance through NeoSOFT). Group earlier roles briefly. Be precise: &quot;I&apos;m a team contributor — here&apos;s what I personally own.&quot;</p>
      </details>
      <details><summary>&quot;Why are you looking to switch?&quot;</summary>
        <p>&quot;I&apos;ve grown a lot at 1Finance — I&apos;ve gone from writing endpoints to owning whole modules. I&apos;m looking for a role with deeper architectural ownership and a Go-native engineering culture, ideally with stronger Next.js scope so I can keep growing on the frontend side too.&quot; Never badmouth your current employer.</p>
      </details>
      <details><summary>&quot;What&apos;s a module or feature you&apos;re proud of?&quot;</summary>
        <p>Pick one: Magazine&apos;s encryption backfill, In-the-News V3 admin pipeline, or HR Conclave V2 speaker cards. Walk the interviewer through the why-what-how-result of that specific feature.</p>
      </details>
    </>
  );
}
