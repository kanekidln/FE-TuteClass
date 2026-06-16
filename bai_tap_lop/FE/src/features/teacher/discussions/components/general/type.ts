import type { LucideIcon } from "lucide-react";

export type AnnouncementTag = "Bài tập" | "Lịch học" | "Kiểm tra" | "Tài liệu" | "Học phí" | "Khác";

export type Announcement = {
  Icon: LucideIcon;
  title: string;
  text: string;
  tag: AnnouncementTag;
  seen: string;
  badge: string;
  tone: "blue" | "red" | "green" | "orange" | "purple";
  date?: string;
};

export type AttachedFile = {
  name: string;
  size: string;
};
