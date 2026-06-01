"use client";
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
          <b>Role:</b> Full-Stack Software Engineer • 5+ years
          <br />
          <b>Current:</b> Software Engineer @ NeoSOFT Technologies (Client: 1Finance) • Jan 2023–Present
          <br />
          <b>Position:</b> Team contributor on the 1Finance website Go/Fiber platform
          <br />
          <b>Stack:</b> Golang/GoFiber, Node.js/NestJS, PostgreSQL, Redis, Docker, Next.js, React
          <br />
          <b>Modules you own end-to-end:</b> Magazine, In-the-News V3, HR Conclave admin (V1 + V2 speaker cards), Master Class events &amp; OTP enrollment, QFA, App Reviews + MoneySigns, App FAQ, Header Search, Ticker, Sitemap generators, CSV bulk imports
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
      </Card>

      <Card>
        <h3>How to use this hub</h3>
        <ol>
          <li><b>Start with Self-Introduction</b> — rehearse the 60s/90s/2-min scripts until they feel natural.</li>
          <li><b>Read materials topic-by-topic</b> — each section has key concepts, examples, and gotchas.</li>
          <li><b>Test yourself</b> — take the quizzes; the system tracks your score and weak areas.</li>
          <li><b>Practice the question bank</b> — 150+ Q&amp;As filterable by topic and difficulty.</li>
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
            <tr><td>13–14</td><td>Take all quizzes, review weak areas</td><td>Ready</td></tr>
          </tbody>
        </table>
      </Card>
    </>
  );
}
