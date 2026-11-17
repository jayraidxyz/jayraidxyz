"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Lock,
} from "lucide-react";
import { site } from "@/data/site";
import { useAccess } from "@/components/AccessProvider";
import AuthLoadingSpinner from "@/components/AuthLoadingSpinner";

export default function AccountStatus() {
  const { ready, followed, progressMap, unlockFollow, resetFollow } = useAccess();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const savedCount = Object.values(progressMap).filter((p) => p.bookmarked).length;
  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;

  return (
    <div ref={containerRef} className="relative flex flex-wrap items-center justify-end gap-2.5">
      {!ready ? (
        <AuthLoadingSpinner variant="inline" label="Checking access..." />
      ) : !followed ? (
        <a
          href={site.xFollowHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={unlockFollow}
          className="inline-flex h-10 items-center gap-2 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-[#0B1221] px-4 text-xs font-medium text-white transition hover:border-cyan/60 hover:text-cyan"
        >
          <span>Follow @{site.handle} on X</span>
          <ExternalLink className="h-3.5 w-3.5 text-cyan" />
        </a>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="inline-flex h-10 items-center gap-2.5 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-[#0B1221] pl-2.5 pr-3.5 text-xs font-medium text-white transition hover:border-cyan/60"
          >
            <CheckCircle2 className="h-4 w-4 text-cyan" aria-hidden="true" />
            <span>@{site.handle}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen ? (
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-white/15 bg-[#0B1221] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan">
                    ACCESS UNLOCKED
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-white">
                    Following @{site.handle} on X
                  </p>
                </div>
                <a
                  href={`https://x.com/${site.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open @${site.handle} on X`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan transition hover:border-cyan/50"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 border-b border-white/10 py-3">
                <div className="rounded-xl border border-white/10 bg-[#070C17] px-3 py-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <Bookmark className="h-3 w-3 text-cyan" />
                    <span>Saved</span>
                  </div>
                  <p className="mt-1 font-mono text-sm font-bold tabular-nums text-white">
                    {savedCount}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#070C17] px-3 py-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <CheckCircle2 className="h-3 w-3 text-cyan" />
                    <span>Completed</span>
                  </div>
                  <p className="mt-1 font-mono text-sm font-bold tabular-nums text-white">
                    {completedCount}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <a
                  href={site.xFollowHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-white transition hover:border-cyan/50 hover:text-cyan"
                >
                  <span>Visit @{site.handle} on X</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    resetFollow();
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-muted transition hover:border-white/25 hover:text-white"
                >
                  <span>Lock resources</span>
                  <Lock className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
