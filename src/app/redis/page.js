export const metadata = { title: "Redis & Caching — Interview Prep" };

export default function RedisPage() {
  return (
    <>
      <h1>Redis &amp; Caching</h1>
      <p>You added Redis caching to cut latency by 40%. Expect questions on cache patterns, eviction, persistence, and pitfalls.</p>

      {/* ────────── ARCHITECTURE ────────── */}
      <h2>Redis Architecture</h2>
      <p>Redis is an in-memory data structure store. It is primarily <b>single-threaded</b> for command execution. This means commands are executed sequentially, guaranteeing atomicity and eliminating the need for internal locks. (Note: Redis 6+ introduced I/O threads for network parsing, but command execution remains single-threaded).</p>

      {/* ────────── DATA STRUCTURES ────────── */}
      <h2>Data Structures</h2>
      <p>Redis is not just a key-value store; it&apos;s a data structure server.</p>
      <table>
        <thead><tr><th>Type</th><th>Commands</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td><b>String</b></td><td>GET, SET, INCR</td><td>Cached JSON blobs, counters, session tokens, rate limits. (Max 512MB)</td></tr>
          <tr><td><b>Hash</b></td><td>HGET, HSET, HGETALL</td><td>Storing object fields. Fetching specific user properties without parsing full JSON.</td></tr>
          <tr><td><b>List</b></td><td>LPUSH, RPOP, LTRIM</td><td>Message Queues, maintaining a recent N items list (e.g. latest 100 comments).</td></tr>
          <tr><td><b>Set</b></td><td>SADD, SISMEMBER, SINTER</td><td>Unique items, fast membership check. Tags, friends in common (intersection).</td></tr>
          <tr><td><b>Sorted Set (ZSet)</b></td><td>ZADD, ZRANGE, ZRANK</td><td>Leaderboards, time-ordered streams, rate limiter sliding windows. Each item has a score.</td></tr>
          <tr><td><b>Stream</b></td><td>XADD, XREADGROUP</td><td>Append-only log with consumer groups — Kafka-lite for event sourcing.</td></tr>
          <tr><td><b>HyperLogLog</b></td><td>PFADD, PFCOUNT</td><td>Approximate unique counts (e.g., millions of unique IP visitors) using only 12KB memory.</td></tr>
          <tr><td><b>Bitmap</b></td><td>SETBIT, GETBIT</td><td>Daily active user flags, feature flags. Extremely memory efficient.</td></tr>
          <tr><td><b>Geo</b></td><td>GEOADD, GEORADIUS</td><td>Location-based queries, finding nearby drivers or stores.</td></tr>
        </tbody>
      </table>

      {/* ────────── CACHING PATTERNS ────────── */}
      <h2>Caching Patterns</h2>
      
      <h3>1. Cache-Aside (Lazy Loading) — your pattern</h3>
      <p>The application is responsible for reading and writing to both storage and cache. Best for general read-heavy workloads.</p>
      <pre><code>{`func GetEvent(ctx context.Context, id string) (*Event, error) {
    // 1. Try cache
    if data, err := redis.Get(ctx, "event:"+id).Result(); err == nil {
        var e Event; json.Unmarshal([]byte(data), &e); return &e, nil
    }
    // 2. Cache miss — hit DB
    e, err := db.GetEvent(ctx, id)
    if err != nil { return nil, err }
    
    // 3. Write back to cache with TTL
    data, _ := json.Marshal(e)
    redis.Set(ctx, "event:"+id, data, 60*time.Second)
    return e, nil
}`}</code></pre>

      <h3>2. Write-Through</h3>
      <p>App writes data to cache and DB synchronously in one transaction. Pro: Data is never stale. Con: Slower writes.</p>
      
      <h3>3. Write-Behind (Write-Back)</h3>
      <p>App writes to cache only and returns immediately. An asynchronous process later flushes the cache to the DB. Pro: Extremely fast writes. Con: Risk of data loss if cache crashes before flush.</p>
      
      <h3>4. Read-Through</h3>
      <p>The application asks the cache for data. If missing, a cache provider automatically fetches it from the DB. Less app code.</p>

      {/* ────────── TTL & EVICTION ────────── */}
      <h2>TTL &amp; Eviction Policies</h2>
      <p>Memory is expensive. You must manage how keys are removed.</p>
      <ul>
        <li><b>TTL (Time To Live):</b> Always set a TTL on cached data (<code>SET key val EX 60</code>). Never let caches grow unbounded.</li>
        <li><b>maxmemory:</b> The memory limit configured in redis.conf.</li>
        <li><b>maxmemory-policy:</b> What Redis does when it hits the limit:
          <ul>
            <li><code>allkeys-lru</code>: Evict least recently used keys out of all keys. (Standard for caches).</li>
            <li><code>volatile-lru</code>: Evict least recently used keys among those with an expiration set.</li>
            <li><code>allkeys-lfu</code>: Evict least frequently used keys.</li>
            <li><code>noeviction</code>: Return errors on write. (Standard if Redis is used as a primary database/queue).</li>
          </ul>
        </li>
      </ul>

      {/* ────────── PITFALLS ────────── */}
      <h2>Common Caching Pitfalls</h2>
      <ul>
        <li><b>Cache Stampede (Thundering Herd):</b> A hot key (e.g., homepage data) expires. Suddenly 1,000 requests hit the DB at once, bringing it down. 
          <br/><i>Solution:</i> Use a Mutex (single-flight) so only one request queries the DB while others wait, or use probabilistic early expiration (refresh slightly before expiry).
        </li>
        <li><b>Cache Penetration:</b> Malicious users query for non-existent IDs. Cache misses, hits DB, returns nothing. Repeat. 
          <br/><i>Solution:</i> Cache the empty result (NULL) with a short TTL, or use a Bloom Filter before querying the DB.
        </li>
        <li><b>Avalanche:</b> All cache keys expire at the exact same time (e.g. nightly cron jobs), flooding the DB.
          <br/><i>Solution:</i> Add random <b>Jitter</b> to TTLs (e.g., base TTL 60s + random(0-10s)).
        </li>
        <li><b>Inconsistency on writes:</b> If you update DB then update Cache, a crash between leaves a stale cache forever. 
          <br/><i>Solution:</i> Use <b>Delete-on-write</b> (invalidate cache). It&apos;s safer to delete the cache and let the next read repopulate it than to try to keep it perfectly updated.
        </li>
        <li><b>Big Keys:</b> Storing 50MB in one key blocks Redis (since it&apos;s single threaded) during serialization. 
          <br/><i>Solution:</i> Split data, or store large JSON/Images in S3 and cache the URL.
        </li>
        <li><b>Blocking commands:</b> Running <code>KEYS *</code> in production blocks all other commands. 
          <br/><i>Solution:</i> Use <code>SCAN</code> which iterates in chunks.
        </li>
      </ul>

      {/* ────────── DISTRIBUTED SYSTEMS ────────── */}
      <h2>Distributed Redis &amp; Concurrency</h2>
      
      <h3>Distributed Locks</h3>
      <p>When multiple microservices need exclusive access to a resource.</p>
      <pre><code>{`// Acquire Lock (Set if Not eXists, with Expiry to prevent permanent deadlock)
SET lock:resource123 "unique_worker_id" NX EX 30

// Release Lock (Must check ownership first to avoid deleting another worker's lock)
// Handled via Lua script for atomicity:
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end`}</code></pre>
      <p><i>Note: For highly critical locks across multiple nodes, the Redlock algorithm is used, though it has complex distributed systems caveats.</i></p>

      <h3>Pub/Sub vs Streams</h3>
      <ul>
        <li><b>Pub/Sub (PUBLISH/SUBSCRIBE):</b> Fire and forget. If a subscriber is offline, the message is lost. Great for live real-time notifications.</li>
        <li><b>Streams (XADD/XREAD):</b> Persistent append-only logs. Consumer groups track offsets. If a worker dies, another can resume. Similar to Kafka.</li>
      </ul>

      <h3>Persistence (RDB vs AOF)</h3>
      <p>If Redis crashes, does it lose data?</p>
      <ul>
        <li><b>RDB (Redis Database Snapshot):</b> Point-in-time snapshot to disk every X minutes. Fast to restart, but loses recent data on crash.</li>
        <li><b>AOF (Append Only File):</b> Logs every write operation. Slower, larger file, but no data loss. Usually, production runs both.</li>
      </ul>

      <h3>High Availability</h3>
      <ul>
        <li><b>Redis Sentinel:</b> Monitors master and replicas. Automatically promotes a replica to master if the master goes down.</li>
        <li><b>Redis Cluster:</b> Automatically shards/partitions data across multiple masters. Used when data is larger than RAM on a single machine.</li>
      </ul>

      <h2>Redis vs Memcached</h2>
      <table>
        <thead><tr><th>Feature</th><th>Redis</th><th>Memcached</th></tr></thead>
        <tbody>
          <tr><td>Data types</td><td>Strings, Hashes, Lists, Sets, ZSets, Streams</td><td>Strings only</td></tr>
          <tr><td>Persistence</td><td>Yes (RDB/AOF)</td><td>No (restarts empty)</td></tr>
          <tr><td>Features</td><td>Pub/Sub, Lua scripting, Transactions</td><td>Bare-bones caching</td></tr>
          <tr><td>Threading</td><td>Single-threaded execution</td><td>Multi-threaded</td></tr>
          <tr><td>Best for</td><td>Complex data manipulation, queues, state, HA</td><td>Pure massive-scale string caching</td></tr>
        </tbody>
      </table>
      
      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Data Types</td><td>ZSets for leaderboards, HyperLogLog for counting, Hashes for objects.</td></tr>
          <tr><td>Cache-aside</td><td>Check cache → hit DB on miss → populate cache. Delete cache on write.</td></tr>
          <tr><td>Pitfalls</td><td>Stampede (thundering herd), Penetration (cache NULLs), Avalanche (add Jitter).</td></tr>
          <tr><td>Eviction</td><td>allkeys-lru, always set TTLs.</td></tr>
          <tr><td>Single Threaded</td><td>No race conditions on basic commands, but long operations (KEYS *) block the world.</td></tr>
        </tbody>
      </table>
    </>
  );
}
