import { useState, type ReactNode } from "react";
import { Bot, ChevronDown, FileText, ListChecks, Plus } from "lucide-react";
import type { StatProps } from "./types";
import { AddInlineButton, Answer, QuestionCard } from "./QuestionCard";

export function PreviewPanel() {
  const sortOptions = ["Thứ tự trong đề", "Độ tin cậy", "Điểm số"];
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h2 className="text-xl font-extrabold">AI Preview - Kết quả nhận diện</h2>
      <p className="mt-1 text-sm font-semibold text-[#5e6d7d]">
        AI đã nhận diện được các câu hỏi từ tài liệu. Hãy kiểm tra và chỉnh sửa nếu cần.
      </p>

      <div className="mt-3 grid grid-cols-1 rounded-lg border border-[#d9cfb8] bg-[#f4f1dc]/70 py-3 sm:grid-cols-3">
        <Stat icon={<Bot size={20} />} label="Tổng số câu hỏi" value="12" />
        <Stat icon={<ListChecks size={20} />} label="Trắc nghiệm" value="8" />
        <Stat icon={<FileText size={20} />} label="Tự luận" value="4" last />
      </div>

      <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Tab active text="Tất cả (12)" />
          <Tab icon={<ListChecks size={14} />} text="Trắc nghiệm (8)" />
          <Tab icon={<FileText size={14} />} text="Tự luận (4)" />
        </div>
        <div className="relative flex items-center gap-2 text-sm font-bold text-[#59677a]">
          Sắp xếp theo:
          <button
            className="flex items-center gap-2 rounded-md border border-[#d8c7ab] bg-[#fffaf1] px-3 py-2 text-xs text-[#59677a]"
            onClick={() => setSortOpen((current) => !current)}
            type="button"
            aria-expanded={sortOpen}
            aria-haspopup="listbox"
          >
            <span>{sortBy}</span>
            <ChevronDown className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} size={14} />
          </button>
          {sortOpen && (
            <div
              className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-xs shadow-lg"
              role="listbox"
            >
              {sortOptions.map((option) => (
                <button
                  key={option}
                  className={`block w-full px-3 py-2 text-left hover:bg-[#f4e7cf] ${
                    option === sortBy ? "font-extrabold text-[#1459d9]" : "font-semibold text-[#59677a]"
                  }`}
                  onClick={() => {
                    setSortBy(option);
                    setSortOpen(false);
                  }}
                  role="option"
                  type="button"
                  aria-selected={option === sortBy}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="custom-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
        <QuestionCard no={1} type="Trắc nghiệm" color="blue" score="2 điểm" trust="95%">
          <p className="font-semibold">Cho phương trình x² − 5x + 2 = 0. Nghiệm của phương trình là:</p>
          <Answer selected label="A." text="x = 1; x = 2" />
          <Answer label="B." text="x = 1; x = −2" />
          <Answer label="C." text="x = −1; x = 2" />
          <Answer label="D." text="x = −1; x = −2" />
          <AddInlineButton text="Thêm đáp án" />
        </QuestionCard>

        <QuestionCard no={2} type="Trắc nghiệm" color="blue" score="2 điểm" trust="90%">
          <p className="font-semibold">Đồ thị hàm số y = 2x + 3 cắt trục tung tại điểm có tung độ bằng:</p>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            <Answer small label="A." text="2" />
            <Answer small selected label="B." text="3" />
            <Answer small label="C." text="−2" />
            <Answer small label="D." text="−3" />
          </div>
          <AddInlineButton text="Thêm đáp án" />
        </QuestionCard>

        <QuestionCard no={3} type="Tự luận" color="orange" score="3 điểm" trust="88%">
          <p className="font-semibold">Phương trình x² − 4x − 5 = 0 có hai nghiệm bằng:</p>
        </QuestionCard>

        <QuestionCard no={9} type="Tự luận" color="orange" score="4 điểm" trust="85%">
          <p className="font-semibold">Giải hệ phương trình sau bằng phương pháp thế:</p>
          <div className="mt-3 border-l-2 border-[#203a5c] pl-4 font-serif text-base leading-7 text-[#203a5c]">
            2x + y = 5 <br />
            x − 3y = −4
          </div>
        </QuestionCard>

        <button className="mt-3 flex w-full items-center justify-center rounded-md border border-dashed border-[#d5c4a6] py-2 text-sm font-extrabold text-[#1764ea]">
          <Plus className="mr-2" size={16} />
          Thêm câu hỏi thủ công
        </button>
      </div>
    </div>
  );
}


export function Stat({ icon, label, value, last }: StatProps) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 ${!last ? "border-b border-[#d8c9ac] sm:border-b-0 sm:border-r" : ""}`}>
      <span className="text-[#16866d]">{icon}</span>
      <div>
        <div className="text-xs font-bold text-[#536276]">{label}</div>
        <div className="text-xl font-extrabold">{value}</div>
      </div>
    </div>
  );
}

export function Tab({ text, active, icon }: { text: string; active?: boolean; icon?: ReactNode }) {
  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold ${
        active
          ? "bg-[#1764ea] text-white"
          : "border border-[#d8c7ab] bg-[#fffaf1] text-[#44556d]"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

