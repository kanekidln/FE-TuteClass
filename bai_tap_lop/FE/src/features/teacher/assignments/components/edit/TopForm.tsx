import type { ReactNode } from "react";

export function TopForm() {
  return (
    <section className="soft-paper rounded-xl p-2">
      <div className="assignment-edit-title-grid grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.35fr)_minmax(240px,1.25fr)_minmax(120px,.65fr)_minmax(160px,.8fr)_112px]">
        <Field label="Tiêu đề bài tập *">
          <input className="assignment-edit-input" value="Đề kiểm tra 45 phút - Toán 9A (Chương 3)" readOnly />
        </Field>

        <Field label="Lớp áp dụng *">
          <div className="assignment-edit-input flex flex-wrap items-center gap-2">
            {["Toán 9A ×", "Toán 9B ×", "Toán 9C ×"].map((x) => (
              <span key={x} className="rounded border border-[#d5c2a4] bg-[#fff8e8] px-2 py-1 text-xs">
                {x}
              </span>
            ))}
            <b className="text-xs text-[#0d55d8]">+ Thêm lớp</b>
          </div>
        </Field>

        <Field label="Thời gian làm bài *">
          <div className="assignment-edit-input flex justify-between">
            <span>◴ &nbsp;45</span>
            <b>phút</b>
          </div>
        </Field>

        <Field label="Hạn nộp bài *">
          <input className="assignment-edit-input" value="▣   20/05/2024   23:59" readOnly />
        </Field>

        <Field label="Trạng thái">
          <div className="rounded-md bg-[#fff0d9] px-4 py-2.5 text-center text-sm font-bold text-[#f08a1f]">
            Chưa giao
          </div>
        </Field>
      </div>
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-extrabold text-[#20375f]">{label}</div>
      {children}
    </label>
  );
}
