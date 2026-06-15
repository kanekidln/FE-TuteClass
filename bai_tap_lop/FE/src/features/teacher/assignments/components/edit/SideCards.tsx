import type { ReactNode } from "react";
import { Bot, Check, Eye, Paperclip, Plus } from "lucide-react";
import type { AttachedFileProps } from "./types";

export function ScanImportCard({ onAddQuestion }: { onAddQuestion: (count?: number) => void }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-extrabold">Scan thêm file</h3>
          <p className="mt-1 text-xs font-semibold leading-5 text-[#5e6d7d]">
            Nhập câu hỏi mới từ tài liệu mà không làm rối vùng chỉnh sửa hiện tại.
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#bfdbfe] bg-[#eff6ff] text-[#1459d9]">
          <Bot size={17} />
        </span>
      </div>

      <div className="mt-3 rounded-lg border border-[#d8c7ab] bg-[#fffaf1] p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 text-xs font-bold text-[#40516a]">
            <div className="truncate">De_bo_sung_Chuong_3.pdf</div>
            <div className="mt-0.5 text-[11px] text-[#6b7786]">Đã nhận diện 4 câu mới</div>
          </div>
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#12866d] text-white">
            <Check size={13} />
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-[#dfd3c2]">
          <div className="h-full w-full rounded-full bg-[#1764ea]" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-extrabold sm:grid-cols-[1fr_1.35fr]">
        <button
          className="flex min-h-9 items-center justify-center gap-1 rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-[#1459d9]"
          type="button"
        >
          <Paperclip size={14} />
          Chọn file
        </button>
        <button
          className="flex min-h-9 items-center justify-center gap-1 rounded-md bg-[#1459d9] text-white"
          onClick={() => onAddQuestion(4)}
          type="button"
        >
          <Plus size={14} />
          Nhập 4 câu vào bài
        </button>
      </div>
    </Card>
  );
}

export function DescriptionCard() {
  return (
    <Card>
      <div className="mb-2 flex justify-between">
        <h3 className="font-extrabold">Mô tả bài tập</h3>
        <span>✎</span>
      </div>
      <p className="max-h-16 overflow-hidden text-xs leading-5">
        Đề kiểm tra 45 phút chương 3 gồm trắc nghiệm và tự luận. Học sinh làm bài trực tiếp trên hệ thống.
      </p>
      <div className="text-right text-[11px] text-[#66758a]">135/1000</div>
    </Card>
  );
}

export function FilesCard() {
  return (
    <Card>
      <div className="mb-2 flex justify-between">
        <h3 className="font-extrabold">Tài liệu đính kèm</h3>
        <button className="flex items-center gap-1 rounded-md border border-[#e0cdae] px-3 py-2 text-sm font-extrabold text-[#0d56d8]">
          <Plus size={14} />
          Thêm
        </button>
      </div>
      <File icon="PDF" color="bg-[#e3322e]" name="De_kiem_tra_45_phut_Toan_9A.pdf" size="1.24 MB" />
      <File icon="DOCX" color="bg-[#1e66d8]" name="Loi_giai_chi_tiet.docx" size="2.41 MB" />
    </Card>
  );
}

export function File({ icon, color, name, size }: AttachedFileProps) {
  return (
    <div className="flex items-center justify-between border-t border-[#ead6b6] py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded text-[9px] font-bold text-white ${color}`}>{icon}</span>
        <div className="min-w-0">
          <b className="block truncate text-sm">{name}</b>
          <div className="text-xs text-[#66758a]">{size}</div>
        </div>
      </div>
      <div className="flex shrink-0 gap-2 text-[#40516a]">
        <Eye size={15} />
        ×
      </div>
    </div>
  );
}

export function OptionsCard() {
  return (
    <Card>
      <h3 className="mb-2 font-extrabold">Tùy chọn khác</h3>
      <label className="block text-xs">
        <input checked readOnly type="checkbox" className="mr-2 accent-[#0d56d8]" />
        Cho phép học sinh xem đáp án sau khi nộp bài
      </label>
      <label className="mt-2 block text-xs">
        <input checked readOnly type="checkbox" className="mr-2 accent-[#0d56d8]" />
        Hiển thị kết quả ngay sau khi nộp bài
      </label>
      <div className="mt-2 flex items-center gap-3 text-xs font-bold">
        Trừ điểm khi nộp muộn
        <span className="rounded border border-[#e0cdae] bg-[#fffdf8] px-6 py-2">10</span> %
      </div>
    </Card>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <section className="soft-paper rounded-xl p-3">
      {children}
    </section>
  );
}
