import type { ConversationTag } from "./type";

export function tagClass(tag: ConversationTag) {
  const tone =
    tag === "Bài tập" ? "homework" :
    tag === "Lịch học" ? "schedule" :
    tag === "Điểm số" ? "test" :
    tag === "Tài liệu" ? "document" :
    tag === "Học phí" ? "tuition" : "other";

  return `teacher-category-tag tag-${tone}`;
}
