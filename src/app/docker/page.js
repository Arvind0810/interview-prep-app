export const metadata = { title: "Docker & Kubernetes — Interview Prep" };

export default function DockerPage() {
  return (
    <>
      <h1>Docker, Kubernetes &amp; CI/CD</h1>
      <p>Modern backend engineering requires deep knowledge of containerization and orchestration. Interviewers look for best practices, security, and architectural understanding.</p>

      {/* ────────── DOCKER INTERNALS ────────── */}
      <h2>How Docker Actually Works</h2>
      <p>Docker is not a Virtual Machine. A VM virtualizes the hardware and runs a full Guest OS. Docker virtualizes the OS kernel. Containers share the host kernel.</p>
      <ul>
        <li><b>Namespaces:</b> Provide isolation. Ensure a container only sees its own processes, network interfaces, and file system. (What it can <i>see</i>).</li>
        <li><b>Cgroups (Control Groups):</b> Provide resource limitation. Limit the CPU and Memory a container can use. (What it can <i>use</i>).</li>
        <li><b>UnionFS (Union File System):</b> Creates the layered, read-only file system. When a container runs, a thin read-write layer is added on top.</li>
      </ul>

      {/* ────────── DOCKERFILE BEST PRACTICES ────────── */}
      <h2>Dockerfile Best Practices</h2>
      <p>A poorly written Dockerfile creates massive, slow, and insecure images.</p>
      <pre><code>{`# 1. Use an official, lightweight base image
FROM node:20.11-alpine AS builder
WORKDIR /app

# 2. Leverage Docker Cache: Copy package.json FIRST
# If source code changes but dependencies don't, this layer is cached
COPY package*.json ./
RUN npm ci

# 3. Copy the rest of the code
COPY . .
RUN npm run build

# 4. Multi-Stage Build: Create a fresh, tiny production image
FROM node:20.11-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# 5. Security: Never run as root
USER node

# 6. Expose ports and define startup command
EXPOSE 3000
CMD ["node", "dist/main.js"]`}</code></pre>
      
      <h3>Key Directives:</h3>
      <ul>
        <li><code>ENTRYPOINT</code> vs <code>CMD</code>: <code>ENTRYPOINT ["node"]</code> sets the main executable. <code>CMD ["app.js"]</code> provides default arguments. You can override CMD easily at runtime, but not ENTRYPOINT.</li>
        <li><code>ADD</code> vs <code>COPY</code>: Always use <code>COPY</code>. <code>ADD</code> has magic features (extracting tars, downloading URLs) that make builds unpredictable.</li>
      </ul>

      {/* ────────── KUBERNETES ────────── */}
      <h2>Kubernetes (K8s) Architecture</h2>
      <p>Docker runs containers; Kubernetes orchestrates them across a cluster of machines.</p>
      
      <h3>Core Components</h3>
      <ul>
        <li><b>Pod:</b> The smallest deployable unit. Usually contains one container. Pods are ephemeral (they die and are replaced, getting new IPs).</li>
        <li><b>Deployment:</b> Manages Pods declaratively. You state "I want 3 replicas of this image", and the Deployment ensures exactly 3 are running. Handles Rolling Updates and Rollbacks.</li>
        <li><b>Service:</b> Provides a stable IP address and DNS name to a group of Pods. Load balances traffic across them. (Since Pod IPs constantly change, you talk to the Service).</li>
        <li><b>Ingress:</b> Exposes HTTP/HTTPS routes from outside the cluster to Services within the cluster (like an API Gateway/Nginx router).</li>
        <li><b>ConfigMap &amp; Secret:</b> Injects configuration and passwords into Pods as environment variables or files, decoupling config from images.</li>
        <li><b>StatefulSet:</b> Like a Deployment, but for stateful apps (databases). Guarantees stable network IDs and persistent storage across restarts.</li>
      </ul>
      
      <h3>The Control Plane (Master Node)</h3>
      <ul>
        <li><b>API Server:</b> The front-end of the control plane. All kubectl commands talk to this.</li>
        <li><b>etcd:</b> Highly available key-value store holding the cluster's state.</li>
        <li><b>Scheduler:</b> Watches for new Pods and assigns them to worker nodes based on resource limits.</li>
        <li><b>Controller Manager:</b> Runs controller loops (e.g., ensuring Deployments have the correct number of replicas).</li>
      </ul>

      {/* ────────── CI/CD ────────── */}
      <h2>CI/CD Pipelines</h2>
      <p>Continuous Integration / Continuous Deployment is about automating the path from git push to production.</p>
      
      <h3>Typical Pipeline Stages:</h3>
      <ol>
        <li><b>Lint &amp; Format:</b> Fails fast if syntax is wrong (ESLint, Prettier, gofmt).</li>
        <li><b>Unit Testing:</b> Runs isolated tests.</li>
        <li><b>Security Scanning:</b> SAST (Static Application Security Testing) and dependency vulnerability scans (Dependabot/Snyk).</li>
        <li><b>Build:</b> Compiles code, builds the Docker image.</li>
        <li><b>Push:</b> Pushes the image to a Container Registry (DockerHub, AWS ECR, GCR) tagged with the git commit hash.</li>
        <li><b>Deploy to Staging:</b> Updates the Kubernetes Deployment in a staging environment.</li>
        <li><b>Integration / E2E Tests:</b> Tests the running application (Cypress, Selenium).</li>
        <li><b>Deploy to Prod:</b> Often gated by manual approval or progressive rollout.</li>
      </ol>

      <h3>Deployment Strategies</h3>
      <ul>
        <li><b>Rolling Deployment:</b> (K8s Default). Gradually replaces old instances with new ones. Zero downtime, but you have both versions running simultaneously for a brief period (backward compatibility required!).</li>
        <li><b>Blue/Green:</b> Spin up a completely new environment (Green) alongside the old one (Blue). Test Green. Flip the load balancer to route 100% traffic to Green. Immediate rollback if needed. Requires 2x infrastructure cost.</li>
        <li><b>Canary:</b> Route 5% of traffic to the new version. Monitor error rates. If stable, increase to 10%, 50%, 100%. Safest, but complex to orchestrate.</li>
      </ul>

      {/* ────────── DOCKER COMPOSE ────────── */}
      <h2>Docker Compose</h2>
      <p>Docker Compose defines multi-container applications in a single YAML file. Essential for local development environments.</p>
      <pre><code>{`# docker-compose.yml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./src:/app/src  # Hot reload in development
    networks:
      - backend

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - pg_data:/var/lib/postgresql/data  # Persist data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend

  cache:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
    networks:
      - backend

volumes:
  pg_data:

networks:
  backend:
    driver: bridge`}</code></pre>

      <h3>Key Commands</h3>
      <ul>
        <li><code>docker compose up -d</code> — Start all services in background</li>
        <li><code>docker compose down -v</code> — Stop and remove volumes</li>
        <li><code>docker compose logs -f api</code> — Follow logs for a specific service</li>
        <li><code>docker compose exec api sh</code> — Shell into a running container</li>
        <li><code>docker compose build --no-cache</code> — Rebuild without cache</li>
      </ul>

      {/* ────────── NETWORKING ────────── */}
      <h2>Docker Networking</h2>
      <table>
        <thead><tr><th>Network Type</th><th>Use Case</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><b>bridge</b> (default)</td><td>Containers on same host talk to each other</td><td>Containers resolved by name in custom bridge networks</td></tr>
          <tr><td><b>host</b></td><td>Container shares host&apos;s network stack</td><td>No port mapping needed. Best performance. No isolation.</td></tr>
          <tr><td><b>none</b></td><td>Complete network isolation</td><td>Container has no network access at all</td></tr>
          <tr><td><b>overlay</b></td><td>Multi-host networking (Docker Swarm/K8s)</td><td>Containers across different machines communicate</td></tr>
        </tbody>
      </table>
      <pre><code>{`# Port mapping: HOST:CONTAINER
docker run -p 8080:3000 myapp    # Host 8080 → Container 3000
docker run -p 127.0.0.1:8080:3000 myapp  # Only localhost

# DNS resolution in compose
# Services can reach each other by service name:
# api can connect to "db:5432" and "cache:6379"`}</code></pre>

      {/* ────────── SECURITY ────────── */}
      <h2>Container Security Best Practices</h2>
      <ul>
        <li><b>Never run as root:</b> Use <code>USER node</code> or <code>USER 1001</code> in Dockerfile. Root in container ≈ root on host (with misconfigured runtimes).</li>
        <li><b>Use minimal base images:</b> <code>alpine</code> (~5MB) or <code>distroless</code> (no shell at all). Fewer packages = fewer CVEs.</li>
        <li><b>Scan images:</b> Use <code>docker scout</code>, Trivy, or Snyk to scan for known vulnerabilities before deploying.</li>
        <li><b>Don&apos;t store secrets in images:</b> Use build-time secrets (<code>--mount=type=secret</code>) or runtime secrets (K8s Secrets, Vault). Never <code>ENV SECRET_KEY=...</code> in Dockerfile.</li>
        <li><b>Read-only filesystem:</b> Run containers with <code>--read-only</code> flag and mount only necessary writable paths.</li>
        <li><b>Pin image versions:</b> Use <code>node:20.11-alpine</code> not <code>node:latest</code>. Reproducible builds.</li>
        <li><b>Use .dockerignore:</b> Exclude <code>node_modules</code>, <code>.git</code>, <code>.env</code> files from the build context.</li>
      </ul>

      {/* ────────── DOCKER VOLUMES ────────── */}
      <h2>Storage &amp; Volumes</h2>
      <pre><code>{`# Named volumes (managed by Docker — best for databases)
docker volume create pg_data
docker run -v pg_data:/var/lib/postgresql/data postgres

# Bind mounts (map host directory — best for development)
docker run -v $(pwd)/src:/app/src myapp

# tmpfs mounts (in-memory only — for sensitive temp data)
docker run --tmpfs /tmp myapp

# Volume gotchas:
# - Named volumes persist across container restarts
# - Bind mounts follow host file permissions
# - Don't store important data in the container's writable layer`}</code></pre>

      {/* ────────── HELM ────────── */}
      <h2>Helm Charts (K8s Package Manager)</h2>
      <p>Helm packages Kubernetes manifests into reusable, version-controlled charts. Like <code>npm</code> for K8s.</p>
      <pre><code>{`# Install a chart
helm install my-release bitnami/postgresql

# Upgrade with new values
helm upgrade my-release bitnami/postgresql --set primary.persistence.size=50Gi

# Chart structure
my-chart/
  Chart.yaml          # Metadata (name, version, dependencies)
  values.yaml         # Default configuration values
  templates/          # K8s manifest templates with Go templating
    deployment.yaml
    service.yaml
    ingress.yaml
  charts/             # Sub-chart dependencies`}</code></pre>

      {/* ────────── TROUBLESHOOTING ────────── */}
      <h2>Common Troubleshooting</h2>
      <pre><code>{`# Debug a failing container
docker logs <container_id>               # Check logs
docker exec -it <container_id> sh        # Shell into running container
docker inspect <container_id>            # Full metadata (env vars, mounts, network)
docker stats                             # Live CPU/Memory usage

# Debug build issues
docker build --no-cache .                # Rebuild without cache
docker build --progress=plain .          # See full build output

# Clean up disk space
docker system prune -a                   # Remove all unused images/containers
docker volume prune                      # Remove unused volumes
docker system df                         # Show disk usage`}</code></pre>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Docker vs VM</td><td>Containers share host kernel (namespaces + cgroups). VMs virtualize hardware. Containers: faster, lighter, less isolation.</td></tr>
          <tr><td>Dockerfile</td><td>Multi-stage builds, layer caching (COPY package.json first), alpine base, USER non-root, ENTRYPOINT vs CMD.</td></tr>
          <tr><td>Networking</td><td>Bridge (default, DNS by name), host (no isolation), overlay (multi-host). Port mapping HOST:CONTAINER.</td></tr>
          <tr><td>K8s Architecture</td><td>Pod (smallest unit), Deployment (manages replicas), Service (stable DNS/IP), Ingress (HTTP routing).</td></tr>
          <tr><td>K8s Control Plane</td><td>API Server, etcd (state store), Scheduler, Controller Manager.</td></tr>
          <tr><td>Deployment Strategies</td><td>Rolling (default, zero downtime), Blue/Green (instant rollback, 2x cost), Canary (gradual, safest).</td></tr>
          <tr><td>Security</td><td>Non-root user, minimal base images, scan for CVEs, don't embed secrets, .dockerignore, read-only FS.</td></tr>
        </tbody>
      </table>
    </>
  );
}
