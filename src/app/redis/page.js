export const metadata = { title: "Redis & Caching — Interview Prep" };

export default function RedisPage() {
  return (
    <>
      <h1>Redis &amp; Caching</h1>
      <p>You added Redis caching to cut latency by 40%. Expect questions on cache patterns, eviction, persistence, and pitfalls.</p>

      <h2>Data Structures</h2>
      <table>
        <thead><tr><th>Type</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td>String</td><td>Cached JSON, counters with INCR, session tokens</td></tr>
          <tr><td>Hash</td><td>Object fields without full JSON parse — HGET user:1 name</td></tr>
          <tr><td>List</td><td>Queues (LPUSH/RPOP), recent items capped with LTRIM</td></tr>
          <tr><td>Set</td><td>Unique items, fast membership check — friends of user</td></tr>
          <tr><td>Sorted Set</td><td>Leaderboards, time-ordered streams, rate limiters</td></tr>
          <tr><td>Stream</td><td>Append-only log with consumer groups — Kafka-lite</td></tr>
          <tr><td>HyperLogLog</td><td>Approximate unique counts in tiny memory</td></tr>
          <tr><td>Bitmap</td><td>Daily active user flags, feature flags</td></tr>
          <tr><td>Geo</td><td>Nearby-X queries with GEOADD/GEORADIUS</td></tr>
        </tbody>
      </table>

      <h2>Caching Patterns</h2>
      <h3>Cache-Aside (Lazy Loading) — your pattern</h3>
      <pre><code>{`func GetEvent(ctx context.Context, id string) (*Event, error) {
    // 1. Try cache
    if data, err := redis.Get(ctx, "event:"+id).Result(); err == nil {
        var e Event; json.Unmarshal([]byte(data), &e); return &e, nil
    }
    // 2. Cache miss — hit DB
    e, err := db.GetEvent(ctx, id)
    if err != nil { return nil, err }
    // 3. Write back to cache
    data, _ := json.Marshal(e)
    redis.Set(ctx, "event:"+id, data, 60*time.Second)
    return e, nil
}`}</code></pre>
      <h3>Write-Through</h3>
      <p>App writes to cache and DB synchronously. Cache always in sync but slower writes.</p>
      <h3>Write-Behind</h3>
      <p>Write to cache, async flush to DB. Fast but risk of data loss.</p>
      <h3>Read-Through</h3>
      <p>Cache library handles DB fetch on miss transparently. Less app code, less control.</p>

      <h2>TTL &amp; Eviction</h2>
      <ul>
        <li><b>TTL</b> — set with <code>SET key value EX 60</code> or <code>EXPIRE key 60</code>. Always set one — don&apos;t grow unbounded.</li>
        <li><b>maxmemory-policy</b> — what to evict when full. <code>allkeys-lru</code> for caches, <code>noeviction</code> for queues.</li>
        <li>Use a <i>jittered</i> TTL (e.g., 60s + random 0–10s) to avoid stampedes when many keys expire at once.</li>
      </ul>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><b>Thundering herd:</b> Cache expires, 1000 requests hit DB at once. Solution: lock the regeneration (single-flight) or refresh slightly before expiry.</li>
        <li><b>Cache penetration:</b> Queries for nonexistent keys bypass cache and hit DB every time. Solution: cache the &quot;not found&quot; with short TTL.</li>
        <li><b>Cache stampede on cold start:</b> Pre-warm on deploy, or use stale-while-revalidate.</li>
        <li><b>Inconsistency on writes:</b> If you update DB then cache, a crash between leaves stale cache. Use <i>delete-on-write</i> instead — let next read repopulate.</li>
        <li><b>Big keys:</b> Don&apos;t store 50MB blobs. Use S3 and cache the URL.</li>
        <li><b>Blocking commands:</b> <code>KEYS *</code> blocks the whole instance. Use <code>SCAN</code>.</li>
      </ul>

      <h2>Distributed Locking</h2>
      <p>Use <code>SET key value NX EX 30</code> to acquire. Release by checking value matches before <code>DEL</code> (use a Lua script for atomicity). For high correctness, look at Redlock — but it has known caveats.</p>

      <h2>Redis vs Memcached</h2>
      <table>
        <thead><tr><th>Feature</th><th>Redis</th><th>Memcached</th></tr></thead>
        <tbody>
          <tr><td>Data types</td><td>Many (lists, sets, sorted sets, streams)</td><td>Strings only</td></tr>
          <tr><td>Persistence</td><td>Yes (RDB/AOF)</td><td>No</td></tr>
          <tr><td>Pub/Sub</td><td>Yes</td><td>No</td></tr>
          <tr><td>Multi-threaded</td><td>Single (Redis 6+ has I/O threads)</td><td>Yes</td></tr>
          <tr><td>Best for</td><td>Caching + queues + state</td><td>Pure caching at scale</td></tr>
        </tbody>
      </table>
    </>
  );
}
