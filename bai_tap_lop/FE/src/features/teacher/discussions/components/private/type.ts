export type ConversationTag = "Bài tập" | "Lịch học" | "Điểm số" | "Học phí" | "Tài liệu" | "Khác";

export type ConversationStatus = "Cần theo dõi" | "Hoàn tất";

export type Conversation = {
  avatar: string;
  badge: "new" | "done";
  message: string;
  name: string;
  status: ConversationStatus;
  tag: ConversationTag;
  time: string;
  unread: string;
};

export type SupportTab = "info" | "files" | "history";
