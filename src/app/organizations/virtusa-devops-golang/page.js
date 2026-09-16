import { Card, Pill } from "@/components/Card";

export const metadata = { title: "Virtusa — DevOps Engineer (Golang) | Interview Prep" };

function Q({ n, q, children }) {
  return (
    <details>
      <summary>{n}. {q}</summary>
      {children}
    </details>
  );
}

function Row({ req, have, gap, priority }) {
  const color = { P0: "red", P1: "amber", P2: "cyan" }[priority] || "cyan";
  return (
    <tr>
      <td>{req}</td>
      <td>{have}</td>
      <td>{gap}</td>
      <td><Pill color={color}>{priority}</Pill></td>
    </tr>
  );
}

export default function VirtusaDevOpsPage() {
  return (
    <>
      <h1>Virtusa: DevOps Engineer (Golang)</h1>
      <p>
        <strong>Role shape:</strong> DevOps / Platform Engineer with mandatory Golang<br />
        <strong>Stated experience:</strong> 15+ years hands-on<br />
        <strong>Core stack:</strong> AWS, Kubernetes (EKS/ECS), Terraform, PostgreSQL/Aurora,
        DynamoDB, MongoDB, Kafka, Jenkins, GitLab CI, Docker, Spring Boot microservices,
        Python/Shell<br />
        <strong>Domain:</strong> Banking / financial services products<br />
        <strong>Nice-to-have:</strong> TOGAF, AWS Certified Solutions Architect, data
        architecture and AI/ML exposure
      </p>

      {/* ────────── HONEST POSITIONING ────────── */}
      <Card className="border-amber-700">
        <h3 className="m-0 text-amber-300">Read this first — the gap is real, and it is workable</h3>
        <p>
          This JD is not one job. It is <b>two roles fused into one requisition</b>: a hands-on
          DevOps/SRE (Terraform, EKS, pipelines, on-call, cost) and an <b>enterprise architect</b>
          (TOGAF, governance, standards, mentoring junior architects, regulatory awareness). Staffing
          firms write these when the client has not decided which one they want, or when one very
          senior person is expected to be both.
        </p>
        <p>
          Against that, your documented profile is <b>six years as a full-stack engineer</b> —
          Go/Fiber, Node, PostgreSQL, Redis, Docker, Kafka, Next.js. Strong Go. Strong data and
          event-driven fundamentals. <b>No production AWS, Terraform or EKS ownership.</b> Pretending
          otherwise does not survive the first scenario question, because infra interviews are
          answered in specifics: which backend your state lived in, what broke during a node
          upgrade, what your RPO actually was.
        </p>
        <p className="text-amber-200">
          <b>So do not position as a 15-year DevOps architect.</b> Position as a{" "}
          <b>Go platform engineer moving into infrastructure</b>, and make Go the reason to hire you:
          most DevOps candidates on this pipeline write Python and Bash and read Go badly. You write
          Go. Everything that runs a modern cluster — Kubernetes, Terraform, Docker, etcd,
          Prometheus, ArgoCD — is written in Go, and someone who can read and patch a controller is
          worth more than someone who can only apply YAML.
        </p>
        <p className="text-slate-300">
          Two honest outcomes are both wins: they down-level you to the senior DevOps seat that
          actually exists, or they route you to a Go microservices seat on the same banking account.
          Either beats being screened out for a bluff.
        </p>
      </Card>

      <Card className="border-cyan-800">
        <h3 className="m-0 text-cyan-400">Your one-paragraph opening for this JD</h3>
        <p className="text-slate-200">
          &quot;I am a backend engineer with six years in Go — Fiber services, PostgreSQL, Redis,
          Kafka, Docker, running microservices behind a gateway in a fintech product. The part of
          this role I am strongest on is the software side of platform work: writing the Go services
          and the tooling, designing around idempotency and at-least-once delivery, database
          modelling and query work, and the event-driven pieces with Kafka. The part I am actively
          building is the cloud-operations depth — AWS at architecture level, Terraform and EKS. I
          have been studying and labbing those deliberately rather than claiming production years I
          do not have. If the seat needs fifteen years of hands-on AWS ownership I am not that
          person yet; if it needs someone who can own the Go platform services and grow into the
          infrastructure, that is exactly where I am.&quot;
        </p>
        <p className="text-slate-400 text-sm">
          Say this early. It buys you credibility for every claim you make afterwards, and it stops
          the interviewer from spending the hour hunting for the hole.
        </p>
      </Card>

      {/* ────────── DECODE ────────── */}
      <h2>Decoding the JD — what each line is really testing</h2>
      <ol>
        <li>
          <b>&quot;DevOps engineers mandatorily with Golang&quot;</b> — they have Go services in the
          estate, or they want tooling and operators written in Go rather than Bash. Expect real Go
          questions: concurrency, <code>context</code>, graceful shutdown, error handling, building
          small static binaries. This is your strongest ground. Do not let it pass in two minutes.
        </li>
        <li>
          <b>&quot;EC2, Lambda, Glue Jobs, S3, RDS&quot;</b> — the Glue mention is the tell. This is a{" "}
          <b>banking data platform</b>: S3 data lake, Glue crawlers and Spark ETL, RDS/Aurora as the
          system of record, Lambda for glue-code and event handling. Not a generic web stack.
        </li>
        <li>
          <b>&quot;Provisioning AWS infrastructure through Terraform&quot;</b> — they want state
          management, modules, and a plan/apply pipeline story, not <code>terraform apply</code> from
          a laptop.
        </li>
        <li>
          <b>&quot;EKS and ECS&quot;</b> — both, which means a mixed estate: legacy services on ECS
          Fargate, newer ones on EKS. Be ready to argue when each is correct.
        </li>
        <li>
          <b>&quot;RDS, Aurora, DynamoDB, MongoDB&quot; + &quot;24/7 availability&quot; +
          &quot;backup and disaster recovery&quot;</b> — the heart of the role. RTO/RPO, failover,
          PITR, cross-region. If you prepare one area deeply, make it this one.
        </li>
        <li>
          <b>&quot;Kafka for event-driven architectures&quot;</b> — you already have this. Your
          outbox, at-least-once and idempotent-consumer experience is directly relevant and is a
          genuinely senior conversation.
        </li>
        <li>
          <b>&quot;Spring Boot&quot;</b> — you are not being asked to write Java. You are being asked
          to <b>operate</b> JVM services: containerising them correctly, heap and cgroup settings,
          actuator health endpoints, GC pauses showing up as latency.
        </li>
        <li>
          <b>&quot;Performance, security, reliability, availability, observability,
          compliance&quot;</b> — these six words are the AWS Well-Architected pillars in disguise.
          Answer design questions by walking those axes explicitly; it signals you think in the
          vocabulary their architects use.
        </li>
        <li>
          <b>&quot;Mentor junior architects, enforce standards and governance&quot;</b> — the
          architect half. Prepare ADRs, golden paths, paved-road platform thinking, review gates.
        </li>
        <li>
          <b>&quot;Regulatory changes impacting banking&quot;</b> — in India: RBI data localisation,
          audit trails, change management, segregation of duties. Knowing the vocabulary is enough at
          interview stage.
        </li>
      </ol>

      {/* ────────── COVERAGE MAP ────────── */}
      <h2>Coverage map — what you have, what you must build</h2>
      <p>
        <Pill color="red">P0</Pill> will be tested in round one and you cannot fake it •{" "}
        <Pill color="amber">P1</Pill> will come up and needs a credible answer •{" "}
        <Pill color="cyan">P2</Pill> bonus signal
      </p>
      <table>
        <thead>
          <tr><th>JD requirement</th><th>Your real evidence</th><th>Gap to close</th><th>Priority</th></tr>
        </thead>
        <tbody>
          <Row req="Golang" have="6 yrs, Fiber services, concurrency, production ownership" gap="Practise DevOps-flavoured Go: client-go, operators, CLI tooling, pprof" priority="P0" />
          <Row req="Docker" have="Multi-stage builds, compose, containerised Go and Node services" gap="Distroless/scratch, non-root, image scanning, size and layer discipline" priority="P0" />
          <Row req="Kubernetes / EKS" have="Conceptual only" gap="Hands-on: probes, HPA, PDB, rollouts, RBAC, IRSA, VPC CNI limits" priority="P0" />
          <Row req="Terraform" have="None documented" gap="State/locking, modules, workspaces, plan-in-CI, import, drift" priority="P0" />
          <Row req="AWS core (EC2, S3, RDS, Lambda, IAM, VPC)" have="None documented" gap="Build one real VPC + EKS + RDS stack in a free-tier account" priority="P0" />
          <Row req="PostgreSQL / RDS / Aurora" have="Strong Postgres: schema, indexing, transactions" gap="Managed-DB operations: Multi-AZ, PITR, read replicas, failover, parameter groups" priority="P0" />
          <Row req="CI/CD (Jenkins, GitLab CI)" have="Pipeline concepts, deployment strategies" gap="Write a real Jenkinsfile and .gitlab-ci.yml; OIDC to AWS; artefact promotion" priority="P0" />
          <Row req="Kafka / event-driven" have="Outbox, at-least-once, idempotent consumers — genuinely strong" gap="Operational side: MSK, partitions, lag, rebalance, retention" priority="P1" />
          <Row req="DynamoDB" have="None" gap="Partition-key design, hot partitions, GSI, on-demand vs provisioned" priority="P1" />
          <Row req="MongoDB" have="None documented" gap="Replica sets, write concern, sharding key basics" priority="P2" />
          <Row req="Backup / DR / HA" have="None at infra level" gap="RTO vs RPO, the four DR strategies, cross-region, restore drills" priority="P0" />
          <Row req="Observability" have="Structured logs, metrics awareness" gap="SLI/SLO/error budget, Prometheus, OpenTelemetry, cardinality" priority="P1" />
          <Row req="Cloud security & compliance" have="JWT, RBAC, AES-GCM at rest, encryption backfills" gap="IAM least privilege, KMS, Secrets Manager, OIDC, SCPs, banking controls" priority="P1" />
          <Row req="Cost optimisation" have="None" gap="Savings Plans vs RIs, Graviton, Spot, S3 lifecycle, tagging and showback" priority="P1" />
          <Row req="Spring Boot" have="None" gap="Operate-not-write: JVM in containers, actuator, heap flags, GC latency" priority="P2" />
          <Row req="Glue / data architecture / AI-ML" have="None" gap="Glue crawler + catalog + job model, S3 lake zones, Athena — vocabulary level" priority="P2" />
          <Row req="TOGAF / SA certification" have="None" gap="AWS SAA is the realistic near-term one; know TOGAF ADM by name" priority="P2" />
        </tbody>
      </table>

      {/* ────────── PREP PLAN ────────── */}
      <h2>21-day prep plan</h2>
      <p>
        Weight it towards the P0 rows. You will not become a 15-year AWS architect in three weeks,
        but you can absolutely become someone who has <b>built the thing once, end to end</b> — and
        that changes how you answer every question.
      </p>
      <table>
        <thead><tr><th>Days</th><th>Focus</th><th>Concrete output</th></tr></thead>
        <tbody>
          <tr><td>1–2</td><td>AWS fundamentals: IAM, VPC, EC2, S3, RDS</td><td>A VPC with public/private subnets, NAT, a bastion-less SSM instance</td></tr>
          <tr><td>3–5</td><td>Terraform</td><td>The same VPC rebuilt in Terraform, S3 backend with locking, split into modules</td></tr>
          <tr><td>6–8</td><td>Kubernetes and EKS</td><td>EKS cluster via Terraform; deploy your Go service with probes, HPA, PDB, Ingress</td></tr>
          <tr><td>9–10</td><td>CI/CD</td><td>A GitLab CI pipeline: test → build → scan → push to ECR → deploy; OIDC, no static keys</td></tr>
          <tr><td>11–12</td><td>Databases: RDS/Aurora HA, PITR, DynamoDB</td><td>Trigger a failover; do a point-in-time restore; write one DynamoDB access-pattern design</td></tr>
          <tr><td>13–14</td><td>DR, backup, HA design</td><td>Write a one-page DR plan with RTO/RPO for a banking service</td></tr>
          <tr><td>15–16</td><td>Observability and SLOs</td><td>Prometheus + Grafana on the cluster; define 3 SLIs and an error budget policy</td></tr>
          <tr><td>17</td><td>Kafka operations</td><td>Revise your outbox story; add partitions, lag, rebalance, retention vocabulary</td></tr>
          <tr><td>18</td><td>Security and cost</td><td>IRSA, Secrets Manager, KMS; a cost-optimisation checklist you can recite</td></tr>
          <tr><td>19</td><td>Go for DevOps</td><td>Write a small client-go tool that lists unhealthy pods across namespaces</td></tr>
          <tr><td>20–21</td><td>Scenarios and behavioural</td><td>Rehearse the five design scenarios below out loud; polish STAR stories</td></tr>
        </tbody>
      </table>

      {/* ────────── GOLANG FOR DEVOPS ────────── */}
      <h2>1. Golang — your differentiator, so lead with it</h2>
      <p>
        The JD says Golang is <b>mandatory</b>. On a DevOps pipeline that is unusual, and it is the
        single reason you are competitive here. Do not answer Go questions like a web developer;
        answer them like someone who writes the tools that operate the platform.
      </p>

      <h3>Why Go is the infrastructure language</h3>
      <ul>
        <li><b>Single static binary</b> — no runtime, no interpreter, no dependency hell in the image. A <code>FROM scratch</code> image of 8 MB versus a 400 MB Python image.</li>
        <li><b>Concurrency that fits operations</b> — polling hundreds of endpoints, draining queues, watching Kubernetes resources, all with goroutines instead of thread pools.</li>
        <li><b>The ecosystem is Go</b> — Kubernetes, Docker, containerd, etcd, Terraform, Prometheus, Consul, Vault, ArgoCD. When something misbehaves you can read the source.</li>
        <li><b>Cross-compilation</b> — <code>GOOS=linux GOARCH=arm64 go build</code> gives you a Graviton binary from a Mac, which ties straight into the cost conversation.</li>
      </ul>

      <h3>The graceful-shutdown pattern — expect this exact question</h3>
      <p>
        A pod being rolled gets <code>SIGTERM</code>, then <code>SIGKILL</code> after the grace
        period. A service that ignores <code>SIGTERM</code> drops in-flight requests on every deploy.
        This is the most common Go-in-Kubernetes question there is.
      </p>
      <pre><code>{`func main() {
    srv := &http.Server{Addr: ":8080", Handler: router()}

    go func() {
        if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
            log.Fatalf("listen: %v", err)
        }
    }()

    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
    <-stop
    log.Println("shutdown signal received")

    // Readiness must fail BEFORE we stop accepting connections, so the
    // endpoints controller pulls this pod out of the Service first.
    atomic.StoreInt32(&ready, 0)
    time.Sleep(5 * time.Second) // let kube-proxy/ALB converge

    ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        log.Printf("forced shutdown: %v", err)
    }
}`}</code></pre>
      <p className="text-slate-300">
        The detail that wins the point: <b>flip readiness to false and sleep before shutting
        down</b>. Kubernetes removes the pod from Service endpoints asynchronously, so if you
        shut down immediately you still receive traffic for a second or two and 502s appear on
        every rollout.
      </p>

      <h3>A Go tool that talks to the cluster</h3>
      <p>
        Write one of these before the interview so you can say &quot;I wrote a small controller&quot;
        instead of &quot;I have read about controllers.&quot;
      </p>
      <pre><code>{`// Lists pods that are not Ready across all namespaces — the seed of every
// internal platform CLI.
cfg, err := rest.InClusterConfig()
if err != nil {
    cfg, err = clientcmd.BuildConfigFromFlags("", os.Getenv("KUBECONFIG"))
    if err != nil {
        return fmt.Errorf("load kubeconfig: %w", err)
    }
}

clientset, err := kubernetes.NewForConfig(cfg)
if err != nil {
    return fmt.Errorf("build client: %w", err)
}

pods, err := clientset.CoreV1().Pods("").List(ctx, metav1.ListOptions{})
if err != nil {
    return fmt.Errorf("list pods: %w", err)
}

for _, p := range pods.Items {
    for _, c := range p.Status.Conditions {
        if c.Type == corev1.PodReady && c.Status != corev1.ConditionTrue {
            fmt.Printf("%s/%s not ready: %s\\n", p.Namespace, p.Name, c.Reason)
        }
    }
}`}</code></pre>
      <p>
        The next level up, and worth knowing by name: an <b>operator</b> built with
        <code> controller-runtime</code>, which watches a Custom Resource and drives the cluster
        towards the declared state through a reconcile loop. The loop must be{" "}
        <b>idempotent and level-triggered</b> — it reads current state and converges, rather than
        reacting to an event once. That is the same discipline as your Kafka consumers.
      </p>

      <h3>The container image</h3>
      <pre><code>{`FROM golang:1.23-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Static binary, no cgo, symbols stripped
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /app ./cmd/api

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /app /app
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/app"]`}</code></pre>
      <p className="text-slate-300">
        Talking points: distroless has no shell, so a compromised container has nothing to pivot
        with; <code>nonroot</code> satisfies a <code>runAsNonRoot</code> admission policy;{" "}
        <code>-trimpath</code> gives reproducible builds; and the final image is single-digit
        megabytes, which shortens every node pull and every scale-out.
      </p>

      {/* ────────── AWS ────────── */}
      <h2>2. AWS — the services this JD actually names</h2>

      <h3>The mental model</h3>
      <p>
        Do not memorise the service catalogue. Learn the <b>five</b> they named plus the two that
        underpin everything (IAM and VPC), and be able to place each in an architecture.
      </p>
      <ul>
        <li><b>IAM</b> — identity and permission. Roles over users, temporary credentials over keys. Long-lived access keys in a pipeline are the finding an auditor opens with.</li>
        <li><b>VPC</b> — private subnets for compute and data, public subnets for load balancers only, NAT gateway for egress, security groups as stateful instance firewalls, NACLs as stateless subnet firewalls. VPC endpoints to reach S3 and DynamoDB without traversing NAT, which is both a security and a cost answer.</li>
        <li><b>EC2</b> — instance families (m = general, c = compute, r = memory), Graviton (<code>m7g</code>) for roughly 20% better price-performance on Go workloads, Auto Scaling Groups, AMIs baked with Packer.</li>
        <li><b>S3</b> — eleven nines of durability, storage classes and lifecycle policies, versioning, Object Lock for write-once audit data (a banking favourite), SSE-KMS, and the fact that it is the substrate of the data lake.</li>
        <li><b>RDS</b> — managed Postgres/MySQL. Multi-AZ, automated backups, PITR, read replicas, parameter groups, maintenance windows.</li>
        <li><b>Lambda</b> — event-driven compute. Know cold starts, provisioned concurrency, concurrency limits, and that Go runs on the <code>provided.al2023</code> custom runtime now that the <code>go1.x</code> runtime is retired.</li>
        <li><b>Glue</b> — serverless Spark ETL plus the Data Catalog. Crawlers infer schema from S3 and populate the catalog; jobs transform between lake zones; job bookmarks stop you reprocessing the same files.</li>
      </ul>

      <h3>The banking data-platform shape they are hinting at</h3>
      <pre><code>{`Source systems (Aurora, Kafka, SFTP drops)
        │
        ▼
   S3  raw zone          ← immutable landing, Object Lock, KMS
        │  Glue crawler → Data Catalog
        ▼
   S3  curated zone      ← Glue Spark job: clean, dedupe, conform, Parquet
        │
        ▼
   S3  consumption zone  ← partitioned by dt, queried by Athena / Redshift
        │
        ├── Athena (analyst SQL)
        ├── QuickSight (dashboards)
        └── SageMaker (fraud / credit models)`}</code></pre>
      <p>
        If asked about AI/ML in banking, the honest and useful answers are{" "}
        <b>fraud and anomaly detection</b>, <b>credit risk scoring</b>,{" "}
        <b>AML transaction monitoring</b>, <b>customer churn and next-best-action</b>, and{" "}
        <b>document processing for KYC</b>. The engineering point to make is that in a regulated
        bank the hard part is not the model, it is <b>explainability, model governance, drift
        monitoring and audit</b> — a model that cannot justify a rejected loan is not deployable.
      </p>

      <h3>Well-Architected, as an answering framework</h3>
      <p>
        When a design question lands, walk the six pillars out loud. It converts a rambling answer
        into a structured one and it maps word-for-word onto the JD sentence about performance,
        security, reliability, availability, observability and compliance.
      </p>
      <table>
        <thead><tr><th>Pillar</th><th>What you say</th></tr></thead>
        <tbody>
          <tr><td>Operational excellence</td><td>IaC for everything, runbooks, automated rollback, game days</td></tr>
          <tr><td>Security</td><td>Least privilege, encryption in transit and at rest, no static keys, private subnets</td></tr>
          <tr><td>Reliability</td><td>Multi-AZ, health checks, retries with backoff and jitter, circuit breakers, tested restores</td></tr>
          <tr><td>Performance efficiency</td><td>Right-sized instances, caching, read replicas, async where latency allows</td></tr>
          <tr><td>Cost optimisation</td><td>Savings Plans, Graviton, Spot for stateless, lifecycle policies, tagging and showback</td></tr>
          <tr><td>Sustainability</td><td>Right-sizing and Graviton again — mention it once to show you know the sixth exists</td></tr>
        </tbody>
      </table>

      {/* ────────── TERRAFORM ────────── */}
      <h2>3. Terraform — state is the whole interview</h2>
      <p>
        Every Terraform interview converges on state. If you can talk about state, locking, drift and
        blast radius with confidence, you sound experienced even without years of it.
      </p>

      <h3>Backend and locking</h3>
      <pre><code>{`terraform {
  required_version = "~> 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60"
    }
  }

  backend "s3" {
    bucket       = "acme-tfstate-prod"
    key          = "platform/eks/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true   # native S3 locking (Terraform 1.10+)
    # Older estates still use: dynamodb_table = "tf-locks"
  }
}`}</code></pre>
      <ul>
        <li><b>Why remote state:</b> it is shared truth for the team, it is versioned, and it can be encrypted. Local state on a laptop means two engineers can destroy each other&apos;s infrastructure.</li>
        <li><b>Why locking:</b> two concurrent applies against the same state corrupt it. S3 native locking (or the legacy DynamoDB table) serialises them.</li>
        <li><b>State contains secrets</b> — RDS passwords land in state in plaintext. So the bucket is encrypted, versioned, access-logged and locked down. This is a favourite follow-up.</li>
        <li><b>Split state by blast radius</b> — networking, cluster, data and application in separate state files, wired together with <code>terraform_remote_state</code> or SSM parameters. One state file for the whole estate means one bad apply can take down everything.</li>
      </ul>

      <h3>Module structure that a reviewer recognises</h3>
      <pre><code>{`infra/
├── modules/
│   ├── network/        # VPC, subnets, NAT, endpoints
│   ├── eks/            # cluster, node groups, IRSA roles
│   ├── rds-aurora/     # cluster, parameter group, backups
│   └── service/        # ECR repo, IAM role, ALB target group
└── live/
    ├── dev/
    │   └── ap-south-1/{ network/, eks/, rds/ }
    ├── uat/
    └── prod/           # same modules, different tfvars — that is the point`}</code></pre>
      <p>
        The principle: <b>environments differ by variables, not by copied code</b>. If prod and dev
        drift into different HCL, prod is untested. Version your modules with Git tags so an upgrade
        is a deliberate, reviewable bump.
      </p>

      <h3>The commands and constructs to have ready</h3>
      <ul>
        <li><code>terraform plan -out=tfplan</code> then <code>terraform apply tfplan</code> — apply exactly what was reviewed, never a re-planned surprise.</li>
        <li><code>import</code> blocks (1.5+) — bring existing hand-built resources under management declaratively rather than with the old imperative <code>terraform import</code>.</li>
        <li><code>moved</code> blocks — refactor or rename resources without destroy-and-recreate.</li>
        <li><code>lifecycle {}</code> — <code>create_before_destroy</code> for zero-downtime replacement, <code>prevent_destroy</code> on databases, <code>ignore_changes</code> for fields mutated outside Terraform.</li>
        <li><b>Drift</b> — someone changed a security group in the console. Detect it with a scheduled <code>plan</code> in CI that alerts on a non-empty diff; fix it by re-applying, and fix the cause by removing console write access in prod.</li>
        <li><code>-target</code> — say out loud that it is an emergency tool, not a workflow. Routine targeting means your state is badly split.</li>
      </ul>

      <h3>Terraform in the pipeline</h3>
      <pre><code>{`# .gitlab-ci.yml (fragment)
stages: [validate, plan, apply]

.tf_auth: &tf_auth
  id_tokens:
    AWS_ID_TOKEN: { aud: https://gitlab.com }        # OIDC — no static keys
  before_script:
    - export AWS_ROLE_ARN=$TF_ROLE_ARN
    - echo "$AWS_ID_TOKEN" > /tmp/token
    - export AWS_WEB_IDENTITY_TOKEN_FILE=/tmp/token

validate:
  stage: validate
  script: [terraform init -backend=false, terraform validate, terraform fmt -check]

plan:
  stage: plan
  <<: *tf_auth
  script:
    - terraform init
    - terraform plan -out=tfplan -lock-timeout=5m
    - terraform show -no-color tfplan > plan.txt
  artifacts: { paths: [tfplan, plan.txt], expire_in: 1 week }

apply:
  stage: apply
  <<: *tf_auth
  when: manual                # human gate for prod
  only: [main]
  script: [terraform init, terraform apply -auto-approve tfplan]`}</code></pre>
      <p className="text-slate-300">
        Three things a senior reviewer looks for here and you should name them unprompted:{" "}
        <b>OIDC federation instead of stored AWS keys</b>, <b>apply consumes the reviewed plan
        artefact</b>, and <b>a manual gate on production</b>. Add policy-as-code (<code>tfsec</code>,{" "}
        <code>Checkov</code> or OPA) in the validate stage and you have described a governed
        pipeline, which is exactly the architect half of the JD.
      </p>

      {/* ────────── KUBERNETES ────────── */}
      <h2>4. Kubernetes, EKS and ECS</h2>

      <h3>ECS versus EKS — have an opinion</h3>
      <table>
        <thead><tr><th>Choose</th><th>When</th></tr></thead>
        <tbody>
          <tr><td><b>ECS on Fargate</b></td><td>Small-to-mid teams, AWS-only, a handful of services, no platform team to run a cluster. Lower operational surface, deep IAM and ALB integration, no control plane to upgrade.</td></tr>
          <tr><td><b>EKS</b></td><td>Many services, portability matters, you need the Kubernetes ecosystem — operators, Argo, service mesh, custom controllers — and you have people to own upgrades.</td></tr>
        </tbody>
      </table>
      <p>
        The honest senior answer: <b>Kubernetes is not free.</b> It buys you a rich ecosystem and
        costs you a platform team, a quarterly upgrade cadence and a steep failure-mode curve. A bank
        with a mixed estate usually keeps stable legacy services on ECS and runs the newer,
        fast-moving platform on EKS — which is precisely why this JD names both.
      </p>

      <h3>The deployment manifest, annotated</h3>
      <pre><code>{`apiVersion: apps/v1
kind: Deployment
metadata: { name: payments-api }
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }   # never dip below capacity
  template:
    spec:
      serviceAccountName: payments-api        # bound to an IAM role via IRSA
      securityContext:
        runAsNonRoot: true
        seccompProfile: { type: RuntimeDefault }
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule    # spread across AZs
          labelSelector: { matchLabels: { app: payments-api } }
      containers:
        - name: api
          image: 1234.dkr.ecr.ap-south-1.amazonaws.com/payments-api:sha-9f2c1ab
          resources:
            requests: { cpu: 200m, memory: 256Mi }
            limits:   { memory: 512Mi }        # memory limit yes, CPU limit deliberately not
          startupProbe:
            httpGet: { path: /healthz, port: 8080 }
            failureThreshold: 30
            periodSeconds: 2
          readinessProbe:
            httpGet: { path: /readyz, port: 8080 }
            periodSeconds: 5
          livenessProbe:
            httpGet: { path: /healthz, port: 8080 }
            periodSeconds: 10`}</code></pre>
      <ul>
        <li><b>Liveness vs readiness vs startup</b> — liveness restarts a wedged process; readiness removes a pod from the Service while it is warming or a dependency is down; startup covers slow boots so liveness does not kill the pod before it ever starts. <b>Never point liveness at a database check</b> — a database blip then restarts every pod in the fleet and turns a degradation into an outage.</li>
        <li><b>Image tagged by commit SHA, never <code>latest</code></b> — immutable, traceable, and rollback is a tag change.</li>
        <li><b>maxUnavailable: 0</b> — the rollout adds a pod before removing one, so capacity never dips.</li>
        <li><b>Why no CPU limit</b> — CPU is compressible and a limit causes CFS throttling and tail latency even when the node is idle. Set requests for scheduling, limit memory (which is not compressible and gets you OOMKilled), and leave CPU unlimited. Say this and you sound like someone who has debugged p99 latency.</li>
      </ul>

      <h3>The EKS-specific things that get asked</h3>
      <ul>
        <li><b>IRSA</b> — an IAM role assumed by a Kubernetes ServiceAccount through the cluster OIDC provider. It is how a pod reads S3 without node-wide credentials or baked keys. Newer clusters may use <b>EKS Pod Identity</b>, which is simpler to administer; know both names.</li>
        <li><b>VPC CNI and IP exhaustion</b> — each pod gets a real VPC IP from the subnet, so undersized subnets stop pod scheduling long before CPU runs out. Mitigate with prefix delegation or larger subnets. This is a classic real-incident question.</li>
        <li><b>Autoscaling, two layers</b> — HPA scales pods on CPU or custom metrics (KEDA for queue depth and Kafka lag); <b>Karpenter</b> or Cluster Autoscaler scales nodes. Karpenter is the current answer: it provisions right-sized nodes directly and consolidates underused ones, which is a cost story as well as a scaling one.</li>
        <li><b>PodDisruptionBudget</b> — <code>minAvailable: 2</code> stops a node drain during an upgrade from taking all replicas at once. Voluntary disruptions only; it does not protect against a node dying.</li>
        <li><b>Upgrades</b> — EKS minor versions have a support window, so upgrades are a scheduled obligation, not an option. Control plane first, then node groups (blue/green node groups or a rolling replacement), checking deprecated APIs with <code>kubent</code> beforehand.</li>
        <li><b>Secrets</b> — base64 is encoding, not encryption. Use the External Secrets Operator or the Secrets Store CSI driver with AWS Secrets Manager, plus envelope encryption of etcd with KMS.</li>
        <li><b>Policy</b> — Kyverno or OPA Gatekeeper as admission control to enforce &quot;no root, no <code>latest</code> tag, resources required, images only from our ECR.&quot; That is governance made executable, which is a strong architect-track point.</li>
      </ul>

      <h3>Debugging a CrashLoopBackOff, out loud</h3>
      <pre><code>{`kubectl get pods -n payments                # phase, restarts, age
kubectl describe pod <pod> -n payments      # events: image pull? OOMKilled? probe failing?
kubectl logs <pod> -n payments --previous   # the crashed container's logs, not the new one
kubectl get events -n payments --sort-by=.lastTimestamp
kubectl top pod <pod> -n payments           # memory near the limit?`}</code></pre>
      <p className="text-slate-300">
        The ordering matters more than the commands: <b>describe before logs</b>, because{" "}
        <code>OOMKilled</code>, <code>ImagePullBackOff</code> and a failing readiness probe are all
        visible in events and each sends you somewhere completely different.{" "}
        <code>--previous</code> is the flag candidates forget, and it is the only way to see why the
        container that already died, died.
      </p>

      {/* ────────── CI/CD ────────── */}
      <h2>5. CI/CD — Jenkins, GitLab CI and GitOps</h2>

      <h3>The pipeline shape they want to hear</h3>
      <pre><code>{`commit ──▶ lint + unit tests + race detector
        ──▶ SAST + dependency scan (gosec, govulncheck, Trivy)
        ──▶ build image, tag with the commit SHA
        ──▶ image scan; fail on HIGH/CRITICAL
        ──▶ push to ECR (immutable tags enabled)
        ──▶ deploy to dev            (automatic)
        ──▶ integration + contract tests
        ──▶ deploy to UAT            (automatic)
        ──▶ deploy to PROD           (manual approval + change record)
        ──▶ smoke tests, then watch SLOs; auto-rollback on error-budget burn`}</code></pre>
      <p>
        The two principles to state explicitly: <b>build the artefact once and promote it</b> — the
        exact image tested in dev is the image that reaches prod, never a rebuild per environment —
        and <b>every stage is a gate that can fail the pipeline</b>, otherwise it is decoration.
      </p>

      <h3>Jenkins, declarative</h3>
      <pre><code>{`pipeline {
  agent { kubernetes { yamlFile 'build-pod.yaml' } }   // ephemeral agents on EKS

  environment {
    ECR  = '1234.dkr.ecr.ap-south-1.amazonaws.com/payments-api'
    TAG  = "sha-\${GIT_COMMIT.take(7)}"
  }

  stages {
    stage('Test') {
      steps { sh 'go test -race -coverprofile=cover.out ./...' }
    }
    stage('Scan') {
      steps {
        sh 'govulncheck ./...'
        sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL \$ECR:\$TAG'
      }
    }
    stage('Build & Push') {
      steps {
        sh 'docker build -t \$ECR:\$TAG .'
        sh 'docker push \$ECR:\$TAG'
      }
    }
    stage('Deploy PROD') {
      when { branch 'main' }
      steps {
        timeout(time: 30, unit: 'MINUTES') {
          input message: 'Promote to production?', submitter: 'release-managers'
        }
        sh 'kubectl set image deploy/payments-api api=\$ECR:\$TAG -n payments'
        sh 'kubectl rollout status deploy/payments-api -n payments --timeout=5m'
      }
    }
  }

  post {
    failure { slackSend channel: '#deploys', message: "FAILED \${env.JOB_NAME} \${env.BUILD_NUMBER}" }
  }
}`}</code></pre>
      <p>
        Jenkins talking points: <b>ephemeral Kubernetes agents</b> rather than long-lived static
        slaves that accumulate state; <b>shared libraries</b> so fifty repositories are not
        maintaining fifty copies of the same Groovy; <b>credentials binding</b> so nothing is echoed
        into a log; and an honest note that Jenkins is the legacy engine in most banks and the
        migration path is usually GitLab CI or GitHub Actions.
      </p>

      <h3>GitOps — the answer that marks you as current</h3>
      <p>
        Push-based deploys need cluster credentials in the CI runner, which is the credential you
        least want to leak. <b>GitOps inverts it</b>: ArgoCD or Flux runs inside the cluster, watches
        a Git repository of manifests, and reconciles continuously. CI only writes a new image tag to
        that repository.
      </p>
      <ul>
        <li><b>Git is the source of truth</b> — the cluster state is auditable by <code>git log</code>, which is exactly what a banking change-management process wants.</li>
        <li><b>Drift self-heals</b> — a manual <code>kubectl edit</code> in prod is reverted automatically, and you can see that it happened.</li>
        <li><b>Rollback is <code>git revert</code></b>.</li>
        <li><b>No cluster credentials in CI</b> — the agent pulls, it is not pushed to.</li>
        <li><b>Progressive delivery</b> — Argo Rollouts or Flagger do canary and blue/green with automated analysis: shift 5% of traffic, watch the error rate and latency against a Prometheus query, promote or roll back without a human.</li>
      </ul>

      {/* ────────── DATABASES ────────── */}
      <h2>6. Databases — the centre of gravity of this role</h2>
      <p>
        &quot;Architect and manage enterprise-level databases with 24/7 availability&quot; and
        &quot;lead efforts on optimization, backup, and disaster recovery planning&quot; are the two
        most demanding lines in the JD. Your Postgres knowledge is real; what you must add is the{" "}
        <b>operations</b> layer on top of it.
      </p>

      <h3>RDS versus Aurora</h3>
      <table>
        <thead><tr><th></th><th>RDS PostgreSQL</th><th>Aurora PostgreSQL</th></tr></thead>
        <tbody>
          <tr><td>Storage</td><td>EBS volume attached to the instance</td><td>Distributed storage layer, 6 copies across 3 AZs, auto-growing</td></tr>
          <tr><td>Replicas</td><td>Up to 5 read replicas, asynchronous, own storage</td><td>Up to 15 readers sharing the same storage; replica lag typically milliseconds</td></tr>
          <tr><td>Failover</td><td>Multi-AZ standby promotion, typically 60–120s</td><td>Typically under 30s; a reader is promoted</td></tr>
          <tr><td>Cost</td><td>Cheaper at small scale</td><td>More expensive per hour, better at scale and under heavy read load</td></tr>
          <tr><td>DR</td><td>Cross-region read replica</td><td>Aurora Global Database — RPO around 1s, RTO under a minute</td></tr>
        </tbody>
      </table>
      <p>
        The decision rule to state: <b>Aurora when you need fast failover, many read replicas or
        cross-region DR with a tight RPO; RDS when the workload is modest and cost dominates.</b>{" "}
        For a bank&apos;s system of record with a 24/7 requirement, Aurora with a Global Database is
        the defensible default.
      </p>

      <h3>RTO and RPO — define them before you design anything</h3>
      <ul>
        <li><b>RPO</b> — how much data you can afford to lose, measured in time. Driven by backup and replication frequency.</li>
        <li><b>RTO</b> — how long you can afford to be down. Driven by how fast you can promote or restore.</li>
      </ul>
      <table>
        <thead><tr><th>Strategy</th><th>RTO / RPO</th><th>Cost</th><th>Fits</th></tr></thead>
        <tbody>
          <tr><td>Backup and restore</td><td>Hours / hours</td><td>Lowest</td><td>Internal tooling, reporting</td></tr>
          <tr><td>Pilot light</td><td>Tens of minutes / minutes</td><td>Low</td><td>Important but not customer-facing</td></tr>
          <tr><td>Warm standby</td><td>Minutes / seconds</td><td>High</td><td>Core banking APIs</td></tr>
          <tr><td>Multi-site active/active</td><td>Near zero / near zero</td><td>Highest</td><td>Payments rails, card authorisation</td></tr>
        </tbody>
      </table>
      <p className="text-slate-300">
        The sentence that separates a senior answer: <b>&quot;RTO and RPO are business decisions, not
        engineering ones. I ask the product and risk owners what an hour of downtime and five minutes
        of lost transactions cost, and the architecture follows from the answer.&quot;</b> Then add
        the uncomfortable follow-up yourself: <b>a backup you have never restored is not a backup.</b>{" "}
        Schedule restore drills, measure the actual restore time, and record it — because in an
        audit, the evidence of the drill is what is asked for.
      </p>

      <h3>PostgreSQL operations to have ready</h3>
      <ul>
        <li><b>PITR</b> — automated backups plus WAL archiving let you restore to any second inside the retention window. That is your recovery path for a bad migration or a mistaken <code>DELETE</code>, which is a far more common disaster than an AZ failure.</li>
        <li><b>Connection pooling</b> — Postgres forks a process per connection, so a few hundred connections hurt. PgBouncer or RDS Proxy in transaction mode; note that transaction-mode pooling breaks session-scoped features like prepared statements and advisory locks, so it is a design choice rather than a free win.</li>
        <li><b>Zero-downtime migrations</b> — the banking-relevant version: add a nullable column, backfill in batches, dual-write, switch reads, then drop the old column in a later release. Never a long <code>ALTER</code> holding an <code>ACCESS EXCLUSIVE</code> lock on a hot table. Set <code>lock_timeout</code> and <code>statement_timeout</code> so a migration fails fast instead of queuing every request behind it.</li>
        <li><b>Index creation</b> — <code>CREATE INDEX CONCURRENTLY</code> in production; the plain form locks writes for the duration.</li>
        <li><b>Vacuum and bloat</b> — MVCC leaves dead tuples; autovacuum reclaims them. Long-running transactions block vacuuming and cause bloat and transaction-ID wraparound risk. Monitor <code>pg_stat_user_tables</code> and the oldest transaction age.</li>
        <li><b>Diagnosis</b> — <code>pg_stat_statements</code> for the worst queries by total time, <code>EXPLAIN (ANALYZE, BUFFERS)</code> for the plan, Performance Insights on RDS for wait events.</li>
      </ul>

      <h3>DynamoDB — think in access patterns, not tables</h3>
      <ul>
        <li><b>Design backwards from queries.</b> In a relational database you model the data and then query it; in DynamoDB you list every access pattern first and design keys to serve them. Getting this backwards is the single most common mistake and interviewers probe for it.</li>
        <li><b>Partition key must spread.</b> A key like <code>status</code> or a date creates a hot partition and throttles. Prefer high-cardinality keys, or add a suffix to shard.</li>
        <li><b>GSI vs LSI</b> — a GSI has its own partition key and its own capacity and is eventually consistent; an LSI shares the partition key, must be created with the table, and supports strong consistency.</li>
        <li><b>Capacity</b> — on-demand for spiky or unknown traffic, provisioned with auto-scaling for steady, predictable load (meaningfully cheaper at scale).</li>
        <li><b>Operational features</b> — PITR, on-demand backups, Streams for change data capture into Lambda, Global Tables for multi-region active/active, DAX for microsecond reads.</li>
        <li><b>When not to use it</b> — ad-hoc analytical queries, complex joins, or anything needing multi-entity transactions across arbitrary items. In a bank, ledgers usually stay in Aurora; DynamoDB serves session state, device registries, idempotency keys and high-volume event lookups.</li>
      </ul>

      <h3>MongoDB, briefly</h3>
      <p>
        Replica set of three members with automatic election on primary failure; write with{" "}
        <code>w: &quot;majority&quot;</code> for durability that survives a failover; read preference
        controls whether you accept stale secondary reads; sharding for horizontal scale, where the
        shard key choice is as consequential as a DynamoDB partition key. On AWS the choice is
        between self-managed, Atlas, or DocumentDB (API-compatible, not the same engine).
      </p>

      {/* ────────── KAFKA ────────── */}
      <h2>7. Kafka and event-driven architecture — your existing strength</h2>
      <p>
        You already work with the hard parts of this. Present the patterns you know, then extend into
        the operational vocabulary a platform engineer is expected to have.
      </p>

      <h3>What you already have, said in their language</h3>
      <ul>
        <li><b>Transactional outbox</b> — the event row is written in the same database transaction as the state change, and a relay publishes it. This removes the dual-write problem where the database commits and the broker publish fails, or the reverse.</li>
        <li><b>At-least-once delivery, idempotent effects</b> — the broker will redeliver, so the consumer must make reprocessing harmless. A deterministic idempotency key checked before the effect is applied.</li>
        <li><b>The event is a trigger, not the authority</b> — consumers re-read the source row rather than trusting a possibly stale payload.</li>
        <li><b>Saga compensation</b> — no distributed ACID across services, so a failed step is undone by a compensating action, and ambiguity gets its own state rather than a guess.</li>
      </ul>

      <h3>The operational layer to add</h3>
      <ul>
        <li><b>Partitions define parallelism and ordering.</b> Ordering is guaranteed only within a partition, so anything that must be ordered — all events for one account — must share a partition key. Consumers in a group cannot usefully exceed the partition count.</li>
        <li><b>Durability settings</b> — <code>acks=all</code> with <code>min.insync.replicas=2</code> on a replication factor of 3. Anything less and an acknowledged write can be lost on a broker failure, which is not acceptable for money.</li>
        <li><b>Idempotent producer and transactions</b> — <code>enable.idempotence=true</code> removes duplicates from producer retries; transactions give you exactly-once between Kafka topics, though not across Kafka and an external database — which is exactly why the outbox exists.</li>
        <li><b>Consumer lag is the health metric.</b> Alert on lag trend, not absolute value. Burrow or the MSK/CloudWatch metrics; KEDA can scale consumers on lag directly.</li>
        <li><b>Rebalance storms</b> — a slow consumer exceeding <code>max.poll.interval.ms</code> is ejected, triggering a rebalance that slows everyone further. Fix by shrinking batches, moving slow work off the poll loop, or using cooperative sticky assignment.</li>
        <li><b>Retention and compaction</b> — time or size retention for event streams; log compaction when the topic is a changelog and only the latest value per key matters.</li>
        <li><b>Dead-letter topics</b> — a poison message must not block a partition forever. Retry with backoff a bounded number of times, then route to a DLQ with the failure context, and alert.</li>
        <li><b>On AWS</b> — MSK (provisioned or serverless) versus self-managed on EC2. MSK removes broker operations but you still own topic design, quotas and consumer health.</li>
      </ul>

      {/* ────────── OBSERVABILITY ────────── */}
      <h2>8. Observability and operational stability</h2>
      <p>
        The JD names observability explicitly alongside reliability and availability. The framing
        that lands: <b>monitoring tells you a known thing broke; observability lets you ask a
        question you did not anticipate.</b>
      </p>
      <ul>
        <li><b>Metrics</b> — numeric time series, cheap, aggregatable, the basis of alerting. Prometheus, or CloudWatch/AMP on AWS. Watch cardinality: a label containing a user ID or a request ID will destroy your metrics store.</li>
        <li><b>Logs</b> — structured JSON, correlated by trace ID. In Go that is <code>log/slog</code>. Logs are expensive at scale, so sample the noisy paths and keep the errors.</li>
        <li><b>Traces</b> — OpenTelemetry, exported to Jaeger or X-Ray. This is how you find which of eleven services in the request path actually added the 900 ms.</li>
      </ul>

      <h3>What to measure</h3>
      <ul>
        <li><b>RED</b> for request-driven services — Rate, Errors, Duration.</li>
        <li><b>USE</b> for resources — Utilisation, Saturation, Errors.</li>
        <li><b>The four golden signals</b> — latency, traffic, errors, saturation.</li>
      </ul>

      <h3>SLI, SLO and error budgets</h3>
      <p>
        An <b>SLI</b> is the measurement (the proportion of requests served under 300 ms). An{" "}
        <b>SLO</b> is the target (99.9% over 30 days). The <b>error budget</b> is what is left over —
        0.1% of 30 days is about 43 minutes of failure you are allowed to spend.
      </p>
      <p className="text-slate-300">
        Why this matters to an interviewer: the error budget turns &quot;should we ship?&quot; from
        an argument into a policy. Budget remaining, ship. Budget exhausted, the next sprint is
        reliability work. It is how a platform team says no to a release without it being political,
        and describing it that way is a senior signal.
      </p>
      <p>
        Alert on <b>symptoms and burn rate</b>, not causes. &quot;Error budget burning at 14x, will
        exhaust in two hours&quot; is actionable; &quot;CPU is at 85%&quot; wakes someone up for
        nothing. Every page should have a runbook, and an alert nobody acts on should be deleted.
      </p>

      {/* ────────── SECURITY ────────── */}
      <h2>9. Cloud security and banking compliance</h2>

      <h3>Identity and secrets</h3>
      <ul>
        <li><b>No long-lived credentials anywhere.</b> Pipelines federate to AWS with OIDC; pods use IRSA or Pod Identity; humans use SSO with short-lived sessions and MFA. If you say only one security sentence in the interview, say this one.</li>
        <li><b>Least privilege, enforced structurally</b> — permission boundaries so a team can create roles but not escalate, SCPs at the Organization level so even an account admin cannot disable CloudTrail or launch in an unapproved region (which is how you enforce data residency).</li>
        <li><b>Secrets</b> — AWS Secrets Manager with rotation, or Vault. Never in environment variables committed to a repository, never in Terraform variables that land in state unencrypted, never in an image layer.</li>
        <li><b>KMS</b> — customer-managed keys for regulated data, with key policies, rotation and an audit trail of every decrypt. Envelope encryption for EKS secrets, RDS, S3 and EBS.</li>
      </ul>

      <h3>Network and workload</h3>
      <ul>
        <li>Private subnets for all compute and data; only load balancers are public. No SSH — use SSM Session Manager, which gives you an audited session and no open port 22.</li>
        <li>Security groups referencing other security groups rather than CIDR ranges, so the rules survive re-addressing.</li>
        <li>WAF in front of public endpoints; Shield for DDoS; rate limiting at the edge.</li>
        <li>Kubernetes NetworkPolicies for east-west segmentation — default deny, then allow explicitly. Without them, any compromised pod can reach every other pod.</li>
        <li>Image provenance — scan in CI, block HIGH and CRITICAL, sign with Cosign and verify at admission so only images your pipeline built can run.</li>
      </ul>

      <h3>The banking layer</h3>
      <ul>
        <li><b>Data residency</b> — Indian regulation requires payment data to be stored in India; enforce with an SCP restricting regions rather than with a wiki page.</li>
        <li><b>Audit trail</b> — CloudTrail organisation-wide to a locked, versioned S3 bucket with Object Lock, so the log of what happened cannot be edited by whoever did it. Application-level admin action logging on top.</li>
        <li><b>Segregation of duties</b> — the engineer who writes the change does not approve their own production deploy. This is why the manual gate in the pipeline exists and why GitOps with pull-request review is attractive to auditors.</li>
        <li><b>Change management</b> — a production change carries a change record, a rollback plan and a tested backout. Automating the evidence collection rather than fighting the process is the mature position.</li>
        <li><b>Standards to name</b> — PCI-DSS for card data, SOX for financial reporting controls, ISO 27001, RBI cyber-security framework, and the general principle of data minimisation.</li>
      </ul>
      <p className="text-slate-400 text-sm">
        You are not expected to be a compliance officer. You are expected to know that these
        constraints exist, to design so they are satisfiable, and to not be surprised when a control
        blocks a convenient shortcut.
      </p>

      {/* ────────── COST ────────── */}
      <h2>10. Cost optimisation</h2>
      <p>
        Explicitly in the JD, and a topic where most engineers have nothing to say — so a prepared
        answer stands out disproportionately.
      </p>
      <ul>
        <li><b>Right-size first.</b> Most savings come from instances provisioned for a peak that never happens. Compute Optimizer gives you the data; Karpenter consolidation does it continuously on EKS.</li>
        <li><b>Commit for the baseline</b> — Compute Savings Plans (flexible across instance family and region) or Reserved Instances for steady load, at roughly 30–50% off. Cover the floor, leave the peak on-demand.</li>
        <li><b>Graviton</b> — ARM instances at better price-performance. Go cross-compiles to ARM64 trivially, so for a Go estate this is close to free money. Java is usually fine too; native dependencies are the risk.</li>
        <li><b>Spot for anything interruptible</b> — CI runners, batch, Glue, stateless workers behind a queue. Up to 90% off, in exchange for handling a two-minute interruption notice.</li>
        <li><b>Storage lifecycle</b> — S3 Intelligent-Tiering or lifecycle rules to Glacier for the raw and archive zones; delete orphaned EBS volumes and old snapshots, which accumulate silently.</li>
        <li><b>Network</b> — cross-AZ data transfer is billed and is invisible until you look. Keeping chatty services and their reads zone-aware is a real saving. VPC endpoints for S3 and DynamoDB avoid NAT gateway charges, which are frequently among the top line items.</li>
        <li><b>Non-production off out of hours</b> — dev and UAT do not need to run overnight or at weekends; that is roughly a 65% cut on those environments for a scheduled scale-to-zero.</li>
        <li><b>Make it visible</b> — a mandatory tagging policy enforced by SCP, then per-team showback dashboards and Cost Anomaly Detection. Cost is a behaviour problem before it is a technology problem; teams that cannot see their spend cannot manage it.</li>
      </ul>

      {/* ────────── SPRING BOOT ────────── */}
      <h2>11. Spring Boot — operate it, do not pretend to write it</h2>
      <p>
        If asked, be direct: &quot;I am not a Java developer. I can operate Spring Boot services
        competently, and here is what that involves.&quot; That answer is respected; a bluffed one is
        not.
      </p>
      <ul>
        <li><b>JVM in a container</b> — modern JVMs are cgroup-aware, but you still set{" "}
          <code>-XX:MaxRAMPercentage=75</code> rather than a fixed <code>-Xmx</code>, so the heap
          tracks the container limit. Leave headroom for metaspace, thread stacks and direct buffers,
          or the container is OOMKilled while the heap looks healthy — a genuinely common incident.</li>
        <li><b>Health endpoints</b> — Actuator exposes <code>/actuator/health/liveness</code> and{" "}
          <code>/actuator/health/readiness</code>, which map directly onto the two Kubernetes probes.
          Wire readiness to dependency health and liveness to process health, not the reverse.</li>
        <li><b>Slow starts</b> — Spring context initialisation can take tens of seconds, which is what{" "}
          <code>startupProbe</code> is for. Class Data Sharing or a native image with GraalVM if cold
          start genuinely matters.</li>
        <li><b>GC as a latency source</b> — a p99 spike that correlates with nothing in the application
          is often a garbage-collection pause. G1 by default; ZGC or Shenandoah for low-pause
          requirements.</li>
        <li><b>Connection pools</b> — HikariCP sizing multiplied by replica count is what the database
          actually sees. Ten pods with a pool of 20 is 200 connections, which will exhaust a default
          Postgres configuration.</li>
      </ul>

      {/* ────────── ARCHITECT TRACK ────────── */}
      <h2>12. The architect half — governance, standards, mentoring</h2>
      <p>
        These lines are why the requisition says 15+ years. You cannot manufacture two decades, but
        you can demonstrate that you think at this altitude, and that is often enough to be taken
        seriously for the level below.
      </p>

      <h3>Architecture Decision Records</h3>
      <p>
        The single most credible artefact you can talk about. One short document per significant
        decision: <b>context, options considered, decision, consequences</b>. Stored in the
        repository, reviewed like code. It answers the question every organisation eventually asks —
        &quot;why is it built this way?&quot; — long after the people who decided have left.
      </p>
      <pre><code>{`# ADR-014: Aurora Global Database for the payments store

## Context
Payments must survive a regional failure with RPO under 5 minutes and
RTO under 15. The current single-region Aurora cluster has neither.

## Options
1. Cross-region Aurora read replica — cheaper, RPO minutes, manual promotion.
2. Aurora Global Database — RPO ~1s, RTO <1min, managed failover, ~35% more cost.
3. Active/active multi-region with conflict resolution — meets everything,
   but the application is not written for write conflicts.

## Decision
Option 2. Option 3 is rejected as an application rewrite we are not funding.

## Consequences
+ Meets the stated RPO/RTO with a documented failover runbook.
- ~35% higher database cost; secondary region capacity sits mostly idle.
- Failover is regional and all-or-nothing; per-service failover is not possible.
- Requires a quarterly failover drill to keep the runbook honest.`}</code></pre>

      <h3>Standards and the paved road</h3>
      <p>
        Governance that is a document nobody reads fails. Governance that is a <b>golden path</b>
        succeeds: a service template that already has the Dockerfile, the pipeline, the Terraform
        module, the health endpoints, the dashboards and the alerts wired up. Teams follow the
        standard because it is the fastest route, not because a committee told them to. Then encode
        the non-negotiables as automated gates — admission policies, pipeline checks, policy-as-code
        on Terraform plans — so compliance is verified rather than asserted.
      </p>

      <h3>Mentoring, described concretely</h3>
      <p>
        Do not say &quot;I mentor juniors.&quot; Say what you actually do: code review that explains
        the reasoning rather than just requesting a change, pairing on the first incident someone
        takes, writing the runbook together after it, and deliberately handing over a piece of work
        that is slightly beyond what the person has done before with a safety net underneath. If you
        have done this at 1Finance, that is your story — tell it in STAR form.
      </p>

      <h3>TOGAF in one paragraph</h3>
      <p>
        A framework for enterprise architecture built around the <b>ADM</b> — an iterative cycle
        moving through architecture vision, business architecture, information systems architecture
        (data then application), technology architecture, opportunities and solutions, migration
        planning, implementation governance and change management. It also gives you an Architecture
        Repository and a governance body, usually an Architecture Review Board. You do not need the
        certification to speak about it; you need to know that it is a process framework for aligning
        technology to business capability, and that in a bank it exists to make architecture
        decisions traceable and reviewable.
      </p>

      {/* ────────── Q&A ────────── */}
      <h2>13. Interview questions and answers</h2>
      <p className="text-slate-400">
        Click a question to expand. Read the answer once, then close it and say it out loud from
        memory — the second pass is where the preparation actually happens.
      </p>

      <h3>Golang</h3>

      <Q n={1} q="Why would a DevOps team write tooling in Go rather than Python or Bash?">
        <p>
          Three reasons that matter operationally. <b>Distribution</b>: Go produces a single static
          binary, so deploying a tool is copying a file — no interpreter version, no virtualenv, no
          dependency drift on the host. <b>Concurrency</b>: operations work is mostly waiting on
          network calls, and goroutines with <code>context</code> for cancellation make fan-out with
          timeouts straightforward compared with thread pools or async frameworks.{" "}
          <b>Ecosystem alignment</b>: Kubernetes, Terraform, Docker and Prometheus are Go, so their
          client libraries are first-class and when something behaves strangely you can read the
          source.
        </p>
        <p>
          I would still use Bash for a ten-line glue script and Python where the team already has
          Python and the data libraries help. The switch to Go happens when a script becomes a tool
          that other people depend on — that is the point where types, tests and a single artefact
          start paying for themselves.
        </p>
      </Q>

      <Q n={2} q="Explain goroutines, and how you avoid leaking them.">
        <p>
          A goroutine is a function scheduled by the Go runtime rather than the operating system.
          Stacks start around 2 KB and grow, and the runtime multiplexes many goroutines onto a few
          OS threads, so hundreds of thousands are practical.
        </p>
        <p>
          A leak happens when a goroutine blocks forever — on a channel nobody reads, or on a network
          call with no timeout — and is never garbage collected because it is still runnable in
          principle. The symptom is memory climbing slowly over days until the pod is OOMKilled.
        </p>
        <p>The disciplines that prevent it:</p>
        <ul>
          <li>Every goroutine has a way to be told to stop — pass <code>context.Context</code> and select on <code>ctx.Done()</code>.</li>
          <li>Every outbound call has a timeout. No exceptions.</li>
          <li>The side that writes to a channel closes it; the reader ranges over it.</li>
          <li>Watch the <code>go_goroutines</code> Prometheus metric. A monotonically rising count is a leak, and <code>pprof</code> at <code>/debug/pprof/goroutine?debug=2</code> shows you exactly where they are parked.</li>
        </ul>
      </Q>

      <Q n={3} q="A Go service in Kubernetes gets OOMKilled every few hours. How do you debug it?">
        <p>Work from cheapest evidence to most expensive.</p>
        <ol>
          <li><code>kubectl describe pod</code> to confirm it is genuinely <code>OOMKilled</code> (exit code 137) rather than a liveness probe restart.</li>
          <li>Check whether the limit is simply too low for legitimate usage — compare the memory metric against the limit over a week. Sometimes the fix is a correct limit, not a code change.</li>
          <li>If usage grows without plateau, it is a leak. Enable <code>net/http/pprof</code> and capture a heap profile: <code>go tool pprof http://pod:8080/debug/pprof/heap</code>, then compare two profiles taken an hour apart to see what is growing.</li>
          <li>The usual culprits: an unbounded cache or map that nothing evicts, goroutines accumulating (check the goroutine profile too), HTTP response bodies never closed so connections and buffers are retained, or slices from large buffers being retained by small sub-slices.</li>
          <li>Remember the runtime detail: Go&apos;s garbage collector returns memory to the OS lazily, so RSS can look high while the live heap is small. <code>GOMEMLIMIT</code> set slightly below the container limit makes the collector work harder before the kernel kills you, and is the right lever in containers.</li>
        </ol>
      </Q>

      <Q n={4} q="How do you handle configuration and secrets in a Go service running on EKS?">
        <p>
          Configuration comes from the environment, following the twelve-factor principle, so the
          same image runs in every environment. Non-sensitive values come from a ConfigMap; sensitive
          values come from AWS Secrets Manager, surfaced into the cluster by the External Secrets
          Operator or the Secrets Store CSI driver, and mounted or injected as environment variables.
        </p>
        <p>
          The pod authenticates to AWS through <b>IRSA</b> — its ServiceAccount is annotated with an
          IAM role, the cluster OIDC provider vouches for it, and the AWS SDK picks up temporary
          credentials automatically. No access keys in the image, in the manifest or in the
          repository.
        </p>
        <p>
          In the application I validate configuration at startup and fail fast if something required
          is missing, because a service that boots with a broken configuration and fails on the first
          real request is far harder to diagnose than one that refuses to start.
        </p>
      </Q>

      <Q n={5} q="What is a Kubernetes operator, and when would you write one?">
        <p>
          An operator is a controller plus a Custom Resource Definition. The CRD extends the
          Kubernetes API with your own object type, and the controller runs a reconcile loop that
          reads the desired state from that object, observes actual state, and takes action to close
          the gap. It encodes the operational knowledge that would otherwise live in a runbook.
        </p>
        <p>
          The essential property is that reconciliation is <b>level-triggered and idempotent</b>: it
          looks at the world as it is now and converges, rather than reacting to an event once. That
          makes it safe to re-run, which is the same reasoning behind idempotent Kafka consumers.
        </p>
        <p>
          When to write one: when you have a stateful or multi-step operational procedure that is
          performed repeatedly — provisioning a tenant, managing database users, rotating
          credentials, orchestrating a complex application&apos;s failover. When not to: for
          something a Helm chart already does. An operator is real software with a real maintenance
          cost, and most teams that write one did not need it.
        </p>
      </Q>

      <h3>AWS and Terraform</h3>

      <Q n={6} q="Walk me through how you would provision a production environment with Terraform.">
        <p>I would describe structure first, then workflow, then guardrails.</p>
        <p>
          <b>Structure.</b> Reusable modules for network, cluster, data and service, with live
          configurations per environment that differ only in variables. State split by blast radius —
          networking, platform and application in separate state files — in an encrypted, versioned
          S3 bucket with locking enabled. Modules pinned to Git tags so an upgrade is deliberate.
        </p>
        <p>
          <b>Workflow.</b> Nobody applies from a laptop against production. A merge request runs{" "}
          <code>fmt</code>, <code>validate</code> and a policy scan, then <code>plan</code>, and the
          plan output is posted to the merge request for review. On merge, the pipeline applies the{" "}
          <b>saved plan artefact</b> so what runs is what was reviewed. Production carries a manual
          approval from someone who did not write the change.
        </p>
        <p>
          <b>Guardrails.</b> The pipeline authenticates with OIDC, not stored keys.{" "}
          <code>prevent_destroy</code> on databases and state buckets. A nightly <code>plan</code>{" "}
          that alerts on drift, because drift means someone made a console change and the
          infrastructure is no longer described by the code. And read-only console access in prod, so
          drift is rare by construction.
        </p>
      </Q>

      <Q n={7} q="Two engineers ran terraform apply at the same time. What happens, and how do you prevent it?">
        <p>
          With locking configured, the second apply blocks and then fails with a lock error, which is
          the correct outcome. Without locking, both read the same state, both write, and the last
          write wins — leaving state that does not describe reality. You then have orphaned resources
          Terraform no longer knows about and, worse, resources it thinks exist that do not.
        </p>
        <p>
          Prevention is state locking: native S3 locking on current Terraform versions, or the
          DynamoDB lock table on older ones. Recovery, if it has already happened: S3 bucket
          versioning lets you roll state back to the last good version, then reconcile the difference
          with <code>terraform plan</code> and targeted <code>import</code> blocks for anything that
          was orphaned. And the real fix is procedural — humans should not be applying at all, the
          pipeline should.
        </p>
      </Q>

      <Q n={8} q="Someone changed a security group in the console. How do you find out, and what do you do?">
        <p>
          <b>Detect</b> three ways: a scheduled <code>terraform plan</code> in CI that alerts on any
          non-empty diff; AWS Config rules with drift detection; and CloudTrail, which tells you who
          made the change and when.
        </p>
        <p>
          <b>Respond</b> by finding out why first. If the change was wrong, re-apply Terraform to
          revert it. If the change was <i>right</i> — someone fixed a production problem at 2am and
          the code was incomplete — then the code is what is wrong, and I bring the change into the
          module so the fix survives the next apply. Blindly reverting an emergency fix is how you
          cause the second outage.
        </p>
        <p>
          <b>Prevent</b> by removing write access to production from the console entirely, so the
          only path to change is the pipeline. That is also what makes the audit story simple: every
          production change has a merge request, a reviewer and a plan.
        </p>
      </Q>

      <Q n={9} q="Design a highly available three-tier architecture on AWS for a banking API.">
        <p>Walk it top to bottom, naming the availability decision at each layer.</p>
        <ul>
          <li><b>Edge</b> — Route 53 with health checks, CloudFront where caching helps, WAF for the OWASP ruleset and rate limiting, Shield for DDoS.</li>
          <li><b>Entry</b> — an Application Load Balancer across at least three Availability Zones in public subnets, TLS terminated with ACM certificates.</li>
          <li><b>Compute</b> — EKS node groups or ECS Fargate tasks in private subnets, spread across the same three AZs with topology constraints so no single AZ holds a majority of replicas. Horizontal scaling on load, and a PodDisruptionBudget so maintenance cannot drain capacity.</li>
          <li><b>Data</b> — Aurora PostgreSQL with a writer and at least one reader in a different AZ, automated backups with PITR, and a Global Database secondary region if the RPO demands it. ElastiCache for the hot read path, also multi-AZ.</li>
          <li><b>Async</b> — MSK or SQS between services so a slow downstream produces a queue, not a cascade of timeouts.</li>
          <li><b>Cross-cutting</b> — everything in Terraform; secrets in Secrets Manager; least-privilege IAM per workload; CloudTrail and VPC flow logs to a locked bucket; metrics, logs and traces to a single pane; and runbooks for the failure modes.</li>
        </ul>
        <p className="text-slate-300">
          Then say the part that makes it a senior answer: <b>&quot;multi-AZ is the default and it is
          cheap; multi-region is expensive and I would only propose it once the business states an
          RTO that a single region cannot meet.&quot;</b> Proposing active/active across regions
          unprompted signals that you optimise for impressiveness rather than for cost.
        </p>
      </Q>

      <Q n={10} q="When would you use Lambda instead of a container on EKS?">
        <p>
          Lambda when the work is <b>event-driven, short and spiky</b>: reacting to an S3 upload,
          processing a DynamoDB stream, a scheduled job, a webhook receiver, glue between services.
          You pay per invocation and scale to zero, and there is no runtime to patch.
        </p>
        <p>
          A container when the work is <b>steady, long-running, latency-sensitive or complex</b>: a
          request-serving API with sustained traffic, anything with a long startup, anything needing
          persistent connections, and anything where the per-request cost of Lambda at high volume
          exceeds a reserved instance.
        </p>
        <p>
          The trade-offs to name: cold starts (mitigated with provisioned concurrency, at which point
          you are paying for idle capacity and the economics start resembling a container), the
          15-minute execution ceiling, the difficulty of connection pooling to a relational database
          (RDS Proxy exists precisely because of this), and account-level concurrency limits that let
          one noisy function starve another.
        </p>
      </Q>

      <Q n={11} q="How do you reduce a cloud bill that has grown 40% in a quarter?">
        <p>Measure before cutting. The order I would work in:</p>
        <ol>
          <li><b>Find the delta.</b> Cost Explorer grouped by service and by tag, comparing quarter over quarter. A 40% jump usually has one or two causes, not forty.</li>
          <li><b>Check the usual suspects</b> — an environment left running, a log group with no retention policy, NAT gateway data processing, cross-AZ transfer, snapshots and orphaned EBS volumes accumulating, or a data pipeline reprocessing the whole lake because a job bookmark was disabled.</li>
          <li><b>Right-size</b> with Compute Optimizer and actual utilisation data.</li>
          <li><b>Commit</b> — Savings Plans over the steady baseline once it is right-sized. Committing before right-sizing locks in the waste.</li>
          <li><b>Structural moves</b> — Graviton, Spot for interruptible work, S3 lifecycle policies, scaling non-production to zero out of hours.</li>
          <li><b>Make it stick</b> — mandatory tagging enforced by policy, per-team showback, and Cost Anomaly Detection so the next 40% is caught in a week rather than a quarter.</li>
        </ol>
        <p className="text-slate-300">
          The framing that lands with an architect: optimise for <b>unit cost</b> — cost per
          transaction or per customer — not absolute spend. A bill that grows while unit cost falls
          is a business succeeding.
        </p>
      </Q>

      <h3>Kubernetes and containers</h3>

      <Q n={12} q="Explain the difference between liveness, readiness and startup probes, and a way to get them wrong.">
        <p>
          <b>Liveness</b> answers &quot;is this process wedged?&quot; — failure restarts the
          container. <b>Readiness</b> answers &quot;should traffic be sent here right now?&quot; —
          failure removes the pod from the Service endpoints but leaves it running.{" "}
          <b>Startup</b> answers &quot;has it finished booting?&quot; — it suspends the other probes
          until it passes, so a slow-starting application is not killed before it is up.
        </p>
        <p>
          The classic way to get it wrong: <b>pointing liveness at a database connectivity check.</b>{" "}
          The database has a brief blip, every pod fails liveness simultaneously, the whole fleet
          restarts, the restart storm hammers the recovering database, and a thirty-second
          degradation becomes a thirty-minute outage. Dependency health belongs in{" "}
          <b>readiness</b> — take yourself out of rotation, stay alive, and come back when the
          dependency does.
        </p>
        <p>
          A second one: readiness that only checks the HTTP server is listening. It returns healthy
          before caches are warm or migrations are done, and the first traffic after a deploy errors.
        </p>
      </Q>

      <Q n={13} q="Pods are Pending and never schedule. Walk me through the diagnosis.">
        <p><code>kubectl describe pod</code> first — the scheduler writes the reason into events. The reasons and what each means:</p>
        <ul>
          <li><b>Insufficient cpu/memory</b> — no node has room for the requests. Either the cluster needs to scale (is Karpenter or the Cluster Autoscaler running, and is it hitting a limit?) or the requests are unrealistically large.</li>
          <li><b>Node affinity or taint mismatch</b> — the pod demands a node pool that does not exist, or every node carries a taint the pod does not tolerate.</li>
          <li><b>Volume node affinity conflict</b> — an EBS volume is zonal, so a pod bound to a PVC in one AZ cannot schedule in another. Very common in stateful workloads.</li>
          <li><b>No IP addresses</b> — on EKS with the VPC CNI each pod takes a real subnet IP, so an exhausted subnet stops scheduling while CPU and memory look fine. Check free IPs in the subnets before you blame anything else.</li>
          <li><b>topologySpreadConstraints with DoNotSchedule</b> — the spread rule cannot be satisfied, for example three replicas across two available zones with a maxSkew of 1.</li>
          <li><b>Quota</b> — a ResourceQuota on the namespace is already exhausted.</li>
        </ul>
      </Q>

      <Q n={14} q="How do you do a zero-downtime deployment on Kubernetes?">
        <p>Zero downtime is the sum of several things, and missing any one of them produces errors that look random.</p>
        <ul>
          <li><b>Rolling update with <code>maxUnavailable: 0</code></b> so capacity never drops below the replica count.</li>
          <li><b>Readiness gating</b> — the rollout only proceeds when new pods report ready, so a broken image stalls instead of replacing everything.</li>
          <li><b>Graceful shutdown</b> — the container handles SIGTERM, fails readiness first, waits for the endpoints to converge, then drains in-flight requests before exiting. Set <code>terminationGracePeriodSeconds</code> higher than the drain time.</li>
          <li><b>Backward-compatible changes</b> — during a rollout both versions run at once, so the new code must tolerate the old schema and the old code must tolerate the new one. This is why expand-and-contract migrations matter: add the column, deploy code that writes both, backfill, switch reads, then remove the old column in a later release.</li>
          <li><b>PodDisruptionBudget</b> so node drains during the same window cannot take the remaining replicas.</li>
          <li><b>For higher-risk changes</b>, canary with Argo Rollouts: shift a small percentage, evaluate error rate and latency automatically against a Prometheus query, promote or roll back.</li>
        </ul>
      </Q>

      <Q n={15} q="What actually happens when you run kubectl apply?">
        <p>
          The manifest is sent to the <b>API server</b>, which authenticates the caller, authorises
          the action through RBAC, runs <b>mutating admission</b> webhooks (sidecar injection,
          defaulting), validates the object schema, runs <b>validating admission</b> webhooks (your
          policy engine rejecting a root container here), and persists it to <b>etcd</b>. That is the
          entire write path, and nothing has run yet.
        </p>
        <p>
          From there it is controllers watching and reacting. The Deployment controller sees a new
          Deployment and creates a ReplicaSet; the ReplicaSet controller creates Pods; the{" "}
          <b>scheduler</b> sees unbound Pods and assigns each to a node by filtering then scoring;
          the <b>kubelet</b> on that node sees a Pod assigned to it, pulls the image through the
          container runtime, sets up the network via CNI and mounts volumes via CSI, then starts the
          container and begins reporting status. <b>kube-proxy</b> or the CNI programs the routing so
          the Service sends traffic to the pod once readiness passes.
        </p>
        <p className="text-slate-300">
          The idea worth stating explicitly: nothing is imperative. You declared a desired state and
          independent control loops converged towards it. That is why the system self-heals, and why
          a controller must be safe to re-run.
        </p>
      </Q>

      <Q n={16} q="Your cluster costs have doubled but traffic is flat. Where do you look?">
        <ul>
          <li><b>Over-requested resources.</b> Requests drive scheduling, so pods asking for 2 CPU and using 100m force nodes to be added for capacity nobody consumes. Compare requests against actual usage across the fleet — this is usually the answer, and a Vertical Pod Autoscaler in recommendation mode gives you the numbers.</li>
          <li><b>Node fragmentation</b> — many partly-empty nodes. Karpenter consolidation bin-packs and terminates the remainder.</li>
          <li><b>Instance choice</b> — on-demand where Spot would do for stateless workloads, x86 where Graviton would do.</li>
          <li><b>Forgotten workloads</b> — abandoned namespaces, preview environments that never got cleaned up, CronJobs whose completed pods accumulate.</li>
          <li><b>Outside compute</b> — the load balancer per Ingress instead of one shared, cross-AZ traffic between chatty services, log volume to CloudWatch with no retention policy, unattached EBS volumes from deleted StatefulSets.</li>
        </ul>
      </Q>

      <Q n={17} q="How do you secure a Kubernetes cluster?">
        <p>Layer by layer, because there is no single control that does it.</p>
        <ul>
          <li><b>Identity</b> — cluster access through SSO mapped to RBAC roles, namespaced and least-privilege. No shared kubeconfig with cluster-admin.</li>
          <li><b>Workload identity</b> — IRSA or Pod Identity so each workload gets exactly the AWS permissions it needs, and no node-wide credentials.</li>
          <li><b>Admission control</b> — Pod Security Admission at restricted level, plus Kyverno or Gatekeeper policies: no privileged containers, no host network or host path mounts, run as non-root, resources required, images only from our registry.</li>
          <li><b>Network</b> — default-deny NetworkPolicies with explicit allows, private API endpoint, nodes in private subnets.</li>
          <li><b>Supply chain</b> — scan images in CI and block on HIGH/CRITICAL, sign with Cosign and verify at admission, use minimal base images so there is less to be vulnerable.</li>
          <li><b>Secrets</b> — external secret store, etcd encrypted with KMS, never a plain Secret checked into Git (or if GitOps, then sealed or encrypted with SOPS).</li>
          <li><b>Runtime and audit</b> — audit logging on, Falco or GuardDuty for EKS runtime threat detection, and regular patching of the control plane and nodes.</li>
        </ul>
      </Q>

      <h3>Databases, HA and disaster recovery</h3>

      <Q n={18} q="Design a backup and disaster recovery plan for a core banking database.">
        <p>
          <b>Start with the numbers, not the technology.</b> I ask the business what RPO and RTO they
          require and what the cost of downtime is, because those two numbers determine everything
          and they are not an engineering choice.
        </p>
        <p>Assuming a core banking system — say RPO of one minute and RTO of fifteen:</p>
        <ul>
          <li><b>In-region resilience</b> — Aurora PostgreSQL, writer plus readers across Availability Zones, automatic failover in under 30 seconds. This covers the common failure, which is an instance or an AZ, not a region.</li>
          <li><b>Point-in-time recovery</b> — continuous backup with WAL, retention set to the regulatory minimum or longer. This is the real protection against the most likely disaster: a bad deployment or an erroneous bulk update, which replication faithfully copies to every replica.</li>
          <li><b>Cross-region</b> — Aurora Global Database for roughly one-second RPO and sub-minute promotion, meeting the stated RTO with room to spare.</li>
          <li><b>Immutable copies</b> — periodic snapshots exported to an S3 bucket in a separate account with Object Lock, so ransomware or a compromised admin cannot delete the backups. In banking this is usually a hard requirement, not a nicety.</li>
          <li><b>Application-side</b> — the services must reconnect on failover rather than holding a dead connection, retries must be idempotent, and the DNS/endpoint change has to propagate. A database that fails over in 30 seconds behind an application that needs a restart has an RTO measured in whatever the restart takes.</li>
        </ul>
        <p className="text-slate-300">
          Then the part most candidates omit: <b>the drill.</b> A quarterly exercise that actually
          promotes the secondary and runs the application against it, timed and documented. Until you
          have restored, you have a backup strategy on paper and an unknown in practice — and the
          drill is also the evidence an auditor asks for.
        </p>
      </Q>

      <Q n={19} q="What is the difference between an RDS read replica and a Multi-AZ deployment?">
        <p>
          They solve different problems and candidates routinely confuse them.{" "}
          <b>Multi-AZ is for availability</b>: a synchronous standby in another AZ that you cannot
          read from, promoted automatically when the primary fails. <b>A read replica is for
          scale</b>: an asynchronous copy you can read from, which does not fail over automatically
          and can lag.
        </p>
        <p>
          The consequences follow from synchronous versus asynchronous. Multi-AZ costs write latency
          but loses no committed data on failover. A read replica costs nothing on the write path but
          can be behind, so reading your own write immediately after committing may return stale
          data — which is why you route reads that must be consistent to the writer.
        </p>
        <p>
          You generally want both: Multi-AZ for resilience, replicas for read scale. Note also the
          newer RDS Multi-AZ DB cluster option, which gives two <i>readable</i> standbys and faster
          failover, sitting between classic Multi-AZ and Aurora.
        </p>
      </Q>

      <Q n={20} q="A query that was fast last month now takes eight seconds. How do you approach it?">
        <ol>
          <li><b>Confirm the scope</b> — one query or everything? If everything, it is a resource or lock problem, not a query problem. Check CPU, IOPS, connection count and Performance Insights wait events first.</li>
          <li><b>Get the plan</b> — <code>EXPLAIN (ANALYZE, BUFFERS)</code>. Compare estimated against actual rows: a large divergence means the planner has bad statistics, and the fix may simply be <code>ANALYZE</code>.</li>
          <li><b>Look for the usual regressions</b> — a sequential scan where an index used to be chosen because the table grew past a threshold; an index that is no longer selective; a plan flip after data distribution changed; bloat from dead tuples making scans read far more pages than the row count suggests.</li>
          <li><b>Check for blocking</b> — <code>pg_stat_activity</code> and <code>pg_locks</code> for a long-running transaction holding a lock, which also blocks autovacuum and compounds the bloat.</li>
          <li><b>Then fix at the right level</b> — an index (created concurrently), a rewritten query, a covering index for an index-only scan, or a design change if the access pattern is fundamentally wrong. And check <code>pg_stat_statements</code> to see whether this query is even the one consuming the most total time, because the slowest query and the most expensive query are frequently not the same.</li>
        </ol>
      </Q>

      <Q n={21} q="How would you choose between Aurora, DynamoDB and MongoDB for a new banking service?">
        <p>By the shape of the data and the access patterns, not by preference.</p>
        <ul>
          <li><b>Aurora PostgreSQL</b> for anything with relational integrity, multi-row transactions, or ad-hoc querying — accounts, ledgers, customers, anything a regulator will ask you to reconcile. Strong consistency and real transactions are not optional for money.</li>
          <li><b>DynamoDB</b> where the access patterns are known, simple and enormous: session state, idempotency keys, device registries, rate-limit counters, event lookups by key. Single-digit-millisecond reads at any scale, but you must design the keys around the queries and you give up ad-hoc querying.</li>
          <li><b>MongoDB</b> where documents genuinely vary in shape and you want flexible querying over them — a product catalogue, aggregated customer profiles, content. Less compelling if the schema is actually stable, in which case Postgres with a JSONB column often gives you the flexibility without a second database to operate.</li>
        </ul>
        <p className="text-slate-300">
          And the architect&apos;s caveat worth saying: <b>every additional datastore is a permanent
          operational tax</b> — backups, DR, monitoring, patching, expertise, on-call. Polyglot
          persistence is correct when the workload genuinely demands it and expensive theatre when it
          does not.
        </p>
      </Q>

      <Q n={22} q="How do you run a schema migration on a table with 200 million rows, with no downtime?">
        <p>Expand and contract, in separate deployments.</p>
        <ol>
          <li><b>Expand</b> — add the new column as nullable with no default that rewrites the table. On modern Postgres a nullable add is metadata-only and instant; a volatile default rewrites the whole table and must be avoided.</li>
          <li><b>Dual-write</b> — deploy code that writes both old and new, reads old. Both versions of the application are running during a rollout, so this step has to be compatible in both directions.</li>
          <li><b>Backfill in batches</b> — a few thousand rows per transaction, with a pause between batches, monitoring replication lag. One giant <code>UPDATE</code> holds locks, bloats the table and can push replicas minutes behind.</li>
          <li><b>Verify</b> — count and sample-compare old against new before trusting it.</li>
          <li><b>Switch reads</b> — deploy code that reads new, still writes both. This is the rollback point: if the new column is wrong, revert the deploy and the old column is still authoritative.</li>
          <li><b>Contract</b> — a later release stops writing the old column and eventually drops it, once you are confident no rollback will need it.</li>
        </ol>
        <p>
          Throughout: <code>lock_timeout</code> and <code>statement_timeout</code> set, so a migration
          that cannot get its lock fails immediately instead of queuing every subsequent query behind
          it and taking the service down. Indexes created with <code>CONCURRENTLY</code>. And the
          whole thing rehearsed against a restored copy of production first.
        </p>
      </Q>

      <Q n={23} q="What does 24/7 availability actually require, beyond a Multi-AZ database?">
        <p>
          It requires that <b>every routine operation be doable without downtime</b>, which is a much
          broader claim than a resilient database. Concretely:
        </p>
        <ul>
          <li>Schema migrations are expand-and-contract, never a maintenance window.</li>
          <li>Deployments are rolling or canary, and both versions can coexist.</li>
          <li>Database patching uses the managed maintenance window with Multi-AZ so the standby is patched and promoted — and the application survives the failover without a restart.</li>
          <li>Certificate rotation, credential rotation and dependency upgrades are automated and tested, because expiry is a leading cause of self-inflicted outages.</li>
          <li>Capacity is headroom, not exactly enough. N+1 at minimum, so losing an AZ does not mean losing the service.</li>
          <li>There is an on-call rotation with runbooks, and the alerts that page are the ones a human can act on.</li>
          <li>The failure modes have been rehearsed — game days, failover drills, restore drills — because an untested recovery path is a hypothesis.</li>
        </ul>
        <p className="text-slate-300">
          And the honest framing: 24/7 is not a technical setting, it is a budget. Each additional
          nine multiplies cost and constrains how fast the organisation can change things. Part of
          the architect&apos;s job is making that trade-off explicit rather than promising five nines
          and funding three.
        </p>
      </Q>

      <h3>Pipelines, events and security</h3>

      <Q n={24} q="Design a CI/CD pipeline for a cloud-native application in a bank.">
        <p>
          The engineering part is standard; the banking part is the controls, and mentioning those is
          what distinguishes the answer.
        </p>
        <ul>
          <li><b>Build once, promote the artefact.</b> The image tested in dev is byte-identical to the one in production, tagged by commit SHA, with immutable tags enabled in ECR so a tag cannot be repointed.</li>
          <li><b>Quality gates that can fail the build</b> — unit tests with the race detector, SAST, dependency vulnerability scanning, image scanning, and infrastructure policy checks on the Terraform plan.</li>
          <li><b>No standing credentials</b> — the runner federates to AWS via OIDC and receives a short-lived role.</li>
          <li><b>Environment promotion</b> — dev automatic, UAT automatic with integration tests, production behind a manual approval by someone other than the author. That is segregation of duties, and it is a control an auditor will specifically ask about.</li>
          <li><b>Deployment via GitOps</b> — CI writes the new tag to a manifest repository, ArgoCD reconciles. Git history is the change record, which makes the audit trail a by-product rather than extra work.</li>
          <li><b>Progressive rollout with automated rollback</b> — canary with analysis on error rate and latency; a failed analysis rolls back without a human decision at 3am.</li>
          <li><b>Evidence</b> — every deploy links commit, approver, test results, scan results and the change ticket. In a regulated environment, being able to produce that automatically is worth more than pipeline speed.</li>
        </ul>
      </Q>

      <Q n={25} q="How do you guarantee a payment is never processed twice in an event-driven system?">
        <p>
          You do not get exactly-once delivery, so you build <b>at-least-once delivery with
          idempotent effects</b>. The broker may redeliver; the effect must be applied once.
        </p>
        <p>The mechanism, concretely:</p>
        <ul>
          <li>Every message carries a <b>deterministic idempotency key</b> derived from the business event, not a random ID generated at publish time — otherwise a republish produces a new key and defeats the whole thing.</li>
          <li>The consumer writes that key to a uniquely-indexed table <b>inside the same database transaction</b> as the effect. A duplicate violates the unique constraint, the transaction rolls back, and the message is acknowledged as already handled.</li>
          <li>The check happens <b>before</b> any business validation such as a balance check, so a retry after a successful apply does not fail on insufficient funds and get misread as a real failure.</li>
          <li>The publish side uses the <b>transactional outbox</b>: the event row is written in the same transaction as the state change, and a relay publishes it afterwards. This eliminates the dual-write failure where the database commits and the broker does not.</li>
          <li>The event is a <b>trigger, not the authority</b> — the consumer re-reads the source record rather than acting on a payload that may be stale by the time it is processed.</li>
          <li>Where a third party is involved and its response is ambiguous — a timeout with no answer — the record moves to an explicit <b>pending reconciliation</b> state rather than guessing. Guessing on money is how you create a double debit or a silent loss.</li>
        </ul>
        <p className="text-slate-400 text-sm">
          This is your genuine experience from the HR community platform ledger. Keep the ownership
          framing honest — you worked on that system rather than designing it — and present the
          patterns as ones you understand deeply and would apply.
        </p>
      </Q>

      <Q n={26} q="Consumer lag on a Kafka topic is growing. What do you do?">
        <ol>
          <li><b>Confirm the direction</b> — is production up, or consumption down? A traffic spike and a stalled consumer look identical on a lag graph and have opposite fixes.</li>
          <li><b>If consumption slowed</b> — check consumer logs for errors and rebalances. Repeated rebalances mean a consumer is exceeding <code>max.poll.interval.ms</code>, usually because processing got slower; the fix is smaller poll batches or moving the slow work off the poll loop.</li>
          <li><b>Check downstream</b> — consumers are usually slow because something they call is slow: a database under load, a third-party API, a lock. The lag is a symptom.</li>
          <li><b>Scale, if partitions allow</b> — consumers in a group cannot exceed the partition count, so if you are already at parity you must add partitions. Note the cost: adding partitions changes key-to-partition mapping and breaks ordering guarantees for existing keys, so it is not a casual change.</li>
          <li><b>Check for a poison message</b> — one message failing and retrying forever blocks its partition entirely. That needs a bounded retry and a dead-letter topic.</li>
          <li><b>Longer term</b> — alert on lag trend and on estimated time-to-drain rather than a raw number, and autoscale consumers on lag with KEDA.</li>
        </ol>
      </Q>

      <Q n={27} q="How do you handle secrets across environments without ever storing one in Git?">
        <ul>
          <li><b>Source of truth</b> — AWS Secrets Manager (or Vault), one path per environment, with rotation enabled where the downstream supports it. RDS credentials rotate natively.</li>
          <li><b>Into the cluster</b> — the External Secrets Operator or the Secrets Store CSI driver syncs them into the pod. The manifest in Git references a secret <i>name</i>; it never contains a value.</li>
          <li><b>Into the pipeline</b> — OIDC federation so the runner assumes a role and fetches what it needs at run time. No secret is stored in the CI system at all.</li>
          <li><b>Terraform</b> — remember that resource attributes land in state in plaintext, so state is encrypted, versioned and tightly access-controlled. Better still, have Terraform create the secret with a generated value and never see it, or reference an out-of-band secret by ARN.</li>
          <li><b>If GitOps forces a value into a repository</b> — SOPS or Sealed Secrets, so what is committed is ciphertext only decryptable inside the cluster.</li>
          <li><b>Detection</b> — a pre-commit hook and a CI scanner (gitleaks or trufflehog) because the control that matters most is catching the mistake, and any secret that ever reached a repository is considered compromised and must be rotated, not just deleted.</li>
        </ul>
      </Q>

      <Q n={28} q="Production is down. Walk me through your first fifteen minutes.">
        <p>
          <b>Restore service first, find the cause second.</b> Those are separate activities and
          conflating them extends outages.
        </p>
        <ol>
          <li><b>Declare and assign.</b> Someone is incident commander, someone communicates to stakeholders, someone investigates. Without roles, five people debug the same thing and nobody updates anyone.</li>
          <li><b>Establish blast radius</b> — what is broken, for whom, since when. The dashboard answers this if the SLIs are right.</li>
          <li><b>Ask what changed.</b> The overwhelming majority of incidents follow a change: a deploy, a config flip, a migration, a certificate expiring, a feature flag, a traffic shift. Check the deploy timeline against the start of the graph.</li>
          <li><b>Mitigate with the fastest lever</b> — roll back the deploy, revert the flag, fail over, scale up, shed load. Rolling back a suspected change is almost always faster than diagnosing it, and you can investigate the artefact afterwards.</li>
          <li><b>Confirm recovery</b> against the same signals that showed the failure, not by assertion.</li>
          <li><b>Afterwards</b> — a blameless postmortem with a timeline, contributing factors and concrete action items with owners and dates. Blameless because the goal is a system that tolerates the mistake, and the moment people fear the review, information stops flowing and you lose the ability to learn at all.</li>
        </ol>
      </Q>

      {/* ────────── SCENARIOS ────────── */}
      <h2>14. Design scenarios — rehearse these out loud</h2>
      <p>
        Architect-track interviews are won in the scenario round. Use the same opening every time:{" "}
        <b>clarify requirements, state assumptions, sketch the happy path, then attack your own
        design with failure modes.</b> Interviewers reward candidates who find the holes themselves.
      </p>

      <Card>
        <h3>Scenario A — Migrate a monolith to microservices on AWS</h3>
        <p><b>Clarify:</b> why are we doing this? If the answer is not a concrete pain — deploy coupling, scaling one component, team autonomy — the correct recommendation may be to modularise the monolith and not split it at all. Say that.</p>
        <p><b>Approach:</b> strangler fig. Put a gateway in front, carve out one bounded context at a time — start with something low-risk and high-value, usually a read-heavy or genuinely independent capability — and route that path to the new service while everything else continues to hit the monolith. Never a big-bang rewrite.</p>
        <p><b>Data is the hard part:</b> a shared database defeats the purpose, so each service needs to own its data eventually. Bridge with change data capture or an outbox during the transition, and accept a period of dual-write with reconciliation.</p>
        <p><b>Attack it yourself:</b> distributed transactions become sagas; a single query becomes N network calls with N failure modes; debugging needs distributed tracing from day one; and organisational readiness matters more than the technology, because microservices owned by one team are just a distributed monolith with worse latency.</p>
      </Card>

      <Card>
        <h3>Scenario B — The nightly Glue job now overruns into business hours</h3>
        <p><b>Clarify:</b> what is the actual deadline, how much data, and has volume grown or has the job changed?</p>
        <p><b>Diagnose:</b> Spark UI for skew — one task taking far longer than the rest means the partition key is unbalanced. Check whether job bookmarks are enabled (a disabled bookmark reprocesses the entire history every night, which is a very common cause of exactly this symptom). Check file sizes: millions of small files in S3 is a listing and task-overhead problem, not a compute problem.</p>
        <p><b>Fix:</b> compact small files, partition the lake by date so queries and jobs prune, convert to Parquet with appropriate column ordering, repartition to address skew, and scale DPUs only after the shape problems are fixed — scaling a skewed job mostly buys idle executors.</p>
        <p><b>Then structurally:</b> move from nightly batch to incremental processing, or to streaming if the business actually needs freshness. Add a job-duration SLO with alerting so the trend is visible before it becomes an incident.</p>
      </Card>

      <Card>
        <h3>Scenario C — Design the deployment platform for forty teams</h3>
        <p><b>The real question is governance at scale, not technology.</b> Forty teams doing forty things is the failure mode.</p>
        <p><b>Answer with a paved road:</b> a service template that ships with the Dockerfile, pipeline, Terraform module, health endpoints, dashboards and alerts already wired. Teams get to production in a day by following it, which is why they follow it.</p>
        <p><b>Encode the non-negotiables as automated gates</b> — admission policies, pipeline checks, policy-as-code on Terraform plans — so standards are verified rather than asserted in a wiki.</p>
        <p><b>Multi-tenancy:</b> namespace per team with quotas, RBAC and NetworkPolicies; separate accounts for production versus non-production; tagging enforced so cost is attributable.</p>
        <p><b>Leave an exit:</b> a documented exception process with an architecture review, because a platform with no escape hatch gets routed around, and shadow infrastructure is worse than a sanctioned exception.</p>
      </Card>

      <Card>
        <h3>Scenario D — An entire Availability Zone goes dark at 10am</h3>
        <p><b>What should happen automatically:</b> the load balancer health checks fail and stop routing there; Kubernetes reschedules the lost pods onto surviving nodes; Aurora promotes a reader in another AZ in under a minute; the autoscaler adds capacity in the remaining zones.</p>
        <p><b>What actually goes wrong, and is the interesting half of the answer:</b> capacity was sized for exactly three zones so losing one means running at 66% and browning out — you need N+1; pods were not spread with topology constraints so one zone held most replicas; stateful pods are bound to zonal EBS volumes and cannot reschedule; connection pools hold dead connections because the application never reconnects after failover; and the remaining zones get a thundering herd of retries that takes them down too, unless retries have backoff, jitter and a circuit breaker.</p>
        <p><b>Afterwards:</b> a postmortem, and a game day that deliberately removes a zone in non-production so the next one is rehearsed rather than discovered.</p>
      </Card>

      <Card>
        <h3>Scenario E — Regulator requires all customer data to stay in India</h3>
        <p><b>Enforce structurally, not procedurally.</b> A Service Control Policy at the AWS Organization level denying every region except <code>ap-south-1</code> (plus the global services that have no regional form) means no engineer in any account can create a resource elsewhere, even with admin rights.</p>
        <p><b>Then prove it:</b> AWS Config rules and Security Hub for continuous compliance evidence; CloudTrail to a locked, Object-Locked bucket so the audit log cannot be altered; tagging that marks data classification so scanning can find what moved.</p>
        <p><b>Then handle the awkward parts honestly:</b> DR within a single country means multiple AZs and possibly a second Indian region rather than a global secondary; some managed services are not available in every region and that constrains the architecture; third-party SaaS and monitoring vendors may process data abroad, which is a contract and data-flow question, not just an infrastructure one; and backups and logs are customer data too, which is the part teams most often miss.</p>
      </Card>

      {/* ────────── BEHAVIOURAL ────────── */}
      <h2>15. Behavioural and STAR stories</h2>
      <p>
        At this level the behavioural round is testing judgment and scope, not enthusiasm. Prepare
        five stories, each in <b>Situation, Task, Action, Result</b> form, with a real number in the
        result. Draw them from what you have actually done.
      </p>
      <table>
        <thead><tr><th>Prompt</th><th>Story to use</th><th>The point to land</th></tr></thead>
        <tbody>
          <tr><td>Tell me about a difficult technical decision</td><td>A design choice on the Go platform where you weighed two approaches</td><td>You considered options and consequences, not just the one you liked</td></tr>
          <tr><td>A time you improved reliability or performance</td><td>A query or endpoint you optimised — with the before and after latency</td><td>You measured first, then changed; you did not guess</td></tr>
          <tr><td>A production incident you handled</td><td>Any real failure you debugged, with the timeline</td><td>Mitigate first, diagnose second, then fix the class of problem</td></tr>
          <tr><td>A time you disagreed with a senior person</td><td>A review or design discussion where you pushed back</td><td>You disagreed with evidence and committed once the decision was made</td></tr>
          <tr><td>Mentoring or raising the bar</td><td>Reviews, pairing, the encryption backfill pattern you spread across modules</td><td>Your impact extended past your own commits</td></tr>
          <tr><td>Something you shipped safely that could have broken things</td><td>The encryption backfill, or a migration on a live table</td><td>Idempotency, staged rollout, verification, a rollback path</td></tr>
        </tbody>
      </table>
      <p className="text-slate-300">
        For the &quot;biggest weakness&quot; question, this JD hands you an honest and strong answer:{" "}
        <b>&quot;Depth of hands-on cloud operations. I have strong software and data fundamentals and
        I have been closing the infrastructure gap deliberately — here is what I built and what I
        learned from it.&quot;</b> Naming the real gap and showing the work against it is far more
        convincing than a rehearsed weakness that is secretly a strength.
      </p>

      {/* ────────── ASK THEM ────────── */}
      <h2>16. Questions to ask them</h2>
      <p>
        These also let you find out which of the two jobs in this JD is the real one, which you need
        to know before an offer.
      </p>
      <ul>
        <li>This requisition reads as both a hands-on DevOps role and an enterprise architecture role. Which is the day-to-day, and is there a separate person doing the other half?</li>
        <li>Where is the Golang in the estate today — platform tooling, product services, or both? How much Go would I be writing in a typical month?</li>
        <li>What is the split between EKS and ECS, and is there a direction of travel?</li>
        <li>What is the current state of Terraform — is everything in code, or is there a legacy footprint that was click-built?</li>
        <li>What are the stated RTO and RPO for the tier-one services, and when was the last failover drill?</li>
        <li>Is there an on-call rotation, what does the page volume look like, and who owns production for these services?</li>
        <li>How are architecture decisions made and recorded — is there an ARB, are there ADRs?</li>
        <li>What does success in this role look like at six months?</li>
        <li>Is this a Virtusa-badged role on a specific banking client, and how long is the engagement?</li>
      </ul>

      {/* ────────── CERTS ────────── */}
      <h2>17. Certifications, in priority order</h2>
      <ol>
        <li><b>AWS Certified Solutions Architect – Associate</b> — explicitly named in the JD, broadest return, and it forces you to learn the service catalogue properly. Four to six weeks of evening study is realistic. Start here.</li>
        <li><b>HashiCorp Terraform Associate</b> — small, cheap, and directly relevant to a named requirement. Two weeks.</li>
        <li><b>CKA (Certified Kubernetes Administrator)</b> — hands-on and practical, and the one that most changes how you actually answer cluster questions. Six to eight weeks.</li>
        <li><b>AWS Solutions Architect – Professional</b> — only after the Associate and real experience; it is a genuinely hard exam and premature attempts waste months.</li>
        <li><b>TOGAF 9/10 Foundation</b> — worth it if you are targeting the architect track long-term and the account values it. Low priority against the others for a hands-on seat.</li>
      </ol>
      <p className="text-slate-400 text-sm">
        A certification never beats a built thing. If you have three weekends, a working
        Terraform-provisioned EKS cluster running your own Go service with a pipeline behind it will
        do more for this interview than a badge, because it gives you specifics to answer with.
      </p>

      {/* ────────── TRAPS ────────── */}
      <h2>18. Traps to avoid</h2>
      <Card className="border-red-800">
        <ul>
          <li><b>Do not claim AWS or Terraform production years you do not have.</b> The follow-up questions are specific — which backend, which failure, what did the plan show — and a bluff collapses in ninety seconds and taints everything true you said before it.</li>
          <li><b>Do not say &quot;I have used Kubernetes&quot; if you mean Docker Compose.</b> Say &quot;I have run containerised services in production and I have been learning Kubernetes hands-on; here is the cluster I built.&quot;</li>
          <li><b>Do not over-engineer the design answers.</b> Proposing multi-region active/active for a service with no stated RTO signals poor judgment, not ambition. Ask for the requirement first.</li>
          <li><b>Do not skip the requirements-clarification step</b> in a scenario question. Jumping straight to a diagram is the most common way senior candidates lose the design round.</li>
          <li><b>Do not present the HR community platform architecture as yours.</b> You contributed to it. &quot;The design is X and here is why I think that is right&quot; is a strong, honest framing that still demonstrates the understanding.</li>
          <li><b>Do not let the Golang round go by in five minutes.</b> It is the reason you are in this pipeline. If they do not go deep, steer there: offer the graceful-shutdown problem or the client-go tool unprompted.</li>
          <li><b>Do not be vague about the experience gap.</b> Name it early, once, with what you are doing about it — then spend the rest of the hour on what you can actually do.</li>
        </ul>
      </Card>

      <Card className="border-emerald-700">
        <h3 className="m-0 text-emerald-400">The one thing to remember</h3>
        <p className="text-emerald-300">
          <b>You are not competing with fifteen-year DevOps architects on their ground. You are the
          candidate who writes production Go, thinks correctly about idempotency and failure, and is
          building the cloud depth deliberately and visibly.</b>
        </p>
        <p>
          That is a real and uncommon profile. Lead with it, be honest about the rest, and let the
          interviewer decide which seat you fit — because the seat you actually fit is one you can
          hold.
        </p>
      </Card>
    </>
  );
}
