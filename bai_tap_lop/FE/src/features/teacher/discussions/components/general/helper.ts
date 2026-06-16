import type { AnnouncementTag } from "./type";

export function getTagClassName(tag: AnnouncementTag | undefined): string {
  const tone = tag === "Bài tập"
    ? "homework"
    : tag === "Lịch học"
      ? "schedule"
      : tag === "Kiểm tra"
        ? "test"
        : tag === "Tài liệu"
          ? "document"
          : tag === "Học phí"
            ? "tuition"
            : "other";

  return `teacher-category-tag tag-${tone}`;
}
