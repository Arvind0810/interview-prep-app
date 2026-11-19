"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Search } from "lucide-react";
import { pageFor } from "@/data/nav";
import ThemeToggle from "@/components/shell/ThemeToggle";
import AccountButton from "@/components/shell/AccountButton";
import { openNav, openPalette } from "@/components/shell/events";

function Breadcrumb({ pathname }) {
  const page = pageFor(pathname);
  if (pathname === "/") return <span className="font-semibold text-fg">Dashboard</span>;
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
      <Link href="/" className="text-subtle hover:text-fg no-underline hover:no-underline">Home</Link>
      {page && (
        <>
          <ChevronRight size={14} className="shrink-0 text-subtle" />
          <span className="hidden text-subtle sm:inline">{page.group}</span>
          <ChevronRight size={14} className="hidden shrink-0 text-subtle sm:inline" />
          <span className="truncate font-semibold text-fg">{page.label}</span>
        </>
      )}
    </nav>
  );
}

export default function TopBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-bg/80 px-4 backdrop-blur-md md:px-8">
      <button type="button" onClick={openNav} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-panel2 md:hidden" aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <div className="min-w-0 flex-1"><Breadcrumb pathname={pathname} /></div>
      <button
        type="button"
        onClick={openPalette}
        className="hidden h-9 w-60 items-center whitespace-nowrap gap-2 rounded-lg border border-border bg-panel px-3 text-sm text-subtle hover:border-accent/50 hover:text-fg lg:flex"
      >
        <Search size={16} />
        <span className="flex-1 truncate text-left">Search…</span>
        <kbd className="rounded border border-border px-1.5 text-[10px]">⌘K</kbd>
      </button>
      <button type="button" onClick={openPalette} aria-label="Search" className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-panel2 hover:text-fg lg:hidden">
        <Search size={18} />
      </button>
      <AccountButton />
      <ThemeToggle />
    </header>
  );
}
