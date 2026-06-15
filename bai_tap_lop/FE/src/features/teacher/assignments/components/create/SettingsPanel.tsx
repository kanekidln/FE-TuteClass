import { useState } from "react";
import { ChevronDown, FileText, Paperclip, Plus, X } from "lucide-react";
import { Field } from "./Field";

export function SettingsPanel() {
  const lessonOptions = [
    "Buổi 15 - Hàm số bậc hai (13/06/2026)",
    "Buổi 14 - Hệ phương trình bậc nhất hai ẩn (06/06/2026)",
    "Buổi 13 - Phương trình bậc hai (30/05/2026)",
    "Buổi 12 - Định lý Viète (23/05/2026)",
  ];
  const [durationMinutes, setDurationMinutes] = useState("45");

  return (
    <>
      <h2 className="text-xl font-extrabold">Thiết lập bài tập</h2>
      <p className="mt-1 text-sm font-semibold text-[#5e6d7d]">
        Hoàn thiện thông tin và tùy chọn trước khi tạo bài tập.
      </p>

      <Field label="Tiêu đề bài tập *">
        <textarea
          value="Đề kiểm tra 45 phút - Toán 9A (Chương 3)"
          readOnly
          className="assignment-create-input assignment-create-input--tall resize-none"
        />
      </Field>

      <Field label="Mô tả (tùy chọn)">
        <textarea
          readOnly
          value={`Đề kiểm tra 45 phút chương 3 gồm 2 phần:\n- Phần I: Trắc nghiệm (8 câu)\n- Phần II: Tự luận (4 câu)\nHọc sinh làm bài trực tiếp trên hệ thống.`}
          className="assignment-create-input h-36 resize-none leading-7"
        />
      </Field>

      <Field label="Lớp áp dụng *">
        <div className="flex flex-wrap gap-3">
          {["Toán 9A", "Toán 9B", "Toán 9C"].map((c) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-md border border-[#d8c7ab] bg-[#fffaf1] px-3 py-2 text-xs font-medium">
              {c}
              <button className="grid h-4 w-4 place-items-center rounded hover:bg-[#ead6b6]" type="button" aria-label={`Xóa lớp ${c}`}>
                <X size={12} />
              </button>
            </span>
          ))}
          <button className="rounded-md border border-[#d8c7ab] bg-[#fffaf1] px-3 py-2 text-xs font-semibold text-[#1764ea]">
            <span className="inline-flex items-center gap-1">
              <Plus size={14} />
              Thêm lớp
              <ChevronDown size={14} />
            </span>
          </button>
        </div>
      </Field>

      <Field label="Buổi học liên quan (tùy chọn)">
        <select defaultValue={lessonOptions[0]} className="assignment-create-input">
          {lessonOptions.map((lesson) => (
            <option key={lesson} value={lesson}>
              {lesson}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <Field label="Thời gian làm bài (phút) *">
          <div className="grid grid-cols-[minmax(0,1fr)_112px] gap-2">
            <select
              value={durationMinutes}
              className="assignment-create-input"
              onChange={(event) => setDurationMinutes(event.target.value)}
              aria-label="Chọn nhanh thời gian làm bài"
            >
              <option value="30">30 phút</option>
              <option value="45">45 phút</option>
              <option value="60">60 phút</option>
              <option value="90">90 phút</option>
              <option value="120">120 phút</option>
            </select>
            <div className="relative">
              <input
                type="number"
                min={1}
                step={5}
                value={durationMinutes}
                onChange={(event) => setDurationMinutes(event.target.value)}
                className="assignment-create-input pr-16"
                aria-label="Nhập thời gian làm bài tùy chỉnh tính bằng phút"
              />
              <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#687687]">
                phút
              </span>
            </div>
          </div>
        </Field>
        <Field label="Hạn nộp bài *">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
            <input type="date" defaultValue="2026-06-20" className="assignment-create-input" />
            <input type="time" defaultValue="23:59" className="assignment-create-input" />
          </div>
        </Field>
      </div>

      <Field label="Tài liệu đính kèm (tùy chọn)">
        <div className="flex items-center justify-between gap-3 rounded-md border border-[#e0ceb0] bg-[#fffaf1] p-3">
          <div className="flex items-center gap-4">
            <FileText className="shrink-0 text-[#e3342f]" size={24} />
            <div className="min-w-0">
              <div className="truncate text-xs font-medium">Bang_cu_thuc_Toan_9.pdf</div>
              <div className="text-xs text-[#687687]">512 KB</div>
            </div>
          </div>
          <button className="grid h-7 w-7 shrink-0 place-items-center rounded-md hover:bg-[#ead6b6]" type="button" aria-label="Xóa tài liệu">
            <X size={16} />
          </button>
        </div>
      </Field>

      <button className="mt-3 flex items-center gap-1 rounded-md border border-[#d8c7ab] bg-[#fffaf1] px-3 py-2 text-sm font-bold text-[#1764ea]">
        <Paperclip size={15} />
        Thêm tài liệu
      </button>

      <div className="mt-5">
        <div className="text-sm font-extrabold">Tùy chọn khác</div>
        <label className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#47586c]">
          <input type="checkbox" className="h-5 w-5" />
          Cho phép học sinh xem đáp án sau khi nộp bài
        </label>
        <label className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#47586c]">
          <input type="checkbox" checked readOnly className="h-5 w-5 accent-[#1764ea]" />
          Hiển thị kết quả ngay sau khi nộp bài
        </label>
      </div>

      <style>{`
        .assignment-create-input {
          width: 100%;
          border: 1px solid #d8c7ab;
          background: #fffaf1;
          border-radius: 7px;
          padding: 10px 12px;
          color: #253b5a;
          font-size: 13px;
          font-weight: 400;
          outline: none;
        }

        .assignment-create-input--tall {
          height: 82px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}
