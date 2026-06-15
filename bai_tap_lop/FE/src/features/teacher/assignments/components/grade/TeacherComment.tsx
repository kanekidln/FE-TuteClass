import { MessageSquare, MoreHorizontal } from "lucide-react";

export function TeacherComment({ comment, time }: { comment: string; time: string }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-md border border-[#e0cdae] bg-white px-3 py-2">
      <MessageSquare className="mt-0.5 shrink-0 text-[#1459d9]" size={16} />
      <div className="min-w-0 flex-1">
        <b className="block text-xs text-[#0b2d82]">Nhận xét của giáo viên</b>
        <p className="text-sm font-semibold leading-5">{comment}</p>
      </div>
      <span className="shrink-0 text-[11px] font-semibold text-[#66758a]">{time}</span>
      <button className="grid h-7 w-7 shrink-0 place-items-center rounded-md hover:bg-[#f4e7cf]" type="button" aria-label="Thao tác nhận xét">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}
