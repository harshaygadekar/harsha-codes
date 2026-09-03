export function PageIntro({
  title,
  lede,
  id,
}: {
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <header className="mb-14 sm:mb-16">
      <h1
        id={id}
        className="font-display text-[2.35rem] font-normal leading-none tracking-[-0.03em] text-foreground sm:text-[2.75rem]"
      >
        {title}
      </h1>
      {lede ? (
        <p className="mt-3 max-w-md text-[0.975rem] leading-relaxed text-muted-foreground">
          {lede}
        </p>
      ) : null}
    </header>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 font-mono text-[0.72rem] tracking-[0.04em] text-muted-foreground">
      {children}
    </h2>
  );
}
