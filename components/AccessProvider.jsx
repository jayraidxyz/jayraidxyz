"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";

const AccessContext = createContext(null);

const FOLLOW_STORAGE_KEY = "jayraid_x_followed";
const PROGRESS_STORAGE_KEY = "jayraid_post_progress";
const FOLLOW_COOKIE_NAME = "jayraid_x_followed";

function readCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function writeFollowCookie(value) {
  if (typeof document === "undefined") return;
  if (value) {
    document.cookie = `${FOLLOW_COOKIE_NAME}=1; path=/; max-age=31536000; SameSite=Lax`;
  } else {
    document.cookie = `${FOLLOW_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export default function AccessProvider({ children }) {
  const toast = useToast();
  const [ready, setReady] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    try {
      const storedFollow = window.localStorage.getItem(FOLLOW_STORAGE_KEY) === "1";
      const cookieFollow = readCookie(FOLLOW_COOKIE_NAME) === "1";
      const isFollowed = storedFollow || cookieFollow;
      if (isFollowed) {
        window.localStorage.setItem(FOLLOW_STORAGE_KEY, "1");
        writeFollowCookie(true);
      }
      setFollowed(isFollowed);

      const rawProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (rawProgress) {
        const parsed = JSON.parse(rawProgress);
        if (parsed && typeof parsed === "object") {
          setProgressMap(parsed);
        }
      }
    } catch {
      // Fallback safely if localStorage is blocked
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    let wasOffline = typeof navigator !== "undefined" && navigator.onLine === false;

    if (wasOffline) {
      toast.network("You appear to be offline. Check your connection and try again.", {
        id: "network-status",
        title: "Offline",
      });
    }

    const handleOffline = () => {
      wasOffline = true;
      toast.network("You lost internet connectivity. Some links or downloads may not work until you're back online.", {
        id: "network-status",
        title: "Connection lost",
      });
    };

    const handleOnline = () => {
      if (wasOffline) {
        wasOffline = false;
        toast.success("Back online. Connection restored.", {
          id: "network-status",
          title: "Connected",
        });
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [toast]);

  const unlockFollow = useCallback(() => {
    try {
      window.localStorage.setItem(FOLLOW_STORAGE_KEY, "1");
      writeFollowCookie(true);
    } catch {
      // Ignore storage errors
    }
    setFollowed(true);
    toast.success("Thanks for following @jayraidxyz — resources unlocked!", {
      id: "x-follow-unlock",
      title: "Unlocked",
    });
  }, [toast]);

  const resetFollow = useCallback(() => {
    try {
      window.localStorage.removeItem(FOLLOW_STORAGE_KEY);
      writeFollowCookie(false);
    } catch {
      // Ignore storage errors
    }
    setFollowed(false);
    toast.info("Resources access locked. Follow @jayraidxyz on X to unlock again.", {
      id: "x-follow-lock",
      title: "Locked",
    });
  }, [toast]);

  const savePostProgress = useCallback(async (slug, updates) => {
    const safeSlug = String(slug || "").trim().slice(0, 100);
    if (!safeSlug) return;

    setProgressMap((prev) => {
      const current = prev[safeSlug] || {};
      const nextEntry = {
        bookmarked: updates.bookmarked !== undefined ? Boolean(updates.bookmarked) : Boolean(current.bookmarked),
        completed: updates.completed !== undefined ? Boolean(updates.completed) : Boolean(current.completed),
        lastSection: updates.lastSection !== undefined ? Number(updates.lastSection) : Number(current.lastSection ?? 0),
        lastSlide: updates.lastSlide !== undefined ? Number(updates.lastSlide) : Number(current.lastSlide ?? 1),
        note: updates.note !== undefined ? String(updates.note).slice(0, 1000) : String(current.note ?? ""),
      };
      const next = { ...prev, [safeSlug]: nextEntry };
      try {
        window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  }, []);

  return (
    <AccessContext.Provider
      value={{
        ready,
        followed,
        progressMap,
        unlockFollow,
        resetFollow,
        savePostProgress,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) {
    throw new Error("useAccess must be used inside AccessProvider");
  }
  return ctx;
}
