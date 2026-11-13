"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";

const FILTERS = ["All", "Explainer", "Carousel", "Reel"];

export default function LibraryGrid({ posts }) {
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (!s) return true;
      return (p.title + " " + p.summary + " " + p.tags.join(" ")).toLowerCase().includes(s);
    });
  }, [posts, type, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filter by type" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = f === type;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={on}
                onClick={() => setType(f)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  on
                    ? "border-accent bg-accent text-white"
                    : "border-white/15 text-muted hover:border-cyan hover:text-white"
                }`}
              >
                {f === "All" ? "All" : f + "s"}
              </button>
            );
          })}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Search the library</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts or tags"
            className="w-full rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-white placeholder:text-muted/70"
          />
        </label>
      </div>

      {shown.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <PostCard key={p.slug} post={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-white/10 p-8 text-center text-muted">
          Nothing matches that. Try a different word or clear the filter.
        </p>
      )}
    </div>
  );
}
