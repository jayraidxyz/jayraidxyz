"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
  testConnection,
} from "@/lib/firebase";
import { formatFirebaseAuthError, isNetworkError } from "@/lib/firebaseErrors";
import { useToast } from "@/components/ToastProvider";

const FirebaseContext = createContext(null);

const ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

function sanitizeSlug(slug) {
  const cleaned = String(slug || "").trim().slice(0, 100);
  if (!ID_PATTERN.test(cleaned)) {
    throw new Error("Invalid post slug format.");
  }
  return cleaned;
}

function sanitizeNote(note) {
  return String(note ?? "").slice(0, 1000);
}

function clampInt(value, min, max) {
  const num = Math.trunc(Number(value));
  if (!Number.isFinite(num)) return min;
  return Math.min(max, Math.max(min, num));
}

class FirestoreErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    let message = "Something went wrong while syncing your account data.";
    if (error instanceof Error) {
      try {
        const parsed = JSON.parse(error.message);
        if (parsed?.error) message = parsed.error;
      } catch {
        message = error.message || message;
      }
    }
    return { hasError: true, message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0E14] px-5 py-16 text-white">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10141F] p-8">
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-cyan">
              SYNC NOTICE
            </p>
            <h1 className="mt-3 text-2xl font-bold">Unable to sync Firebase data</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{this.state.message}</p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: "" });
                window.location.reload();
              }}
              className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#6470ff]"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function FirebaseProvider({ children }) {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [profile, setProfile] = useState(null);
  const [progressMap, setProgressMap] = useState({});
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [fatalError, setFatalError] = useState(null);

  if (fatalError) {
    throw fatalError;
  }

  useEffect(() => {
    let active = true;
    let wasOffline = typeof navigator !== "undefined" && navigator.onLine === false;

    if (wasOffline) {
      toast.network("You appear to be offline. Check your connection and try again.", {
        id: "network-status",
        title: "Offline",
      });
    }

    testConnection().then((res) => {
      if (!active) return;
      if (res && !res.ok) {
        toast.network(res.message, {
          id: "firebase-connection",
          title: "Network error",
        });
      }
    });

    const handleOffline = () => {
      wasOffline = true;
      toast.network("You lost internet connectivity. Changes may not sync until you are back online.", {
        id: "network-status",
        title: "Connection lost",
      });
    };

    const handleOnline = () => {
      if (wasOffline) {
        wasOffline = false;
        toast.success("Back online. Syncing with Firebase resumed.", {
          id: "network-status",
          title: "Connected",
        });
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    const unsub = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setAuthReady(true);
        if (!nextUser) {
          setProfile(null);
          setProgressMap({});
        }
      },
      (error) => {
        setAuthReady(true);
        const formatted = formatFirebaseAuthError(error);
        if (formatted) {
          setAuthError(formatted.message);
          toast.show({ id: "auth-error", ...formatted });
        }
      }
    );

    return () => {
      active = false;
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      unsub();
    };
  }, [toast]);

  // Ensure user profile exists and subscribe to profile + progress when authenticated
  useEffect(() => {
    if (!authReady || !user) return;

    let cancelled = false;
    const userPath = `users/${user.uid}`;
    const userRef = doc(db, "users", user.uid);

    async function ensureUserProfile() {
      try {
        const snap = await getDoc(userRef);
        if (cancelled) return;
        const safeDisplayName = String(user.displayName || "Reader").slice(0, 120);
        const safeEmail = String(user.email || "").slice(0, 254);
        const safePhotoURL = String(user.photoURL || "").slice(0, 500);

        if (!snap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: safeDisplayName,
            email: safeEmail,
            photoURL: safePhotoURL,
            xFollowed: false,
            notesRequested: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } else {
          const data = snap.data();
          if (
            data.displayName !== safeDisplayName ||
            data.email !== safeEmail ||
            data.photoURL !== safePhotoURL
          ) {
            await updateDoc(userRef, {
              displayName: safeDisplayName,
              email: safeEmail,
              photoURL: safePhotoURL,
              updatedAt: serverTimestamp(),
            });
          }
        }
      } catch (error) {
        if (isNetworkError(error)) {
          toast.network("Network error while loading your profile. Check your connection.", {
            id: "firestore-network",
            title: "Sync delayed",
          });
          return;
        }
        try {
          handleFirestoreError(error, OperationType.WRITE, userPath);
        } catch (wrapped) {
          if (!cancelled) setFatalError(wrapped);
        }
      }
    }

    ensureUserProfile();

    const unsubProfile = onSnapshot(
      userRef,
      (snap) => {
        if (!snap.exists()) return;
        setProfile(snap.data());
      },
      (error) => {
        if (isNetworkError(error)) {
          toast.network("Unable to sync your profile due to a network error.", {
            id: "firestore-network",
            title: "Network error",
          });
          return;
        }
        try {
          handleFirestoreError(error, OperationType.GET, userPath);
        } catch (wrapped) {
          setFatalError(wrapped);
        }
      }
    );

    const progressPath = `users/${user.uid}/progress`;
    const progressQuery = query(
      collection(db, "users", user.uid, "progress"),
      where("userId", "==", user.uid)
    );

    const unsubProgress = onSnapshot(
      progressQuery,
      (snapshot) => {
        const nextMap = {};
        snapshot.forEach((docSnap) => {
          nextMap[docSnap.id] = docSnap.data();
        });
        setProgressMap(nextMap);
      },
      (error) => {
        if (isNetworkError(error)) {
          toast.network("Unable to sync your saved posts due to a network error.", {
            id: "firestore-network",
            title: "Network error",
          });
          return;
        }
        try {
          handleFirestoreError(error, OperationType.LIST, progressPath);
        } catch (wrapped) {
          setFatalError(wrapped);
        }
      }
    );

    return () => {
      cancelled = true;
      unsubProfile();
      unsubProgress();
    };
  }, [authReady, user, toast]);

  const signInWithGoogle = useCallback(async () => {
    setAuthError("");
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.dismiss("auth-error");
    } catch (error) {
      const formatted = formatFirebaseAuthError(error);
      if (formatted) {
        setAuthError(formatted.message);
        toast.show({ id: "auth-error", ...formatted });
      }
    } finally {
      setSigningIn(false);
    }
  }, [toast]);

  const signOutUser = useCallback(async () => {
    setAuthError("");
    try {
      await signOut(auth);
      toast.info("You have been signed out.", { id: "auth-signout", title: "Signed out" });
    } catch (error) {
      const formatted = formatFirebaseAuthError(error) || {
        variant: "error",
        title: "Sign-out failed",
        message: "Unable to sign out right now. Please try again.",
      };
      setAuthError(formatted.message);
      toast.show({ id: "auth-error", ...formatted });
    }
  }, [toast]);

  const markXFollowed = useCallback(async () => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        xFollowed: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      if (isNetworkError(error)) {
        toast.network("Network error while updating your account.", {
          id: "firestore-network",
        });
      }
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  }, [user, toast]);

  const markNotesRequested = useCallback(async () => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        notesRequested: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      if (isNetworkError(error)) {
        toast.network("Network error while saving your notes request.", {
          id: "firestore-network",
        });
      }
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  }, [user, toast]);

  const savePostProgress = useCallback(
    async (slug, updates) => {
      if (!user) return;
      const safeSlug = sanitizeSlug(slug);
      const docPath = `users/${user.uid}/progress/${safeSlug}`;
      const ref = doc(db, "users", user.uid, "progress", safeSlug);
      const current = progressMap[safeSlug];

      const nextData = {
        bookmarked: updates.bookmarked !== undefined ? Boolean(updates.bookmarked) : Boolean(current?.bookmarked),
        completed: updates.completed !== undefined ? Boolean(updates.completed) : Boolean(current?.completed),
        lastSection:
          updates.lastSection !== undefined
            ? clampInt(updates.lastSection, 0, 50)
            : clampInt(current?.lastSection ?? 0, 0, 50),
        lastSlide:
          updates.lastSlide !== undefined
            ? clampInt(updates.lastSlide, 1, 100)
            : clampInt(current?.lastSlide ?? 1, 1, 100),
        note: updates.note !== undefined ? sanitizeNote(updates.note) : sanitizeNote(current?.note ?? ""),
      };

      try {
        if (!current) {
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            await setDoc(ref, {
              userId: user.uid,
              slug: safeSlug,
              ...nextData,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            return;
          }
        }
        await updateDoc(ref, {
          ...nextData,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        if (isNetworkError(error)) {
          toast.network("Network error while saving your progress. Check your connection and try again.", {
            id: "firestore-network",
          });
        } else {
          toast.error("Could not save your progress right now. Please try again.", {
            id: "firestore-save-error",
            title: "Save failed",
          });
        }
        handleFirestoreError(error, OperationType.WRITE, docPath);
      }
    },
    [user, progressMap, toast]
  );

  return (
    <FirestoreErrorBoundary>
      <FirebaseContext.Provider
        value={{
          user,
          authReady,
          profile,
          progressMap,
          authError,
          signingIn,
          signInWithGoogle,
          signOutUser,
          markXFollowed,
          markNotesRequested,
          savePostProgress,
        }}
      >
        {children}
      </FirebaseContext.Provider>
    </FirestoreErrorBoundary>
  );
}

export function useFirebase() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error("useFirebase must be used inside FirebaseProvider");
  }
  return ctx;
}
