import { useState } from "react";
import { Edit3, Eye, MoreHorizontal } from "lucide-react";
import type { AssignmentGroupProps } from "./types";

export function AssignmentGroup({ rows, onOpenAssignment, onNavigate }: AssignmentGroupProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="assignment-lesson-assignment-list rounded-lg border border-[#dfc49a] bg-[#fff8ec]/80 p-3">
      {rows.map((r, i) => (
        <div
          key={r[0]}
          className="grid cursor-pointer grid-cols-[20px_minmax(96px,1fr)_max-content_max-content_28px] items-center gap-3 border-b border-[#ead6b6] py-2 text-xs font-semibold hover:bg-[#fff1d8]/70"
          onClick={onOpenAssignment}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenAssignment();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span>{i + 1}.</span>
          <span className="min-w-0 truncate">{r[0]}</span>
          <b className="whitespace-nowrap text-green-700">{r[1]}</b>
          <span className="whitespace-nowrap text-violet-600">{r[2]}</span>
          <div className="relative justify-self-end">
            <button
              className="grid h-7 w-7 place-items-center rounded-md hover:bg-[#ead6b6]"
              onClick={(event) => {
                event.stopPropagation();
                setOpenMenu((current) => (current === r[0] ? null : r[0]));
              }}
              type="button"
              aria-label={`Mở menu ${r[0]}`}
              aria-expanded={openMenu === r[0]}
              aria-haspopup="menu"
            >
              <MoreHorizontal size={18} />
            </button>

            {openMenu === r[0] && (
              <div
                className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-md border border-[#dec49d] bg-[#fff9ed] text-xs shadow-lg"
                role="menu"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left font-bold text-[#1459d9] hover:bg-[#f4e7cf]"
                  onClick={() => {
                    setOpenMenu(null);
                    onNavigate("detail");
                  }}
                  role="menuitem"
                  type="button"
                >
                  <Eye size={14} />
                  Xem chi tiết
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left font-bold text-[#1459d9] hover:bg-[#f4e7cf]"
                  onClick={() => {
                    setOpenMenu(null);
                    onNavigate("grading");
                  }}
                  role="menuitem"
                  type="button"
                >
                  <Edit3 size={14} />
                  Chấm bài
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
