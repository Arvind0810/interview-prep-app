"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { MOBILE_TABS } from "@/data/nav";
import { openNav } from "@/components/shell/events";

const tabCls = (active) =>
  `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium no-underline hover:no-underline ${active ? "text-accent" : "text-subtle"}`;

export default function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-panel2/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {MOBILE_TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={tabCls(active)} aria-current={active ? "page" : undefined}>
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
      <button type="button" onClick={openNav} className={tabCls(false)}>
        <MoreHorizontal size={20} />
        More
      </button>
    </nav>
  );
}
