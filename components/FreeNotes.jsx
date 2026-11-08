"use client";

import { useState } from "react";
import { site } from "@/data/site";

export default function FreeNotes() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot, real people leave it empty
  const [state, setState] = useState("idle"); // idle | loading | done | error

  async function onSubmit(e) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      if (!res.ok) throw new Error("bad response");
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="notes" className="border-y border-white/10 bg-panel/60">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">04 · FREE NOTES</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{site.notes.title}</h2>
          <p className="mt-4 text-lg text-muted">{site.notes.blurb}</p>
          <p className="mt-4 text-sm text-muted">
            Educational only. Not financial advice. Everything runs on test networks.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/70 p-6 sm:p-8">
          {state === "done" ? (
            <div role="status">
              <p className="text-xl font-bold">You're in. Here are your notes.</p>
              <a
                href={site.notes.file}
                download
                className="mt-5 inline-block rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-[#6470ff]"
              >
                Download the PDF
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label htmlFor="email" className="block text-sm font-medium">
                Where should I send it?
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-muted/70"
              />
              {/* honeypot field, hidden from people */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-4 w-full rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-[#6470ff] disabled:opacity-60"
              >
                {state === "loading" ? "Sending..." : "Send me the free notes"}
              </button>
              {state === "error" ? (
                <p role="alert" className="mt-3 text-sm text-[#ff8caf]">
                  That didn't work. Check the email address and try again.
                </p>
              ) : null}
              <p className="mt-4 text-xs text-muted">No spam. I only email when there's something worth sharing.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
