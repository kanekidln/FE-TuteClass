import { Filter } from "lucide-react";

export function FilterSidebar() {
  return (
    <aside className="teacher-discussion-panel teacher-discussion-sidebar relative rounded-md border border-[#eadcc6] bg-[#fffaf0]/90 shadow-sm">
      <div className="relative h-20 border-b border-[#eadcc6] bg-[linear-gradient(#f7ead5_1px,transparent_1px)] [background-size:100%_28px] px-6 py-5">
        <div className="absolute -left-2 top-2 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-white shadow-inner" />
          ))}
        </div>
        <div className="absolute right-4 top-1 rotate-[-20deg] rounded bg-[#f1cfa5]/70 px-8 py-2" />
        <h2 className="text-lg font-extrabold">Trao đổi lớp 9A</h2>
      </div>

      <div className="p-4">
        <h3 className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide">
          <Filter size={15} />
          Bộ lọc thông báo
        </h3>

        <div className="teacher-filter-stack">
          <label className="teacher-filter-field">
            <span>Trạng thái</span>
            <select defaultValue="all">
              <option value="all">Tất cả thông báo</option>
              <option value="unread">Chưa xem hết</option>
              <option value="seen">Đã xem hết</option>
            </select>
          </label>

          <label className="teacher-filter-field">
            <span>Loại thông báo</span>
            <select defaultValue="all">
              <option value="all">Tất cả loại</option>
              <option value="homework">Bài tập</option>
              <option value="schedule">Lịch học</option>
              <option value="test">Kiểm tra</option>
              <option value="other">Khác</option>
            </select>
          </label>

          <label className="teacher-filter-field">
            <span>Sắp xếp</span>
            <select defaultValue="newest">
              <option value="newest">Mới nhất</option>
              <option value="pinned">Tin ghim trước</option>
              <option value="least-seen">Ít lượt xem trước</option>
            </select>
          </label>
        </div>
      </div>
    </aside>
  );
}
