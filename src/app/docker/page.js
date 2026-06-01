export const metadata = { title: "Docker & DevOps — Interview Prep" };

export default function DockerPage() {
  return (
    <>
      <h1>Docker &amp; DevOps</h1>
      <p>You containerized Node.js microservices for financial calculators. Interviewers will test Dockerfile best practices, networking, and CI/CD basics.</p>

      <h2>Image vs Container</h2>
      <p>An <b>image</b> is a read-only template; a <b>container</b> is a running instance. Images are layered — each Dockerfile instruction creates a layer.</p>

      <h2>Multi-Stage Builds (key for Go!)</h2>
      <pre><code>{`# Stage 1: build
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o app ./cmd/app

# Stage 2: runtime (tiny final image)
FROM alpine:3.19
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=builder /app/app .
EXPOSE 8080
USER nobody
CMD ["./app"]`}</code></pre>
      <p>Multi-stage cuts a 1GB Go build image down to ~15MB. The <code>-ldflags=&quot;-s -w&quot;</code> strips debug info.</p>

      <h2>Dockerfile Best Practices</h2>
      <ul>
        <li>Order from least-changing to most-changing — put <code>COPY go.mod</code> before <code>COPY .</code> for cache reuse</li>
        <li>Use specific tags (<code>node:20.11-alpine</code>) not <code>latest</code></li>
        <li>Run as non-root user — security</li>
        <li>One process per container — use docker-compose for multi-service local dev</li>
        <li>Use <code>.dockerignore</code> to skip <code>node_modules</code>, <code>.git</code></li>
        <li>Health checks: <code>HEALTHCHECK CMD curl -f http://localhost:8080/health</code></li>
      </ul>

      <h2>Networking</h2>
      <ul>
        <li><b>bridge</b> — default, isolated network for containers on one host</li>
        <li><b>host</b> — share host network, no isolation</li>
        <li><b>overlay</b> — multi-host (Swarm/k8s)</li>
        <li>Containers on the same network resolve each other by service name: <code>postgres://db:5432</code></li>
      </ul>

      <h2>Volumes</h2>
      <p>Containers are ephemeral — anything outside a volume is lost on restart.</p>
      <ul>
        <li><b>Named volumes</b> — managed by Docker, best for DBs: <code>postgres_data:/var/lib/postgresql/data</code></li>
        <li><b>Bind mounts</b> — host path mapped in, good for local dev</li>
        <li><b>tmpfs</b> — in-memory, for secrets</li>
      </ul>

      <h2>docker-compose for Local Dev</h2>
      <pre><code>{`services:
  api:
    build: .
    ports: ["8080:8080"]
    environment:
      DB_URL: postgres://app:app@db:5432/app
      REDIS_URL: redis://cache:6379
    depends_on: [db, cache]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: app
    volumes: ["pgdata:/var/lib/postgresql/data"]
  cache:
    image: redis:7-alpine
volumes:
  pgdata:`}</code></pre>

      <h2>CI/CD Basics</h2>
      <p>Typical pipeline: lint → unit test → build image → push to registry → deploy. Tools: GitHub Actions, GitLab CI, Azure Pipelines (you&apos;ve used Azure DevOps for stories).</p>

      <h2>Kubernetes (Brief)</h2>
      <p>If asked: Pods (smallest deployable unit) → Deployments (declarative pod manages) → Services (stable network endpoint) → Ingress (HTTP routing) → ConfigMaps/Secrets (config). Don&apos;t over-claim k8s experience if it&apos;s light — say you&apos;ve worked with Docker and have read up on k8s.</p>

      <h2>AWS Basics (from your resume)</h2>
      <ul>
        <li><b>EC2</b> — VMs. Use Auto Scaling Groups + Load Balancers.</li>
        <li><b>S3</b> — object storage, infinite scale, 99.999999999% durability. Used for static assets, backups, file uploads.</li>
        <li><b>RDS</b> — managed PostgreSQL/MySQL</li>
        <li><b>ElastiCache</b> — managed Redis</li>
        <li><b>CloudFront</b> — CDN</li>
        <li><b>IAM</b> — access control. Always use roles, not long-lived keys.</li>
      </ul>
    </>
  );
}
