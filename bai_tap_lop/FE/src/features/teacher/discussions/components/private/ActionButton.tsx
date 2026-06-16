import type { LucideIcon } from "lucide-react";

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
};

export function ActionButton({ icon: Icon, label }: ActionButtonProps) {
  return (
    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#eadcc6] bg-white px-3 py-2 text-sm font-extrabold text-[#1e5cc6]" type="button">
      <Icon size={16} />
      {label}
    </button>
  );
}
