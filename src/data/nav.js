import {
  LayoutDashboard, KanbanSquare, CalendarCheck, Mic, PhoneCall, Code2, Network, Users, HandCoins,
  Timer, ListChecks, Library, Layers, Puzzle, Building2, GraduationCap, Boxes, MessagesSquare,
  Route, Cpu, Server, FileCode2, Globe, Flame, Database, Zap, Container, Workflow, Atom, Landmark,
  Binary, TrendingUp,
} from "lucide-react";

// Lessons = the Study Library. Order here is the course order (prev/next navigation).
// `rounds` maps each lesson to the interview rounds it prepares you for.
export const LESSONS = [
  { href: "/modules", label: "My 1Finance Modules", icon: Boxes, track: "Your work", rounds: ["Technical", "Hiring manager"], blurb: "The modules you own end to end, with likely probes." },
  { href: "/hr-community", label: "HR Community Platform", icon: MessagesSquare, track: "Your work", rounds: ["System design", "Hiring manager"], blurb: "Ledger, outbox and saga — explained as a contributor." },
  { href: "/golang", label: "Golang & GoFiber", icon: Cpu, track: "Backend", rounds: ["Technical"], blurb: "Concurrency, errors, interfaces and Fiber patterns." },
  { href: "/nodejs", label: "Node.js & NestJS", icon: Server, track: "Backend", rounds: ["Technical"], blurb: "Event loop, streams, NestJS modules and DI." },
  { href: "/php", label: "PHP Core", icon: FileCode2, track: "Backend", rounds: ["Technical"], blurb: "Language fundamentals and modern PHP." },
  { href: "/laravel", label: "Laravel", icon: Flame, track: "Backend", rounds: ["Technical"], blurb: "Eloquent, queues, middleware and testing." },
  { href: "/wordpress", label: "WordPress", icon: Globe, track: "Backend", rounds: ["Technical"], blurb: "Hooks, REST routes, plugins and performance." },
  { href: "/postgresql", label: "PostgreSQL & SQL", icon: Database, track: "Data", rounds: ["Technical", "System design"], blurb: "Indexes, plans, transactions and isolation." },
  { href: "/redis", label: "Redis & Caching", icon: Zap, track: "Data", rounds: ["Technical", "System design"], blurb: "Cache patterns, eviction and stampedes." },
  { href: "/docker", label: "Docker & DevOps", icon: Container, track: "Platform", rounds: ["Technical"], blurb: "Images, networking, compose and CI/CD." },
  { href: "/microservices", label: "Microservices & APIs", icon: Workflow, track: "Platform", rounds: ["System design"], blurb: "REST design, auth, messaging and resilience." },
  { href: "/nextjs", label: "Next.js & React", icon: Atom, track: "Frontend", rounds: ["Technical"], blurb: "Rendering modes, hooks and performance." },
  { href: "/sysdesign", label: "System Design", icon: Network, track: "Design", rounds: ["System design"], blurb: "A repeatable framework for the design round." },
  { href: "/fintech", label: "Fintech Domain", icon: Landmark, track: "Design", rounds: ["System design", "Hiring manager"], blurb: "Money handling, compliance and ledgers." },
  { href: "/dsa", label: "DSA Refresher", icon: Binary, track: "Foundations", rounds: ["Technical"], blurb: "Patterns that unlock most coding problems." },
  { href: "/roadmap", label: "Study Roadmap", icon: Route, track: "Foundations", rounds: [], blurb: "A 14-day path through the material." },
  { href: "/improvement", label: "Improvement Plan", icon: TrendingUp, track: "Foundations", rounds: [], blurb: "Resources, habits and long-term growth." },
];

export const LESSON_TRACKS = ["Your work", "Backend", "Data", "Platform", "Frontend", "Design", "Foundations"];

export const NAV = [
  { group: "Game Plan", items: [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
    { href: "/interview-day", label: "Interview Day", icon: CalendarCheck },
    { href: "/intro", label: "Self-Introduction", icon: Mic },
  ]},
  { group: "By Round", items: [
    { href: "/recruiter-screen", label: "Recruiter Screen", icon: PhoneCall, step: 1 },
    { href: "/technical-round", label: "Technical", icon: Code2, step: 2 },
    { href: "/sysdesign", label: "System Design", icon: Network, step: 3 },
    { href: "/behavioral", label: "Hiring Manager & STAR", icon: Users, step: 4 },
    { href: "/offer", label: "Offer & Negotiation", icon: HandCoins, step: 5 },
  ]},
  { group: "Practice", items: [
    { href: "/mock", label: "Mock Interview", icon: Timer },
    { href: "/quiz", label: "Skill Tests", icon: ListChecks },
    { href: "/qbank", label: "Question Bank", icon: Layers },
    { href: "/leetcode", label: "LeetCode", icon: Puzzle },
  ]},
  { group: "Companies", items: [
    { href: "/organizations/golang-react-fullstack-thane", label: "Go + React (Thane)", icon: Building2 },
    { href: "/organizations/emerger-tech-golang", label: "Emerger Tech", icon: Building2 },
    { href: "/organizations/icici-lombard", label: "ICICI Lombard", icon: Building2 },
    { href: "/organizations/virtusa-devops-golang", label: "Virtusa", icon: Building2 },
    { href: "/organizations/custom-software-engineer", label: "Custom Software Eng.", icon: Building2 },
    { href: "/organizations/software-engineer-pm", label: "SE + PM (Fintech)", icon: Building2 },
  ]},
  { group: "Learn", collapsible: true, items: [
    { href: "/learn", label: "All lessons", icon: GraduationCap },
    ...LESSONS.map(({ href, label, icon }) => ({ href, label, icon, lesson: true })),
  ]},
];

export const ALL_PAGES = NAV.flatMap((g) => g.items.map((it) => ({ ...it, group: g.group })))
  // sysdesign appears under both "By Round" and "Learn"; keep the first.
  .filter((it, i, arr) => arr.findIndex((x) => x.href === it.href) === i);

export const pageFor = (pathname) => ALL_PAGES.find((p) => p.href === pathname);
export const lessonIndex = (pathname) => LESSONS.findIndex((l) => l.href === pathname);

// Pages that are apps, not documents: no table of contents or reading progress.
export const APP_PAGES = new Set(["/", "/learn", "/qbank", "/quiz", "/mock", "/pipeline", "/leetcode"]);

// Mobile bottom tabs.
export const MOBILE_TABS = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: Library },
  { href: "/qbank", label: "Practice", icon: Layers },
  { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
];
