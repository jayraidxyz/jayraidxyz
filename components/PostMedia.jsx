"use client";

import { useRef, useState } from "react";

function SlideViewer({ slug, count, aspect, title }) {
  const [i, setI] = useState(1);
  const touch = useRef(null);
  const portrait = aspect === "9/16";
  const go = (n) => setI(((n - 1 + count) % count) + 1);
  const src = (n) => `/library/${slug}/slide-${n}.webp`;

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} slides`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        touch.current = null;
      }}
      className="outline-offset-4"
    >
      <div
        className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-panel ${
          portrait ? "max-w-xs aspect-[9/16]" : "max-w-md aspect-[4/5]"
        }`}
      >
        {Array.from({ length: count }, (_, k) => k + 1).map((n) => (
          <img
            key={n}
            src={src(n)}
            alt={`${title}, slide ${n} of ${count}`}
            loading={n <= 2 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              n === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={n !== i}
          />
        ))}
        <button
          onClick={() => go(i - 1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-white backdrop-blur transition hover:bg-accent"
        >
          ←
        </button>
        <button
          onClick={() => go(i + 1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-white backdrop-blur transition hover:bg-accent"
        >
          →
        </button>
      </div>

      <div className="mx-auto mt-4 flex max-w-md items-center justify-between font-mono text-xs text-muted">
        <span aria-live="polite">
          {i} / {count}
        </span>
        <a href={src(i)} download className="text-cyan hover:underline">
          Download slide
        </a>
      </div>

      <div className="mx-auto mt-3 flex max-w-md gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Slide thumbnails">
        {Array.from({ length: count }, (_, k) => k + 1).map((n) => (
          <button
            key={n}
            role="tab"
            aria-selected={n === i}
            aria-label={`Go to slide ${n}`}
            onClick={() => setI(n)}
            className={`h-14 w-11 shrink-0 overflow-hidden rounded-md border transition ${
              n === i ? "border-cyan" : "border-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src(n)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PostMedia({ post }) {
  const hasVideo = Boolean(post.video);
  const [tab, setTab] = useState(hasVideo ? "video" : "slides");

  return (
    <div>
      {hasVideo ? (
        <div role="tablist" aria-label="Media" className="mx-auto mb-5 flex w-fit gap-1 rounded-full border border-white/10 p-1">
          {[
            ["video", "Watch"],
            ["slides", "Slides"],
          ].map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                tab === k ? "bg-accent text-white" : "text-muted hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      {tab === "video" && hasVideo ? (
        <div className="mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-panel">
          <video
            controls
            playsInline
            preload="metadata"
            poster={`/library/${post.cover}`}
            className="h-full w-full object-cover"
            src={`/library/${post.video}`}
          >
            Your browser can't play this video.
          </video>
        </div>
      ) : (
        <SlideViewer slug={post.slug} count={post.slides} aspect={post.aspect} title={post.title} />
      )}
    </div>
  );
}
