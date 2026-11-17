"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { useAccess } from "@/components/AccessProvider";
import AuthLoadingSpinner from "@/components/AuthLoadingSpinner";

export default function FollowGate({ children }) {
  const { ready, followed, unlockFollow } = useAccess();
  const [followInitiated, setFollowInitiated] = useState(false);

  useEffect(() => {
    if (!followInitiated || followed) return;

    let timerId = null;

    const handleReturn = () => {
      if (document.visibilityState === "hidden") return;
      clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        unlockFollow();
      }, 450);
    };

    window.addEventListener("focus", handleReturn);
    document.addEventListener("visibilitychange", handleReturn);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("focus", handleReturn);
      document.removeEventListener("visibilitychange", handleReturn);
    };
  }, [followInitiated, followed, unlockFollow]);

  if (!ready) {
    return (
      <AuthLoadingSpinner
        label="Checking access"
        sublabel="Verifying follow status before loading resources..."
      />
    );
  }

  if (!followed) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-16">
        <div className="dotgrid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
          aria-hidden="true"
        />

        <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B1221]/90 p-8 shadow-2xl backdrop-blur sm:p-10">
          <Link href="/" className="text-sm text-muted transition hover:text-white">
            ← Back home
          </Link>

          <p className="mt-6 font-mono text-xs font-bold tracking-[0.18em] text-cyan">
            FOLLOW TO ACCESS
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Follow @{site.handle} on X to view resources
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            No sign-up needed. Click follow on X below, then come right back here to unlock every explainer, carousel, tool, and the 63-page lecture notes PDF.
          </p>

          <div className="mt-7 space-y-3">
            <a
              href={site.xFollowHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setFollowInitiated(true)}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#6470ff]"
            >
              <span>Follow @{site.handle} on X</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            {followInitiated ? (
              <button
                type="button"
                onClick={unlockFollow}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan/50 bg-cyan/10 px-7 py-3 text-sm font-medium text-cyan transition hover:bg-cyan/15"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>I&apos;ve followed on X — Unlock resources</span>
              </button>
            ) : (
              <p className="pt-1 text-center text-xs text-muted">
                Opens X in a new tab. Once you follow, return here and the page unlocks automatically.
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted">
            <span>Testnet-first · Free library</span>
            <a
              href={`https://x.com/${site.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan hover:underline"
            >
              <span>View @{site.handle}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
