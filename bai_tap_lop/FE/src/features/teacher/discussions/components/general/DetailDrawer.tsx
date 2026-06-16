import { Bell, Eye, FileText, Megaphone, MessageSquare, Paperclip, Send, Users, X } from "lucide-react";
import { studentReplies } from "./data";
import { getTagClassName } from "./helper";
import type { Announcement } from "./type";

type DetailDrawerProps = {
  notice: Announcement | null;
  onClose: () => void;
};

export function DetailDrawer({ notice, onClose }: DetailDrawerProps) {
  const Icon = notice?.Icon ?? Megaphone;

  return (
    <div className={`teacher-discussion-drawer-layer ${notice ? "is-open" : ""}`} aria-hidden={!notice}>
      <button className="teacher-discussion-drawer-backdrop" onClick={onClose} type="button" aria-label="Đóng chi tiết thông báo" />
      <aside className="teacher-discussion-drawer rounded-l-xl border border-[#eadcc6] bg-[#fffaf0] p-5 shadow-md">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            <span className={`teacher-notice-icon tone-${notice?.tone ?? "blue"} h-12 w-12`}>
              <Icon size={24} />
            </span>
            <div className="min-w-0">
              <h2 className="text-xl font-extrabold leading-tight">{notice?.title ?? "Chi tiết thông báo"}</h2>
              <span className={getTagClassName(notice?.tag)}>{notice?.tag ?? "Bài tập"}</span>
            </div>
          </div>
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#eadcc6] bg-white text-[#203b69]" onClick={onClose} type="button" aria-label="Đóng">
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#ffd5a7] text-sm font-extrabold">CH</div>
            <div>
              <b>Cô Hường</b>
              <p className="text-sm font-semibold text-[#5d708c]">Hôm nay, 09:15</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md bg-[#eef3ff] px-3 py-2 text-sm font-bold text-[#205bc2]">
            <Eye size={15} />
            Đang hiển thị
          </span>
        </div>

        <section className="teacher-discussion-message-card mb-5 rounded-lg border border-[#eadcc6] bg-[#fffdf8] p-4">
          <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#5d708c]">Nội dung</h3>
          <p className="whitespace-pre-line text-base font-semibold leading-7">
            {notice?.text}
            {"\n"}Chúc các bạn học tốt.
          </p>
        </section>

        <div className="mb-5 rounded-lg border border-[#eadcc6] bg-[#fffdf8] p-3">
          <div className="flex gap-3">
            <FileText className="mt-1 shrink-0 text-[#1459d9]" size={24} />
            <div>
              <b className="text-sm">Đề bài + Hướng dẫn bài tập chương 2.pdf</b>
              <p className="mt-1 text-sm font-semibold text-[#5d708c]">1.2 MB</p>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 rounded-lg border border-[#eadcc6] bg-[#fff7e8] py-3 text-center">
          <div>
            <b className="text-xl text-[#1264d8]">{notice?.seen ?? "20/23"}</b>
            <p className="text-xs font-bold">Đã xem</p>
          </div>
          <div className="border-x border-[#eadcc6]">
            <b className="text-xl text-[#ff8a00]">3</b>
            <p className="text-xs font-bold">Chưa xem</p>
          </div>
          <div>
            <b className="text-xl text-[#2da35e]">5</b>
            <p className="text-xs font-bold">Phản hồi</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#eadcc6] bg-[#fffdf8] px-2 py-2 text-sm font-extrabold text-[#1e5cc6]">
            <Users size={16} />
            Ai chưa xem
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#eadcc6] bg-[#fffdf8] px-2 py-2 text-sm font-extrabold text-[#1e5cc6]">
            <Bell size={16} />
            Nhắc học sinh
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-extrabold">Phản hồi của học sinh</h3>
          <span className="text-sm font-bold text-[#1e5cc6]">Xem tất cả</span>
        </div>

        <div className="teacher-discussion-replies">
          {studentReplies.map(([avatar, name, msg, time]) => (
            <div key={`${name}-${time}`} className="grid grid-cols-[40px_1fr_48px] border-b border-[#eadcc6] py-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#ffd5a7] text-xs font-extrabold">{avatar}</div>
              <div>
                <b>{name}</b>
                <p className="text-sm font-semibold text-[#273c62]">{msg}</p>
              </div>
              <span className="text-sm font-semibold text-[#5d708c]">{time}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-[#eadcc6] bg-white p-3">
          <input className="w-full bg-transparent text-sm font-semibold outline-none" placeholder="Viết phản hồi chung..." />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-3 text-[#5d708c]">
              <Paperclip size={18} />
              <MessageSquare size={18} />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#1f5fc8] px-5 py-2 text-sm font-bold text-white">
              <Send size={15} />
              Gửi
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
