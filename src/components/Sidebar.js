"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { group: "Start Here", items: [
    { href: "/", label: "Dashboard" },
    { href: "/intro", label: "Self-Introduction" },
    { href: "/modules", label: "My 1Finance Modules" },
    { href: "/roadmap", label: "Study Roadmap" },
  ]},
  { group: "Reading Materials", items: [
    { href: "/golang", label: "Golang & GoFiber" },
    { href: "/nodejs", label: "Node.js & NestJS" },
    { href: "/php", label: "PHP Core" },
    { href: "/wordpress", label: "WordPress" },
    { href: "/laravel", label: "Laravel" },
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
  { group: "Organizations", items: [
    { href: "/organizations/icici-lombard", label: "ICICI Lombard (Sr. Backend)" },
    { href: "/organizations/custom-software-engineer", label: "Custom Software Engineer" },
    { href: "/organizations/software-engineer-pm", label: "Software Engineer + PM (Fintech)" },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="md:hidden bg-panel2 border-t border-border p-4 flex justify-between items-center fixed bottom-0 left-0 right-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="font-bold text-lg text-accent truncate pr-4">Interview Prep Hub</div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-200 focus:outline-none shrink-0 bg-slate-800 p-2 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 bg-panel2 border-r border-border p-4 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"} md:flex md:flex-col md:sticky md:top-0 md:h-screen`}
        style={{ width: 280, minWidth: 280 }}
      >
        <div className="flex justify-between items-start mb-4 md:block">
          <div>
            <div className="font-bold text-lg text-accent mb-1 hidden md:block">Interview Prep Hub</div>
            <div className="text-xs text-slate-400">Full-Stack Engineer (Go + Next.js)</div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f172a] border border-border rounded-md text-sm text-slate-200 mb-3 focus:outline-none focus:border-accent"
        />
        <div className="flex-1 overflow-y-auto">
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
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${active ? "bg-gradient-to-r from-cyan-700 to-violet-700 text-white font-semibold" : "text-slate-200 hover:bg-slate-700"}`}
                    >
                      {it.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
