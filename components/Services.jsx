import { services } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Services() {
  return (
    <section id="services" className="border-y border-white/10 bg-panel/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead kicker="02 · SERVICES" title="What I can build for you" />

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="rounded-2xl border border-white/10 bg-ink/60 p-6">
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-accent" aria-hidden="true" />
                    <span className="text-white/90">{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
