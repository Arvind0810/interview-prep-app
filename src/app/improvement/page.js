import { Card } from "@/components/Card";

export const metadata = { title: "Improvement Plan — Interview Prep" };

export default function ImprovementPage() {
  return (
    <>
      <h1>Continuous Improvement Plan</h1>
      <p>Passing interviews requires a structured approach to learning. Once you land the job, leveling up from Mid to Senior requires a shift from "writing code" to "architecting systems" and "multiplying the team's output."</p>

      {/* ────────── STUDY PLAN ────────── */}
      <h2>Structured Weekly Study Plan</h2>
      <Card>
        <ul>
          <li><b>Monday: Data Structures &amp; Algorithms (1 hour)</b> — Solve 2 medium problems on Leetcode (Focus on patterns: Sliding Window, BFS/DFS, Two Pointers).</li>
          <li><b>Tuesday: System Design (1 hour)</b> — Watch a breakdown video (ByteByteGo) or sketch out a system on a whiteboard/Excalidraw.</li>
          <li><b>Wednesday: Deep Work (1.5 hours)</b> — Build a small side project, implement a complex pattern from scratch (e.g. a rate limiter in Go, or an LRU cache), or read source code.</li>
          <li><b>Thursday: Database Internals (1 hour)</b> — Practice SQL, understand query execution plans, read about B-Trees, LSM trees, or isolation levels.</li>
          <li><b>Friday: Architecture &amp; Trends (45 mins)</b> — Read an engineering blog post (Stripe, Uber, Cloudflare) to see how big tech solves problems.</li>
          <li><b>Saturday: Mock Interview (1.5 hours)</b> — Do a timed mock interview with a peer, or use platforms like Pramp or Interviewing.io.</li>
          <li><b>Sunday: Rest &amp; Review</b> — Review notes, update your resume.</li>
        </ul>
      </Card>

      {/* ────────── LEVELING UP (MID TO SENIOR) ────────── */}
      <h2>Leveling Up: Mid to Senior Engineer</h2>
      <p>What differentiates a Senior engineer from a Mid-level engineer?</p>
      <ul>
        <li><b>Scope of Ambiguity:</b> Juniors are given tasks. Mids are given features. Seniors are given open-ended business problems and asked to define the technical solution.</li>
        <li><b>Force Multiplier:</b> Seniors improve the whole team. They write good documentation, set up CI/CD pipelines, mentor juniors, and establish coding standards.</li>
        <li><b>Trade-off Awareness:</b> Mids want to use the newest, coolest tech. Seniors know that boring technology (like Postgres) is usually the best choice, and can articulate the exact cost of adopting a new tool.</li>
        <li><b>Business Alignment:</b> Seniors understand <i>why</i> a feature is being built and push back on product managers if a technical compromise can save weeks of work.</li>
      </ul>

      {/* ────────── PRACTICAL HABITS ────────── */}
      <h2>Practical Habits to Adopt Today</h2>
      
      <h3>1. Read Open Source Code</h3>
      <p>The fastest way to write better code is to read great code. Don't just read tutorials. Go to GitHub and read the source code of the libraries you use.</p>
      <ul>
        <li><i>Golang:</i> Read the standard library (<code>net/http</code>, <code>sync</code>, <code>context</code>). It is the gold standard of Go code.</li>
        <li><i>Node/React:</i> Read the source for Express.js, Zustand, or simple utility libraries.</li>
      </ul>

      <h3>2. Keep a "Brag Document"</h3>
      <p>Never wait until performance review season or an interview to remember what you did. Keep a living document updating it every two weeks with:</p>
      <ul>
        <li>Features shipped and their business impact.</li>
        <li>Bugs squashed (especially tricky ones).</li>
        <li>Documentation written and processes improved.</li>
        <li>Colleagues mentored.</li>
      </ul>

      <h3>3. Write Design Docs (RFCs)</h3>
      <p>Before writing code for a large feature, write a 1-page tech spec. Outline the problem, the proposed solution, alternative solutions considered (and why you rejected them), API schemas, and DB models. Ask for feedback. This single habit builds system design skills instantly.</p>

      {/* ────────── RECOMMENDED RESOURCES ────────── */}
      <h2>Recommended Resources (The "Must Reads")</h2>
      <table>
        <thead><tr><th>Category</th><th>Resource</th></tr></thead>
        <tbody>
          <tr><td><b>System Design</b></td><td><i>Designing Data-Intensive Applications</i> by Martin Kleppmann (The Bible of backend engineering).<br/><i>System Design Interview</i> by Alex Xu (ByteByteGo).</td></tr>
          <tr><td><b>Golang</b></td><td><i>Effective Go</i> (Official docs).<br/><i>100 Go Mistakes and How to Avoid Them</i> by Teiva Harsanyi.</td></tr>
          <tr><td><b>PostgreSQL</b></td><td><i>PostgreSQL Up &amp; Running</i>.<br/>Use the Postgres official documentation (it is exceptionally well written).</td></tr>
          <tr><td><b>Algorithms</b></td><td><i>Grokking the Coding Interview: Patterns for Coding Questions</i>.<br/>Neetcode 150 (Leetcode list sorted by pattern).</td></tr>
          <tr><td><b>Behavioral / Career</b></td><td><i>The Staff Engineer's Path</i> by Tanya Reilly.<br/><i>Cracking the PM Interview</i> (Behavioral section is excellent for engineers too).</td></tr>
          <tr><td><b>Engineering Blogs</b></td><td>Stripe, Cloudflare, Discord, Uber, Netflix TechBlog.</td></tr>
        </tbody>
      </table>
    </>
  );
}
