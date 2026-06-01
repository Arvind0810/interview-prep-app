import { Card } from "@/components/Card";

export const metadata = { title: "PostgreSQL & SQL — Interview Prep" };

export default function PostgresPage() {
  return (
    <>
      <h1>PostgreSQL &amp; SQL</h1>
      <p>Your 40% latency win came from PostgreSQL optimization — interviewers will dig into how you did it. Master query plans, indexes, and transaction isolation.</p>

      {/* ────────── ACID & ARCHITECTURE ────────── */}
      <h2>ACID Properties &amp; MVCC</h2>
      <p>PostgreSQL is a relational database strictly adhering to ACID principles:</p>
      <ul>
        <li><b>Atomicity:</b> All or nothing. Transactions either commit fully or rollback entirely.</li>
        <li><b>Consistency:</b> Data constraints (foreign keys, unique, checks) are always enforced.</li>
        <li><b>Isolation:</b> Concurrent transactions don&apos;t interfere with each other (see Isolation Levels).</li>
        <li><b>Durability:</b> Committed data is saved to disk and survives crashes (via WAL - Write Ahead Log).</li>
      </ul>
      
      <h3>MVCC (Multi-Version Concurrency Control)</h3>
      <p>Postgres uses MVCC for isolation. Instead of locking a row when reading/writing, it creates a <i>new version</i> of the row. <b>Readers don&apos;t block writers, and writers don&apos;t block readers.</b> Old rows are marked as dead tuples and cleaned up later by the <code>VACUUM</code> process. If autovacuum fails to keep up, the table bloats.</p>

      {/* ────────── INDEXES ────────── */}
      <h2>Indexes Deep Dive</h2>
      <p>An index is a separate data structure that maps column values to row locations (TID - Tuple Identifier). Trade-off: faster reads, slower writes, more disk space.</p>
      <table>
        <thead><tr><th>Type</th><th>When to use</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><b>B-tree</b> (default)</td><td>Equality and range queries (<code>=, &lt;, &gt;, BETWEEN</code>)</td><td>Self-balancing tree. Excellent for general purpose.</td></tr>
          <tr><td><b>Hash</b></td><td>Equality only (<code>=</code>)</td><td>Rarely used since B-tree handles equality well.</td></tr>
          <tr><td><b>GIN</b></td><td>Full-text search, JSONB, arrays</td><td>Generalized Inverted Index. Great for &quot;contains&quot; queries.</td></tr>
          <tr><td><b>GiST</b></td><td>Geospatial (PostGIS), ranges, nearest neighbor</td><td>Generalized Search Tree.</td></tr>
          <tr><td><b>BRIN</b></td><td>Huge tables with naturally ordered data (time-series logs)</td><td>Stores min/max for block ranges. Tiny index size.</td></tr>
          <tr><td><b>Partial</b></td><td><code>WHERE status=&apos;active&apos;</code></td><td>Index only the rows you query frequently. Very fast/small.</td></tr>
          <tr><td><b>Composite</b></td><td>Multi-column queries</td><td>Order matters! Leftmost prefix rule applies.</td></tr>
        </tbody>
      </table>
      
      <h3>Composite Index Order (The Leftmost Prefix Rule)</h3>
      <p>If you create an index on <code>(user_id, created_at, status)</code>:</p>
      <ul>
        <li>✅ <code>WHERE user_id = 1</code> (Uses index)</li>
        <li>✅ <code>WHERE user_id = 1 AND created_at &gt; &apos;2024-01-01&apos;</code> (Uses index)</li>
        <li>❌ <code>WHERE created_at &gt; &apos;2024-01-01&apos;</code> (<b>Full table scan</b>, because <code>user_id</code> is missing)</li>
      </ul>
      <p><b>Rule of thumb for ordering:</b> Equality first, then ranges/sorting.</p>

      {/* ────────── EXPLAIN ANALYZE ────────── */}
      <h2>Query Optimization &amp; EXPLAIN ANALYZE</h2>
      <p><code>EXPLAIN</code> shows the planner&apos;s estimate. <code>EXPLAIN ANALYZE</code> actually runs the query and shows real timings.</p>
      <pre><code>{`EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM events WHERE user_id = 'u123' AND created_at > NOW() - INTERVAL '7 days';`}</code></pre>
      
      <h3>How to read the output:</h3>
      <ul>
        <li><b>Seq Scan (Sequential Scan):</b> Reads every row in the table. Bad for large tables. Means missing index.</li>
        <li><b>Index Scan:</b> Traverses the index to find the row, then reads the row from the table heap. Good.</li>
        <li><b>Index Only Scan:</b> Traverses the index, and the index <i>already contains all requested columns</i>. Never hits the table heap. Very fast.</li>
        <li><b>Bitmap Heap Scan:</b> Used when returning many rows. Reads the index, builds a bitmap of row locations in memory, sorts them by disk block, then reads blocks efficiently.</li>
        <li><b>Nested Loop Join:</b> For every row in A, loop through B. Good for small result sets.</li>
        <li><b>Hash Join:</b> Hashes table A into memory, then scans table B probing the hash table. Good for large tables (if memory permits).</li>
        <li><b>Buffers:</b> <code>shared hit=X read=Y</code>. Hits are from RAM. Reads are from Disk. If you see high reads, tune <code>shared_buffers</code>.</li>
      </ul>

      {/* ────────── N+1 PROBLEM ────────── */}
      <h2>The N+1 Problem</h2>
      <p>The most common ORM/SQL performance bug. You load a list of N items, then make a query for each item.</p>
      <pre><code>{`-- BAD: 1 + N queries (e.g. loops in code)
users := db.Query("SELECT id FROM users")
for u := range users {
    orders := db.Query("SELECT * FROM orders WHERE user_id=$1", u.ID)
}

-- GOOD: 1 query with JOIN
SELECT u.*, o.* FROM users u LEFT JOIN orders o ON u.id = o.user_id;

-- GOOD: 2 queries with IN clause (often preferred in microservices/GraphQL)
orders := db.Query("SELECT * FROM orders WHERE user_id = ANY($1::uuid[])", userIDs) `}</code></pre>

      {/* ────────── ISOLATION LEVELS ────────── */}
      <h2>Transactions &amp; Isolation Levels</h2>
      <p>Isolation levels prevent anomalies when multiple transactions run concurrently.</p>
      <table>
        <thead><tr><th>Level</th><th>Dirty Read</th><th>Non-repeatable Read</th><th>Phantom Read</th></tr></thead>
        <tbody>
          <tr><td><b>Read Uncommitted</b></td><td>Possible (Not in PG)</td><td>Possible</td><td>Possible</td></tr>
          <tr><td><b>Read Committed (PG Default)</b></td><td>No</td><td>Possible</td><td>Possible</td></tr>
          <tr><td><b>Repeatable Read</b></td><td>No</td><td>No</td><td>Possible (Not in PG)</td></tr>
          <tr><td><b>Serializable</b></td><td>No</td><td>No</td><td>No</td></tr>
        </tbody>
      </table>
      
      <h3>Anomalies explained:</h3>
      <ul>
        <li><b>Dirty Read:</b> Reading uncommitted data from another transaction. (PG prevents this natively).</li>
        <li><b>Non-repeatable Read:</b> Reading the same row twice in a transaction yields different results (because another txn updated it).</li>
        <li><b>Phantom Read:</b> A query for a range of rows yields different results (because another txn inserted a row in that range).</li>
      </ul>

      <h3>Pessimistic vs Optimistic Locking</h3>
      <p>For high-stakes data like money transfers, you must prevent race conditions:</p>
      <pre><code>{`-- Pessimistic Locking (Row-level lock)
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE; -- Blocks other txns from modifying this row
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Optimistic Locking (Requires a 'version' column)
UPDATE accounts 
SET balance = balance - 100, version = version + 1 
WHERE id = 1 AND version = 5; 
-- If affected_rows == 0, another txn updated it first. Retry.`}</code></pre>

      {/* ────────── CONNECTION POOLING ────────── */}
      <h2>Connection Pooling (PgBouncer)</h2>
      <p>PostgreSQL forks a new OS process for every connection. This takes ~10MB of RAM and takes time. You cannot have 10,000 direct connections to Postgres without crashing it.</p>
      <p><b>PgBouncer</b> sits between the app and the DB. The app opens 10,000 connections to PgBouncer. PgBouncer multiplexes them onto a small pool (e.g. 100) of real DB connections. Transaction pooling mode is the most common.</p>

      {/* ────────── ADVANCED SQL ────────── */}
      <h2>Advanced SQL Features</h2>
      
      <h3>JSONB</h3>
      <p>Postgres handles JSON natively. <code>JSONB</code> stores it in a parsed binary format, allowing fast indexing and querying. Perfect for schemaless data, metadata, or webhooks.</p>
      <pre><code>{`-- Querying inside JSON
SELECT * FROM events WHERE payload->>'event_type' = 'click';
-- Creating a GIN index on JSONB
CREATE INDEX idx_payload ON events USING GIN (payload);`}</code></pre>

      <h3>Window Functions</h3>
      <p>Perform calculations across a set of rows related to the current row, without collapsing them (unlike GROUP BY).</p>
      <pre><code>{`-- Rank events per user by date
SELECT user_id, event_id,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
FROM events;

-- Running total
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM transactions;`}</code></pre>

      <h3>CTEs (Common Table Expressions)</h3>
      <p>Makes complex queries readable. The <code>WITH</code> clause.</p>
      <pre><code>{`WITH recent_users AS (
    SELECT id FROM users WHERE created_at > NOW() - INTERVAL '30 days'
)
SELECT * FROM orders WHERE user_id IN (SELECT id FROM recent_users);`}</code></pre>

      {/* ────────── STORY ────────── */}
      <h2>Your 40% Latency Win — How to Tell It</h2>
      <Card>
        <p><b>Problem:</b> &quot;When I joined 1Finance, several core endpoints — particularly the events listing and personalization scoring — were taking 800ms+ at p95. Under load they degraded further.&quot;</p>
        <p><b>Root cause:</b> &quot;I ran EXPLAIN ANALYZE on the slow paths. Found two issues: sequential scans on event tables because we had no index on (user_id, created_at), and an N+1 pattern where the personalization service was making one query per scoring rule.&quot;</p>
        <p><b>Action:</b> &quot;I added composite indexes on the hot WHERE columns (carefully ordering equality fields first, then ranges), rewrote the personalization query to fetch all rules in a single batch with IN, and put a Redis cache-aside layer in front of the events endpoint with a 60-second TTL since the data didn&apos;t need to be real-time fresh.&quot;</p>
        <p><b>Result:</b> &quot;p95 latency dropped from ~800ms to under 480ms — a 40% reduction. Throughput on the events endpoint roughly doubled. No downtime during rollout because changes were backwards compatible.&quot;</p>
      </Card>
      
      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Indexes</td><td>B-tree vs GIN. Leftmost prefix rule for composite indexes. Index Only Scans.</td></tr>
          <tr><td>EXPLAIN ANALYZE</td><td>Finds Seq Scans. Actual timings. Buffers show memory vs disk hits.</td></tr>
          <tr><td>N+1 Problem</td><td>1 query per item in a loop. Fix with JOINs or WHERE IN (...).</td></tr>
          <tr><td>Isolation / Locking</td><td>MVCC. Read Committed default. FOR UPDATE row locking for financial txns.</td></tr>
          <tr><td>Scaling</td><td>PgBouncer for pooling. Read replicas for read-heavy loads. Table partitioning.</td></tr>
        </tbody>
      </table>
    </>
  );
}
