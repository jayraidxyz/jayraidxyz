export default function SectionHead({ kicker, title, children }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">{kicker}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {children ? <p className="mt-4 text-lg text-muted">{children}</p> : null}
    </div>
  );
}
