import { projects } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead kicker="01 · WORK" title="Things I've built">
        Products I've shipped and am building, in public. Case studies are on the way.
      </SectionHead>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.name}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan/50 hover:bg-white/[0.05]"
          >
            <p className="font-mono text-[11px] font-bold tracking-[0.14em] text-cyan">{p.tag.toUpperCase()}</p>
            <h3 className="mt-3 text-2xl font-bold">{p.name}</h3>
            <p className="mt-3 flex-1 text-muted">{p.text}</p>

            <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] text-muted">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-white/10 px-2.5 py-1">
                  {s}
                </li>
              ))}
            </ul>

            {p.href ? (
              <div className="mt-6 text-sm">
                <a href={p.href} className="font-medium text-cyan hover:underline" target="_blank" rel="noreferrer">
                  View project →
                </a>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
