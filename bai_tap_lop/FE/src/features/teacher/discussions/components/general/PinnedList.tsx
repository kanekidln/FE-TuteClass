import { Pin } from "lucide-react";
import { getTagClassName } from "./helper";
import type { Announcement } from "./type";

type PinnedListProps = {
  items: Announcement[];
  onSelect: (notice: Announcement) => void;
};

export function PinnedList({ items, onSelect }: PinnedListProps) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 text-base font-extrabold">
          <Pin size={18} />
          Tin nhắn ghim
        </h3>
        <span className="text-xs font-bold text-[#5d708c]">Click để xem chi tiết</span>
      </div>

      <div className="teacher-pinned-grid mb-4 grid grid-cols-3 gap-2">
        {items.map((item) => (
          <button
            key={item.title}
            className="teacher-pinned-card rounded-lg border border-[#eadcc6] bg-[#fffdf7] p-2 text-left shadow-sm"
            onClick={() => onSelect(item)}
            type="button"
          >
            <div className="mb-1 flex items-center gap-2">
              <Pin className="shrink-0 text-[#1459d9]" size={14} />
              <h4 className="truncate text-sm font-extrabold leading-5">{item.title}</h4>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className={getTagClassName(item.tag)}>{item.tag}</span>
              <p className="text-xs font-semibold">{item.date}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
