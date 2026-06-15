import type { ReactNode } from "react";
import { ArrowLeft, ChevronDown, Eye, Save, Send } from "lucide-react";
import type { AssignmentView } from "../../types";

export function Texture() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(#b88a4d_0.7px,transparent_0.7px)] [background-size:17px_17px] opacity-[.12]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(0deg,rgba(116,86,43,.10)_1px,transparent_1px)] [background-size:100%_29px]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,.75),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(255,247,228,.6),transparent_30%)]" />
    </>
  );
}

export function Decor() {
  return (
    <>
      <div className="absolute right-[-15px] top-20 h-10 w-11 rotate-[-20deg] bg-[#efc171]/70 shadow" />
      <div className="absolute right-3 top-28 h-10 w-11 rotate-[20deg] bg-[#efc171]/55 shadow" />
      <div className="absolute bottom-3 right-8 h-9 w-24 rotate-[-15deg] bg-[#eabd6b]/60 shadow" />
      <div className="absolute bottom-8 right-2 text-5xl text-[#d39a42]">⌇</div>
    </>
  );
}

export function Header({ onNavigate }: { onNavigate: (view: AssignmentView) => void }) {
  return (
    <header className="assignment-edit-header paper mb-2 flex flex-col gap-2 rounded-sm px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <button
          className="mb-1 flex items-center gap-2 text-xs font-extrabold text-[#1459d9]"
          onClick={() => onNavigate("detail")}
          type="button"
        >
          <ArrowLeft size={14} />
          <span>Quay lại chi tiết bài tập</span>
        </button>
        <h1 className="title-font text-2xl font-bold leading-tight text-[#163467]">
          Chỉnh sửa bài tập
        </h1>
        <p className="text-sm font-semibold leading-snug text-[#203b69]">
          Cập nhật nội dung và thiết lập trước khi giao bài
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <TopButton icon={<Eye size={16} />} text="Xem trước" />
        <TopButton icon={<Save size={16} />} text="Lưu nháp" />
        <button className="flex min-h-9 items-center gap-2 rounded-md bg-[#1459d9] px-3 py-2 text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(20,89,217,.22)]">
          <Send size={16} />
          Lưu & giao bài
          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  );
}

export function TopButton({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <button className="flex min-h-9 items-center gap-2 rounded-md border border-[#d4b98c] bg-[#fff7e8] px-3 py-2 text-sm font-extrabold text-[#1459d9] shadow-sm">
      {icon}
      {text}
    </button>
  );
}
