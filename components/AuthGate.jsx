"use client";

import Link from "next/link";
import { Loader2, UserCircle2 } from "lucide-react";
import { useFirebase } from "@/components/FirebaseProvider";
import AuthLoadingSpinner from "@/components/AuthLoadingSpinner";

export default function AuthGate({ children }) {
  const { user, authReady, authError, signingIn, signInWithGoogle } = useFirebase();

  if (!authReady) {
    return (
      <AuthLoadingSpinner
        label="Checking your session"
        sublabel="Verifying Firebase authentication status before loading resources..."
      />
    );
  }

  if (!user) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-16">
        <div className="dotgrid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />

        <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B1221]/90 p-8 shadow-2xl backdrop-blur sm:p-10">
          <Link href="/" className="text-sm text-muted transition hover:text-white">
            ← Back home
          </Link>

          <p className="mt-6 font-mono text-xs font-bold tracking-[0.18em] text-cyan">
            MEMBERS AREA
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Sign in with Google to access resources
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Sign up or sign in with your Google account to unlock every explainer, carousel, tool, and the 63-page lecture notes PDF—and sync your bookmarks and study notes across devices.
          </p>

          {authError ? (
            <p role="alert" className="mt-6 rounded-xl border border-[#ff8caf]/30 bg-[#ff8caf]/10 p-4 text-sm text-[#ffb3c8]">
              {authError}
            </p>
          ) : null}

          <button
            type="button"
            disabled={signingIn}
            onClick={signInWithGoogle}
            className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#6470ff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {signingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <UserCircle2 className="h-4 w-4" />
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
