"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { leaveSession } from "@/components/CloudSync";
import { buttonClass } from "@/components/ui";

const INPUT = "h-10 w-full rounded-lg border border-border bg-panel px-3 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none";

export default function AuthForm({ mode, action }) {
  const [state, formAction, pending] = useActionState(action, null);
  const signUp = mode === "sign-up";
  useEffect(() => {
    if (state?.ok) leaveSession("/account");
  }, [state]);
  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="text-2xl font-bold text-fg">{signUp ? "Create your account" : "Sign in"}</h1>
      <p className="mt-1 text-sm text-muted">Sync your prep progress across devices. The app keeps working without an account.</p>
      <form action={formAction} className="mt-6 flex flex-col gap-4">
        {signUp && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
            Name
            <input name="name" type="text" autoComplete="name" className={INPUT} />
          </label>
        )}
        <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
          Email
          <input name="email" type="email" required autoComplete="email" className={INPUT} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
          Password
          <input name="password" type="password" required minLength={8} autoComplete={signUp ? "new-password" : "current-password"} className={INPUT} />
        </label>
        {state?.error && <p role="alert" className="rounded-lg border border-bad/40 bg-bad/10 px-3 py-2 text-sm text-bad">{state.error}</p>}
        <button type="submit" disabled={pending} className={buttonClass()}>
          {pending || state?.ok ? "Please wait…" : signUp ? "Create account" : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted">
        {signUp ? "Already have an account? " : "New here? "}
        <Link href={signUp ? "/auth/sign-in" : "/auth/sign-up"}>{signUp ? "Sign in" : "Create an account"}</Link>
      </p>
    </div>
  );
}
