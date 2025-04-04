interface DescriptionProps {
  value: string
}

export function Description({ value }: DescriptionProps) {
  return (
    <span className="text-muted-foreground">{value}</span>
  );
}
