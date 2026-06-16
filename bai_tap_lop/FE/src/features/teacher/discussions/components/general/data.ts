import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Megaphone,
  MessageSquare,
} from "lucide-react";
import type { Announcement, AnnouncementTag } from "./type";

export const announcementTags: AnnouncementTag[] = ["Bài tập", "Lịch học", "Kiểm tra", "Tài liệu", "Học phí", "Khác"];

export const pinnedAnnouncements: Announcement[] = [
  {
    Icon: MessageSquare,
    title: "Quy định trao đổi trong lớp",
    text: "Các trao đổi trong lớp cần tập trung vào nội dung học tập, dùng ngôn ngữ lịch sự và phản hồi đúng chủ đề.",
    tag: "Khác",
    seen: "23/23",
    badge: "✓",
    tone: "purple",
    date: "12/05",
  },
  {
    Icon: ClipboardList,
    title: "Lịch kiểm tra giữa kỳ",
    text: "Lớp sẽ kiểm tra giữa kỳ vào buổi học tuần tới. Các bạn ôn lại chương 1 và chương 2.",
    tag: "Kiểm tra",
    seen: "21/23",
    badge: "2",
    tone: "orange",
    date: "10/05",
  },
  {
    Icon: CalendarDays,
    title: "Thông báo nghỉ lễ 30/4 - 1/5",
    text: "Lớp nghỉ học theo lịch lễ 30/4 - 1/5. Lịch học bù sẽ được cập nhật trong mục lịch học.",
    tag: "Khác",
    seen: "23/23",
    badge: "✓",
    tone: "purple",
    date: "24/04",
  },
];

export const announcements: Announcement[] = [
  {
    Icon: Megaphone,
    title: "Nhắc nộp bài tập chương 2",
    text: "Các bạn nhớ nộp bài tập chương 2 trước 21h thứ 6 nhé!\nNếu có thắc mắc cứ nhắn cho cô.",
    tag: "Bài tập",
    seen: "20/23",
    badge: "3",
    tone: "blue",
  },
  {
    Icon: CalendarDays,
    title: "Thông báo đổi lịch học",
    text: "Tuần sau lớp mình sẽ học bù vào Chủ nhật.\nMọi người sắp xếp thời gian nhé!",
    tag: "Lịch học",
    seen: "18/23",
    badge: "5",
    tone: "red",
  },
  {
    Icon: CheckCircle2,
    title: "Đáp án bài tập chương 1",
    text: "Cô gửi đáp án bài tập chương 1 để các bạn đối chiếu nhé.\n25/05/2024",
    tag: "Bài tập",
    seen: "23/23",
    badge: "✓",
    tone: "green",
  },
  {
    Icon: ClipboardList,
    title: "Thông báo kiểm tra 15 phút",
    text: "Kiểm tra 15 phút vào đầu giờ học thứ 3 (28/05).\n24/05/2024",
    tag: "Kiểm tra",
    seen: "21/23",
    badge: "2",
    tone: "orange",
  },
  {
    Icon: FileText,
    title: "Tài liệu ôn tập giữa kỳ",
    text: "File tổng hợp lý thuyết và bài tập ôn giữa kỳ.\n22/05/2024",
    tag: "Bài tập",
    seen: "23/23",
    badge: "✓",
    tone: "purple",
  },
];

export const studentReplies = [
  ["MN", "Minh", "Dạ em nộp bài lúc 20h tối nay ạ.", "09:20"],
  ["LA", "Lan", "Cô ơi câu 3 ý b em chưa hiểu tại sao lại đưa về cùng mẫu số ạ.", "09:25"],
  ["NA", "Nam", "File hướng dẫn rất chi tiết, cảm ơn cô ạ!", "09:30"],
];
