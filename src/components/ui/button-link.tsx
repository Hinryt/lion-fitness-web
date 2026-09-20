import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ children, variant = "primary", className, ...props }: Props) {
  return (
    <Link
      className={cn(
        "button-base",
        variant === "primary" && "button-primary",
        variant === "secondary" && "button-secondary",
        variant === "ghost" && "button-ghost",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

