"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Captions,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Film,
  Layers,
  Pause,
  Play,
  Save,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAccess } from "@/components/AccessProvider";
import AccountStatus from "@/components/AccountStatus";

function formatSeconds(sec) {
  if (!Number.isFinite(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function parseSections(body) {
  const sections = [];
  let current = null;
  let note = null;

  for (const block of body) {
    if (block.note) {
      note = block.note;
      continue;
    }
    if (block.h) {
      if (current) sections.push(current);
      current = { heading: block.h, blocks: [] };
    } else {
      if (!current) {
        current = { heading: "Overview", blocks: [] };
      }
      current.blocks.push(block);
    }
  }

  if (current) sections.push(current);
  return { sections, note };
}

function getPreviewText(blocks) {
  for (const b of blocks) {
    if (b.p) return b.p;
    if (b.ul && b.ul.length) return b.ul[0];
  }
  return "";
}

function ArticleBlock({ block }) {
  if (block.p) {
    return <p className="text-[15px] leading-relaxed text-white/85">{block.p}</p>;
  }
  if (block.ul) {
    return (
      <ul className="space-y-2.5">
        {block.ul.map((li) => (
          <li key={li} className="flex gap-3 text-[15px] leading-relaxed text-white/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-cyan" aria-hidden="true" />
            <span>{li}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function WatchReadStudio({ post, formattedDate }) {
  const { progressMap, savePostProgress } = useAccess();
  const savedProgress = progressMap[post.slug];

  const hasVideo = Boolean(post.video);
  const { sections, note } = useMemo(() => parseSections(post.body), [post.body]);
  const totalSlides = post.slides || 1;

  const [mode, setMode] = useState(hasVideo ? "video" : "slides");
  const [slide, setSlide] = useState(1);
  const [activeSection, setActiveSection] = useState(0);
  const [tab, setTab] = useState("outline"); // outline | read | social | notes
  const [captionsOn, setCaptionsOn] = useState(true);
  const [autoPlaySlides, setAutoPlaySlides] = useState(false);

  // Study note editor state
  const [studyNote, setStudyNote] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle"); // idle | saving | saved
  const restoredSlugRef = useRef(null);

  // Video state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Copy state for captions
  const [copiedKey, setCopiedKey] = useState(null);
  const touchStartRef = useRef(null);

  useEffect(() => {
    if (!savedProgress) return;
    if (restoredSlugRef.current !== post.slug) {
      restoredSlugRef.current = post.slug;
      if (typeof savedProgress.lastSlide === "number" && savedProgress.lastSlide >= 1 && savedProgress.lastSlide <= totalSlides) {
        setSlide(savedProgress.lastSlide);
      }
      if (typeof savedProgress.lastSection === "number" && savedProgress.lastSection >= 0 && savedProgress.lastSection < Math.max(1, sections.length)) {
        setActiveSection(savedProgress.lastSection);
      }
      setStudyNote(savedProgress.note || "");
    }
  }, [savedProgress, post.slug, totalSlides, sections.length]);

  const currentSection = sections[activeSection] || {
    heading: post.title,
    blocks: [{ p: post.summary }],
  };

  const slideForSection = (sectionIndex) => {
    if (sections.length <= 1) return 1;
    return Math.min(totalSlides, Math.floor((sectionIndex * totalSlides) / sections.length) + 1);
  };

  const sectionForSlide = (slideNum) => {
    if (sections.length <= 1) return 0;
    return Math.min(sections.length - 1, Math.floor(((slideNum - 1) * sections.length) / totalSlides));
  };

  function goToSlide(nextNum) {
    const wrapped = ((nextNum - 1 + totalSlides) % totalSlides) + 1;
    const nextSec = sectionForSlide(wrapped);
    setSlide(wrapped);
    setActiveSection(nextSec);
    savePostProgress(post.slug, { lastSlide: wrapped, lastSection: nextSec }).catch(() => {});
  }

  function handleSelectSection(index) {
    const mappedSlide = slideForSection(index);
    setActiveSection(index);
    setSlide(mappedSlide);
    savePostProgress(post.slug, { lastSection: index, lastSlide: mappedSlide }).catch(() => {});
    if (mode === "video" && videoRef.current && duration > 0 && sections.length > 0) {
      const targetTime = (index / sections.length) * duration;
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  }

  async function toggleBookmark() {
    await savePostProgress(post.slug, { bookmarked: !savedProgress?.bookmarked });
  }

  async function toggleCompleted() {
    await savePostProgress(post.slug, { completed: !savedProgress?.completed });
  }

  async function handleSaveStudyNote(e) {
    e.preventDefault();
    setNoteStatus("saving");
    try {
      await savePostProgress(post.slug, { note: studyNote });
      setNoteStatus("saved");
      window.setTimeout(() => setNoteStatus("idle"), 2000);
    } catch {
      setNoteStatus("idle");
    }
  }

  function switchMode(nextMode) {
    if (nextMode === mode) return;
    if (nextMode === "slides" && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    if (nextMode === "video") {
      setAutoPlaySlides(false);
    }
    setMode(nextMode);
  }

  function togglePlay() {
    if (mode === "video") {
      const el = videoRef.current;
      if (!el) return;
      if (el.paused) {
        el.play().catch(() => {});
        setIsPlaying(true);
      } else {
        el.pause();
        setIsPlaying(false);
      }
    } else {
      setAutoPlaySlides((prev) => !prev);
    }
  }

  function toggleMute() {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  }

  function handleSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    if (mode === "video") {
      const el = videoRef.current;
      if (el && duration > 0) {
        const nextTime = ratio * duration;
        el.currentTime = nextTime;
        setCurrentTime(nextTime);
      }
    } else {
      const targetSlide = Math.min(totalSlides, Math.max(1, Math.ceil(ratio * totalSlides)));
      goToSlide(targetSlide);
    }
  }

  useEffect(() => {
    if (!autoPlaySlides || mode !== "slides") return;
    const id = window.setInterval(() => {
      setSlide((prev) => {
        const next = (prev % totalSlides) + 1;
        setActiveSection(sectionForSlide(next));
        return next;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [autoPlaySlides, mode, totalSlides, sections.length]);

  async function copyCaption(platform, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(platform);
      window.setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard blocked in restricted browser contexts.
    }
  }

  const videoProgressPct = duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;
  const slideProgressPct = Math.round((slide / totalSlides) * 100);
  const progressPct = mode === "video" ? videoProgressPct : slideProgressPct;

  const currentSlideSrc = `/library/${post.slug}/slide-${slide}.webp`;
  const portraitStage = mode === "video" || post.aspect === "9/16";
  const stageCaptionText = getPreviewText(currentSection.blocks) || post.summary;

  return (
    <div className="relative min-h-screen bg-[#060B16]">
      <div className="dotgrid pointer-events-none fixed inset-0 opacity-35" aria-hidden="true" />

      {/* Studio Sub-Header */}
      <div className="relative border-b border-white/10 bg-[#080F1E]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/resources#library"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
            <span className="hidden text-white/20 sm:inline" aria-hidden="true">|</span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <span className="text-cyan">{post.type}</span>
              <span aria-hidden="true">·</span>
              <span>{formattedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{post.readMinutes} min read</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <AccountStatus />
            {hasVideo ? (
              <button
                type="button"
                onClick={() => {
                  switchMode("video");
                  if (mode !== "video") {
                    window.setTimeout(() => {
                      videoRef.current?.play().catch(() => {});
                      setIsPlaying(true);
                    }, 50);
                  } else {
                    togglePlay();
                  }
                }}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#4F5BFF] px-5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,220,255,0.25)] transition hover:brightness-110"
              >
                {mode === "video" && isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause Video
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Watch Video
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#4F5BFF] px-5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,220,255,0.25)] transition hover:brightness-110"
              >
                {autoPlaySlides ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause Slides
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Play Slides
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <main className="relative mx-auto max-w-6xl px-5 py-10 sm:py-12">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {post.summary}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-start">
          {/* LEFT COLUMN: Media Stage + Transport Controls */}
          <div className="lg:sticky lg:top-24">
            <div
              tabIndex={0}
              role="region"
              aria-label={`${post.title} media viewer`}
              onKeyDown={(e) => {
                if (mode === "slides") {
                  if (e.key === "ArrowRight") goToSlide(slide + 1);
                  if (e.key === "ArrowLeft") goToSlide(slide - 1);
                }
              }}
              onTouchStart={(e) => {
                if (mode === "slides") touchStartRef.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (mode !== "slides" || touchStartRef.current == null) return;
                const dx = e.changedTouches[0].clientX - touchStartRef.current;
                if (Math.abs(dx) > 40) goToSlide(dx < 0 ? slide + 1 : slide - 1);
                touchStartRef.current = null;
              }}
              className="overflow-hidden rounded-3xl border border-cyan/20 bg-[#080F1E] p-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            >
              {/* Top Progress Segments */}
              <div className="mb-3 flex gap-1.5" aria-hidden="true">
                {mode === "slides" ? (
                  Array.from({ length: totalSlides }, (_, idx) => {
                    const num = idx + 1;
                    const active = num <= slide;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => goToSlide(num)}
                        aria-label={`Jump to slide ${num}`}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          active ? "bg-cyan" : "bg-white/15 hover:bg-white/30"
                        }`}
                      />
                    );
                  })
                ) : (
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-cyan transition-[width] duration-150"
                      style={{ width: `${videoProgressPct}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Stage Meta Header */}
              <div className="mb-3 flex items-center justify-between gap-2 px-1 font-mono text-[11px]">
                <div className="flex min-w-0 items-center gap-2 truncate">
                  <span className="font-bold tracking-wider text-cyan">JAYRAIDXYZ</span>
                  <span className="text-white/30" aria-hidden="true">·</span>
                  <span className="truncate text-muted">
                    {mode === "video" ? "Video Explainer" : `Slide ${String(slide).padStart(2, "0")}: ${currentSection.heading}`}
                  </span>
                </div>
                <span className="shrink-0 tabular-nums text-muted">
                  {mode === "video"
                    ? `${formatSeconds(currentTime)} / ${formatSeconds(duration)}`
                    : `${String(slide).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`}
                </span>
              </div>

              {/* Viewport Frame */}
              <div
                className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050914] ${
                  portraitStage ? "aspect-[9/16] max-w-[360px]" : "aspect-[4/5]"
                }`}
              >
                {mode === "video" && hasVideo ? (
                  <video
                    ref={videoRef}
                    src={`/library/${post.video}`}
                    poster={`/library/${post.cover}`}
                    playsInline
                    preload="metadata"
                    onClick={togglePlay}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
                    onTimeUpdate={(e) => {
                      const t = e.currentTarget.currentTime || 0;
                      const d = e.currentTarget.duration || 0;
                      setCurrentTime(t);
                      if (d > 0 && sections.length > 0) {
                        const idx = Math.min(sections.length - 1, Math.floor((t / d) * sections.length));
                        setActiveSection(idx);
                      }
                    }}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                ) : (
                  <>
                    {Array.from({ length: totalSlides }, (_, idx) => idx + 1).map((n) => (
                      <img
                        key={n}
                        src={`/library/${post.slug}/slide-${n}.webp`}
                        alt={`${post.title}, slide ${n} of ${totalSlides}`}
                        loading={n <= 2 ? "eager" : "lazy"}
                        referrerPolicy="no-referrer"
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                          n === slide ? "opacity-100" : "pointer-events-none opacity-0"
                        }`}
                        aria-hidden={n !== slide}
                      />
                    ))}
                  </>
                )}

                {/* Caption Scrim Overlay */}
                {captionsOn && stageCaptionText ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050914]/95 via-[#050914]/80 to-transparent px-4 pb-4 pt-10">
                    <p className="text-center text-xs leading-relaxed text-white/95 sm:text-[13px]">
                      &ldquo;{stageCaptionText}&rdquo;
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Transport Controls Bar */}
            <div className="mt-3.5 rounded-2xl border border-white/10 bg-[#0B1221] p-3.5">
              <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-muted">
                <span>
                  {mode === "video" ? formatSeconds(currentTime) : String(slide).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={handleSeek}
                  aria-label="Seek progress"
                  className="group relative h-2 flex-1 cursor-pointer rounded-full bg-white/10"
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-cyan transition-[width] duration-150"
                    style={{ width: `${progressPct}%` }}
                  />
                </button>
                <span>
                  {mode === "video" ? formatSeconds(duration) : String(totalSlides).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      mode === "slides"
                        ? goToSlide(slide - 1)
                        : handleSelectSection(Math.max(0, activeSection - 1))
                    }
                    aria-label={mode === "slides" ? "Previous slide" : "Previous section"}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan/50 hover:text-cyan"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex h-9 items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#4F5BFF] px-4 text-xs font-semibold text-white transition hover:brightness-110"
                  >
                    {(mode === "video" ? isPlaying : autoPlaySlides) ? (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        {mode === "video" ? "Play Video" : "Auto-Play"}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      mode === "slides"
                        ? goToSlide(slide + 1)
                        : handleSelectSection(Math.min(sections.length - 1, activeSection + 1))
                    }
                    aria-label={mode === "slides" ? "Next slide" : "Next section"}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan/50 hover:text-cyan"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {progressPct}%
                  </span>
                  {mode === "video" ? (
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan transition hover:bg-cyan/20"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  ) : (
                    <a
                      href={currentSlideSrc}
                      download
                      aria-label={`Download slide ${slide}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan transition hover:bg-cyan/20"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Two Stacked Studio Panels */}
          <div className="space-y-6">
            {/* Top Active Section Spotlight Panel */}
            <section className="rounded-2xl border border-white/10 bg-[#0B1221]/95 p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                <span className="tracking-[0.14em] text-cyan">
                  {post.type.toUpperCase()} · {totalSlides} SLIDES · {post.readMinutes} MIN READ
                </span>
                <span className="tabular-nums text-muted">
                  {String(activeSection + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {String(activeSection + 1).padStart(2, "0")}. {currentSection.heading}
              </h2>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs">
                <span className="text-muted">Section Notes</span>
                <span className="font-mono text-cyan">{post.tags.join(" · ")}</span>
              </div>

              <div className="mt-4 space-y-3">
                {currentSection.blocks.map((block, idx) => (
                  <ArticleBlock key={idx} block={block} />
                ))}
              </div>

              {/* Action Controls Row */}
              <div className="mt-6 flex flex-wrap gap-2.5 pt-2">
                {hasVideo ? (
                  <>
                    <button
                      type="button"
                      onClick={() => switchMode("video")}
                      className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border px-4 py-2 text-xs font-medium transition ${
                        mode === "video"
                          ? "border-cyan/40 bg-cyan/10 text-cyan"
                          : "border-white/10 bg-white/[0.03] text-muted hover:text-white"
                      }`}
                    >
                      <Film className="h-3.5 w-3.5" />
                      Watch Video
                    </button>
                    <button
                      type="button"
                      onClick={() => switchMode("slides")}
                      className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border px-4 py-2 text-xs font-medium transition ${
                        mode === "slides"
                          ? "border-cyan/40 bg-cyan/10 text-cyan"
                          : "border-white/10 bg-white/[0.03] text-muted hover:text-white"
                      }`}
                    >
                      <Layers className="h-3.5 w-3.5" />
                      Slides ({totalSlides})
                    </button>
                  </>
                ) : null}

                <button
                  type="button"
                  onClick={() => setCaptionsOn((prev) => !prev)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border px-4 py-2 text-xs font-medium transition ${
                    captionsOn
                      ? "border-cyan/40 bg-cyan/10 text-cyan"
                      : "border-white/10 bg-white/[0.03] text-muted hover:text-white"
                  }`}
                >
                  <Captions className="h-3.5 w-3.5" />
                  {captionsOn ? "Captions On" : "Captions Off"}
                </button>

                <a
                  href={currentSlideSrc}
                  download
                  className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted transition hover:border-cyan/40 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Slide {slide}
                </a>

                <button
                  type="button"
                  onClick={toggleBookmark}
                  className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border px-4 py-2 text-xs font-medium transition ${
                    savedProgress?.bookmarked
                      ? "border-cyan/40 bg-cyan/10 text-cyan"
                      : "border-white/10 bg-white/[0.03] text-muted hover:text-white"
                  }`}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  {savedProgress?.bookmarked ? "Saved" : "Save"}
                </button>

                <button
                  type="button"
                  onClick={toggleCompleted}
                  className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border px-4 py-2 text-xs font-medium transition ${
                    savedProgress?.completed
                      ? "border-cyan/40 bg-cyan/10 text-cyan"
                      : "border-white/10 bg-white/[0.03] text-muted hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {savedProgress?.completed ? "Completed" : "Mark Done"}
                </button>
              </div>
            </section>

            {/* Bottom Tabbed Studio Explorer */}
            <section className="rounded-2xl border border-white/10 bg-[#0B1221]/95 p-5 sm:p-6">
              <div
                role="tablist"
                aria-label="Post content views"
                className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-[#070C17] p-1 sm:grid-cols-4"
              >
                {[
                  ["outline", `${sections.length}-Part Outline`],
                  ["read", "Full Read"],
                  ["social", "Sources & Captions"],
                  ["notes", "Study Notes"],
                ].map(([key, label]) => {
                  const active = tab === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(key)}
                      className={`truncate rounded-lg px-3 py-2.5 text-xs font-medium transition sm:text-sm ${
                        active
                          ? "border border-white/10 bg-[#152038] text-white shadow-sm"
                          : "text-muted hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Interactive Timeline / Outline */}
              {tab === "outline" ? (
                <div className="mt-5 space-y-2.5">
                  {sections.map((sec, idx) => {
                    const selected = idx === activeSection;
                    const preview = getPreviewText(sec.blocks);
                    const mappedSlide = slideForSection(idx);

                    return (
                      <button
                        key={sec.heading}
                        type="button"
                        onClick={() => handleSelectSection(idx)}
                        className={`w-full rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-cyan/40 bg-[#131F38]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="font-semibold text-white">
                            <span className="mr-2 font-mono text-xs text-cyan">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            {sec.heading}
                          </p>
                          <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
                            Slide {mappedSlide}
                          </span>
                        </div>
                        {preview ? (
                          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                            {preview}
                          </p>
                        ) : null}
                      </button>
                    );
                  })}

                  {note ? (
                    <p className="mt-4 rounded-xl border border-white/10 bg-[#070C17] p-4 text-xs leading-relaxed text-muted">
                      {note}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {/* Tab 2: Complete Article Read */}
              {tab === "read" ? (
                <article className="mt-5 space-y-8">
                  {sections.map((sec, idx) => (
                    <div key={sec.heading} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-bold text-white">
                        <span className="mr-2 font-mono text-xs text-cyan">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {sec.heading}
                      </h3>
                      <div className="mt-3 space-y-3">
                        {sec.blocks.map((block, bIdx) => (
                          <ArticleBlock key={bIdx} block={block} />
                        ))}
                      </div>
                    </div>
                  ))}
                  {note ? (
                    <p className="rounded-xl border border-white/10 bg-[#070C17] p-4 text-xs leading-relaxed text-muted">
                      {note}
                    </p>
                  ) : null}
                </article>
              ) : null}

              {/* Tab 3: Sources & Social Captions */}
              {tab === "social" ? (
                <div className="mt-5 space-y-6">
                  {post.sources.length ? (
                    <div>
                      <h3 className="font-mono text-xs font-bold tracking-[0.16em] text-cyan">
                        SOURCES
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {post.sources.map((s) => (
                          <li key={s.href}>
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#070C17] px-4 py-3 text-sm text-white/90 transition hover:border-cyan/40 hover:text-cyan"
                            >
                              <span>{s.label}</span>
                              <ExternalLink className="h-4 w-4 shrink-0 text-cyan" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {post.captions.length ? (
                    <div>
                      <h3 className="font-mono text-xs font-bold tracking-[0.16em] text-cyan">
                        HOW I POSTED IT
                      </h3>
                      <div className="mt-3 space-y-3">
                        {post.captions.map((c) => {
                          const isCopied = copiedKey === c.platform;
                          return (
                            <div
                              key={c.platform}
                              className="rounded-xl border border-white/10 bg-[#070C17] p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-mono text-xs font-bold text-white">
                                  {c.platform} caption
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyCaption(c.platform, c.text)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted transition hover:border-cyan/40 hover:text-white"
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 text-cyan" />
                                      Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3.5 w-3.5" />
                                      Copy
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
                                {c.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {!post.sources.length && !post.captions.length ? (
                    <div className="rounded-xl border border-white/10 bg-[#070C17] p-5 text-sm text-muted">
                      <p>
                        Original notes and slides created for this topic. Explore tools and references in the main library.
                      </p>
                      <Link
                        href="/resources#tools"
                        className="mt-3 inline-flex items-center gap-1.5 text-cyan hover:underline"
                      >
                        Browse tools I use →
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Tab 4: Personal Study Notes */}
              {tab === "notes" ? (
                <div className="mt-5">
                  <form onSubmit={handleSaveStudyNote} className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="study-note-input" className="font-mono text-xs font-bold tracking-[0.14em] text-cyan">
                        YOUR STUDY NOTES
                      </label>
                      <span className="font-mono text-[11px] tabular-nums text-muted">
                        {studyNote.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="study-note-input"
                      rows={5}
                      maxLength={1000}
                      value={studyNote}
                      onChange={(e) => setStudyNote(e.target.value)}
                      placeholder="Write key takeaways, testnet commands, or questions to revisit..."
                      className="w-full rounded-xl border border-white/10 bg-[#070C17] p-4 text-sm leading-relaxed text-white placeholder:text-muted/60"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-muted">
                        Saved locally in your browser.
                      </span>
                      <button
                        type="submit"
                        disabled={noteStatus === "saving"}
                        className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6470ff] disabled:opacity-60"
                      >
                        {noteStatus === "saved" ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-cyan" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-3.5 w-3.5" />
                            {noteStatus === "saving" ? "Saving..." : "Save Note"}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
