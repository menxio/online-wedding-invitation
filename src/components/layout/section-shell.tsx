import type { ReactNode } from "react";
import { Container } from "./container";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
};

export function SectionShell({ children, className = "", id, labelledBy }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-[var(--wedding-spacing-section)] ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
