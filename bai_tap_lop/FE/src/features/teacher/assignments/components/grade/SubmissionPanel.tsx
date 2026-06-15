import { ChevronLeft, ChevronRight } from "lucide-react";
import { EssayCard } from "./EssayCard";
import { QuestionCard } from "./QuestionCard";

export function SubmissionPanel() {
  return (
    <section className="soft-paper rounded-xl p-3">
      <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button className="grid h-9 w-9 place-items-center rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-[#1459d9]" type="button" aria-label="Bài trước">
            <ChevronLeft size={17} />
          </button>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ffe0a3] text-xl">👨🏻</span>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold text-[#0b2d82]">Nguyễn Minh Anh</h2>
            <p className="text-xs font-semibold text-[#66758a]">Bài 16 / 21 <span className="mx-1">•</span> Nộp lúc 20/06 22:15</p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-[#1459d9]" type="button" aria-label="Bài tiếp theo">
            <ChevronRight size={17} />
          </button>
        </div>
        <span className="w-fit rounded-md border border-[#ffc9c1] bg-[#fff1ed] px-3 py-2 text-xs font-extrabold text-[#dc2626]">
          Nộp muộn 5 giờ
        </span>
      </div>

      <div className="space-y-3">
        <QuestionCard
          no="1"
          tag="Trắc nghiệm"
          point="2 điểm"
          question="Cho hàm số y = x^3 - 3x + 1. Hàm số đồng biến trên khoảng nào dưới đây?"
          options={["A. (-∞; -1)", "B. (-1; 1)", "C. (1; +∞)", "D. (-∞; 1)"]}
          correct={1}
          comment="Trả lời đúng."
          time="20/06 22:20"
        />
        <QuestionCard
          no="2"
          tag="Trắc nghiệm"
          point="2 điểm"
          question="Đạo hàm của hàm số y = x^3 - 3x + 1 là:"
          options={["A. 3x² - 3", "B. 3x² + 3", "C. x² - 3", "D. 3x³ - 3"]}
          correct={0}
          comment="Nhớ công thức đạo hàm bậc ba nhé."
          time="20/06 22:21"
        />
        <EssayCard />
      </div>
    </section>
  );
}
