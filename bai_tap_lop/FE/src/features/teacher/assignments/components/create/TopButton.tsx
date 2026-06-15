import type { ReactNode } from "react";

export function TopButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      className="flex min-h-10 items-center gap-2 rounded-md border border-[#d4b98c] bg-[#fff7e8] px-3 py-2 text-sm font-extrabold text-[#1459d9] shadow-sm"
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
}
