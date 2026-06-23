"use client";

import { useActionState } from "react";
import { login } from "@/lib/auth-actions";
import { FaLock, FaLockOpen } from "react-icons/fa";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Terminal prompt */}
        <p className="mb-6 font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> sudo access
        </p>

        <form action={formAction} className="space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 font-mono text-sm focus-within:border-foreground/30">
            <span className="text-primary">{">"}</span>
            <input
              type="password"
              name="password"
              autoFocus
              autoComplete="current-password"
              placeholder="enter password"
              className="h-11 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
            />
            <span className="cursor-blink text-primary">_</span>
          </div>

          {state?.error && (
            <p className="font-mono text-xs text-destructive">
              {"// "}
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="h-11 w-full rounded-lg bg-primary font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "authenticating…" : "authenticate"}
          </button>
        </form>
      </div>
    </main>
  );
}
