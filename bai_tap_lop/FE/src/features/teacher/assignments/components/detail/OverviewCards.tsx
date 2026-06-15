import { AlertTriangle, BarChart3, CheckCircle2, ChevronDown, Clock, Eye, FileText, MoreHorizontal } from "lucide-react";
import type { AssignmentView } from "../../types";
import { attentionStudents, recentActivities } from "./data";
import type { AttentionStudent } from "./types";

export function ProgressCard({ onNavigate }: { onNavigate: (view: AssignmentView) => void }) {
  return (
    <section className="soft-paper h-full rounded-xl border border-[#dec49d] p-3">
      <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-[#163467]">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f0df] text-[#527a46]">
          <BarChart3 size={19} />
        </span>
        Tiến độ bài tập
      </h2>

      <div className="flex items-center gap-3">
        <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full bg-[conic-gradient(#5f8f58_0_84%,#d28b3b_84%_91%,#e8d8bc_91%_100%)] shadow-[inset_0_0_0_1px_rgba(94,72,43,.18)]">
          <div className="grid h-20 w-20 place-items-center rounded-full border border-[#dec49d] bg-[#fff8ea] text-center shadow-sm">
            <div>
              <b className="text-xl text-[#527a46]">21/25</b>
              <p className="text-xs font-extrabold text-[#527a46]">Đã nộp</p>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-2xl font-extrabold text-[#527a46]">84%</p>
          <Legend color="bg-[#5f8f58]" title="Đã nộp" value="21 học sinh" />
          <Legend color="bg-[#d28b3b]" title="Chưa nộp" value="4 học sinh" />
          <button className="text-xs font-extrabold text-[#1d5fb8] hover:text-[#154a91]" onClick={() => onNavigate("grading")} type="button">
            Mở danh sách chấm bài
          </button>
        </div>
      </div>
    </section>
  );
}

export function Legend({ color, title, value }: { color: string; title: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-3 w-3 rounded ${color}`} />
      <div>
        <b className="text-sm">{title}</b>
        <p className="text-xs font-semibold text-[#5b6878]">{value}</p>
      </div>
    </div>
  );
}

export function TasksCard({ onNavigate }: { onNavigate: (view: AssignmentView) => void }) {
  return (
    <section className="soft-paper h-full overflow-hidden rounded-xl border border-[#9bb88d] bg-[#eef5e6] shadow-[0_10px_22px_rgba(66,111,63,.12)]">
      <button
        className="group grid h-full w-full grid-cols-[76px_minmax(0,1fr)] gap-4 p-4 text-left transition-colors hover:bg-[#e5efd9] sm:grid-cols-[76px_minmax(0,1fr)_136px] sm:items-center"
        onClick={() => onNavigate("grading")}
        type="button"
        aria-label="Chấm 6 bài đang chờ"
      >
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-[#9bb88d] bg-[#fffaf1] text-[#426f3f] shadow-sm">
          <FileText size={28} />
          <span className="absolute -right-2 -top-2 grid h-7 min-w-7 place-items-center rounded-full border border-[#fffaf1] bg-[#426f3f] px-2 text-sm font-extrabold text-white">
            6
          </span>
        </div>

        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2 text-xs font-extrabold uppercase text-[#426f3f]">
            <CheckCircle2 size={14} />
            Hành động chính
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-[#163467]">
            Chấm bài ngay
          </h2>
          <p className="mt-1 text-sm font-bold text-[#536270]">
            6 bài đang chờ chấm, trong đó có 2 bài nộp muộn
          </p>
        </div>

        <span className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-md bg-[#1d5fb8] px-4 text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(29,95,184,.2)] transition-colors group-hover:bg-[#154a91] sm:col-span-1" aria-hidden="true">
          Mở chấm bài
          <ChevronDown className="-rotate-90" size={17} />
        </span>
      </button>
    </section>
  );
}

export function ActivityCard() {
  return (
    <section className="soft-paper rounded-xl p-3">
      <h2 className="mb-3 flex items-center gap-2 text-xl font-extrabold">
        <Clock className="text-[#1459d9]" />
        Hoạt động gần đây
      </h2>

      <div className="divide-y divide-[#e0c49a]">
        {recentActivities.map(([time, actor, action]) => (
          <div key={`${time}-${actor}`} className="flex gap-3 py-2 text-xs">
            <span className="shrink-0 font-bold text-[#1459d9]">{time}</span>
            <p className="min-w-0">
              <b>{actor}</b> {action}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AttentionCard() {
  const totalAttention = attentionStudents.length;

  return (
    <section className="soft-paper overflow-hidden rounded-xl border border-[#dec49d]">
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr]">
        <div className="flex items-center gap-3 border-b border-[#dec49d] bg-[#fff0d8]/75 px-3 py-2.5 lg:border-b-0 lg:border-r">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5dfbc] text-[#a45c1d]">
            <AlertTriangle size={19} />
          </span>
          <div>
            <div className="text-2xl font-extrabold leading-none text-[#a45c1d]">{totalAttention}</div>
            <h2 className="text-sm font-extrabold text-[#163467]">Cần chú ý</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[#dec49d] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {attentionStudents.map((student) => (
            <AttentionItem key={student.name} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AttentionItem({ student }: { student: AttentionStudent }) {
  const toneClasses =
    student.tone === "red"
      ? {
          dot: "bg-[#c64a3e]",
          tag: "bg-[#fde7e0] text-[#b63e32]",
          text: "text-[#b63e32]",
        }
      : {
          dot: "bg-[#d28b3b]",
          tag: "bg-[#fff0d8] text-[#a45c1d]",
          text: "text-[#a45c1d]",
        };

  return (
    <div className="min-w-0 px-3 py-2">
      <div className="mb-1 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${toneClasses.dot}`} />
        <b className={`truncate text-sm ${toneClasses.text}`}>{student.tag}</b>
        <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-extrabold ${toneClasses.tag}`}>
          !
        </span>
      </div>
      <div className="truncate text-sm font-extrabold text-[#163467]">{student.name}</div>
      <p className="truncate text-xs font-semibold text-[#536270]">{student.desc}</p>
    </div>
  );
}

export function QuickFiles() {
  return (
    <section className="soft-paper rounded-xl p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-extrabold">
          <FileText className="text-[#1459d9]" />
          Tài liệu
        </h2>
        <button className="grid h-8 w-8 place-items-center rounded-md border border-[#dec49d] bg-[#fff9ed]" type="button" aria-label="Mở menu tài liệu">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="space-y-2">
        <FileRow name="De_kiem_tra_45_phut_Toan_9A.pdf" meta="PDF • 1.24 MB" />
        <FileRow name="Bang_cu_thuc_Toan_9.pdf" meta="PDF • 512 KB" />
      </div>
    </section>
  );
}

export function FileRow({ name, meta }: { name: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#e0c49a] bg-[#fff7e8]/80 p-2">
      <FileText className="shrink-0 text-red-600" size={18} />
      <div className="min-w-0 flex-1">
        <b className="block truncate text-xs">{name}</b>
        <p className="text-xs font-semibold text-[#5b6878]">{meta}</p>
      </div>
      <button className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[#dec49d] bg-[#fff9ed]" type="button" aria-label={`Xem ${name}`}>
        <Eye size={14} />
      </button>
    </div>
  );
}
