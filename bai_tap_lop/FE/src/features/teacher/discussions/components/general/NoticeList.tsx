import { Check, Filter, Search } from "lucide-react";
import { getTagClassName } from "./helper";
import type { Announcement } from "./type";

type NoticeListProps = {
  items: Announcement[];
  onSelect: (notice: Announcement) => void;
};

export function NoticeList({ items, onSelect }: NoticeListProps) {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-extrabold">
          Nội dung thông báo
          <span className="teacher-inline-count">28</span>
        </h3>
        <span className="text-xs font-bold text-[#5d708c]">Click vào thông báo để xem chi tiết</span>
      </div>

      <div className="mb-3 flex gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-[#eadcc6] bg-white px-4 py-2 text-sm">
          <Search className="text-[#71809a]" size={17} />
          <span className="text-[#71809a]">Tìm thông báo...</span>
        </div>
        <label className="teacher-quick-sort" aria-label="Sắp xếp thông báo">
          <Filter size={16} />
          <select defaultValue="newest">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="unread">Chưa xem trước</option>
            <option value="most-replies">Nhiều phản hồi</option>
            <option value="least-seen">Ít lượt xem</option>
          </select>
        </label>
      </div>

      <div className="teacher-discussion-notice-list overflow-auto rounded-lg">
        {items.map((notice, i) => {
          const Icon = notice.Icon;

          return (
            <button
              key={notice.title}
              className={`teacher-notice-row grid w-full grid-cols-[48px_minmax(0,1fr)_92px_34px] items-center border-b border-[#eadcc6] px-4 py-3 text-left ${
                i === 0 ? "rounded-lg border border-[#b9cdf5] bg-[#f3f7ff]" : "bg-[#fffaf0]"
              }`}
              onClick={() => onSelect(notice)}
              type="button"
            >
              <span className={`teacher-notice-icon tone-${notice.tone}`}>
                <Icon size={22} />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <strong className="text-base font-extrabold">{notice.title}</strong>
                  {i === 0 && <span className="rounded-md bg-[#ffe2d5] px-2 py-1 text-xs font-bold text-[#dc4b2f]">Mới</span>}
                  <span className={getTagClassName(notice.tag)}>{notice.tag}</span>
                </span>
                <span className="mt-1 block whitespace-pre-line text-sm font-semibold leading-5 text-[#273c62]">{notice.text}</span>
                <span className="mt-1 block text-xs font-semibold text-[#5d708c]">Cô Hường - Hôm nay, 09:15</span>
              </span>
              <span className="text-center text-sm font-extrabold">
                {notice.seen}
                <span className="block text-xs">đã xem</span>
              </span>
              <span className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold text-white ${notice.badge === "✓" ? "bg-[#48b66e]" : "bg-[#ef3d34]"}`}>
                {notice.badge === "✓" ? <Check size={15} /> : notice.badge}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
