import { Search, SlidersHorizontal } from "lucide-react";
import { students } from "./data";
import { FilterPill } from "./FilterPill";
import { statusColor } from "./utils";

export function StudentList() {
  return (
    <aside className="soft-paper min-w-0 rounded-xl p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold">Học sinh</h2>
          <p className="text-xs font-semibold text-[#66758a]">21 bài nộp</p>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-[#1459d9]" type="button" aria-label="Bộ lọc">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <div className="mb-3 flex h-10 items-center gap-2 rounded-md border border-[#d8c7ab] bg-[#fffaf1] px-3 text-xs font-bold text-[#66758a]">
        <Search size={15} />
        Tìm học sinh...
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-xs font-extrabold">
        <FilterPill active text="Tất cả" count="21" />
        <FilterPill text="Cần chấm" count="5" tone="orange" />
        <FilterPill text="Đã chấm" count="16" tone="green" />
        <FilterPill text="Nộp muộn" count="2" tone="red" />
      </div>

      <div className="custom-scrollbar max-h-[560px] space-y-1.5 overflow-y-auto pr-1">
        {students.map((student) => (
          <button
            className={`grid w-full grid-cols-[38px_minmax(0,1fr)_44px] items-center gap-2 rounded-lg border px-2.5 py-2 text-left ${
              student.active ? "border-[#f4b23c] bg-[#fff4df]" : "border-transparent bg-white/45 hover:border-[#e0cdae]"
            }`}
            key={student.name}
            type="button"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe0a3] text-lg">{student.avatar}</span>
            <span className="min-w-0">
              <b className="block truncate text-sm text-[#0b2d82]">{student.name}</b>
              <span className={`block text-[11px] font-extrabold ${statusColor(student.tone)}`}>{student.status}</span>
              <span className="block text-[11px] font-semibold text-[#66758a]">{student.time}</span>
            </span>
            <b className={`text-right text-sm ${student.score === "-" ? "text-[#9aa4b2]" : "text-[#14954a]"}`}>{student.score}</b>
          </button>
        ))}
      </div>
    </aside>
  );
}
