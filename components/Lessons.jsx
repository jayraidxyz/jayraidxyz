import Link from "next/link";
import { posts } from "@/data/posts";
import { formatDate } from "@/data/library";
import SectionHead from "./SectionHead";

export default function Lessons() {
  if (!posts.length) return null; // hidden until you add posts in data/library.js

  return (
    <section id="lessons" className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHead kicker="05 · LATEST LESSONS" title="Fresh from the feed" />
        <Link href="/resources#library" className="mb-10 text-sm font-medium text-cyan hover:underline">
          View the full library →
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-cyan/50"
          >
            <div className="aspect-[16/10] overflow-hidden bg-panel">
              <img
                src={p.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-[center_30%] transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-[11px] text-muted">
                {p.type.toUpperCase()} · {formatDate(p.date)}
              </p>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-muted">{p.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
