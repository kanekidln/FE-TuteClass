import type { IconButtonProps } from "./types";

export function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button
      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#dec49d] bg-[#fff9ed] text-[#1459d9] hover:bg-[#f4e7cf]"
      type="button"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
