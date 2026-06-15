import { Plus } from "lucide-react";
import type { FilterTone, QuestionNavItem } from "./types";

export function QuestionNavigator({
  activeNumber,
  items,
  onAddQuestion,
  onSelect,
}: {
  activeNumber: number;
  items: QuestionNavItem[];
  onAddQuestion: (count?: number) => void;
  onSelect: (number: number) => void;
}) {
  const multipleChoiceCount = items.filter((item) => item.tone === "green").length;
  const essayCount = items.length - multipleChoiceCount;

  return (
    <section className="assignment-question-navigator soft-paper mt-2 rounded-xl p-2">
      <div className="assignment-question-filter-panel">
        <div className="assignment-question-filter-header">
          <span>Bộ lọc</span>
          <b>{items.length} câu</b>
        </div>

        <div className="assignment-question-filter__items">
          <Filter active label="Tất cả" count={String(items.length)} />
          <Filter label="Trắc nghiệm" count={String(multipleChoiceCount)} tone="green" />
          <Filter label="Tự luận" count={String(essayCount)} tone="purple" />
        </div>

        <div className="assignment-question-legend">
          <Legend c="bg-[#9bd594]" text="Trắc nghiệm" />
          <Legend c="bg-[#d8c1ec]" text="Tự luận" />
          <Legend c="bg-[#ef3030]" text="Chưa lưu" />
          <Legend c="bg-[#1e9851]" text="Hoàn thành" />
          <Legend c="bg-[#ff9a1f]" text="Cần kiểm tra" />
        </div>
      </div>

      <div className="assignment-question-map-panel">
        <div className="assignment-question-map-header">
          <div>
            <span>Map câu hỏi</span>
            <p>Chọn nhanh câu cần chỉnh sửa</p>
          </div>
          <button
            className="assignment-question-add-inline"
            onClick={() => onAddQuestion()}
            type="button"
          >
            <Plus size={14} strokeWidth={3} />
            Thêm câu
          </button>
        </div>

        <div className="assignment-question-map-grid mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-6 xl:grid-cols-12">
          {items.map(({ number, points, tone }) => {
            const isActive = activeNumber === number;

            return (
              <button
                key={number}
                onClick={() => onSelect(number)}
                type="button"
                aria-current={isActive ? "true" : undefined}
                className={[
                  "assignment-question-map-item relative grid h-12 min-w-0 place-items-center rounded-md border text-center font-extrabold shadow-sm transition-all",
                  tone === "purpleActive"
                    ? "is-essay border-[#6d4ed8] bg-[#e7d8ff] text-[#4f2da3]"
                    : tone === "purple" || tone === "purpleWarn"
                    ? "is-essay border-[#b88ce7] bg-[#ead8ff] text-[#5b2fb0]"
                    : "is-mcq border-[#93c973] bg-[#dff3cc] text-[#116b35]",
                  isActive ? "is-active z-10 border-2 !border-[#f2b431] ring-2 ring-[#ffd86b] ring-offset-2 ring-offset-[#fffaf1]" : "",
                ].join(" ")}
              >
                {(number === 4 || number === 8) && (
                  <span className="assignment-question-map-alert absolute right-[-4px] top-[-5px] h-3 w-3 rounded-full bg-[#ff3333]" />
                )}
                {number === 11 && <span className="assignment-question-map-warning absolute right-2 top-[-7px] text-[#ff9218]">!</span>}
                <span className="assignment-question-map-number text-base leading-none">{number}</span>
                <span className="assignment-question-map-points text-xs leading-none text-[#19253a]">{points}</span>
                {[1, 2, 3, 6].includes(number) && (
                  <span
                    className={`assignment-question-map-done absolute bottom-1.5 right-1.5 grid h-4 w-4 place-items-center rounded-full text-[10px] ${
                      isActive ? "bg-[#f2b431] text-white" : "bg-[#159750] text-white"
                    }`}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
          <button
            className="assignment-question-map-item assignment-question-map-add relative grid h-12 min-w-0 place-items-center rounded-full border-2 border-[#1459d9] bg-white text-[#1459d9] shadow-[0_4px_10px_rgba(20,89,217,.18)] transition-colors hover:bg-[#edf3ff]"
            onClick={() => onAddQuestion()}
            type="button"
            aria-label="Thêm câu hỏi mới"
            title="Thêm câu hỏi mới"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

    </section>
  );
}

export function Filter({
  label,
  count,
  active = false,
  tone,
}: {
  label: string;
  count: string;
  active?: boolean;
  tone?: FilterTone;
}) {
  return (
    <button
      className={[
        "rounded-md border px-2.5 py-1.5 text-xs font-extrabold",
        active
          ? "border-[#2d63ff] bg-[#edf3ff] text-[#1e56cf]"
          : tone === "green"
          ? "border-[#d5e6c6] bg-[#f5fbef] text-[#188344]"
          : "border-[#e0d2e9] bg-[#fbf5ff] text-[#6c45b5]",
      ].join(" ")}
    >
      {label}
      <span className="ml-2 rounded-full bg-white/70 px-2">{count}</span>
    </button>
  );
}

export function Legend({ c, text }: { c: string; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <i className={`h-3 w-3 rounded-sm ${c}`} />
      {text}
    </span>
  );
}
