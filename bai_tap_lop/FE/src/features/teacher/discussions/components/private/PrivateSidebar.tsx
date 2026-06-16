import { Check, Filter, Search } from "lucide-react";
import { conversations } from "./data";
import { tagClass } from "./helper";
import type { ConversationStatus } from "./type";

type PrivateSidebarProps = {
  activeConversationStatus: ConversationStatus;
};

export function PrivateSidebar({ activeConversationStatus }: PrivateSidebarProps) {
  return (
    <aside className="teacher-discussion-panel teacher-private-sidebar relative rounded-md border border-[#eadcc6] bg-[#fffaf0]/90 shadow-sm">
      <div className="relative h-16 border-b border-[#eadcc6] bg-[linear-gradient(#f7ead5_1px,transparent_1px)] [background-size:100%_28px] px-5 py-4">
        <div className="absolute -left-2 top-2 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-white shadow-inner" />
          ))}
        </div>
        <div className="absolute right-4 top-1 rotate-[-20deg] rounded bg-[#f1cfa5]/70 px-8 py-2" />
        <h2 className="text-base font-extrabold">Trao đổi lớp 9A</h2>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide">
            <Filter size={15} />
            Hộp thư riêng
          </h3>
          <span className="teacher-inline-count">18</span>
        </div>

        <div className="mb-2 flex items-center gap-2 rounded-lg border border-[#eadcc6] bg-white px-3 py-1.5 text-xs">
          <Search className="text-[#71809a]" size={15} />
          <span className="text-[#71809a]">Tìm học sinh...</span>
        </div>

        <div className="mb-2 flex flex-wrap gap-1.5">
          {["Tất cả", "Bài tập", "Lịch học", "Điểm số"].map((item, index) => (
            <button
              className={`rounded-md border px-2 py-1 text-[11px] font-extrabold ${index === 1 ? "border-[#a7c6ff] bg-[#eaf1ff] text-[#1459d9]" : "border-[#eadcc6] bg-white text-[#203b69]"}`}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="teacher-private-list min-h-0 flex-1 overflow-auto rounded-lg">
          {conversations.map((item, index) => (
            <button
              className={`teacher-private-row grid w-full grid-cols-[34px_minmax(0,1fr)_30px] gap-2 border-b border-[#eadcc6] px-2 py-2 text-left ${index === 0 ? "rounded-lg border border-[#b9cdf5] bg-[#f3f7ff]" : "bg-[#fffaf0]"}`}
              key={item.name}
              type="button"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffd5a7] text-[11px] font-extrabold">{item.avatar}</span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <strong className="truncate text-xs font-extrabold">{item.name}</strong>
                  <span className={tagClass(item.tag)}>{item.tag}</span>
                </span>
                <span className="mt-1 block truncate text-xs font-semibold text-[#273c62]">{item.message}</span>
                <span className={`teacher-private-status-chip mt-1 ${((index === 0 ? activeConversationStatus : item.status) === "Hoàn tất") ? "is-done" : "is-follow"}`}>
                  {index === 0 ? activeConversationStatus : item.status}
                </span>
              </span>
              <span className="text-right">
                <span className="mb-2 block text-xs font-bold text-[#5d708c]">{item.time}</span>
                <span className={`inline-grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-white ${item.badge === "done" ? "bg-[#48b66e]" : "bg-[#1459d9]"}`}>
                  {item.unread === "✓" ? <Check size={14} /> : item.unread}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
