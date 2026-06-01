import { Card } from "@/components/Card";

export const metadata = { title: "Study Roadmap — Interview Prep" };

export default function RoadmapPage() {
  return (
    <>
      <h1>Study Roadmap</h1>
      <p>A structured path through the materials. Check sections off as you complete them.</p>

      <h2>Phase 1 — Foundation (Days 1–4)</h2>
      <Card>
        <ul>
          <li>Perfect your self-introduction (60s and 90s versions)</li>
          <li>Golang reading — goroutines, channels, interfaces, error handling</li>
          <li>PostgreSQL fundamentals — joins, indexes, EXPLAIN ANALYZE</li>
          <li>Take Quiz: Go Basics</li>
        </ul>
      </Card>

      <h2>Phase 2 — Backend Depth (Days 5–8)</h2>
      <Card>
        <ul>
          <li>GoFiber middleware patterns, request lifecycle</li>
          <li>Redis caching strategies — cache-aside, write-through, TTL design</li>
          <li>Microservices — REST design, JWT, async messaging</li>
          <li>Docker — multi-stage builds, networking, volumes</li>
          <li>Take Quiz: Backend Deep Dive</li>
        </ul>
      </Card>

      <h2>Phase 3 — Frontend &amp; System Design (Days 9–11)</h2>
      <Card>
        <ul>
          <li>Next.js — SSR vs SSG vs ISR, App Router, Server Components</li>
          <li>React fundamentals — hooks, state management, performance</li>
          <li>System Design — design a fintech notification system, design OneHub-like API gateway</li>
          <li>Take Quiz: Frontend + System Design</li>
        </ul>
      </Card>

      <h2>Phase 4 — Behavioral &amp; Mock (Days 12–14)</h2>
      <Card>
        <ul>
          <li>Rehearse STAR stories aloud — record yourself</li>
          <li>Do 2 mock interviews — one technical, one behavioral</li>
          <li>Review all weak quiz areas</li>
          <li>Sleep well the night before</li>
        </ul>
      </Card>
    </>
  );
}
