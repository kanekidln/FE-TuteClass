import type { PanelProps } from "./types";

export function Panel({ icon, title, action, children }: PanelProps) {
  return (
    <section className="soft-paper rounded-xl p-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-extrabold">
          {icon}
          {title}
        </h2>
        <button className="font-extrabold text-[#1459d9]">{action}</button>
      </div>
      {children}
    </section>
  );
}
