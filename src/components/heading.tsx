interface HeadingProps {
  title: string
}

export function Heading({ title }: HeadingProps) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
  );
}