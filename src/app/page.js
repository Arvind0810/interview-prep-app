"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Stat } from "@/components/Card";

export default function DashboardPage() {
  const [stats, setStats] = useState({ qDone: 0, quizScore: "—", streak: 0 });

  useEffect(() => {
    try {
      const reviewed = JSON.parse(localStorage.getItem("iprep_qReviewed") || "[]");
      const lastQuiz = JSON.parse(localStorage.getItem("iprep_lastQuiz") || "null");
      const days = JSON.parse(localStorage.getItem("iprep_studyDays") || "[]");
      const today = new Date().toISOString().slice(0, 10);
      if (!days.includes(today)) {
        days.push(today);
        localStorage.setItem("iprep_studyDays", JSON.stringify(days));
      }
      setStats({
        qDone: reviewed.length,
        quizScore: lastQuiz != null ? lastQuiz + "%" : "—",
        streak: days.length,
      });
    } catch {}
  }, []);

  return (
    <>
      <h1>Welcome back, Arvind</h1>
      <p>
        This is your personal interview preparation hub built from your resume — covering every
        technology, project, and achievement you mentioned. Use the left navigation to read
        materials, take quizzes, and rehearse your self-introduction.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-5">
        <Stat value={stats.qDone} label="Questions Reviewed" />
        <Stat value={stats.quizScore} label="Latest Quiz Score" />
        <Stat value={stats.streak} label="Study Days" />
      </div>

      <Card>
        <h3>Your Resume Snapshot (corrected)</h3>
        <p>
          <b>Role:</b> Full-Stack Software Engineer • 6 years
          <br />
          <b>Current:</b> Software Engineer @ NeoSOFT Technologies (Client: 1Finance) • Jan 2023–Present
          <br />
          <b>Position:</b> Team contributor on the 1Finance website Go/Fiber platform
          <br />
          <b>Stack:</b> Golang/GoFiber, Node.js/NestJS, PostgreSQL, Redis, Docker, Next.js, React
          <br />
          <b>Modules you own end-to-end:</b> Magazine, In-the-News V3, HR Conclave admin (V1 + V2 speaker cards), Master Class events &amp; OTP enrollment, QFA, App Reviews + MoneySigns, App FAQ, Header Search, Ticker, Sitemap generators, CSV bulk imports
          <br />
          <b>Latest system (contributor, not architect):</b> India HR Conclave — a gated <b>HR community platform</b> (<code>hrbackend/v2</code>). Members are approved, not open-signup; they profile, blog, ask and answer questions, request workshops and refer peers. Its engagement layer is a <b>points feature</b> where 1 point = ₹1, redeemable for vouchers — built on Go microservices behind a Fiber v3 gateway, Postgres, Kafka and a Next.js 16 admin dashboard
        </p>
      </Card>

      <Card>
        <h3>Your Real Patterns (from the codebase)</h3>
        <p>When asked &quot;walk me through your architecture&quot;, lean on these patterns you actually work with daily:</p>
        <ul>
          <li><b>Fiber router groups</b> for namespacing — feature roots, nested admin groups, V1 and V3 coexistence during migrations</li>
          <li><b><code>CheckUserDataBase</code> middleware</b> — DB-backed JWT with per-endpoint RBAC permission strings (e.g. <code>ManageInTheNews</code>, <code>ManageHrConclaveSpeakers</code>)</li>
          <li><b><code>StaticTokenAuth</code> middleware</b> — for internal endpoints like encryption backfill scripts and FAQ public access</li>
          <li><b>Body validator middleware per resource</b> — <code>ValidateInNewsBody</code>, <code>ValidateHrConclaveSpeakerBody</code>, etc.</li>
          <li><b>Encryption backfill scripts</b> — gated by static token, idempotently re-encrypt legacy plaintext rows (you did this for Magazine and HR Conclave)</li>
        </ul>
        <p className="mt-3">On the <b>HR community platform</b> the patterns go a level deeper. You contributed there rather than designing it, so present these as &quot;how that system handles it, and why I think that&apos;s right&quot;:</p>
        <ul>
          <li><b>One write path for money</b> — <code>ledger.Apply</code> locks the member row, checks a deterministic idempotency key before the sufficiency check, and applies a relative <code>balance + ?</code> update</li>
          <li><b>Append-only by trigger</b> — the database rejects UPDATE/DELETE on the ledger; corrections are reversing rows</li>
          <li><b>Transactional outbox</b> — the event row is written in the same transaction as the state change; a relay publishes it to Kafka</li>
          <li><b>The event is a trigger, never the authority</b> — consumers re-read the source row before acting</li>
          <li><b>Ambiguity is a state</b> — <code>pending_reconciliation</code> when a provider times out, instead of guessing refund or confirm</li>
        </ul>
      </Card>

      <Card className="border-emerald-700">
        <h3 className="m-0 text-emerald-400">The one-line reframe that makes this land</h3>
        <p>
          The 1Finance modules show breadth — CRUD, RBAC, encryption backfills, migrations done
          safely, and they are genuinely <i>yours</i>. The HR community platform shows depth, and the
          way to introduce it is not &quot;a rewards platform&quot;:
        </p>
        <p className="text-emerald-300">
          <b>&quot;It&apos;s a gated community for HR professionals, and its growth feature pays out
          real money — a point is a rupee — so a mechanic that looks like gamification is built with
          financial-grade discipline.&quot;</b>
        </p>
        <p>
          That sentence answers the &quot;isn&apos;t this over-engineered?&quot; objection before it is
          asked, and it opens onto everything worth discussing: idempotency, at-least-once delivery
          with idempotent effects, saga compensation, and what to do when a provider&apos;s answer is
          ambiguous.
        </p>
        <p className="text-slate-400 text-sm">
          Keep the scope honest — you contributed to that system, you did not architect it. Lead with
          the two or three pieces that are actually yours, then the systems observations land as
          understanding rather than borrowed credit.
        </p>
        <p><Link href="/hr-community">Open the HR Community Platform deep dive →</Link></p>
      </Card>

      <Card>
        <h3>How to use this hub</h3>
        <ol>
          <li><b>Start with Self-Introduction</b> — rehearse the 60s/90s/2-min scripts until they feel natural.</li>
          <li><b>Read materials topic-by-topic</b> — each section has key concepts, examples, and gotchas.</li>
          <li><b>Test yourself</b> — take the quizzes; the system tracks your score and weak areas.</li>
          <li><b>Practice the question bank</b> — 330+ Q&amp;As filterable by topic and difficulty.</li>
          <li><b>Rehearse STAR stories</b> — your behavioral answers based on real projects.</li>
        </ol>
      </Card>

      <Card>
        <h3>Recommended 14-Day Sprint</h3>
        <p>If your interview is within 2 weeks, follow this:</p>
        <table>
          <thead>
            <tr><th>Days</th><th>Focus</th><th>Outcome</th></tr>
          </thead>
          <tbody>
            <tr><td>1–2</td><td>Self-intro + Golang deep dive</td><td>Confident intro, Go fundamentals locked</td></tr>
            <tr><td>3–4</td><td>PostgreSQL + Redis + Query Optimization</td><td>Database mastery, latency stories ready</td></tr>
            <tr><td>5–6</td><td>Microservices + REST + JWT + Docker</td><td>API design fluency</td></tr>
            <tr><td>7–8</td><td>Next.js + React + Frontend system design</td><td>Frontend confidence</td></tr>
            <tr><td>9–10</td><td>System Design + Fintech scenarios</td><td>Whiteboard scenarios practiced</td></tr>
            <tr><td>11–12</td><td>Behavioral + STAR + mock interviews</td><td>Stories polished</td></tr>
            <tr><td>13–14</td><td>HR community platform deep dive + take all quizzes</td><td>Senior-signal system story locked, weak areas reviewed</td></tr>
          </tbody>
        </table>
      </Card>
    </>
  );
}
