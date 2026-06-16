import type { ReactNode } from "react";

type InfoBlockProps = {
  action: string;
  children: ReactNode;
  title: string;
};

export function InfoBlock({ action, children, title }: InfoBlockProps) {
  return (
    <section className="mb-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wide">{title}</h3>
        <span className="text-xs font-extrabold text-[#1459d9]">{action}</span>
      </div>
      {children}
    </section>
  );
}
