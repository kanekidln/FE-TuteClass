import type { ReactNode } from "react";
import { CalendarDays, Clock, Star, Users } from "lucide-react";

export function InfoBar() {
  return (
    <section className="soft-paper grid grid-cols-1 gap-2 rounded-xl p-3 sm:grid-cols-2 xl:grid-cols-4">
      <InfoItem icon={<CalendarDays size={20} />} label="Ngày giao" main="13/06/2026" sub="19:30" />
      <InfoItem icon={<Clock size={20} />} label="Hạn nộp" main="20/06/2026 23:59" sub="Còn 7 ngày" tone="red" />
      <InfoItem icon={<Users size={20} />} label="Lớp áp dụng" main="Toán 9A, 9B, 9C" sub="25 học sinh" tone="blue" />
      <InfoItem icon={<Star size={20} />} label="Thang điểm" main="10.0 điểm" sub="12 câu hỏi" />
    </section>
  );
}

export function InfoItem({
  icon,
  label,
  main,
  sub,
  tone,
}: {
  icon: ReactNode;
  label: string;
  main: string;
  sub: string;
  tone?: "red" | "blue";
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#e0c49a] bg-[#fff7e8]/80 p-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dce9ff] text-[#1459d9]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-[#5b6878]">{label}</p>
        <b className="block truncate text-sm text-[#14294f]">{main}</b>
        <span className={`text-xs font-bold ${tone === "red" ? "text-red-600" : tone === "blue" ? "text-[#1459d9]" : "text-[#5b6878]"}`}>
          {sub}
        </span>
      </div>
    </div>
  );
}
