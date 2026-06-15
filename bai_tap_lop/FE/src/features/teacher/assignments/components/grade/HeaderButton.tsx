import type { ReactNode } from "react";

export function HeaderButton({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <button className="flex min-h-10 items-center gap-2 rounded-md border border-[#d4b98c] bg-[#fff7e8] px-4 py-2 text-sm font-extrabold text-[#1459d9] shadow-sm" type="button">
      {icon}
      {text}
    </button>
  );
}
