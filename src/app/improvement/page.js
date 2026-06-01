import { Card } from "@/components/Card";

export const metadata = { title: "Improvement Plan — Interview Prep" };

export default function ImprovementPage() {
  return (
    <>
      <h1>How to Improve Your Skills</h1>
      <p>Beyond reading and quizzes — concrete habits and resources to deepen each skill.</p>

      <h2>Golang — Next Level</h2>
      <ul>
        <li>Read <a href="https://go.dev/doc/effective_go" target="_blank" rel="noreferrer">Effective Go</a> end-to-end</li>
        <li>Watch Rob Pike&apos;s &quot;Go Concurrency Patterns&quot; and &quot;Advanced Go Concurrency Patterns&quot; talks</li>
        <li>Build: a rate limiter, a worker pool, a pub/sub library — all from scratch</li>
        <li>Read source: <code>net/http</code>, <code>context</code>, <code>sync</code> packages</li>
        <li>Run <code>go test -race</code> on every concurrent code path</li>
      </ul>

      <h2>PostgreSQL — Next Level</h2>
      <ul>
        <li>Book: &quot;PostgreSQL Up &amp; Running&quot; by Regina Obe</li>
        <li>Use a real dataset (NYC taxi, GH archive) and tune queries with EXPLAIN</li>
        <li>Learn about <code>pg_stat_statements</code> for finding slow queries in prod</li>
        <li>Practice writing window functions and CTEs without looking up syntax</li>
      </ul>

      <h2>System Design — Next Level</h2>
      <ul>
        <li>Book: &quot;Designing Data-Intensive Applications&quot; by Martin Kleppmann (the bible)</li>
        <li>Channel: &quot;System Design Interview&quot; by Mikhail Smarshchok (ByteByteGo) — quick and crisp</li>
        <li>Practice with a peer once a week using <a href="https://excalidraw.com" target="_blank" rel="noreferrer">Excalidraw</a></li>
        <li>Read company engineering blogs — Stripe, Uber, Discord, Cred, PhonePe</li>
      </ul>

      <h2>Frontend / Next.js — Next Level</h2>
      <ul>
        <li>Build a small Next.js App Router project with Server Components + Server Actions</li>
        <li>Read the Next.js docs cover to cover — it&apos;s surprisingly thin and full of detail</li>
        <li>Profile a page with Chrome DevTools and Lighthouse, fix the worst metric</li>
        <li>Learn React DevTools profiler — you&apos;ll spot wasted renders quickly</li>
      </ul>

      <h2>Communication &amp; Behavioral</h2>
      <ul>
        <li>Record yourself doing the 60s intro — watch it back, iterate 3 times</li>
        <li>Mock interview weekly with a peer or use <a href="https://pramp.com" target="_blank" rel="noreferrer">Pramp</a> or <a href="https://www.interviewing.io" target="_blank" rel="noreferrer">interviewing.io</a></li>
        <li>Write a one-page &quot;career narrative&quot; — your story in flowing prose. Hard but useful.</li>
        <li>Read &quot;Cracking the PM Interview&quot; — the behavioral section is gold for any role</li>
      </ul>

      <h2>Weekly Habit Suggestion</h2>
      <Card>
        <ul>
          <li>Mon: 1h Go deep-dive or DSA</li>
          <li>Tue: 1h SQL/Postgres practice (real datasets)</li>
          <li>Wed: 1h system design — sketch one design</li>
          <li>Thu: 1h frontend (Next.js or React)</li>
          <li>Fri: 1h read engineering blog post (Stripe, Cred, etc.)</li>
          <li>Sat: Mock interview (1 technical, 1 behavioral)</li>
          <li>Sun: Review week, update notes</li>
        </ul>
      </Card>

      <h2>Recommended Resources</h2>
      <table>
        <thead><tr><th>Topic</th><th>Resource</th></tr></thead>
        <tbody>
          <tr><td>Go</td><td>Effective Go, &quot;Learning Go&quot; by Jon Bodner, Go by Example</td></tr>
          <tr><td>Distributed Systems</td><td>&quot;Designing Data-Intensive Applications&quot;, MIT 6.824 lectures</td></tr>
          <tr><td>System Design</td><td>ByteByteGo, Hello Interview, Grokking the System Design Interview</td></tr>
          <tr><td>DSA</td><td>Neetcode 150, Leetcode patterns, &quot;Algorithms&quot; by Sedgewick</td></tr>
          <tr><td>Behavioral</td><td>&quot;Cracking the PM Interview&quot;, Lenny&apos;s Newsletter behavioral pieces</td></tr>
          <tr><td>Frontend</td><td>nextjs.org docs, ui.shadcn.com, React beta docs</td></tr>
        </tbody>
      </table>
    </>
  );
}
