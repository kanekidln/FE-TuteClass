import { ChevronDown, ChevronLeft, Edit3, Eye, LayoutGrid, List, Search } from "lucide-react";
import type { AssignmentView } from "../../types";
import { studentSubmissions } from "./data";
import type { StudentSubmissionCard } from "./types";

export function StudentsTabOnly({ onNavigate }: { onNavigate: (view: AssignmentView) => void }) {
  return (
    <section className="mt-3">
      <StudentTabFilters />

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {studentSubmissions.map((student) => (
          <StudentCard key={student.name} student={student} onNavigate={onNavigate} />
        ))}
      </div>

      <Pagination />
    </section>
  );
}

export function StudentTabFilters() {
  const filters = [
    ["Tất cả", "25", "blue"],
    ["Cần chấm", "6", "orange"],
    ["Đã chấm", "15", "green"],
    ["Chưa nộp", "4", "gray"],
    ["Nộp muộn", "2", "red"],
  ];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map(([label, count, tone], index) => (
          <button
            key={label}
            className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-extrabold ${
              index === 0
                ? "border-[#2d61d6] bg-[#edf3ff] text-[#1f55c7]"
                : tone === "orange"
                ? "border-orange-200 bg-orange-50 text-orange-700"
                : tone === "green"
                ? "border-green-200 bg-green-50 text-green-700"
                : tone === "red"
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-[#dcc9a7] bg-[#fff8e9] text-[#40516a]"
            }`}
            type="button"
          >
            {label}
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px]">{count}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex h-9 min-w-[220px] items-center gap-2 rounded-md border border-[#dcc9a7] bg-[#fff8e9] px-3 text-xs font-semibold text-[#8d8275]">
          <Search size={15} />
          <input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Tìm học sinh..." />
        </label>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-[#2d61d6] bg-[#edf3ff] text-[#1f55c7]" type="button" aria-label="Xem dạng lưới">
          <LayoutGrid size={16} />
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-[#dcc9a7] bg-[#fff8e9]" type="button" aria-label="Xem dạng danh sách">
          <List size={16} />
        </button>
      </div>
    </div>
  );
}

export function StudentCard({
  student,
  onNavigate,
}: {
  student: StudentSubmissionCard;
  onNavigate: (view: AssignmentView) => void;
}) {
  const toneMap = {
    orange: "text-orange-700",
    green: "text-green-700",
    red: "text-red-600",
    gray: "text-[#77736b]",
  };

  const scoreToneMap = {
    orange: "text-orange-600",
    green: "text-green-700",
    black: "text-[#1f1b16]",
  };

  return (
    <section className="soft-paper rounded-xl border border-[#e2cda7] p-3">
      <div className="flex gap-3">
        <Avatar icon={student.avatar} />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-extrabold">{student.name}</h3>
          <div className={`mt-1 flex items-center gap-1 text-xs font-bold ${toneMap[student.statusTone]}`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            {student.status}
          </div>
          <div className="mt-1 text-xs font-semibold text-[#5b6878]">
            Nộp lúc:{" "}
            <span className={student.statusTone === "gray" ? "font-bold text-red-600" : ""}>
              {student.time}
            </span>
          </div>
        </div>
      </div>

      <div className="my-3 border-t border-dashed border-[#dbc59f]" />

      <div className="grid grid-cols-2 text-xs">
        <div className="border-r border-dashed border-[#cdb993] pr-3">
          <div className="font-bold">Trắc nghiệm</div>
          <div className={`mt-2 font-extrabold ${student.mcq === "-" ? "" : "text-green-700"}`}>
            {student.mcq}
          </div>
        </div>

        <div className="pl-3">
          <div className="font-bold">Tự luận</div>
          <div
            className={`mt-2 font-extrabold ${
              student.essay.startsWith("0/") || student.essay.startsWith("1/") || student.essay.startsWith("2/")
                ? "text-orange-600"
                : student.essay === "-"
                ? ""
                : "text-green-700"
            }`}
          >
            {student.essay}
          </div>
        </div>
      </div>

      <div className="my-3 border-t border-dashed border-[#dbc59f]" />

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold">{student.scoreLabel}</span>
        <span className={`text-xl font-extrabold ${scoreToneMap[student.scoreTone]}`}>
          {student.score.split(" / ")[0]}
          <span className="ml-1 text-xs font-semibold text-[#1f1b16]">/ 10</span>
        </span>
      </div>

      <ActionButton action={student.action} onNavigate={onNavigate} />
    </section>
  );
}

export function Avatar({ icon }: { icon: string }) {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#bfe5ea] text-2xl leading-none">
      {icon}
    </div>
  );
}

export function ActionButton({
  action,
  onNavigate,
}: {
  action: StudentSubmissionCard["action"];
  onNavigate: (view: AssignmentView) => void;
}) {
  if (action === "grade") {
    return (
      <button
        className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-orange-300 bg-orange-50 text-xs font-extrabold text-orange-700"
        onClick={() => onNavigate("grading")}
        type="button"
      >
        <Edit3 size={14} />
        Mở trang chấm bài
      </button>
    );
  }

  if (action === "view") {
    return (
      <button
        className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-green-300 bg-green-50 text-xs font-extrabold text-green-700"
        type="button"
      >
        <Eye size={14} />
        Xem bài đã chấm
      </button>
    );
  }

  return null;
}

export function Pagination() {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {["prev", "1", "2", "3", "next"].map((item) => (
        <button
          key={item}
          className={`grid h-9 w-9 place-items-center rounded-md border text-sm font-bold shadow-sm ${
            item === "1"
              ? "border-[#1f55c7] bg-[#1f55c7] text-white"
              : "border-[#dcc9a7] bg-[#fff8e9] text-[#1f1b16]"
          }`}
          type="button"
          aria-label={item === "prev" ? "Trang trước" : item === "next" ? "Trang sau" : `Trang ${item}`}
        >
          {item === "prev" ? <ChevronLeft size={16} /> : item === "next" ? <ChevronDown className="-rotate-90" size={16} /> : item}
        </button>
      ))}
    </div>
  );
}
