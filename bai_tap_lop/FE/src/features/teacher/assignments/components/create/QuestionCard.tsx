import { useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, Circle, Copy, Edit3, Flag, MoreHorizontal, Plus, Repeat2, Trash2 } from "lucide-react";
import type { AnswerProps, QuestionCardProps } from "./types";

export function AddInlineButton({ text }: { text: string }) {
  return (
    <button className="mt-2 flex items-center gap-1 text-sm font-bold text-[#1764ea]" type="button">
      <Plus size={15} />
      {text}
    </button>
  );
}


export function QuestionCard({ no, type, color, score, trust, children }: QuestionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const actions = [
    { label: "Nhân bản câu hỏi", icon: <Copy size={14} /> },
    { label: "Di chuyển lên", icon: <ArrowUp size={14} /> },
    { label: "Di chuyển xuống", icon: <ArrowDown size={14} /> },
    { label: "Đổi loại câu hỏi", icon: <Repeat2 size={14} /> },
    { label: "Đánh dấu cần kiểm tra", icon: <Flag size={14} /> },
    { label: "Xóa câu hỏi", icon: <Trash2 size={14} />, danger: true },
  ];

  return (
    <div className="mt-3 rounded-lg border border-[#e5d4b5] bg-[#fffaf1]/85 p-3">
      <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${color === "blue" ? "bg-[#1764ea]" : "bg-[#f28a16]"}`} />
          <span className="text-base font-extrabold">Câu {no}</span>
          <span
            className={`rounded px-2 py-1 text-xs font-bold ${
              color === "blue" ? "bg-[#e7dcff] text-[#6b42d8]" : "bg-[#ffe4bf] text-[#e46e1d]"
            }`}
          >
            {type}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-[#159260]">{score}</span>
          <span className="text-[#6a7480]">
            Độ tin cậy: <b className="rounded bg-[#d7efd7] px-2 py-1 text-[#128454]">{trust}</b>
          </span>
          <button
            className="grid h-8 w-8 place-items-center rounded-md border border-[#d7c6ab] bg-[#fffaf1]"
            type="button"
            aria-label={`Chỉnh sửa câu ${no}`}
            title={`Chỉnh sửa câu ${no}`}
          >
            <Edit3 size={14} />
          </button>
          <div className="relative">
            <button
              className="grid h-8 w-8 place-items-center rounded-md border border-[#d7c6ab] bg-[#fffaf1]"
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
              aria-label={`Mở thêm thao tác cho câu ${no}`}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              title={`Thao tác khác cho câu ${no}`}
            >
              <MoreHorizontal size={14} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-xs shadow-lg"
                role="menu"
              >
                {actions.map((action) => (
                  <button
                    key={action.label}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[#f4e7cf] ${
                      action.danger ? "text-red-600" : "text-[#33445f]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                    type="button"
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-sm text-[#273d5e] lg:ml-5">{children}</div>
    </div>
  );
}


export function Answer({ label, text, selected, small }: AnswerProps) {
  return (
    <div
      className={`mt-2 flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
        selected ? "border-[#b7d6ae] bg-[#e8f5dd]" : "border-[#dccdb1] bg-[#fffaf1]"
      } ${small ? "mt-0" : ""}`}
    >
      <span>
        <b>{label}</b>
        <span className="ml-3 font-serif">{text}</span>
      </span>
      <span className={selected ? "text-[#16866d]" : "text-[#68809b]"}>
        {selected ? <CheckCircle2 size={17} /> : <Circle size={17} />}
      </span>
    </div>
  );
}
