"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Image as ImageIcon,
  Maximize2,
  X,
} from "lucide-react";
import { projects, site } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Work() {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug || "payhold");
  const [imgFailed, setImgFailed] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = projects.find((p) => p.slug === selectedSlug) || projects[0];
  const hasValidImage = Boolean(active?.image) && !imgFailed[active?.slug];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <SectionHead kicker="01 · WORK" title="Things I've built">
            Select any build to inspect its interface preview and jump straight to the live site or repository.
          </SectionHead>
        </div>

        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white transition hover:border-cyan/60 hover:text-cyan"
        >
          <GitBranch className="h-4 w-4 text-cyan" />
          <span>github.com/jayraidxyz</span>
          <ExternalLink className="h-3.5 w-3.5 text-muted" />
        </a>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: 2 interactive built projects */}
        <div className="flex flex-col justify-between gap-4" role="tablist" aria-label="Built projects">
          {projects.map((p, index) => {
            const isSelected = p.slug === active?.slug;
            return (
              <div
                key={p.slug}
                className={`flex flex-1 flex-col justify-between rounded-2xl border p-6 transition ${
                  isSelected
                    ? "border-cyan/60 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs text-muted">
                      <span className="text-cyan">{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{p.tag}</span>
                    </p>
                    <p className="font-mono text-xs text-muted">
                      {p.stack.join(" · ")}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSlug(p.slug)}
                    className="mt-3 block w-full text-left focus-visible:outline-none"
                  >
                    <h3 className="text-2xl font-bold text-white transition hover:text-cyan">
                      {p.name}
                    </h3>
                    <p className="mt-2.5 text-base leading-relaxed text-muted">{p.text}</p>
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(p.slug)}
                      className={`whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                        isSelected
                          ? "bg-accent text-white"
                          : "border border-white/15 bg-white/[0.03] text-white/90 hover:border-cyan/60 hover:text-cyan"
                      }`}
                    >
                      {isSelected ? "Previewing" : "View preview"}
                    </button>

                    {p.githubUrl ? (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-muted transition hover:border-cyan/60 hover:text-white"
                      >
                        <GitBranch className="h-3.5 w-3.5 text-cyan" />
                        <span>GitHub</span>
                      </a>
                    ) : null}
                  </div>

                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 text-xs font-medium text-cyan transition hover:underline"
                    >
                      <span>Live app</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Cropped PNG Showcase Stage */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#070C17] p-6">
          <div className="dotgrid absolute inset-0 opacity-45" aria-hidden="true" />
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="min-w-0">
              <p className="font-mono text-xs text-cyan">{active?.tag}</p>
              <h3 className="truncate text-lg font-bold text-white">{active?.name}</h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {active?.href ? (
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full border border-cyan/40 bg-cyan/10 px-3.5 text-xs font-medium text-cyan transition hover:border-cyan hover:bg-cyan/15"
                >
                  <span>Visit</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}

              {active?.githubUrl ? (
                <a
                  href={active.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full border border-white/15 bg-[#0B1221] px-3.5 text-xs font-medium text-white transition hover:border-cyan/60 hover:text-cyan"
                >
                  <GitBranch className="h-3.5 w-3.5 text-cyan" />
                  <span>Repo</span>
                </a>
              ) : null}

              {hasValidImage ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Expand ${active.name} preview`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0B1221] text-muted transition hover:border-cyan/60 hover:text-white"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center py-6">
            {hasValidImage ? (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`Open full preview of ${active.name}`}
                className="group relative mx-auto block w-full max-w-[270px] overflow-hidden rounded-[26px] border border-white/15 bg-[#0A1319] shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition hover:border-cyan/60"
              >
                <div className="aspect-[9/15.2] w-full overflow-hidden">
                  <img
                    src={active.image}
                    alt={active.imageAlt || `${active.name} preview`}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgFailed((prev) => ({ ...prev, [active.slug]: true }))
                    }
                    className={`h-full w-full transition duration-300 ${
                      active.imageClass || "object-cover object-top group-hover:scale-[1.02]"
                    }`}
                  />
                </div>
              </button>
            ) : (
              <div className="mx-auto flex w-full max-w-[270px] aspect-[9/15.2] flex-col items-center justify-center rounded-[26px] border border-dashed border-white/15 bg-[#0B1221]/90 px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <ImageIcon className="h-5 w-5 text-cyan" />
                </div>
                <p className="mt-4 text-base font-semibold text-white">{active?.name}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {active?.stack?.join(" · ")}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Screenshot preview will appear here once added.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && hasValidImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} screenshot preview`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0B1221] p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{active.name}</p>
                <p className="truncate font-mono text-xs text-muted">
                  {active.tag} · {active.stack.join(" · ")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close preview"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted transition hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A1319]">
              <img
                src={active.image}
                alt={active.imageAlt || `${active.name} preview`}
                referrerPolicy="no-referrer"
                className="mx-auto max-h-[75vh] w-full object-contain object-top"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
