"use client";

import { Loader2, ShieldCheck } from "lucide-react";

export default function AuthLoadingSpinner({
  variant = "page",
  label = "Checking authentication",
  sublabel = "Verifying your Firebase session before loading this page...",
  className = "",
}) {
  if (variant === "inline") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label={label}
        className={`inline-flex h-10 items-center gap-2.5 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-[#0B1221] px-4 text-xs font-medium text-muted ${className}`}
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan" aria-hidden="true" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <main
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-16 ${className}`}
    >
      <div className="dotgrid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/10 bg-[#0B1221]/90 px-8 py-10 text-center shadow-2xl backdrop-blur">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span
            className="absolute inset-0 animate-ping rounded-full bg-cyan/15"
            aria-hidden="true"
          />
          <span
            className="absolute inset-0 rounded-full border-2 border-white/10 border-t-cyan border-r-accent animate-spin"
            aria-hidden="true"
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#070C17]">
            <ShieldCheck className="h-5 w-5 text-cyan" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan">
          AUTH CHECK
        </p>
        <h2 className="mt-2 text-lg font-semibold text-white">{label}</h2>
        {sublabel ? (
          <p className="mt-2 text-sm leading-relaxed text-muted">{sublabel}</p>
        ) : null}
        <span className="sr-only">{label}</span>
      </div>
    </main>
  );
}
