export const metadata = { title: "System Design — Interview Prep" };

export default function SysDesignPage() {
  return (
    <>
      <h1>System Design</h1>
      <p>Even at the IC level, full-stack engineers face system design rounds. Frame every answer around: requirements → estimation → API design → data model → architecture → deep dives → trade-offs.</p>

      <h2>The Framework (memorize this)</h2>
      <ol>
        <li><b>Clarify requirements</b> (5 min): functional and non-functional. &quot;Are we designing read-heavy or write-heavy? What&apos;s the SLA?&quot;</li>
        <li><b>Capacity estimation</b> (3 min): users, QPS, storage, bandwidth</li>
        <li><b>API design</b> (5 min): main endpoints, request/response shapes</li>
        <li><b>Data model</b> (5 min): tables/collections, indexes, relationships</li>
        <li><b>High-level architecture</b> (10 min): client → LB → API → cache → DB → queues → workers</li>
        <li><b>Deep dives</b> (10 min): the part the interviewer cares about — sharding, caching, consistency</li>
        <li><b>Bottlenecks and trade-offs</b> (5 min): what scales next, what breaks first</li>
      </ol>

      <h2>Capacity Cheat Sheet</h2>
      <table>
        <thead><tr><th>Quantity</th><th>Magnitude</th></tr></thead>
        <tbody>
          <tr><td>1 day</td><td>86,400 seconds (~100K)</td></tr>
          <tr><td>1 read from memory</td><td>~100 ns</td></tr>
          <tr><td>1 read from SSD</td><td>~100 µs</td></tr>
          <tr><td>1 round trip same DC</td><td>~500 µs</td></tr>
          <tr><td>1 round trip cross-region</td><td>~50–150 ms</td></tr>
          <tr><td>Single Postgres node</td><td>~10K writes/sec, ~50K reads/sec (rule of thumb)</td></tr>
          <tr><td>Redis on commodity HW</td><td>~100K ops/sec</td></tr>
          <tr><td>Kafka per broker</td><td>~100K msg/sec</td></tr>
        </tbody>
      </table>

      <h2>CAP &amp; PACELC</h2>
      <p>In a network partition (P), choose Consistency or Availability. Without partition, choose latency vs consistency.</p>
      <ul>
        <li><b>CP systems:</b> PostgreSQL (single node), MongoDB w/ majority writes, Zookeeper</li>
        <li><b>AP systems:</b> Cassandra, DynamoDB, Riak</li>
        <li>Most real systems are tunable per operation</li>
      </ul>

      <h2>Common Designs to Practice</h2>
      <details><summary>Design a URL shortener</summary>
        <p>Endpoints: <code>POST /shorten</code>, <code>GET /:code</code>. Use base62 encoding of an auto-increment ID, or random 7-char codes with collision check. Redis cache for hot lookups. Postgres or DynamoDB for persistence. Analytics via Kafka → ClickHouse.</p>
      </details>
      <details><summary>Design a rate limiter</summary>
        <p>Token bucket in Redis. Key = user+endpoint, store count + window start, use Lua script for atomic increment-and-check. Sliding window log for precision but more memory.</p>
      </details>
      <details><summary>Design a notification system (your fit!)</summary>
        <p>Producers write to Kafka/SQS. Workers route to channel-specific services (email, SMS, WhatsApp, push). Each channel handles retries, dedup, idempotency keys, and provider rate limits. Template engine pulls user prefs. DLQ for failures. This matches your WhatsApp Business work — use it as your headline example.</p>
      </details>
      <details><summary>Design a financial calculator API (your stack)</summary>
        <p>Stateless compute service in Go. Heavy formulas cached by input hash in Redis. Versioned API for backward compat. Audit log to Kafka — every input + output for compliance. Multi-tenant via JWT claims. Rate limited per client.</p>
      </details>
      <details><summary>Design a real-time chat (your project)</summary>
        <p>WebSocket connections terminated on stateful gateway. Messages persisted to Postgres/Cassandra. Fanout via Redis Pub/Sub for online users, push notification for offline. Presence in Redis with TTL heartbeat. WebRTC for voice/video via LiveKit/Twilio.</p>
      </details>
      <details><summary>Design a feed system</summary>
        <p>Two approaches: <b>pull</b> (compute on read — fine for low-activity users) vs <b>push</b> (fan-out on write — fine until you have celebrities). Hybrid: push for normal users, pull for high-follower accounts.</p>
      </details>
      <details><summary>Design a leaderboard</summary>
        <p>Redis sorted set: <code>ZADD leaderboard score user_id</code>, <code>ZREVRANGE</code> for top N, <code>ZRANK</code> for user position. Periodic snapshot to Postgres for history.</p>
      </details>

      <h2>1Finance-style API Gateway (your real system)</h2>
      <p>If asked to architect your current platform from scratch:</p>
      <ol>
        <li>Edge: CloudFront/CDN → ALB → API Gateway (rate limit, auth)</li>
        <li>1Finance website platform in Go/Fiber — orchestrator service, stateless, horizontally scaled behind ALB</li>
        <li>Domain services in Node.js — calculators, scoring, personalization — communicate via REST or async queue</li>
        <li>PostgreSQL primary + read replica — connection pooled via PgBouncer</li>
        <li>Redis cluster — caching, rate limiting, session</li>
        <li>Kafka/SQS — async events (WhatsApp dispatch, audit log)</li>
        <li>S3 for media/static assets, CloudFront for delivery</li>
        <li>Observability: Datadog or Prometheus+Grafana, ELK for logs, Sentry for errors</li>
      </ol>
    </>
  );
}
