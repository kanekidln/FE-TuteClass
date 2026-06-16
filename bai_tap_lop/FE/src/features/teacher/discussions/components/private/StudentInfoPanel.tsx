import { Pin } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { InfoBlock } from "./InfoBlock";

export function StudentInfoPanel() {
  return (
    <>
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Thông tin học sinh</h3>
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-[#eadcc6] bg-white/70 p-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ffd5a7] text-xs font-extrabold">LN</span>
        <div>
          <h4 className="font-extrabold">Lan Nguyễn</h4>
          <p className="text-sm font-bold text-[#5d708c]">Lớp 9A</p>
          <p className="text-xs font-bold text-[#5d708c]">Tham gia từ 08/2025</p>
        </div>
      </div>

      <InfoBlock title="Lưu ý hiện tại" action="Xem chi tiết">
        <div className="rounded-lg border border-[#fdecc8] bg-[#fff1d6] p-3 text-sm font-extrabold text-[#b45309]">1 bài chưa nộp</div>
      </InfoBlock>

      <InfoBlock title="Ghi chú giáo viên" action="Chỉnh sửa">
        <div className="teacher-sticky-note">
          <span className="teacher-sticky-pin" aria-hidden="true" />
          <ul className="list-disc space-y-2 pl-5 text-sm font-semibold">
            <li>Học khá nhưng thiếu tự tin</li>
            <li>Hay hỏi lại phần phương trình</li>
            <li>Phụ huynh theo sát</li>
          </ul>
        </div>
      </InfoBlock>

      <InfoBlock title="Thông tin lớp học" action="Hồ sơ">
        <div className="overflow-hidden rounded-lg border border-[#eadcc6] bg-white/70 text-sm font-bold">
          {[
            ["Lớp", "9A"],
            ["Nhóm học", "Nâng cao"],
          ].map(([label, value]) => (
            <div className="flex justify-between border-b border-[#eadcc6] px-3 py-2 last:border-b-0" key={label}>
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </InfoBlock>

      <div className="grid gap-2">
        <ActionButton icon={Pin} label="Ghim hội thoại" />
      </div>
    </>
  );
}
