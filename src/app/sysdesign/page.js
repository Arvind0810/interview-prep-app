export const metadata = { title: "System Design — Interview Prep" };

export default function SysDesignPage() {
  return (
    <>
      <h1>System Design</h1>
      <p>System design rounds evaluate your ability to architect scalable, resilient systems. Interviewers expect you to drive the conversation, ask clarifying questions, and discuss trade-offs explicitly.</p>

      {/* ────────── FRAMEWORK ────────── */}
      <h2>The Framework (Memorize This)</h2>
      <ol>
        <li><b>Clarify Requirements (5 min):</b> Functional (What does the system do?) and Non-Functional (Scale, latency, consistency, availability). Ask about read-to-write ratios.</li>
        <li><b>Capacity Estimation (3-5 min):</b> Daily Active Users (DAU), QPS (Queries Per Second), bandwidth, storage per year. Keep math simple (use powers of 10).</li>
        <li><b>API Design (5 min):</b> Define endpoints, methods, and JSON payloads.</li>
        <li><b>Data Model (5 min):</b> Relational vs NoSQL, tables/collections, partition keys.</li>
        <li><b>High-Level Architecture (10 min):</b> Draw the boxes: Client → LB → Gateway → App Servers → Cache → DB.</li>
        <li><b>Deep Dives (10-15 min):</b> Discuss bottlenecks, sharding, caching strategies, async queues.</li>
        <li><b>Trade-offs (5 min):</b> Why NoSQL over SQL here? Why pull over push model? Acknowledge what breaks first.</li>
      </ol>

      {/* ────────── CAPACITY CHEAT SHEET ────────── */}
      <h2>Capacity Estimation Cheat Sheet</h2>
      <p>Use these numbers to do quick back-of-the-envelope math.</p>
      <table>
        <thead><tr><th>Quantity</th><th>Magnitude</th></tr></thead>
        <tbody>
          <tr><td>1 Day</td><td>86,400 seconds (Round to 100,000 for math)</td></tr>
          <tr><td>2.5 Million Requests / Month</td><td>~1 Request / Second</td></tr>
          <tr><td>100 Million Requests / Day</td><td>~1,000 Requests / Second (QPS)</td></tr>
          <tr><td>1 KB per message * 1000 QPS</td><td>1 MB / second = ~2.5 TB / month</td></tr>
        </tbody>
      </table>
      
      <h3>Latency Numbers Every Programmer Should Know</h3>
      <table>
        <thead><tr><th>Operation</th><th>Time</th></tr></thead>
        <tbody>
          <tr><td>L1 cache reference</td><td>0.5 ns</td></tr>
          <tr><td>Read from main memory</td><td>100 ns</td></tr>
          <tr><td>Read 1 MB sequentially from SSD</td><td>1 ms</td></tr>
          <tr><td>Disk seek (HDD)</td><td>10 ms</td></tr>
          <tr><td>Round trip within same datacenter</td><td>500 µs (0.5 ms)</td></tr>
          <tr><td>Send packet CA to Netherlands</td><td>150 ms</td></tr>
        </tbody>
      </table>

      {/* ────────── CORE CONCEPTS ────────── */}
      <h2>Core Concepts to Master</h2>
      
      <h3>CAP Theorem &amp; PACELC</h3>
      <p><b>CAP Theorem:</b> In a distributed system, you can only guarantee two out of three: Consistency, Availability, Partition Tolerance. Since network partitions (P) are unavoidable, you must choose between Consistency (CP) and Availability (AP).</p>
      <p><b>PACELC Theorem:</b> Extends CAP. <i>If</i> Partition (P), choose Availability (A) or Consistency (C). <i>Else</i> (E) - when running normally - choose Latency (L) or Consistency (C).</p>

      <h3>Database Scaling</h3>
      <ul>
        <li><b>Vertical Scaling (Scale Up):</b> Buy a bigger server. Easy, but has a hard limit and no redundancy.</li>
        <li><b>Horizontal Scaling (Scale Out):</b> Add more servers. Harder to implement (requires sharding), but infinite scale.</li>
        <li><b>Read Replicas:</b> Route all writes to the Master, route reads to Replicas. Great for read-heavy systems (e.g. 100:1 read-to-write ratio).</li>
        <li><b>Sharding (Data Partitioning):</b> Splitting a massive DB into smaller DBs. 
          <br/><i>Challenge:</i> Choosing the right Shard Key to avoid "hot spots" (e.g. don't shard by alphabet if 'S' is 30% of users).
        </li>
      </ul>

      <h3>Consistent Hashing</h3>
      <p>When you have a cluster of cache servers (e.g., 4 Redis nodes), a standard hash <code>hash(key) % N</code> breaks completely if you add or remove a node (all data gets reshuffled). <b>Consistent hashing</b> maps both data and servers onto a circular ring. A key is assigned to the next server clockwise on the ring. Adding/removing a server only affects its immediate neighbors (1/N of the data moves).</p>

      <h3>Load Balancing</h3>
      <ul>
        <li><b>L4 (Transport Layer):</b> Routes based on IP and Port. Very fast, unaware of content.</li>
        <li><b>L7 (Application Layer):</b> Routes based on HTTP headers, URLs, cookies. Can do SSL termination and smart routing.</li>
        <li><b>Algorithms:</b> Round Robin, Least Connections, IP Hash.</li>
      </ul>

      {/* ────────── COMMON SYSTEM DESIGNS ────────── */}
      <h2>Common Interview Designs</h2>
      
      <details><summary>Design a URL Shortener (e.g., bit.ly)</summary>
        <p><b>Requirements:</b> High availability, fast redirects. Short URLs shouldn't be guessable.</p>
        <p><b>Core Logic:</b> Generate a unique ID (from a Ticket Server or auto-increment DB), encode it using Base62 ([a-zA-Z0-9] = 62 chars). A 7-character base62 string supports 62^7 = 3.5 Trillion URLs.</p>
        <p><b>Storage:</b> Key-Value store (DynamoDB or Cassandra) is perfect since lookups are purely by ID.</p>
        <p><b>Caching:</b> Heavily cache redirects in Redis. Use LRU eviction. Caching is highly effective here (Pareto principle: 20% of URLs get 80% of traffic).</p>
      </details>

      <details><summary>Design a Rate Limiter</summary>
        <p><b>Algorithms:</b></p>
        <ul>
          <li><i>Token Bucket:</i> Buckets hold tokens. Refill at fixed rate. Request costs 1 token. Best overall.</li>
          <li><i>Leaking Bucket:</i> Queue holds requests. Process at fixed rate. Smooths out traffic spikes.</li>
          <li><i>Fixed Window:</i> Counter per minute. Flaw: spikes at the edges of windows (e.g. 23:59:59 to 00:00:01).</li>
          <li><i>Sliding Window Log:</i> Keep exact timestamps in Redis Sorted Sets. Perfect accuracy, high memory cost.</li>
        </ul>
        <p><b>Architecture:</b> Place it at the API Gateway level. Store counts in Redis.</p>
      </details>

      <details><summary>Design a Notification System</summary>
        <p><b>Components:</b> API Gateway → Rules Engine (check preferences) → Message Queue (Kafka/SQS) → Dispatch Workers (Email, SMS, Push).</p>
        <p><b>Critical elements:</b> Idempotency (don't send twice), Dead Letter Queues (for failed sends), 3rd party rate limits, Retry logic with exponential backoff.</p>
      </details>

      <details><summary>Design a News Feed (e.g., Twitter/Instagram)</summary>
        <p><b>Push Model (Fan-out on Write):</b> When Alice tweets, workers instantly push the tweet to the feeds of all her followers in Redis. <i>Reads are fast (O(1)), writes are slow for celebrities (Justin Bieber has 100M followers - doing 100M writes takes too long).</i></p>
        <p><b>Pull Model (Fan-out on Read):</b> Feed is generated on the fly when Bob opens the app by querying all people he follows. <i>Writes are fast, reads are painfully slow.</i></p>
        <p><b>Hybrid (The Solution):</b> Use Push for normal users. Use Pull for celebrities. Bob's feed = pre-computed Push feed + live-queried Celebrity tweets.</p>
      </details>

      <details><summary>Design a Key-Value Store (e.g., DynamoDB/Cassandra)</summary>
        <p><b>Data Partitioning:</b> Consistent Hashing to distribute data across nodes.</p>
        <p><b>Replication:</b> Replicate data to N nodes across different datacenters for high availability.</p>
        <p><b>Consistency:</b> Quorum consensus. W + R &gt; N to guarantee strong consistency. (Write to W nodes, Read from R nodes, out of N total replicas).</p>
        <p><b>Conflict Resolution:</b> Vector clocks or Last-Write-Wins (LWW) to resolve simultaneous updates.</p>
      </details>
      
      {/* ────────── CACHING STRATEGIES ────────── */}
      <h2>Caching Strategies</h2>
      <ul>
        <li><b>Cache-Aside (Lazy Loading):</b> App asks cache. If miss, app asks DB, writes to cache, returns to user. (Best for read-heavy).</li>
        <li><b>Write-Through:</b> App writes to cache, cache synchronously writes to DB. (Data is always consistent, but writes are slower).</li>
        <li><b>Write-Behind (Write-Back):</b> App writes to cache, cache immediately returns success, then asynchronously writes to DB. (Fastest writes, but data loss risk if cache crashes).</li>
        <li><b>Eviction Policies:</b> LRU (Least Recently Used) is standard. LFU (Least Frequently Used) is good for heavy tails. FIFO (First In First Out).</li>
      </ul>

      {/* ────────── LOAD BALANCING ALGORITHMS ────────── */}
      <h2>Load Balancing Algorithms</h2>
      <ul>
        <li><b>Round Robin:</b> Distribute requests sequentially. Fails if servers have different capacities.</li>
        <li><b>Weighted Round Robin:</b> Assign weights (e.g., Server A gets 3x traffic of Server B based on RAM/CPU).</li>
        <li><b>Least Connections:</b> Send traffic to the server with the fewest active connections. Great for long-lived connections (WebSockets).</li>
        <li><b>IP Hash:</b> Hash the client's IP to assign them to a consistent server. Good for sticky sessions (though stateless servers + Redis is better).</li>
      </ul>
      
      {/* ────────── TRADE OFFS ────────── */}
      <h2>Important Trade-offs to Discuss</h2>
      <ul>
        <li><b>SQL vs NoSQL:</b> SQL for ACID transactions and relational data. NoSQL for massive horizontal scale, flexible schemas, and key-value lookups.</li>
        <li><b>Long Polling vs WebSockets vs Server-Sent Events:</b> Polling is bad. Long Polling is okay for rare updates. WebSockets for bi-directional high-frequency (chat, games). SSE for unidirectional server-to-client (stock tickers).</li>
        <li><b>Microservices vs Monolith:</b> Monoliths are faster to build and have no network latency. Microservices allow independent scaling, tech diversity, and isolated deployments, but introduce massive operational complexity (tracing, network failures).</li>
      </ul>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Concept</th><th>When to use it</th></tr></thead>
        <tbody>
          <tr><td>CDN (Cloudflare, CloudFront)</td><td>Serving static assets globally with low latency.</td></tr>
          <tr><td>API Gateway</td><td>Rate limiting, authentication, request routing, SSL termination.</td></tr>
          <tr><td>Message Queue (Kafka/RabbitMQ)</td><td>Async processing, decoupling microservices, buffering high traffic (bursts).</td></tr>
          <tr><td>Redis / Memcached</td><td>Caching DB queries, session storage, distributed locks, leaderboards (Sorted Sets).</td></tr>
          <tr><td>Elasticsearch</td><td>Full-text search, log aggregation, complex faceted querying.</td></tr>
          <tr><td>Consistent Hashing</td><td>Distributing data across a cluster of servers without mass re-shuffling on scale out/in.</td></tr>
          <tr><td>Gossip Protocol</td><td>Peer-to-peer state sharing in decentralized clusters (Cassandra/Redis Cluster).</td></tr>
        </tbody>
      </table>
    </>
  );
}
