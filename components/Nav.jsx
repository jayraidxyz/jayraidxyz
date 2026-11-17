"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#learn", label: "Learn" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5"
        aria-label="Main"
      >
        <Link
          href="/"
          className="whitespace-nowrap shrink-0 font-mono text-sm font-bold tracking-wide text-white"
        >
          <span className="text-cyan">&lt;/&gt;</span> {site.handle}
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV_LINKS.map((item) => {
            const active = item.href === "/resources" && (pathname?.startsWith("/resources") || pathname?.startsWith("/library"));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`whitespace-nowrap shrink-0 transition hover:text-white ${
                    active ? "text-white font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={mail}
            className="whitespace-nowrap shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition hover:bg-[#6470ff] sm:px-5 sm:text-sm"
          >
            Hire me
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white transition hover:border-cyan/60 hover:text-cyan md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#0B0E14]/95 px-5 pb-5 pt-3 backdrop-blur md:hidden"
        >
          <ul className="flex flex-col divide-y divide-white/10">
            {NAV_LINKS.map((item) => {
              const active = item.href === "/resources" && (pathname?.startsWith("/resources") || pathname?.startsWith("/library"));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[44px] items-center justify-between py-3 text-base font-medium transition hover:text-cyan ${
                      active ? "text-cyan" : "text-white/90"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-muted" aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
