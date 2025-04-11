import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends ComponentProps<'h2'> {
  title: string
}

export function Heading({ title, className, ...props }: HeadingProps) {
  return (
    <h2
      className={twMerge(
        "text-lg font-bold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {title}
    </h2>
  );
}
