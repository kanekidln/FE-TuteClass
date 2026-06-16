import { FileText, Image, Link } from "lucide-react";
import type { Conversation } from "./type";

export const conversations: Conversation[] = [
  { avatar: "LN", name: "Lan Nguyễn", tag: "Bài tập", message: "Em chưa hiểu cách làm câu 5...", time: "09:23", unread: "3", status: "Cần theo dõi", badge: "new" },
  { avatar: "MT", name: "Minh Trần", tag: "Lịch học", message: "Tuần sau em xin nghỉ học ạ.", time: "Hôm qua", unread: "2", status: "Hoàn tất", badge: "done" },
  { avatar: "NP", name: "Nam Phạm", tag: "Điểm số", message: "Điểm bài này sao thấp vậy cô?", time: "Hôm qua", unread: "1", status: "Cần theo dõi", badge: "new" },
  { avatar: "HL", name: "Huy Lê", tag: "Học phí", message: "Phụ huynh đã chuyển khoản.", time: "2 ngày", unread: "✓", status: "Hoàn tất", badge: "done" },
  { avatar: "MA", name: "Mai Anh", tag: "Tài liệu", message: "Cô gửi lại file giúp em với ạ.", time: "2 ngày", unread: "1", status: "Cần theo dõi", badge: "new" },
];

export const quickReplies = ["Đã nhận được.", "Cô sẽ kiểm tra.", "Em nộp lại bài nhé.", "Cảm ơn em!"];

export const sharedFiles = [
  { Icon: FileText, name: "bt_toan_phuong_trinh.pdf", meta: "PDF - 1.2 MB - Lan gửi" },
  { Icon: FileText, name: "loi_giai_cau_5.pdf", meta: "PDF - 800 KB - Cô Hường gửi" },
  { Icon: Image, name: "anh_bai_lam_cau_5.png", meta: "Ảnh - 640 KB - Lan gửi" },
  { Icon: Link, name: "Video ôn phương trình", meta: "Link học liệu - Cô Hường gửi" },
];

export const historyEvents = [
  { tag: "Bài tập", time: "Hôm nay 09:15", text: "Hỏi cách làm câu 5 bài phương trình." },
  { tag: "Tài liệu", time: "Hôm nay 09:23", text: "Giáo viên gửi lời giải chi tiết." },
  { tag: "Điểm số", time: "18/05", text: "Trao đổi về điểm bài kiểm tra 15 phút." },
  { tag: "Lịch học", time: "14/05", text: "Xác nhận lịch học bù cuối tuần." },
] as const;
