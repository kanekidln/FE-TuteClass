import type { HTMLAttributes, ReactNode } from "react";

type PaperCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function PaperCard({ children, className = "", ...props }: PaperCardProps) {
  return (
    <div className={`paper-texture ${className}`} {...props}>
      {children}
    </div>
  );
}
