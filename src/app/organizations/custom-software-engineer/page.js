export const metadata = { title: "Custom Software Engineer — Go & Cloud Native" };

export default function CustomSoftwareEngineerPage() {
  return (
    <>
      <h1>Custom Software Engineer (Tax Technology Leader)</h1>
      <p>
        <strong>Domain:</strong> Tax Technology / Cloud Platform<br />
        <strong>Experience:</strong> 8+ Years (3+ in Cloud Native/SaaS)<br />
        <strong>Must Have:</strong> Go Programming Language<br />
        <strong>Good to Have:</strong> Machine Learning, .NET Full Stack<br />
        <strong>Core Tech Stack:</strong> Golang, REST API, RDBMS/NoSQL, Docker, Kubernetes, AWS/Azure/GCP, Terraform/Helm, Pulsar/SNS/SQS, React/Angular, Cypress/Selenium.
      </p>

      <h2>Job Description Breakdown & Strategy</h2>
      <p>Based on the provided Job Description, here are the key themes the interviewers will test you on and how to prepare for them:</p>

      <ol>
        <li>
          <strong>Go Programming & Backend Services:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Hands-on design, code, and maintain software solutions using modern languages (Go).</li>
            <li><strong>Preparation:</strong> Brush up on advanced Go concepts (concurrency, memory management, interfaces). Be ready to discuss how you've built scalable microservices using Go and Fiber/Gorilla Mux.</li>
          </ul>
        </li>
        <li>
          <strong>Cloud Infrastructure & IaC:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Experience with AWS/Azure/GCP and IaC (Terraform, CloudFormation, Helm).</li>
            <li><strong>Preparation:</strong> Expect questions on how you deploy and manage your applications. Discuss Kubernetes for container orchestration, writing Helm charts, and using Terraform to provision AWS/GCP resources.</li>
          </ul>
        </li>
        <li>
          <strong>Microservices & Event-Driven Architecture:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Event-driven arch (Pulsar, SNS/SQS) and Microservices.</li>
            <li><strong>Preparation:</strong> Explain how you decouple services using message queues. Be prepared to discuss Pub/Sub patterns, handling message retries, dead-letter queues, and ensuring eventual consistency.</li>
          </ul>
        </li>
        <li>
          <strong>Test Automation & Quality:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> API test automation, UI automation (Cypress, Selenium).</li>
            <li><strong>Preparation:</strong> Discuss your approach to testing. Mention table-driven tests in Go, integration testing with testcontainers, and writing end-to-end UI tests with Cypress.</li>
          </ul>
        </li>
        <li>
          <strong>Technical Leadership & Architecture:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Mentor junior engineers, contribute to technical design, tech migrations, system performance.</li>
            <li><strong>Preparation:</strong> Prepare examples of when you led a migration (e.g., monolith to microservices, or PHP to Go), how you review code, and how you mentor peers. Focus on identifying design patterns.</li>
          </ul>
        </li>
        <li>
          <strong>Frontend Familiarity:</strong>
          <ul>
            <li><strong>JD Expectation:</strong> Familiarity with React/Angular.</li>
            <li><strong>Preparation:</strong> Since you have experience with React and Next.js, highlight how you build full-stack features and collaborate with frontend developers.</li>
          </ul>
        </li>
      </ol>

      <h2>Top Interview Questions & Answers</h2>

      <details><summary>1. How do you design and scale a microservices architecture in Go?</summary>
        <p><strong>Answer:</strong></p>
        <p>I focus on decoupling and clear boundaries.</p>
        <ul>
          <li><strong>Domain-Driven Design:</strong> Break down the monolith by business domains (e.g., Tax Calculations, User Management).</li>
          <li><strong>Go Concurrency:</strong> Utilize Go's lightweight goroutines to handle high-throughput requests concurrently.</li>
          <li><strong>API Gateway:</strong> Use an API gateway to route requests, handle authentication (JWT), and rate-limit.</li>
          <li><strong>Containerization:</strong> Dockerize each Go service and orchestrate with Kubernetes. Use Helm charts to manage deployments.</li>
          <li><strong>Observability:</strong> Integrate structured logging and distributed tracing (like OpenTelemetry) to track requests across services.</li>
        </ul>
      </details>

      <details><summary>2. Explain your experience with Event-Driven Architecture (SNS/SQS or Pulsar).</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Decoupling Services:</strong> Instead of synchronous HTTP calls that can cause cascading failures, I use a message broker. For instance, when a tax document is uploaded, a message is published to an SNS topic.</li>
          <li><strong>Asynchronous Processing:</strong> Worker services subscribe to SQS queues, pick up the messages, and process the documents asynchronously.</li>
          <li><strong>Resilience:</strong> If a worker fails, the message remains in the queue (or goes to a Dead Letter Queue after retries) ensuring no data loss.</li>
          <li><strong>Idempotency:</strong> I design consumers to be idempotent so processing the same message twice doesn't cause side effects.</li>
        </ul>
      </details>

      <details><summary>3. How do you approach Infrastructure as Code (IaC) with Terraform or Helm?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Terraform:</strong> I use Terraform to provision cloud resources declaratively (VPCs, RDS instances, EKS clusters). It keeps infrastructure version-controlled and reproducible.</li>
          <li><strong>State Management:</strong> Store Terraform state remotely (e.g., in S3 with DynamoDB locking) for team collaboration.</li>
          <li><strong>Helm:</strong> For Kubernetes, I write Helm charts to template application deployments. This makes it easy to deploy the same Go service across different environments (dev, staging, prod) by simply passing different <code>values.yaml</code>.</li>
        </ul>
      </details>

      <details><summary>4. Tell me about a time you led a technical migration or improved system performance.</summary>
        <p><strong>Answer:</strong></p>
        <p><em>(Use a STAR story from your 1Finance experience)</em></p>
        <ul>
          <li><strong>Situation:</strong> We had legacy encryption scripts running slowly or monolithic services becoming hard to maintain.</li>
          <li><strong>Task:</strong> I needed to migrate endpoints to a new GoFiber platform and improve response times.</li>
          <li><strong>Action:</strong> I designed the new Fiber router groups, implemented DB-backed JWT middleware with Redis caching, and wrote idempotent encryption backfill scripts. I optimized PostgreSQL queries by adding proper indexes.</li>
          <li><strong>Result:</strong> We saw a significant drop in latency and successfully decoupled the services without downtime.</li>
        </ul>
      </details>

      <details><summary>5. How do you implement automated testing strategies for an API and UI?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Go API Tests:</strong> I use table-driven tests for unit testing business logic. For integration tests, I use tools like <code>testcontainers-go</code> to spin up a real PostgreSQL container, run migrations, and test the repository layer.</li>
          <li><strong>UI Tests:</strong> For the frontend, I prefer Cypress. I write End-to-End (E2E) tests that simulate user journeys (e.g., logging in, submitting a form). I mock API responses for isolated frontend testing, and run full E2E tests against a staging environment in the CI/CD pipeline.</li>
        </ul>
      </details>

      <details><summary>6. How do you ensure security best practices in a Cloud Native SaaS application?</summary>
        <p><strong>Answer:</strong></p>
        <ul>
          <li><strong>Authentication/Authorization:</strong> Use robust Identity Providers and JWT-based auth. Implement Role-Based Access Control (RBAC) middleware in the Go APIs.</li>
          <li><strong>Data Security:</strong> Encrypt data at rest (using AWS KMS or similar) and in transit (TLS). Mask sensitive logs.</li>
          <li><strong>Vulnerability Scanning:</strong> Integrate tools in the CI/CD pipeline (e.g., Trivy for Docker images, GoSec for static code analysis) to catch vulnerabilities before deployment.</li>
          <li><strong>Least Privilege:</strong> Ensure IAM roles and Kubernetes service accounts have only the permissions they strictly need.</li>
        </ul>
      </details>

      <h2>Behavioral & Values Preparation</h2>
      <p>The company emphasizes specific core values. Map your stories to these:</p>
      <ul>
        <li><strong>Own the Outcome:</strong> Talk about a project where you took full end-to-end responsibility (e.g., Magazine or HR Conclave modules), ensuring successful delivery despite roadblocks.</li>
        <li><strong>Work with Purpose & Act with Urgency:</strong> Describe how you prioritize tasks using Agile methodologies, delivering quick iterations (MVPs) and adapting to feedback rapidly.</li>
        <li><strong>Communicate with Clarity:</strong> Explain how you conduct code reviews and lead technical design discussions. Emphasize your blameless Root Cause Analysis (RCA) approach when things go wrong.</li>
        <li><strong>Drive to Decision:</strong> Discuss a time you had to make a tough architectural choice (e.g., choosing Redis over DB polling) and committed to a deadline.</li>
      </ul>
    </>
  );
}
