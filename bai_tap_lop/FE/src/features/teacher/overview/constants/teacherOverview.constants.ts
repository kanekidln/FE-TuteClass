import type { ClassroomStatus, TeacherNote, TeacherStat, TeacherTodo } from "../types/teacherOverview.types";

export const teacherOverviewStats: TeacherStat[] = [
  {
    id: "average-score",
    title: "Điểm trung bình lớp",
    value: "8.2",
    color: "green",
    icon: "star",
    rotation: -0.5,
  },
  {
    id: "paid-tuition",
    title: "Học phí đã nộp",
    value: "28/30",
    detail: "học sinh",
    color: "yellow",
    icon: "wallet",
    rotation: 0.35,
  },
  {
    id: "grading",
    title: "Bài cần chấm trước buổi học",
    value: "6",
    color: "pink",
    icon: "checklist",
    rotation: -0.25,
  },
  {
    id: "next-class",
    title: "Lịch dạy tiếp theo",
    value: "Thứ 5,\n14:00",
    color: "blue",
    icon: "calendar",
    rotation: 0.2,
  },
  {
    id: "teaching-progress",
    title: "Tiến độ dạy",
    value: "18/20",
    detail: "buổi",
    color: "purple",
    icon: "chart",
    rotation: 0.45,
  },
];

export const teacherNotes: TeacherNote[] = [
  { id: "geometry-progress", content: "Lập đề cải thiện rõ rệt về bài tập hình học." },
  { id: "submission-reminder", content: "Cần nhắc nhở một số bạn nộp bài đúng hạn." },
  { id: "midterm-review", content: "Chuẩn bị ôn tập giữa kỳ vào tuần tới." },
];

export const classroomStatuses: ClassroomStatus[] = [
  {
    id: "needs-support",
    title: "Cần hỗ trợ thêm",
    value: "7/30",
    percent: "23.3%",
    tone: "yellow",
  },
  {
    id: "full-attendance",
    title: "Đi học đầy đủ tuần này",
    value: "27/30",
    percent: "90%",
    tone: "blue",
  },
];

export const weeklyTodos: TeacherTodo[] = [
  { id: "grade-chapter-3", label: "Chấm bài kiểm tra chương 3", completed: true },
  { id: "homework-week-18", label: "Nhắc học sinh nộp bài tập tuần 18", completed: true },
  { id: "algebra-practice", label: "Soạn bài luyện tập Đại số", completed: true },
  { id: "parent-notice", label: "Gửi thông báo khóa ôn: phụ huynh", completed: false },
  { id: "new-lesson-slides", label: "Chuẩn bị slide bài mới", completed: false },
];

export const additionalNotes: TeacherNote[] = [
  { id: "left-note", content: "5. Ghi chú thêm" },
  { id: "blank-note", content: "" },
];
