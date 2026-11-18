"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronsLeft, ChevronsRight, GraduationCap, Search, X } from "lucide-react";
import { NAV } from "@/data/nav";
import { KEYS, readJSON, useStoredValue, writeJSON } from "@/lib/storage";
import { OPEN_NAV, openPalette } from "@/components/shell/events";

function NavItem({ item, active, done, collapsed, onNavigate }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      aria-current={active ? "page" : undefined}
      className={`group relative mb-0.5 flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm no-underline transition-colors hover:no-underline ${
        active ? "bg-accent/10 text-fg font-semibold" : "text-muted hover:bg-panel hover:text-fg"
      } ${collapsed ? "justify-center" : ""}`}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-accent" aria-hidden="true" />}
      {item.step ? (
        <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${active ? "border-accent text-accent" : "border-border text-subtle"}`}>
          {item.step}
        </span>
      ) : (
        <Icon size={18} className={`shrink-0 ${active ? "text-accent" : ""}`} />
      )}
      {!collapsed && <span className="truncate flex-1">{item.label}</span>}
      {!collapsed && done && <CheckCircle2 size={15} className="shrink-0 text-good" aria-label="Completed" />}
    </Link>
  );
}

function NavGroups({ pathname, collapsed, onNavigate }) {
  const lessonsDone = useStoredValue(KEYS.lessonsDone, []);
  const [learnOpen, setLearnOpen] = useState(false);

  return NAV.map((g) => {
    const containsActive = g.items.some((it) => it.href === pathname);
    const expanded = !g.collapsible || learnOpen || containsActive || collapsed;
    const doneCount = g.items.filter((it) => it.lesson && lessonsDone.includes(it.href)).length;
    const lessonCount = g.items.filter((it) => it.lesson).length;

    return (
      <div key={g.group} className="mb-2">
        {collapsed ? (
          <div className="mx-auto my-2 h-px w-6 bg-border" aria-hidden="true" />
        ) : g.collapsible ? (
          <button
            type="button"
            onClick={() => setLearnOpen((o) => !o)}
            aria-expanded={expanded}
            className="mt-3 mb-1 flex w-full items-center justify-between px-2.5 text-[11px] font-semibold uppercase tracking-wider text-subtle hover:text-fg"
          >
            <span>{g.group} · {doneCount}/{lessonCount}</span>
            <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        ) : (
          <div className="mt-3 mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-subtle">{g.group}</div>
        )}
        {expanded && g.items.map((it) => (
          <NavItem
            key={it.href + g.group}
            item={it}
            active={pathname === it.href}
            done={it.lesson && lessonsDone.includes(it.href)}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    );
  });
}

function Brand({ collapsed }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline hover:no-underline">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-card">
        <GraduationCap size={20} />
      </span>
      {!collapsed && (
        <span className="leading-tight">
          <span className="block font-bold text-fg">PrepHub</span>
          <span className="block text-[11px] text-subtle">Learn · Practise · Get hired</span>
        </span>
      )}
    </Link>
  );
}

function SearchButton({ collapsed }) {
  return (
    <button
      type="button"
      onClick={openPalette}
      title="Search (⌘K)"
      className={`mt-4 mb-2 flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-panel px-2.5 text-sm text-subtle hover:border-accent/50 hover:text-fg ${collapsed ? "justify-center" : ""}`}
    >
      <Search size={16} />
      {!collapsed && <span className="flex-1 text-left">Search…</span>}
      {!collapsed && <kbd className="rounded border border-border px-1.5 text-[10px]">⌘K</kbd>}
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(readJSON(KEYS.sidebarCollapsed, false) === true);
    const open = () => setMobileOpen(true);
    window.addEventListener(OPEN_NAV, open);
    return () => window.removeEventListener(OPEN_NAV, open);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      writeJSON(KEYS.sidebarCollapsed, !c);
      return !c;
    });
  };

  return (
    <>
      {/* Desktop */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-panel2 transition-[width] duration-200 md:flex ${collapsed ? "w-[72px] px-3" : "w-[264px] px-4"}`}
      >
        <div className="pt-5"><Brand collapsed={collapsed} /></div>
        <SearchButton collapsed={collapsed} />
        <nav className="no-scrollbar -mx-1 flex-1 overflow-y-auto px-1 pb-4" aria-label="Main">
          <NavGroups pathname={pathname} collapsed={collapsed} />
        </nav>
        <button
          type="button"
          onClick={toggleCollapsed}
          className={`mb-3 flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-subtle hover:bg-panel hover:text-fg ${collapsed ? "justify-center" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight size={18} /> : <><ChevronsLeft size={18} /> Collapse</>}
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[84vw] max-w-[300px] animate-fade-in flex-col border-r border-border bg-panel2 px-4 pt-5">
            <div className="flex items-center justify-between">
              <Brand collapsed={false} />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation" className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-panel">
                <X size={18} />
              </button>
            </div>
            <SearchButton collapsed={false} />
            <nav className="flex-1 overflow-y-auto pb-6" aria-label="Main">
              <NavGroups pathname={pathname} collapsed={false} onNavigate={() => setMobileOpen(false)} />
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
