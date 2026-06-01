export const metadata = { title: "Microservices & APIs — Interview Prep" };

export default function MicroservicesPage() {
  return (
    <>
      <h1>Microservices &amp; API Design</h1>
      <p>You contributed to the 1Finance API ecosystem with 28 REST endpoints, JWT auth, and Dockerized Node.js services. Be ready for REST design, auth, async patterns, and microservices trade-offs.</p>

      <h2>REST Design Principles</h2>
      <ul>
        <li><b>Nouns, not verbs:</b> <code>GET /events/:id</code>, not <code>GET /getEvent</code></li>
        <li><b>Plurals for collections:</b> <code>/events</code>, not <code>/event</code></li>
        <li><b>HTTP verbs:</b> GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE</li>
        <li><b>Status codes:</b> 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauth, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 429 Rate Limited, 500 Server Error</li>
        <li><b>Versioning:</b> <code>/v1/events</code> or <code>Accept: application/vnd.api+json;version=1</code></li>
        <li><b>Pagination:</b> cursor-based for deep pages (<code>?cursor=xyz&amp;limit=20</code>) or page+size for shallow</li>
        <li><b>Filtering:</b> <code>?status=active&amp;type=webinar</code></li>
        <li><b>Idempotency:</b> POST should accept <code>Idempotency-Key</code> header for retries</li>
      </ul>

      <h2>Authentication &amp; Authorization</h2>
      <h3>JWT (your stack)</h3>
      <p>Stateless token: <code>header.payload.signature</code>. Server signs with secret (HS256) or private key (RS256). Client sends <code>Authorization: Bearer &lt;token&gt;</code>.</p>
      <pre><code>{`// Sign
claims := jwt.MapClaims{
    "sub": userID,
    "role": "admin",
    "exp": time.Now().Add(15*time.Minute).Unix(),
}
token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
s, _ := token.SignedString([]byte(secret))

// Verify (Fiber middleware handles it)
app.Use(jwtware.New(jwtware.Config{ SigningKey: []byte(secret) }))`}</code></pre>
      <p><b>Best practices:</b> short-lived access tokens (15m) + long-lived refresh tokens (7d) stored httpOnly cookie. Rotate refresh on use. Never store JWT in localStorage if XSS is a risk.</p>

      <h3>OAuth 2.0 Flows</h3>
      <ul>
        <li><b>Authorization Code (with PKCE)</b> — for SPAs and mobile apps</li>
        <li><b>Client Credentials</b> — server-to-server</li>
        <li><b>Implicit</b> — deprecated, don&apos;t use</li>
      </ul>

      <h2>Microservices vs Monolith</h2>
      <table>
        <thead><tr><th>Aspect</th><th>Monolith</th><th>Microservices</th></tr></thead>
        <tbody>
          <tr><td>Deployment</td><td>One unit</td><td>Independent per service</td></tr>
          <tr><td>Team scaling</td><td>Coordination overhead</td><td>Teams own services</td></tr>
          <tr><td>Tech diversity</td><td>One stack</td><td>Polyglot possible</td></tr>
          <tr><td>Operational complexity</td><td>Low</td><td>High (tracing, deploys, monitoring)</td></tr>
          <tr><td>Latency</td><td>In-process calls</td><td>Network hops</td></tr>
          <tr><td>Consistency</td><td>ACID transactions</td><td>Eventual, sagas</td></tr>
        </tbody>
      </table>
      <p><b>Pragmatic take:</b> start with a well-modularized monolith. Split into services when teams or scaling demand it — not by default.</p>

      <h2>Async Patterns (your WhatsApp Business API work)</h2>
      <p>Don&apos;t block the request thread on external I/O. Patterns:</p>
      <ul>
        <li><b>Fire-and-forget goroutine</b> — simple but loses errors and on crash</li>
        <li><b>Message queue</b> — RabbitMQ, SQS, Redis Streams, Kafka. Reliable, retryable, decoupled.</li>
        <li><b>Outbox pattern</b> — write event to same DB transaction, separate worker publishes to queue. Avoids dual-write inconsistency.</li>
        <li><b>Webhook callbacks</b> — for very long workflows</li>
      </ul>

      <h2>Resilience Patterns</h2>
      <ul>
        <li><b>Retry with exponential backoff</b> — and a max attempts</li>
        <li><b>Circuit breaker</b> — stop calling a failing service for a while</li>
        <li><b>Timeout</b> — every external call needs one</li>
        <li><b>Bulkhead</b> — isolate resources so one slow dependency can&apos;t drain all threads</li>
        <li><b>Rate limiting</b> — token bucket (Redis-based works well)</li>
      </ul>

      <h2>Observability — the three pillars</h2>
      <ul>
        <li><b>Logs</b> — structured (JSON), with request_id propagated across services</li>
        <li><b>Metrics</b> — Prometheus + Grafana. RED method: Rate, Errors, Duration</li>
        <li><b>Traces</b> — OpenTelemetry, see the full request flow across services</li>
      </ul>
    </>
  );
}
