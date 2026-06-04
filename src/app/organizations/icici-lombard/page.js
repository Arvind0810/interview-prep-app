export const metadata = { title: "ICICI Lombard — Sr. Backend Engineer (Golang)" };

export default function ICICILombardPage() {
  return (
    <>
      <h1>ICICI Lombard: Senior Backend Engineer (Golang)</h1>
      <p>
        <strong>Domain:</strong> Motor Division (Insurance)<br />
        <strong>Experience:</strong> 5+ Years<br />
        <strong>Core Tech Stack:</strong> Golang, PHP, Laravel, React, MySQL
      </p>

      <h2>Job Description Breakdown & Strategy</h2>
      <p>Based on the provided Job Description, here are the key themes the interviewers will test you on and how to prepare for them:</p>

      <ol>
        <li>
          <strong>Software Modularity & Architecture:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Deep understanding of making software modular, writing the whole backend code, and building reusable libraries.</li>
            <li><strong>Preparation:</strong> Brush up on Clean Architecture, Domain-Driven Design (DDD), and SOLID principles in Go. Be ready to explain how you organize Go packages (e.g., standard layout vs domain-driven) and avoid circular dependencies.</li>
          </ul>
        </li>
        <li>
          <strong>API Integration (Revamped Blaze & IL Systems):</strong>
          <ul>
            <li><strong>JD Expectation:</strong> API integration with "revamped blaze" and other ICICI Lombard legacy/new systems.</li>
            <li><strong>Preparation:</strong> Expect questions on RESTful API design, GRPC, handling timeouts, circuit breakers, rate limiting, and integrating with third-party SOAP/XML or REST APIs reliably.</li>
          </ul>
        </li>
        <li>
          <strong>Optimization (Speed & Scalability):</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Optimization for maximum speed and scalability.</li>
            <li><strong>Preparation:</strong> Go concurrency (Goroutines, Channels, WaitGroups), profiling using `pprof`, optimizing database queries, adding Redis caching, and horizontal scaling strategies.</li>
          </ul>
        </li>
        <li>
          <strong>Database Design (MySQL):</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Creating schemas that support business processes, MySQL proficiency.</li>
            <li><strong>Preparation:</strong> ACID properties, transaction isolation levels, indexing strategies, handling database migrations, and avoiding N+1 queries. Given the insurance domain, expect questions on data integrity and handling financial transactions safely.</li>
          </ul>
        </li>
        <li>
          <strong>Security, Auth & Compliance:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> User auth between multiple systems, security/data protection, accessibility/compliance.</li>
            <li><strong>Preparation:</strong> OAuth2.0, JWT, SSO (Single Sign-On). Discuss encrypting PII/PHI (Personally Identifiable Information — critical for insurance), SQL injection prevention, and CORS.</li>
          </ul>
        </li>
        <li>
          <strong>Test Driven Development (TDD):</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Implementing TDD.</li>
            <li><strong>Preparation:</strong> Know how to write tests in Go (`go test`, `testing` package), use of `testify`, table-driven tests, and how to mock dependencies (using interfaces and `gomock`).</li>
          </ul>
        </li>
        <li>
          <strong>Multi-Stack Awareness (PHP/Laravel/React):</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Integration with front-end, tech stack includes PHP/Laravel/React.</li>
            <li><strong>Preparation:</strong> Since you are applying for Golang, you might be migrating older PHP/Laravel services to Go, or building APIs for a React frontend. Be ready to discuss the pros/cons of Go vs PHP, and how to design APIs that are friendly for front-end consumption (GraphQL, BFF pattern, or well-structured REST).</li>
          </ul>
        </li>
      </ol>

      <h2>Top Interview Questions & Answers</h2>

      <details><summary>1. How do you design a modular, scalable architecture in Golang?</summary>
        <p><strong>Answer:</strong></p>
        <p>In Go, modularity is achieved through proper package management and the use of interfaces.</p>
        <ul>
          <li><strong>Clean Architecture:</strong> I separate the application into layers: Handlers (HTTP/gRPC), Use Cases (Business Logic), and Repositories (Data Access).</li>
          <li><strong>Dependency Injection:</strong> Rather than tightly coupling components, I define interfaces for repositories and third-party services, and inject them into the Use Cases. This makes the code highly modular and testable.
<pre><code>{`// Example of Dependency Injection
type PolicyRepository interface {
    Save(ctx context.Context, policy Policy) error
}

type PolicyService struct {
    repo PolicyRepository
}

func NewPolicyService(r PolicyRepository) *PolicyService {
    return &PolicyService{repo: r}
}`}</code></pre>
          </li>
          <li><strong>Package Layout:</strong> I group files by domain (e.g., <code>/motor</code>, <code>/claims</code>, <code>/policies</code>) rather than by type (e.g., all controllers in one folder). This follows Domain-Driven Design (DDD) principles.</li>
        </ul>
      </details>

      <details><summary>2. You need to integrate our new Go backend with "Blaze" and several legacy ICICI Lombard systems. How do you ensure reliability?</summary>
        <p><strong>Answer:</strong></p>
        <p>When integrating with external or legacy systems, I assume they can fail or be slow.</p>
        <ul>
          <li><strong>Timeouts:</strong> Use Go's <code>context.WithTimeout</code> for every outgoing HTTP/gRPC request to prevent our goroutines from hanging indefinitely.
<pre><code>{`// Example: 5-second timeout for external API call
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

req, _ := http.NewRequestWithContext(ctx, "GET", "https://blaze.api/legacy", nil)
resp, err := http.DefaultClient.Do(req)`}</code></pre>
          </li>
          <li><strong>Circuit Breaker:</strong> Implement a circuit breaker (like Netflix Hystrix or <code>go-resiliency</code>) to stop sending requests if the legacy system is down, allowing it time to recover and serving a fallback response to the user.</li>
          <li><strong>Retries with Exponential Backoff:</strong> For transient errors (e.g., HTTP 503), implement retries with increasing delays.</li>
          <li><strong>Idempotency:</strong> Ensure the APIs we call (or expose) are idempotent, especially for financial transactions like premium payments, so retrying a request doesn't result in double-charging.</li>
        </ul>
      </details>

      <details><summary>3. We use MySQL heavily. How would you design a schema for a Motor Insurance Policy and ensure fast reads?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Schema Design:</strong> I would normalize the data into tables like <code>Users</code>, <code>Vehicles</code>, <code>Policies</code>, and <code>Payments</code>. A <code>Policy</code> table would have foreign keys to <code>User</code> and <code>Vehicle</code>.</li>
          <li><strong>Indexing:</strong> Add B-Tree indexes on frequently queried columns, such as <code>user_id</code>, <code>vehicle_registration_number</code>, and <code>policy_status</code>.</li>
          <li><strong>Read Optimization:</strong> For heavy read operations (like fetching policy details for a dashboard), I would introduce Redis as a caching layer (Cache-Aside pattern). If a user views their policy, we check Redis first; on a miss, we query MySQL and store the result in Redis with a TTL.</li>
          <li><strong>Transactions:</strong> For issuing a policy, we must write to <code>Policies</code> and <code>Payments</code> simultaneously. I would wrap these in a MySQL transaction with <code>READ COMMITTED</code> or <code>REPEATABLE READ</code> isolation to ensure ACID compliance.</li>
        </ul>
      </details>

      <details><summary>4. Explain how you implement Test-Driven Development (TDD) in Golang.</summary>
        <p><strong>Answer:</strong></p>
        <p>TDD involves writing the test before the actual implementation (Red-Green-Refactor).</p>
        <ul>
          <li><strong>Interfaces for Mocking:</strong> I define interfaces for any external dependency (e.g., <code>Database</code> interface, <code>EmailSender</code> interface).</li>
          <li><strong>Table-Driven Tests:</strong> Go's idioms heavily favor table-driven tests. I create a slice of anonymous structs defining the input, expected output, and expected error, and iterate through them using <code>t.Run()</code>.
<pre><code>{`func TestCalculatePremium(t *testing.T) {
    tests := []struct {
        name     string
        age      int
        expected int
    }{
        {"Young driver", 20, 1500},
        {"Experienced driver", 35, 800},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := CalculatePremium(tt.age)
            assert.Equal(t, tt.expected, result)
        })
    }
}`}</code></pre>
          </li>
          <li><strong>Mock Generation:</strong> I use <code>gomock</code> or manually write mock structs that implement the interfaces to isolate the business logic during testing.</li>
          <li><strong>Coverage:</strong> I run <code>go test -cover</code> to ensure the critical business paths are covered, particularly for complex logic like insurance premium calculations.</li>
        </ul>
      </details>

      <details><summary>5. How do you handle User Authentication and Authorization between multiple systems?</summary>
        <p><strong>Answer:</strong></p>
        <p>Since the JD mentions multiple systems (Blaze, legacy IL systems, React frontend), a centralized auth mechanism is required.</p>
        <ul>
          <li><strong>Single Sign-On (SSO):</strong> I would use OAuth 2.0 or OIDC (OpenID Connect). The user authenticates once via an Identity Provider (IdP).</li>
          <li><strong>JWT (JSON Web Tokens):</strong> The IdP issues a JWT. The React frontend sends this JWT in the <code>Authorization: Bearer</code> header to the Go backend.</li>
          <li><strong>Stateless Verification:</strong> The Go backend can verify the JWT signature using the IdP's public key without needing to do a database lookup for every request.</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> The JWT payload can include claims like <code>role: admin</code> or <code>role: user</code>. In Go, I would write a middleware function that checks the JWT validity and ensures the user has the required role to access the specific API route.</li>
        </ul>
      </details>

      <details><summary>6. How would you optimize a Go application for maximum speed?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Concurrency:</strong> Utilize Goroutines to process independent tasks in parallel (e.g., fetching user profile and policy documents simultaneously). Use <code>sync.WaitGroup</code> to synchronize them.
<pre><code>{`var wg sync.WaitGroup
wg.Add(2)

go func() {
    defer wg.Done()
    fetchUserProfile()
}()

go func() {
    defer wg.Done()
    fetchPolicyDocuments()
}()

wg.Wait() // Wait for both concurrent tasks to finish`}</code></pre>
          </li>
          <li><strong>Connection Pooling:</strong> Ensure the database connection pool (<code>sql.DB</code>) is properly configured (<code>SetMaxOpenConns</code>, <code>SetMaxIdleConns</code>) to prevent exhausting database connections or spending too much time establishing new ones.</li>
          <li><strong>Profiling:</strong> Use Go's built-in <code>pprof</code> tool to identify CPU bottlenecks and memory leaks (e.g., identifying goroutine leaks or excessive memory allocations).</li>
          <li><strong>Avoid Reflection:</strong> Reflection in Go (like using the <code>encoding/json</code> package extensively on dynamic payloads) is slow. Where possible, use code generation (like <code>easyjson</code>) or avoid <code>interface{}</code> types.</li>
        </ul>
      </details>
      
      <details><summary>7. What do you think about the Go vs PHP/Laravel aspect of our stack?</summary>
        <p><strong>Answer:</strong></p>
        <p><em>(This is a cultural/architectural question based on their stack).</em></p>
        <p>Both have their places. PHP/Laravel is excellent for rapid application development, monolithic structures, and server-side rendering. However, as an application scales, Go shines due to its static typing, incredibly low memory footprint, and native concurrency model.</p>
        <p>In a microservices architecture, it makes sense to use Go for high-throughput, compute-intensive APIs (like processing thousands of motor insurance claims or premium calculations concurrently), while PHP might still serve the legacy admin portals. Communication between them can happen via REST APIs or message queues like Kafka/RabbitMQ.</p>
      </details>

      <details><summary>8. How do Goroutines differ from OS Threads, and how do you prevent Race Conditions?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Goroutines vs Threads:</strong> Goroutines are user-space threads managed by the Go runtime, not the OS. They are extremely lightweight (starting at ~2KB of stack space compared to 1-2MB for OS threads), meaning you can spawn hundreds of thousands of them. They are multiplexed onto a smaller number of OS threads by the Go scheduler (M:N scheduling).</li>
          <li><strong>Preventing Race Conditions:</strong> A race condition occurs when multiple goroutines access the same memory concurrently and at least one is writing. To prevent this, I use the <code>sync.Mutex</code> (or <code>sync.RWMutex</code> for read-heavy workloads) to lock critical sections. Alternatively, following Go's proverb: <em>"Do not communicate by sharing memory; instead, share memory by communicating"</em>, I use <strong>channels</strong> to safely pass data between goroutines without explicit locking. I also religiously use the <code>-race</code> flag (<code>go test -race</code> or <code>go build -race</code>) during development to catch issues early.
<pre><code>{`type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    // Lock so only one goroutine at a time can access the map c.v.
    c.v[key]++
    c.mu.Unlock()
}`}</code></pre>
          </li>
        </ul>
      </details>

      <details><summary>9. In a microservices architecture, how do you handle distributed transactions (e.g., deducting a balance in one service and issuing a policy in another)?</summary>
        <p><strong>Answer:</strong></p>
        <p>Since ACID transactions don't span across multiple microservices databases, we have to rely on Eventual Consistency.</p>
        <ul>
          <li><strong>Saga Pattern:</strong> I would implement the Saga pattern. It's a sequence of local transactions. Each local transaction updates the database and publishes an event or message to trigger the next local transaction in the saga.</li>
          <li><strong>Compensating Transactions:</strong> If a step fails (e.g., the payment succeeds but the policy issuance fails), the saga executes a series of compensating transactions that undo the changes made by the preceding local transactions (e.g., issuing a refund).</li>
          <li><strong>Implementation:</strong> This can be orchestrated via a central controller (Orchestration-based Saga) or through decentralized events published to a message broker like Kafka or RabbitMQ (Choreography-based Saga).</li>
        </ul>
      </details>

      <details><summary>10. How do you implement data protection and secure APIs handling sensitive insurance data?</summary>
        <p><strong>Answer:</strong></p>
        <p>Insurance deals with PII (Personally Identifiable Information) and financial data, so security is paramount.</p>
        <ul>
          <li><strong>Encryption in Transit & at Rest:</strong> All API communication must be over HTTPS/TLS 1.2+. Sensitive database columns (like bank accounts or PAN numbers) should be encrypted at rest using a Key Management Service (AWS KMS or HashiCorp Vault) and AES-256-GCM.</li>
          <li><strong>Data Masking:</strong> When returning data to the frontend or writing to logs, sensitive information should be masked (e.g., logging <code>XXXX-XXXX-XXXX-1234</code> instead of a full credit card number).</li>
          <li><strong>Input Validation & Parameterized Queries:</strong> Always validate incoming payloads against a strict schema (e.g., using Go's <code>validator</code> package) and use parameterized queries (via <code>database/sql</code> or an ORM like GORM) to prevent SQL injection.</li>
          <li><strong>Rate Limiting & WAF:</strong> Implement IP-based and User-based rate limiting to prevent brute-force attacks and DDoS, alongside a Web Application Firewall.</li>
        </ul>
      </details>

      <details><summary>11. What is your approach to building reusable code and libraries for future use?</summary>
        <p><strong>Answer:</strong></p>
        <p>The JD specifically asks for this. To build reusable libraries in Go:</p>
        <ul>
          <li><strong>Keep it focused (Single Responsibility):</strong> A library should do one thing well. For example, creating a centralized <code>logger</code> package or a <code>metrics</code> package that standardizes how all IL microservices report data.</li>
          <li><strong>Design around Interfaces:</strong> Accept interfaces and return structs. This allows consumers of the library to mock the library easily in their own unit tests.</li>
          <li><strong>Versioning and Dependency Management:</strong> Extract the reusable code into its own Git repository and tag it using Semantic Versioning (v1.0.0). Other projects can import it via Go Modules. Ensure backward compatibility; if introducing breaking changes, bump the major version (v2).</li>
          <li><strong>Documentation:</strong> Write clear GoDoc comments for all exported functions and provide a <code>README.md</code> with usage examples.</li>
        </ul>
      </details>

      <details><summary>12. How do you optimize a MySQL database when queries start becoming slow as data scales?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Execution Plan (EXPLAIN):</strong> First, I run <code>EXPLAIN</code> on the slow query to see if it's doing a full table scan or using an index.</li>
          <li><strong>Indexing:</strong> Add B-Tree indexes to columns used in <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code> clauses. If querying multiple columns together frequently, create a <strong>Composite Index</strong> (remembering the left-most prefix rule).</li>
          <li><strong>Avoid N+1 Queries:</strong> In application code, ensure we aren't running a query inside a loop. Use <code>IN (...)</code> clauses or JOINs to fetch related data in a single batch.</li>
          <li><strong>Archiving / Partitioning:</strong> In insurance, old expired policies might not be accessed often. We can partition the table by date or archive old records to a data warehouse to keep the hot table small and fast.</li>
          <li><strong>Read Replicas:</strong> Route all <code>SELECT</code> queries to read-replicas, freeing up the primary master database for <code>INSERT/UPDATE/DELETE</code> operations.</li>
        </ul>
      </details>

      <details><summary>13. Our tech stack involves integrating React frontends with server-side logic. How do you handle Cross-Origin Resource Sharing (CORS) and API design for React?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>CORS:</strong> Since the React app (e.g., <code>portal.icicilombard.com</code>) might be hosted on a different domain or port than the Go API (e.g., <code>api.icicilombard.com</code>), the browser enforces the Same-Origin Policy. I would configure the Go backend's CORS middleware to explicitly allow the React app's origin, specifying allowed methods (GET, POST, PUT) and headers (Authorization, Content-Type).</li>
          <li><strong>BFF (Backend-for-Frontend) Pattern:</strong> Instead of making the React app aggregate data from 5 different microservices, I would build a Go aggregation layer (BFF) that fetches the data concurrently, formats it exactly how the UI needs it, and returns a single JSON payload. This reduces client-side latency and battery drain on mobile devices.</li>
        </ul>
      </details>

      <details><summary>14. How do you ensure high availability and observability for your Go services?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Statelessness:</strong> Design the Go application to be completely stateless. Session data should live in Redis, not in application memory. This allows us to spin up multiple instances of the Go app behind a load balancer without worrying about sticky sessions.</li>
          <li><strong>Health Checks:</strong> Expose <code>/healthz</code> and <code>/readyz</code> endpoints. Kubernetes or the Load Balancer uses these to know if the application is ready to accept traffic or if it needs to be restarted.</li>
          <li><strong>Observability:</strong>
            <ul>
              <li><em>Logs:</em> Use structured JSON logging (e.g., using <code>slog</code> or <code>zap</code>) so logs can be easily parsed by ELK/Datadog.</li>
              <li><em>Metrics:</em> Expose Prometheus metrics (CPU, memory, HTTP request durations, error rates).</li>
              <li><em>Tracing:</em> Implement Distributed Tracing (OpenTelemetry/Jaeger) by passing a trace ID through the context. When a request hits multiple microservices, the trace ID allows us to visualize the entire path and find the exact bottleneck.</li>
            </ul>
          </li>
        </ul>
      </details>

      <details><summary>15. What is your strategy for managing code using version control (Git) in a collaborative team?</summary>
        <p><strong>Answer:</strong></p>
        <p>The JD requires "Proficient understanding of code versioning tools."</p>
        <ul>
          <li><strong>Branching Strategy:</strong> I typically use Trunk-Based Development or GitHub Flow. Main branch is always deployable. We create short-lived feature branches, open Pull Requests (PRs), and merge back to main quickly.</li>
          <li><strong>Code Reviews & CI/CD:</strong> A PR must be reviewed by at least one other engineer. I set up GitHub Actions / GitLab CI to automatically run <code>go fmt</code>, <code>golangci-lint</code>, and <code>go test</code> on every push. The PR cannot be merged if the build or tests fail.</li>
          <li><strong>Merge vs Rebase:</strong> I prefer rebasing my feature branch onto the latest <code>main</code> before merging to keep a clean, linear commit history without unnecessary merge commits.</li>
        </ul>
      </details>


      <h2>Behavioral Tips for this Role</h2>
      <ul>
        <li><strong>"Displayed ownership in building end-to-end applications":</strong> Be ready to use the STAR method (Situation, Task, Action, Result) to describe a project where you took a feature from gathering requirements to database design, backend implementation, and production deployment.</li>
        <li><strong>Communication Skills:</strong> The JD emphasizes that "great software engineers are great writers too." During the interview, explain your technical decisions clearly. Mention your practice of writing detailed API documentation (Swagger/OpenAPI), ADRs (Architecture Decision Records), and clean, readable code.</li>
        <li><strong>Financial/Insurance Domain Awareness:</strong> Always emphasize <strong>Data Security</strong>, <strong>Auditability</strong>, and <strong>Reliability</strong>. In insurance, a dropped transaction or a data leak is disastrous. Mentioning things like "Immutable ledgers", "PCI-DSS compliance", and "Audit Logs" will score you massive points.</li>
      </ul>
    </>
  );
}
