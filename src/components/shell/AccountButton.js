"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cloud, CloudOff, LogIn } from "lucide-react";
import { onSession } from "@/components/CloudSync";

const STATUS_LABEL = { live: "Synced", connecting: "Connecting…", error: "Sync paused" };

// Top-bar entry point: "Sign in" when signed out, sync status + link to /account when signed in.
export default function AccountButton() {
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => onSession(setSession), []);

  if (session === undefined) return null;
  if (!session?.userId) {
    return (
      <Link href="/auth/sign-in" className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-muted no-underline hover:bg-panel2 hover:text-fg hover:no-underline">
        <LogIn size={16} /> <span className="hidden sm:inline">Sign in to sync</span>
      </Link>
    );
  }
  const ok = session.status !== "error";
  const Icon = ok ? Cloud : CloudOff;
  return (
    <Link
      href="/account"
      title={`${session.email || "Account"} · ${STATUS_LABEL[session.status] || "Connecting…"}`}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-muted no-underline hover:bg-panel2 hover:text-fg hover:no-underline"
    >
      <Icon size={16} className={ok ? (session.status === "live" ? "text-good" : "text-subtle") : "text-bad"} />
      <span className="hidden max-w-40 truncate sm:inline">{session.email || "Account"}</span>
    </Link>
  );
}
