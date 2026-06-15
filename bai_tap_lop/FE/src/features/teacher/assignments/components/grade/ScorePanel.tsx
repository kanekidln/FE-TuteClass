import { Clock, Send } from "lucide-react";

export function ScorePanel() {
  return (
    <aside className="soft-paper min-w-0 rounded-xl p-3">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#e0cdae] pb-3">
        <div>
          <h2 className="text-xl font-extrabold">Chấm điểm</h2>
          <p className="text-xs font-semibold text-[#66758a]">Nguyễn Minh Anh</p>
        </div>
        <Clock className="text-[#1459d9]" size={20} />
      </div>

      <div className="rounded-lg border border-[#d8c7ab] bg-[#fffaf1] p-3 text-center">
        <p className="text-xs font-extrabold text-[#40516a]">Điểm tổng</p>
        <p className="mt-1 text-4xl font-black text-[#1459d9]">
          8.5 <span className="text-lg text-[#1f3558]">/ 10</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <ScoreBox title="Trắc nghiệm" score="4" total="4" tone="green" />
        <ScoreBox title="Tự luận" score="4.5" total="6" tone="orange" />
      </div>

      <h3 className="mt-4 text-sm font-extrabold">Chi tiết theo câu</h3>
      <div className="mt-2 rounded-lg border border-dashed border-[#d8c7ab] bg-[#fffaf1]/70 p-2">
        <ScoreLine label="Câu 1 · TN" score="2 / 2" />
        <ScoreLine label="Câu 2 · TN" score="2 / 2" />
        <ScoreLine label="Câu 3 · TL" score="4.5 / 6" tone="orange" />
      </div>

      <h3 className="mt-4 text-sm font-extrabold">Nhận xét chung</h3>
      <div className="mt-2 min-h-32 rounded-lg border border-[#d8c7ab] bg-white p-3 text-sm font-semibold leading-6 text-[#273d5e]">
        Em làm đúng phần lớn yêu cầu của bài. Cần trình bày rõ hơn bước tìm giao điểm với trục Ox.
        <div className="mt-2 text-right text-[11px] text-[#66758a]">112/500</div>
      </div>

      <button className="mt-3 flex w-full min-h-11 items-center justify-center gap-2 rounded-md bg-[#1459d9] px-4 py-2 text-sm font-extrabold text-white" type="button">
        <Send size={16} />
        Chấm & tiếp theo
      </button>
    </aside>
  );
}

function ScoreBox({ title, score, total, tone }: { title: string; score: string; total: string; tone: "green" | "orange" }) {
  return (
    <div className="rounded-lg border border-[#d8c7ab] bg-white p-2 text-center">
      <p className="text-xs font-bold text-[#40516a]">{title}</p>
      <p className={`mt-2 text-xl font-black ${tone === "green" ? "text-[#14954a]" : "text-[#c96a15]"}`}>
        {score} <span className="text-sm text-[#40516a]">/ {total}</span>
      </p>
    </div>
  );
}

function ScoreLine({ label, score, tone }: { label: string; score: string; tone?: "orange" }) {
  return (
    <div className="flex justify-between border-b border-[#e0cdae] py-2 text-xs font-extrabold last:border-0">
      <span>{label}</span>
      <span className={tone === "orange" ? "text-[#c96a15]" : "text-[#14954a]"}>{score}</span>
    </div>
  );
}
