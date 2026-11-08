"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Learn", href: "/#learn" },
  { label: "Resources", href: "/resources" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`;
  const close = () => setOpen(false);

  // Close on Escape, and when the viewport grows to the desktop layout (lg = 1024px).
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <Link href="/" onClick={close} className="font-mono text-sm font-bold tracking-wide text-white">
          <span className="text-cyan">&lt;/&gt;</span> {site.handle}
        </Link>

        {/* Desktop links (lg and up) */}
        <ul className="hidden items-center gap-8 text-sm text-muted lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={mail}
            className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-[#6470ff] sm:inline-block"
          >
            Hire me
          </a>

          {/* Hamburger (below lg) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-cyan lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile / tablet panel */}
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={close}
            className="fixed inset-x-0 bottom-0 top-16 z-30 cursor-default bg-ink/60 lg:hidden"
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-40 border-b border-white/10 bg-ink shadow-2xl shadow-black/50 lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-3">
              {links.map((l) => (
                <li key={l.href} className="border-b border-white/10 last:border-0">
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block py-4 text-lg font-medium text-white/90 transition hover:text-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="py-4 sm:hidden">
                <a
                  href={mail}
                  onClick={close}
                  className="block rounded-full bg-accent px-6 py-3.5 text-center font-medium text-white transition hover:bg-[#6470ff]"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}
