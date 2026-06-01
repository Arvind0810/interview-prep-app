"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { group: "Start Here", items: [
    { href: "/", label: "Dashboard" },
    { href: "/intro", label: "Self-Introduction" },
    { href: "/modules", label: "My OneHub Modules" },
    { href: "/roadmap", label: "Study Roadmap" },
  ]},
  { group: "Reading Materials", items: [
    { href: "/golang", label: "Golang & GoFiber" },
    { href: "/nodejs", label: "Node.js & NestJS" },
    { href: "/postgresql", label: "PostgreSQL & SQL" },
    { href: "/redis", label: "Redis & Caching" },
    { href: "/docker", label: "Docker & DevOps" },
    { href: "/microservices", label: "Microservices & APIs" },
    { href: "/nextjs", label: "Next.js & React" },
    { href: "/sysdesign", label: "System Design" },
    { href: "/fintech", label: "Fintech Domain" },
    { href: "/dsa", label: "DSA Refresher" },
  ]},
  { group: "Practice", items: [
    { href: "/qbank", label: "Question Bank (150+)" },
    { href: "/quiz", label: "Skill Test (Quizzes)" },
    { href: "/behavioral", label: "Behavioral & STAR" },
    { href: "/improvement", label: "Improvement Plan" },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  return (
    <aside className="bg-panel2 border-r border-border p-4 sticky top-0 h-screen overflow-y-auto" style={{ width: 280, minWidth: 280 }}>
      <div className="font-bold text-lg text-accent mb-1">Interview Prep Hub</div>
      <div className="text-xs text-slate-400 mb-4">Full-Stack Engineer (Go + Next.js)</div>
      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 bg-panel2 border border-border rounded-md text-sm text-slate-200 mb-3 focus:outline-none focus:border-accent"
      />
      {NAV.map((g) => (
        <div key={g.group}>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-3 mb-1 px-2">{g.group}</div>
          {g.items
            .filter((it) => it.label.toLowerCase().includes(search.toLowerCase()))
            .map((it) => {
              const active = pathname === it.href;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`block px-3 py-2 rounded-md text-sm mb-0.5 ${active ? "bg-gradient-to-r from-cyan-700 to-violet-700 text-white font-semibold" : "text-slate-200 hover:bg-slate-700"}`}
                >
                  {it.label}
                </Link>
              );
            })}
        </div>
      ))}
    </aside>
  );
}
