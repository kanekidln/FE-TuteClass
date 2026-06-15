import { Check, FileText, UploadCloud } from "lucide-react";

export function UploadPanel() {
  return (
    <div>
      <h2 className="text-lg font-extrabold">Tài liệu nguồn</h2>
      <p className="mt-1 text-xs font-semibold leading-5 text-[#40516a]">
        Upload tài liệu để AI trích xuất câu hỏi.
      </p>

      <div className="mt-3 rounded-lg border border-[#8db2e8] bg-[#fffaf1]/70 px-3 py-3 text-center">
        <UploadCloud className="mx-auto text-[#0f62e6]" size={26} />
        <div className="mt-1 text-xs font-extrabold text-[#0f62e6]">
          Kéo thả file vào đây
        </div>
        <div className="my-1 text-xs font-semibold text-[#536270]">hoặc</div>
        <button className="rounded-md border border-[#d7c6ab] bg-[#fffaf0] px-3 py-2 text-xs font-extrabold text-[#0f62e6]">
          Chọn file từ máy
        </button>
        <p className="mt-2 text-[11px] font-semibold text-[#6b7786]">
          PDF, Word, JPG, PNG - tối đa 50MB
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-[#ead8b8] bg-[#fffaf1] p-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded border border-[#ef8c7e] text-[#e3342f]">
            <FileText size={16} />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-[#263f64]">
              De_kiem_tra_45_phut_Toan_9A.pdf
            </div>
            <div className="text-[11px] font-semibold text-[#5b6878]">1.24 MB</div>
          </div>
        </div>
        <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#12866d] text-white">
          <Check size={14} />
        </div>
      </div>

      <div className="mt-3 border-t border-[#ead8b8] pt-3">
        <h2 className="text-lg font-extrabold">AI đang xử lý</h2>
        <p className="mt-1 text-xs font-semibold leading-5 text-[#5e6d7d]">
          AI đang đọc tài liệu và nhận diện câu hỏi.
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-[#dfd3c2]">
            <div className="h-full w-[85%] rounded-full bg-[#1764ea]" />
          </div>
          <span className="text-sm font-extrabold text-[#1764ea]">85%</span>
        </div>

        <ProcessItem done text="Nhận diện văn bản (OCR)" />
        <ProcessItem done text="Phân tích cấu trúc đề bài" />
        <ProcessItem done text="Nhận diện câu hỏi trắc nghiệm" />
        <ProcessItem text="Phân loại câu hỏi và trích xuất nội dung" />
      </div>
    </div>
  );
}

export function ProcessItem({ done, text }: { done?: boolean; text: string }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-[#485b72]">
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-xs ${
          done ? "bg-[#16866d] text-white" : "border-4 border-[#1764ea] border-t-transparent"
        }`}
      >
        {done ? <Check size={11} /> : null}
      </span>
      {text}
    </div>
  );
}
