import type {
  CreateScheduleFormState,
  EditableLessonItem,
  EditScheduleFormState,
  ScheduleConflict,
  SelectedWeekDay,
  TeacherLessonItem,
  TeacherWeekDay,
  TodayClassItem,
  WeeklySlotItem,
} from "../types/teacherSchedule.types";

export const SCHEDULE_START_TIME = "07:00";
export const SCHEDULE_HOUR_HEIGHT = 45;

export const teacherWeekDays: TeacherWeekDay[] = [
  { id: 1, label: "Thứ 2", shortLabel: "T2", date: "13/05" },
  { id: 2, label: "Thứ 3", shortLabel: "T3", date: "14/05" },
  { id: 3, label: "Thứ 4", shortLabel: "T4", date: "15/05" },
  { id: 4, label: "Thứ 5", shortLabel: "T5", date: "16/05" },
  { id: 5, label: "Thứ 6", shortLabel: "T6", date: "17/05" },
  { id: 6, label: "Thứ 7", shortLabel: "T7", date: "18/05" },
  { id: 7, label: "CN", shortLabel: "CN", date: "19/05" },
];

export const teacherScheduleTimeLabels = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export const teacherLessons: TeacherLessonItem[] = [
  { id: "mon-9a-am", className: "9A", subject: "Toán", day: 1, startTime: "07:00", endTime: "08:30", variant: "primary", clickable: true },
  { id: "mon-8b", className: "8B", subject: "Vật lý", day: 1, startTime: "09:00", endTime: "10:30", variant: "soft", clickable: false },
  { id: "mon-7c", className: "7C", subject: "Ngữ văn", day: 1, startTime: "13:30", endTime: "15:00", variant: "soft", clickable: false },
  { id: "mon-6a", className: "6A", subject: "Tiếng Anh", day: 1, startTime: "15:15", endTime: "16:45", variant: "soft", clickable: false },
  { id: "tue-9a", className: "9A", subject: "Toán", day: 2, startTime: "09:00", endTime: "10:30", variant: "primary", clickable: true },
  { id: "tue-6a", className: "6A", subject: "Tiếng Anh", day: 2, startTime: "13:30", endTime: "15:00", variant: "soft", clickable: false },
  { id: "tue-7c", className: "7C", subject: "Ngữ văn", day: 2, startTime: "15:15", endTime: "16:45", variant: "soft", clickable: false },
  { id: "wed-9a-am", className: "9A", subject: "Toán", day: 3, startTime: "07:00", endTime: "08:30", variant: "primary", clickable: true },
  { id: "wed-6a", className: "6A", subject: "Tiếng Anh", day: 3, startTime: "09:00", endTime: "10:30", variant: "soft", clickable: false },
  { id: "wed-9a-pm", className: "9A", subject: "Toán", day: 3, startTime: "13:30", endTime: "15:00", variant: "primary", clickable: true },
  { id: "thu-8b-am", className: "8B", subject: "Vật lý", day: 4, startTime: "09:00", endTime: "10:30", variant: "soft", clickable: false },
  { id: "thu-8b-pm", className: "8B", subject: "Vật lý", day: 4, startTime: "13:30", endTime: "15:00", variant: "soft", clickable: false },
  { id: "thu-9a", className: "9A", subject: "Toán", day: 4, startTime: "15:15", endTime: "16:45", variant: "primary", clickable: true },
  { id: "fri-9a", className: "9A", subject: "Toán", day: 5, startTime: "07:00", endTime: "08:30", variant: "primary", clickable: true },
  { id: "fri-7c", className: "7C", subject: "Ngữ văn", day: 5, startTime: "09:00", endTime: "10:30", variant: "soft", clickable: false },
  { id: "fri-8b", className: "8B", subject: "Vật lý", day: 5, startTime: "13:30", endTime: "15:00", variant: "soft", clickable: false },
  { id: "sat-9a", className: "9A", subject: "Toán", day: 6, startTime: "09:00", endTime: "10:30", variant: "primary", clickable: true },
];

export const todayTeacherClasses: TodayClassItem[] = [
  { id: "today-9a", className: "9A", subject: "Toán", time: "07:00 - 08:30", tone: "orange" },
  { id: "today-8b", className: "8B", subject: "Vật lý", time: "09:00 - 10:30", tone: "purple" },
  { id: "today-7c", className: "7C", subject: "Ngữ văn", time: "13:30 - 15:00", tone: "green" },
];

export const createScheduleWeekDays: Array<{ key: SelectedWeekDay; label: string }> = [
  { key: "T2", label: "Thứ 2" },
  { key: "T3", label: "Thứ 3" },
  { key: "T4", label: "Thứ 4" },
  { key: "T5", label: "Thứ 5" },
  { key: "T6", label: "Thứ 6" },
  { key: "T7", label: "Thứ 7" },
  { key: "CN", label: "Chủ nhật" },
];

export const createScheduleTimeLabels = ["17:00", "18:00", "19:00", "20:00", "21:00"];

export const defaultSelectedWeekDays: SelectedWeekDay[] = ["T4", "T6", "CN"];

