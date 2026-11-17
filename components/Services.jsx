import { ArrowUpRight, Check } from "lucide-react";
import { services, site } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Services() {
  const [offering] = services;
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`;

  if (!offering) return null;

  return (
    <section id="services" className="border-y border-white/10 bg-panel/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead kicker="02 · SERVICES" title="What I can build for you" />

        <article className="grid gap-8 rounded-2xl border border-white/10 bg-ink/70 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{offering.title}</h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{offering.text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={mail}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-[#6470ff]"
              >
                <span>Start a project</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#work"
                className="whitespace-nowrap shrink-0 text-sm font-medium text-muted transition hover:text-cyan"
              >
                See things I've built →
              </a>
            </div>
          </div>

          <ul className="divide-y divide-white/10 border-t border-white/10 lg:border-l lg:border-t-0 lg:pl-8">
            {offering.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3 py-4 first:pt-4 lg:first:pt-0 last:pb-0">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                <span className="text-[15px] leading-relaxed text-white/90">{pt}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
