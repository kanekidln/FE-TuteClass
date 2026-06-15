import type { AssignmentSession, StudentSubmission } from "./types";

export const submissions: StudentSubmission[] = [
  { id: "1", name: "Trần Văn Quân", initials: "TQ", status: "missing" },
  { id: "2", name: "Hoàng Diệu Anh", initials: "HA", status: "submitted", submittedAt: "16/06/2024 09:15" },
  { id: "3", name: "Nguyễn Văn Lâm", initials: "NL", status: "graded", submittedAt: "15/06/2024 14:30", score: 8.5 },
  { id: "4", name: "Mai Thị Tuyết", initials: "MT", status: "graded", submittedAt: "15/06/2024 10:20", score: 9 },
];

export const sessions: AssignmentSession[] = [
  {
    id: "10",
    title: "Giải hệ phương trình đối xứng - Nâng cao",
    date: "18/06",
    time: "18:00 - 19:30",
    className: "Toán 9A",
    state: "urgent",
    summary: "3 bài tự luận, 2 bài trắc nghiệm",
  },
  {
    id: "09",
    title: "Hình học không gian: Thể tích khối đa diện",
    date: "17/06",
    time: "08:00 - 09:30",
    className: "Toán 9A",
    state: "overdue",
    summary: "1 bài tự luận, 1 bài trắc nghiệm",
  },
  {
    id: "08",
    title: "Hệ thức lượng trong tam giác vuông",
    date: "15/06",
    time: "18:00 - 19:30",
    className: "Toán 9A",
    state: "done",
    summary: "2 bài tự luận, 2 bài trắc nghiệm - Đã chấm xong hết",
  },
];

export const attachedFiles = ["De_cuong_on_tap.docx", "Bai_tap_bo_sung.docx", "De-bai-tap-chuong-1.pdf"];
