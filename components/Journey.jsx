import { journey } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Journey() {
  return (
    <section id="learn" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead kicker="03 · THE JOURNEY" title="What we're covering here">
        A beginner-to-intermediate path through Web3 development, all on test networks. I learn it, build it, and teach it as I go.
      </SectionHead>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {journey.map((j) => (
          <li key={j.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold">
              {j.n}
            </span>
            <h3 className="mt-4 text-lg font-bold">{j.title}</h3>
            <p className="mt-2 text-muted">{j.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
