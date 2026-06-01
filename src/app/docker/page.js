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
    </>
  );
}
