export function IndexList({ children }: { children: React.ReactNode }) {
  return <dl className="index-list">{children}</dl>;
}

export function IndexRow({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="index-row">
      <dt className="index-term">{term}</dt>
      <dd className="index-def">{children}</dd>
    </div>
  );
}
