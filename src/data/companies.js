// Recruiter-style brief for each target role. The full deep-dive stays on each company page;
// this is the 60-second view you read before a call.
// fit: "strong" = inside your lane; "stretch" = credible with prep; "reach" = gap is real, position carefully.

export const COMPANIES = [
  {
    slug: "golang-react-fullstack-thane",
    company: "BFSI product team (Thane)",
    role: "GoLang & React Full Stack Developer",
    meta: "On-site, Thane (Mumbai) · 3+ yrs · Go, React, TypeScript, REST, SQL",
    fit: "strong",
    pitch: "The closest match to your real profile: production Go APIs plus the React screens that consume them, in fintech. Lead with owning features end to end (table → API → UI) and the ~40% latency win.",
    risks: [
      "Over-qualified for a 3+ yrs band. Get the salary range in the first call.",
      "React fundamentals named explicitly (lifecycle, Context, hooks): re-renders, effect cleanup, stale closures.",
      "TypeScript and Go concurrency depth: both mandatory, both likely live-coded.",
    ],
    screenQs: [
      "You have six years. Why a 3+ years role?",
      "Are you fine working on-site in Thane five days a week?",
      "What is the split between your Go and React work today?",
    ],
    askThem: [
      "What is the Go vs React split in a typical sprint?",
      "Which Go framework and state-management library do you use?",
      "Who owns deployments and on-call: developers or DevOps?",
    ],
  },
  {
    slug: "emerger-tech-golang",
    company: "Emerger Tech",
    role: "Golang Developer",
    meta: "Via TalentCafe · Hybrid, Chennai · 6+ yrs (4+ Go preferred)",
    fit: "strong",
    pitch: "A mainstream Go backend seat. Lead with 3.5 years of production Go on a fintech platform, the ~40% latency win and the async notification pipeline.",
    risks: [
      "Go years: you have ~3.5 against '4+ preferred'. Say 3.5 before they work it out. Never stretch it.",
      "DSA round: a must-have with no evidence of practice. This is your biggest exposure.",
      "Concurrency depth beyond one story: worker pools, cancellation, leaks, races.",
    ],
    screenQs: [
      "How many years of hands-on Go do you have?",
      "Are you open to hybrid in Chennai, and what's your notice period?",
      "Have you worked with Kubernetes or gRPC?",
    ],
    askThem: [
      "What does the Go codebase look like today — how many services, and is it stdlib net/http or a framework?",
      "What would a strong first 90 days look like in this seat?",
      "Who is the end client, and how long is the engagement?",
    ],
  },
  {
    slug: "virtusa-devops-golang",
    company: "Virtusa",
    role: "DevOps Engineer (Golang)",
    meta: "Banking client · 15+ yrs stated · AWS, EKS, Terraform, Kafka",
    fit: "reach",
    pitch: "Don't position as a 15-year DevOps architect. Position as a Go platform engineer moving into infrastructure: the tools that run a cluster are written in Go, and you can read and patch them.",
    risks: [
      "No production AWS, Terraform or EKS ownership. Infra interviews ask for specifics, so a bluff collapses quickly.",
      "The '15+ years' requirement. Name the gap once, early, then move on to what you can do.",
      "The JD fuses two roles (hands-on DevOps and enterprise architect). Find out which one is real.",
    ],
    screenQs: [
      "You have about six years. The JD asks for 15+. Why should we move you forward?",
      "What's your hands-on AWS experience?",
      "Would you consider a Go microservices seat on the same account instead?",
    ],
    askThem: [
      "Is this day-to-day hands-on DevOps or architecture, and is someone else doing the other half?",
      "How much Go would I write in a typical month?",
      "What are the RTO/RPO targets for tier-one services, and when was the last failover drill?",
    ],
  },
  {
    slug: "icici-lombard",
    company: "ICICI Lombard",
    role: "Senior Backend Engineer (Golang)",
    meta: "Motor division · 5+ yrs · Go, PHP/Laravel, React, MySQL",
    fit: "strong",
    pitch: "The stack is unusually close to yours: Go plus PHP/Laravel plus React. You've shipped in all three, and you've protected PII in a regulated domain (encryption backfills, RBAC by data sensitivity).",
    risks: [
      "MySQL specifics: your depth is in Postgres. Know the differences in isolation levels, indexing and replication.",
      "TDD is named in the JD. Have real Go test examples (table-driven tests, interface mocks) ready.",
      "Insurance domain vocabulary: policy, claim, premium, IDV, endorsement.",
    ],
    screenQs: [
      "Why insurance, and why ICICI Lombard?",
      "Are you comfortable working on PHP/Laravel legacy alongside Go?",
      "What's your current CTC and notice period?",
    ],
    askThem: [
      "What does the 'revamped Blaze' integration look like — what's being replaced, and on what timeline?",
      "How is the Go/PHP split decided for new work?",
      "How are releases and incidents handled in the motor division?",
    ],
  },
  {
    slug: "custom-software-engineer",
    company: "Tax Technology (Custom SE)",
    role: "Custom Software Engineer — Go & Cloud Native",
    meta: "8+ yrs (3+ cloud native) · Go, K8s, Terraform, Pulsar/SQS",
    fit: "stretch",
    pitch: "Go plus event-driven fundamentals (outbox, idempotent consumers) are your strongest overlap. Present Kubernetes and Terraform as actively learning, never as production experience.",
    risks: [
      "The 8+ years requirement. Lean on the depth of the system you can explain rather than the number.",
      "Cloud-native production experience (K8s, Helm, Terraform) is thin.",
      "Test automation with Cypress or Selenium.",
    ],
    screenQs: [
      "Do you have cloud-native production experience?",
      "Have you mentored engineers or led a migration?",
    ],
    askThem: [
      "Which cloud, and how mature is the IaC today?",
      "What does 'tax technology' cover here — calculation engines, filings, or integrations?",
      "How is the team split between product engineering and platform?",
    ],
  },
  {
    slug: "software-engineer-pm",
    company: "Capital Markets Fintech",
    role: "Software Engineer + Technical PM",
    meta: "Lower Parel, Mumbai · first in-house engineer · Next.js, NestJS, Supabase",
    fit: "stretch",
    pitch: "The stack fits (Next.js, NestJS, Postgres, fintech). The stretch is the PM half: owning the agency, scoping work with the founder, and shipping fast with AI tools every day.",
    risks: [
      "No formal PM or vendor-management experience. Bring examples of turning a stakeholder ask into a spec.",
      "AI-assisted shipping speed is non-negotiable. Have a concrete Claude Code workflow story ready.",
      "Being the first engineer in a startup means ambiguity and solo ownership. Show you are comfortable with both.",
    ],
    screenQs: [
      "How do you use AI coding tools day to day?",
      "Have you managed an external agency or vendor?",
      "Why move from a large platform to a first-engineer seat?",
    ],
    askThem: [
      "What's the split between building and managing the agency in month one versus month six?",
      "Who owns the architecture decisions today, the agency or the founder?",
      "What would make you say this hire was a success in six months?",
    ],
  },
];

export const FIT_LABEL = {
  strong: { text: "Strong fit", color: "green" },
  stretch: { text: "Stretch", color: "amber" },
  reach: { text: "Reach — position carefully", color: "red" },
};

export const companyBySlug = (slug) => COMPANIES.find((c) => c.slug === slug);
