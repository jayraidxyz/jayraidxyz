import Link from "next/link";
import { formatDate, typeColors } from "@/data/library";

export default function PostCard({ post, priority = false }) {
  const ratio = post.aspect === "9/16" ? "aspect-[9/16]" : "aspect-[4/5]";
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-white/[0.05]">
      <Link href={`/library/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read: ${post.title}`} />

      <div className={`relative w-full overflow-hidden bg-panel ${post.aspect === "9/16" ? "aspect-[4/5]" : ratio}`}>
        <img
          src={`/library/${post.cover}`}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
            post.aspect === "9/16" ? "object-[center_35%]" : "object-top"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
        <span
          className={`absolute left-4 top-4 rounded-md border bg-ink/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] backdrop-blur ${typeColors[post.type]}`}
        >
          {post.type.toUpperCase()}
        </span>
        {post.video ? (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-md border border-white/20 bg-ink/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] text-white backdrop-blur">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-cyan" aria-hidden="true">
              <path d="M2 1l7 4-7 4z" />
            </svg>
            VIDEO
          </span>
        ) : null}
        <span className="absolute bottom-3 right-4 font-mono text-[11px] text-white/80">{post.slides} slides</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] text-muted">
          {formatDate(post.date)} · {post.readMinutes} min read
        </p>
        <h3 className="mt-2 text-xl font-bold leading-snug">{post.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{post.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-muted">
          {post.tags.map((t) => (
            <li key={t} className="rounded-md border border-white/10 px-2 py-1">
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-5 text-sm font-medium text-cyan transition group-hover:translate-x-1">Read →</span>
      </div>
    </article>
  );
}
