export const metadata = { title: "Microservices & APIs — Interview Prep" };

export default function MicroservicesPage() {
  return (
    <>
      <h1>Microservices &amp; API Design</h1>
      <p>Microservices architectures decouple systems into independent, scalable units, but introduce significant distributed systems complexity. You must understand how they communicate, fail, and maintain consistency.</p>

      {/* ────────── REST vs gRPC vs GraphQL ────────── */}
      <h2>API Paradigms</h2>
      <table>
        <thead><tr><th>Paradigm</th><th>Protocol</th><th>Format</th><th>Best For</th></tr></thead>
        <tbody>
          <tr><td><b>REST</b></td><td>HTTP/1.1</td><td>JSON</td><td>Public APIs, CRUD apps, standard web clients.</td></tr>
          <tr><td><b>gRPC</b></td><td>HTTP/2</td><td>Protobuf (Binary)</td><td>Internal microservice-to-microservice communication. High performance, strongly typed.</td></tr>
          <tr><td><b>GraphQL</b></td><td>HTTP</td><td>JSON</td><td>Complex UIs where clients need to specify exactly what data they want. Prevents over-fetching.</td></tr>
          <tr><td><b>Webhooks</b></td><td>HTTP</td><td>JSON</td><td>Server-to-server event notifications (e.g. Stripe payment succeeded).</td></tr>
        </tbody>
      </table>

      {/* ────────── REST BEST PRACTICES ────────── */}
      <h2>REST API Best Practices</h2>
      <ul>
        <li><b>Resource-Oriented:</b> Use nouns, not verbs. <code>GET /users/123/orders</code> not <code>POST /getUserOrders</code>.</li>
        <li><b>HTTP Methods:</b>
          <ul>
            <li><code>GET</code> - Retrieve (Safe, Idempotent)</li>
            <li><code>POST</code> - Create (Not idempotent)</li>
            <li><code>PUT</code> - Replace entirely (Idempotent)</li>
            <li><code>PATCH</code> - Partial update (Usually idempotent)</li>
            <li><code>DELETE</code> - Remove (Idempotent)</li>
          </ul>
        </li>
        <li><b>Status Codes:</b> 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized - identity), 403 (Forbidden - permissions), 404 (Not Found), 429 (Too Many Requests), 500 (Internal Server Error).</li>
        <li><b>Versioning:</b> Either URI (<code>/v1/users</code>) or Header (<code>Accept: application/vnd.company.v1+json</code>).</li>
        <li><b>Pagination:</b> Use Cursor-based pagination (<code>?cursor=xyz</code>) for massive datasets. Offset pagination (<code>?page=5&limit=20</code>) gets extremely slow on deep pages.</li>
      </ul>

      {/* ────────── DISTRIBUTED DATA ────────── */}
      <h2>Managing Data in Microservices</h2>
      <p>The golden rule of microservices: <b>Database per service.</b> Services should NEVER share a database. If Service A needs Service B's data, it must call Service B's API.</p>

      <h3>Distributed Transactions (The Saga Pattern)</h3>
      <p>In a monolith, you use ACID transactions. In microservices, a workflow might span 3 services (e.g., Order Service → Inventory Service → Payment Service). If Payment fails, you must rollback Order and Inventory.</p>
      <ul>
        <li><b>Choreography:</b> Event-driven. Order Service emits "OrderCreated". Inventory listens, reserves stock, emits "StockReserved". If payment fails, it emits "PaymentFailed", and Inventory/Order listen and run compensating transactions to undo the work.</li>
        <li><b>Orchestration:</b> A central "Saga Orchestrator" service commands the other services and handles the rollback logic explicitly.</li>
      </ul>

      <h3>CQRS (Command Query Responsibility Segregation)</h3>
      <p>Separating the read model from the write model. Writes go to a primary DB (Command). An async event bus updates a secondary DB optimized for querying (e.g. Elasticsearch or a flattened NoSQL table). Reads hit the secondary DB.</p>
      
      <h3>Event Sourcing</h3>
      <p>Instead of storing current state, store every state-changing event as an append-only log. The current state is derived by replaying the events. (Think of a bank ledger: you don't just store "Balance=$500", you store "+$600", "-$100").</p>

      {/* ────────── COMMUNICATION & RESILIENCE ────────── */}
      <h2>Inter-Service Communication &amp; Resilience</h2>
      <p>Networks fail. Services crash. Your system must survive.</p>
      
      <h3>Sync vs Async</h3>
      <ul>
        <li><b>Synchronous (REST/gRPC):</b> Service A calls Service B and waits. <i>Danger:</i> If B is slow, A blocks. If B is down, A fails. Creates cascading failures.</li>
        <li><b>Asynchronous (Message Broker):</b> Service A publishes to Kafka/RabbitMQ. Service B consumes it. <i>Benefit:</i> High availability, decoupling, smooths out traffic spikes.</li>
      </ul>

      <h3>Resilience Patterns</h3>
      <ul>
        <li><b>Timeouts:</b> NEVER make a network call without a strict timeout.</li>
        <li><b>Retries with Exponential Backoff:</b> If a call fails, retry after 1s, then 2s, then 4s, 8s. Add <b>Jitter</b> (randomness) so all failing clients don't retry at the exact same millisecond.</li>
        <li><b>Circuit Breaker:</b> If Service B fails 10 times in a row, "trip" the circuit breaker. Service A immediately returns an error or fallback value without calling B, giving B time to recover.</li>
        <li><b>Bulkhead:</b> Isolate resources. If the Payment Service is slow, don't let it consume all the threads in the API Gateway, leaving none for the Profile Service.</li>
        <li><b>Idempotency:</b> Ensure that if a request is retried (due to a network blip), the operation only happens once. (e.g., Pass an <code>Idempotency-Key</code> header; server checks if it has processed it before).</li>
      </ul>

      {/* ────────── INFRASTRUCTURE ────────── */}
      <h2>Microservices Infrastructure</h2>
      
      <h3>API Gateway</h3>
      <p>The single entry point for clients. Handles Cross-Cutting Concerns: SSL termination, Authentication (JWT validation), Rate Limiting, Request Routing.</p>
      
      <h3>Service Discovery</h3>
      <p>How does Service A find Service B when IPs change constantly in Kubernetes? A Service Registry (like Consul or K8s internal DNS) keeps track of healthy instances.</p>

      <h3>Observability (The Three Pillars)</h3>
      <ol>
        <li><b>Logs:</b> Must be structured (JSON) and centralized (ELK stack).</li>
        <li><b>Metrics:</b> Time-series data (Prometheus/Grafana). Track RED metrics (Rate, Errors, Duration).</li>
        <li><b>Distributed Tracing:</b> (OpenTelemetry, Jaeger). A <code>trace_id</code> is generated at the API Gateway and passed in HTTP headers to every downstream service. Allows you to visualize the entire path of a request across 10 different microservices.</li>
      </ol>
      
      <h2>Authentication (JWT vs OAuth)</h2>
      <p><b>JWT (JSON Web Token):</b> Stateless. Contains <code>header.payload.signature</code>. The signature prevents tampering. Downside: Cannot be easily revoked before expiration unless you maintain a blacklist in Redis.</p>
      <p><b>OAuth 2.0:</b> An authorization framework. 
        <br/><i>Authorization Code Flow:</i> Client gets a code from Auth Server, exchanges it for an Access Token on the backend. Highly secure.
        <br/><i>Client Credentials Flow:</i> Machine-to-machine authentication.
      </p>
    </>
  );
}
