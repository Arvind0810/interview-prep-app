import { Card } from "@/components/Card";

export const metadata = { title: "PostgreSQL & SQL — Interview Prep" };

export default function PostgresPage() {
  return (
    <>
      <h1>PostgreSQL &amp; SQL</h1>
      <p>Your 40% latency win came from PostgreSQL optimization — interviewers will dig into how you did it. Master query plans, indexes, and transaction isolation.</p>

      <h2>Indexes</h2>
      <p>An index is a separate data structure (usually B-tree) that maps column values to row locations. Trade-off: faster reads, slower writes, more disk.</p>
      <table>
        <thead><tr><th>Type</th><th>When to use</th></tr></thead>
        <tbody>
          <tr><td>B-tree (default)</td><td>Equality and range queries</td></tr>
          <tr><td>Hash</td><td>Equality only — rarely needed since B-tree covers it</td></tr>
          <tr><td>GIN</td><td>Full-text search, JSONB, arrays</td></tr>
          <tr><td>GiST</td><td>Geospatial (PostGIS), ranges</td></tr>
          <tr><td>BRIN</td><td>Huge tables with naturally ordered data (logs)</td></tr>
          <tr><td>Partial</td><td><code>WHERE status=&apos;active&apos;</code> — index only the rows you query</td></tr>
          <tr><td>Composite</td><td>Multi-column. Order matters! Leftmost prefix rule.</td></tr>
        </tbody>
      </table>
      <p><b>Composite index order:</b> If you index <code>(user_id, created_at)</code>, queries on <code>user_id</code> alone use it, but queries on <code>created_at</code> alone don&apos;t.</p>

      <h2>EXPLAIN ANALYZE</h2>
      <pre><code>{`EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM events WHERE user_id = 'u123' AND created_at > NOW() - INTERVAL '7 days';

-- Look for:
-- "Seq Scan" on big tables → missing index
-- High "rows" count vs actual returned → index not selective enough
-- "Hash Join" on huge tables → consider denormalizing or batching
-- "Buffers: shared read=X" → reading from disk; check shared_buffers`}</code></pre>

      <h2>The N+1 Problem</h2>
      <p>Most common SQL bug. Loading a list, then querying once per item.</p>
      <pre><code>{`-- BAD: 1 + N queries
users := db.Query("SELECT id FROM users")
for u := range users {
    orders := db.Query("SELECT * FROM orders WHERE user_id=$1", u.ID)
}

-- GOOD: 1 query with JOIN, or 2 queries with IN clause
SELECT * FROM orders WHERE user_id = ANY($1::uuid[]);`}</code></pre>

      <h2>Transactions &amp; Isolation Levels</h2>
      <table>
        <thead><tr><th>Level</th><th>Dirty Read</th><th>Non-repeatable</th><th>Phantom</th></tr></thead>
        <tbody>
          <tr><td>Read Uncommitted</td><td>—</td><td>Possible</td><td>Possible</td></tr>
          <tr><td>Read Committed (PG default)</td><td>No</td><td>Possible</td><td>Possible</td></tr>
          <tr><td>Repeatable Read</td><td>No</td><td>No</td><td>No (in PG)</td></tr>
          <tr><td>Serializable</td><td>No</td><td>No</td><td>No</td></tr>
        </tbody>
      </table>
      <p>For money transfers, use <code>SERIALIZABLE</code> or <code>SELECT ... FOR UPDATE</code> to lock rows.</p>

      <h2>JOIN Types</h2>
      <ul>
        <li><b>INNER JOIN</b> — rows present in both tables</li>
        <li><b>LEFT JOIN</b> — all left rows, NULL where right has no match</li>
        <li><b>RIGHT JOIN</b> — opposite of LEFT (rarely used)</li>
        <li><b>FULL OUTER JOIN</b> — all rows from both</li>
        <li><b>CROSS JOIN</b> — Cartesian product (use carefully)</li>
        <li><b>LATERAL JOIN</b> — right side can reference left columns. Great for &quot;top N per group&quot;.</li>
      </ul>

      <h2>Window Functions</h2>
      <pre><code>{`-- Rank events per user by date
SELECT user_id, event_id,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
FROM events;

-- Running total
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM transactions;`}</code></pre>

      <h2>Optimization Checklist</h2>
      <ol>
        <li>Add indexes on WHERE, JOIN, ORDER BY columns</li>
        <li>Use composite indexes for multi-column queries</li>
        <li>Avoid <code>SELECT *</code> — pull only needed columns</li>
        <li>Use <code>LIMIT</code> for paginated lists, but prefer cursor pagination over OFFSET for deep pages</li>
        <li>Batch inserts with <code>INSERT ... VALUES (...), (...), (...)</code></li>
        <li>Use <code>COPY</code> for bulk loads</li>
        <li>Connection pool — never one connection per request (use PgBouncer for many app servers)</li>
        <li>Vacuum and analyze regularly (autovacuum usually handles it)</li>
        <li>Partition huge tables by date or tenant</li>
      </ol>

      <h2>Your 40% Latency Win — How to Tell It</h2>
      <Card>
        <p><b>Problem:</b> &quot;When I joined 1Finance, several core endpoints — particularly the events listing and personalization scoring — were taking 800ms+ at p95. Under load they degraded further.&quot;</p>
        <p><b>Root cause:</b> &quot;I ran EXPLAIN ANALYZE on the slow paths. Found two issues: sequential scans on event tables because we had no index on (user_id, created_at), and an N+1 pattern where the personalization service was making one query per scoring rule.&quot;</p>
        <p><b>Action:</b> &quot;I added composite indexes on the hot WHERE columns, rewrote the personalization query to fetch all rules in a single batch with IN, and put a Redis cache-aside layer in front of the events endpoint with a 60-second TTL since the data didn&apos;t need to be real-time fresh.&quot;</p>
        <p><b>Result:</b> &quot;p95 latency dropped from ~800ms to under 480ms — a 40% reduction. Throughput on the events endpoint roughly doubled. No downtime during rollout because changes were backwards compatible.&quot;</p>
      </Card>
    </>
  );
}
