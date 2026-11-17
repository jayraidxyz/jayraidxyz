"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Loader2,
  LogOut,
  UserCircle2,
} from "lucide-react";
import { useFirebase } from "@/components/FirebaseProvider";
import AuthLoadingSpinner from "@/components/AuthLoadingSpinner";

export default function AccountStatus() {
  const {
    user,
    authReady,
    authError,
    signingIn,
    signInWithGoogle,
    signOutUser,
    progressMap,
  } = useFirebase();

  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setImgError(false);
  }, [user?.photoURL]);

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

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Reader";
  const initials = displayName.trim().slice(0, 1).toUpperCase();

  return (
    <div ref={containerRef} className="relative flex flex-wrap items-center justify-end gap-2.5">
      {!authReady ? (
        <AuthLoadingSpinner variant="inline" label="Checking session..." />
      ) : !user ? (
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            disabled={signingIn}
            onClick={signInWithGoogle}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-[#0B1221] px-4 text-xs font-medium text-white transition hover:border-cyan/60 hover:text-cyan disabled:cursor-not-allowed disabled:opacity-70"
          >
            {signingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-cyan" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <UserCircle2 className="h-4 w-4 text-cyan" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
          {authError ? <p className="text-[11px] text-[#ff8caf]">{authError}</p> : null}
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="inline-flex h-10 items-center gap-2.5 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-[#0B1221] pl-1.5 pr-3.5 text-xs font-medium text-white transition hover:border-cyan/60"
          >
            {user.photoURL && !imgError ? (
              <img
                src={user.photoURL}
                alt={displayName}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-7 w-7 rounded-full object-cover ring-1 ring-cyan/40"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/30 font-mono text-xs font-bold text-cyan ring-1 ring-cyan/40">
                {initials}
              </span>
            )}
            <span className="max-w-[140px] truncate">{displayName}</span>
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
              <div className="flex items-center gap-3 border-b border-white/10 pb-3.5">
                {user.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-cyan/40"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/30 font-mono text-sm font-bold text-cyan ring-1 ring-cyan/40">
                    {initials}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
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

              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    signOutUser();
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-muted transition hover:border-white/25 hover:text-white"
                >
                  <span>Sign out</span>
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
