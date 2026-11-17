"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, WifiOff, X } from "lucide-react";

const ToastContext = createContext(null);

const VARIANT_STYLES = {
  error: {
    border: "border-[#ff8caf]/40",
    badge: "text-[#ff8caf]",
    iconBg: "bg-[#ff8caf]/15 text-[#ff8caf] border-[#ff8caf]/30",
    Icon: AlertCircle,
    defaultTitle: "Authentication error",
  },
  network: {
    border: "border-amber-400/40",
    badge: "text-amber-300",
    iconBg: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    Icon: WifiOff,
    defaultTitle: "Network error",
  },
  success: {
    border: "border-cyan/40",
    badge: "text-cyan",
    iconBg: "bg-cyan/15 text-cyan border-cyan/30",
    Icon: CheckCircle2,
    defaultTitle: "Success",
  },
  info: {
    border: "border-white/15",
    badge: "text-cyan",
    iconBg: "bg-accent/20 text-cyan border-white/15",
    Icon: Info,
    defaultTitle: "Notice",
  },
};

function ToastItem({ item, onDismiss }) {
  const style = VARIANT_STYLES[item.variant] || VARIANT_STYLES.info;
  const Icon = style.Icon;
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!item.duration || item.duration <= 0) return;
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      onDismiss(item.id);
    }, item.duration);
  }, [item.duration, item.id, onDismiss]);

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, [startTimer, item.updatedAt]);

  return (
    <div
      role={item.variant === "error" || item.variant === "network" ? "alert" : "status"}
      aria-live={item.variant === "error" || item.variant === "network" ? "assertive" : "polite"}
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={startTimer}
      className={`pointer-events-auto relative flex items-start gap-3 rounded-2xl border bg-[#0B1221]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur transition-all duration-200 ${style.border}`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${style.iconBg}`}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${style.badge}`}>
          {item.title || style.defaultTitle}
        </p>
        <p className="mt-1 text-sm leading-snug text-white/90">{item.message}</p>
      </div>

      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss notification"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((options) => {
    const {
      id,
      variant = "info",
      title,
      message,
      duration = variant === "error" || variant === "network" ? 7000 : 5000,
    } = typeof options === "string" ? { message: options } : options || {};

    if (!message) return null;

    const toastId = id || `toast-${++counterRef.current}`;
    const now = Date.now();

    setToasts((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === toastId);
      const nextToast = { id: toastId, variant, title, message, duration, updatedAt: now };
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx] = nextToast;
        return copy;
      }
      return [...prev, nextToast].slice(-4);
    });

    return toastId;
  }, []);

  const api = useMemo(
    () => ({
      show,
      dismiss,
      error: (message, opts = {}) => show({ ...opts, variant: "error", message }),
      network: (message, opts = {}) => show({ ...opts, variant: "network", message }),
      success: (message, opts = {}) => show({ ...opts, variant: "success", message }),
      info: (message, opts = {}) => show({ ...opts, variant: "info", message }),
    }),
    [show, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-label="Notifications"
        className="pointer-events-none fixed bottom-4 left-4 right-4 z-[100] flex flex-col gap-2.5 sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm"
      >
        {toasts.map((item) => (
          <ToastItem key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return ctx;
}