export const initialCreateScheduleForm: CreateScheduleFormState = {
  subject: "Toán",
  className: "Toán 10A1",
  startDate: "06/05/2024",
  endDate: "30/06/2024",
  learningMode: "Học online",
  platform: "Google Meet (meet.google.com/abc-defg-hij)",
  repeat: "Hàng tuần",
  selectedDays: defaultSelectedWeekDays,
  startTime: "19:00",
  endTime: "20:30",
  note: "",
};

export const existingWeeklySlots: WeeklySlotItem[] = [
  { id: "slot-mon-ly", day: "T2", dayLabel: "Thứ 2", startTime: "17:30", endTime: "19:00", title: "Lý 10C", type: "existing" },
  { id: "slot-mon-toan", day: "T2", dayLabel: "Thứ 2", startTime: "19:00", endTime: "20:30", title: "Toán 9A", type: "existing" },
  { id: "slot-fri-ly", day: "T6", dayLabel: "Thứ 6", startTime: "17:30", endTime: "19:00", title: "Lý 10C", type: "existing" },
  { id: "slot-sat-toan", day: "T7", dayLabel: "Thứ 7", startTime: "09:00", endTime: "10:30", title: "Toán 10A1", type: "existing" },
];

export const defaultScheduleConflict: ScheduleConflict = {
  id: "conflict-wed-9a",
  className: "Toán 9A",
  dayLabel: "Thứ 4",
  time: "19:00 - 20:30",
  message: "Trùng lịch với lớp Toán 9A vào Thứ 4, 19:00 - 20:30",
  description: "Vui lòng chọn khung giờ khác để tránh trùng lịch.",
};

export const subjectOptions = ["Toán", "Vật lý", "Ngữ văn", "Tiếng Anh"];
export const classOptions = ["Toán 10A1", "Toán 9A", "Lý 10C", "Văn 8B"];
export const EDIT_WEEK_DAYS = [
  { id: "mon", label: "Thứ 2", date: "20/05" },
  { id: "tue", label: "Thứ 3", date: "21/05" },
  { id: "wed", label: "Thứ 4", date: "22/05" },
  { id: "thu", label: "Thứ 5", date: "23/05" },
  { id: "fri", label: "Thứ 6", date: "24/05" },
  { id: "sat", label: "Thứ 7", date: "25/05" },
  { id: "sun", label: "CN", date: "26/05" },
] as const;

export const EDIT_SCHEDULE_LESSONS: EditableLessonItem[] = [
  { id: "mon-math", dayId: "mon", dayLabel: "Thứ 2", dateLabel: "20/05/2024", subject: "Toán", className: "9A", startTime: "19:00", endTime: "20:00", learningType: "online", platform: "Học online" },
  { id: "mon-chemistry", dayId: "mon", dayLabel: "Thứ 2", dateLabel: "20/05/2024", subject: "Hóa học", className: "9A", startTime: "20:30", endTime: "21:30", learningType: "google-meet", platform: "Google Meet", isSelected: true },
  { id: "tue-physics", dayId: "tue", dayLabel: "Thứ 3", dateLabel: "21/05/2024", subject: "Vật lý", className: "9A", startTime: "19:00", endTime: "20:00", learningType: "online", platform: "Học online" },
  { id: "wed-math", dayId: "wed", dayLabel: "Thứ 4", dateLabel: "22/05/2024", subject: "Toán", className: "9A", startTime: "19:00", endTime: "20:00", learningType: "online", platform: "Học online" },
  { id: "thu-biology", dayId: "thu", dayLabel: "Thứ 5", dateLabel: "23/05/2024", subject: "Sinh học", className: "9A", startTime: "19:00", endTime: "20:00", learningType: "google-meet", platform: "Google Meet" },
  { id: "fri-literature", dayId: "fri", dayLabel: "Thứ 6", dateLabel: "24/05/2024", subject: "Ngữ văn", className: "9A", startTime: "19:00", endTime: "20:00", learningType: "google-meet", platform: "Google Meet" },
  { id: "sat-english", dayId: "sat", dayLabel: "Thứ 7", dateLabel: "25/05/2024", subject: "Tiếng Anh", className: "9A", startTime: "14:00", endTime: "15:00", learningType: "google-meet", platform: "Google Meet" },
  { id: "sat-it", dayId: "sat", dayLabel: "Thứ 7", dateLabel: "25/05/2024", subject: "Tin học", className: "9A", startTime: "19:30", endTime: "20:30", learningType: "online", platform: "Học online" },
];

export const SELECTED_EDIT_LESSON = EDIT_SCHEDULE_LESSONS.find((lesson) => lesson.isSelected) ?? EDIT_SCHEDULE_LESSONS[0];

export const DEFAULT_EDIT_FORM_STATE: EditScheduleFormState = {
  date: "20/05/2024",
  startTime: "20:30",
  endTime: "21:30",
  weekDay: "T2",
  learningType: "Google Meet",
  platform: "Google Meet",
  repeatType: "Hàng tuần",
  reason: "",
  notifyStudents: true,
};
