import { Minus, Plus } from "lucide-react";
import { TeacherComment } from "./TeacherComment";

export function EssayCard() {
  return (
    <section className="assignment-essay-card rounded-lg border border-[#e0cdae] bg-[#fffdf8] p-3">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#7547b8] text-sm font-extrabold text-white">3</span>
        <span className="rounded bg-[#eadcff] px-2.5 py-1 text-xs font-extrabold text-[#8052cf]">Tự luận</span>
        <b className="text-sm">6 điểm</b>
        <span className="ml-auto text-xs font-extrabold text-[#c96a15]">Giáo viên chấm</span>
      </div>
      <p className="text-sm font-semibold leading-6 text-[#273d5e]">
        Khảo sát sự biến thiên và vẽ đồ thị hàm số y = x^3 - 3x + 1.
      </p>
      <div className="assignment-essay-grade-layout mt-3 grid grid-cols-1 gap-3">
        <div className="assignment-essay-work">
          <div className="assignment-essay-work-header mb-2">
            <b className="block text-xs text-[#0b2d82]">Bài làm của học sinh</b>
            <div className="assignment-essay-inline-score">
              <span>Điểm</span>
              <button type="button" aria-label="Giảm điểm tự luận">
                <Minus size={13} strokeWidth={3} />
              </button>
              <strong>4.5</strong>
              <button type="button" aria-label="Tăng điểm tự luận">
                <Plus size={13} strokeWidth={3} />
              </button>
              <em>/ 6</em>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-28 rounded-md border border-[#ead8b9] bg-[#fff7ec] p-3 text-xs leading-5 text-[#3159a6]">
              TXĐ: R<br />y' = 3x² - 3<br />Bảng biến thiên...
            </div>
            <div className="grid h-28 place-items-center rounded-md border border-[#ead8b9] bg-[linear-gradient(#ead8b9_1px,transparent_1px),linear-gradient(90deg,#ead8b9_1px,transparent_1px)] [background-size:12px_12px] text-3xl text-[#4874c4]">
              ∿
            </div>
          </div>
        </div>
      </div>
      <TeacherComment comment="Làm đúng phần khảo sát, đồ thị tương đối chính xác. Cần trình bày rõ hơn bước giao trục." time="20/06 22:27" />
    </section>
  );
}
